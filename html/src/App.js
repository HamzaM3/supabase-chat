import { InputMessage } from "./InputMessage";
import { ChatScreen } from "./ChatScreen";
import { NameScreen } from "./NameScreen";
import { Disconnect } from './Disconnect'
import { useEffect, useState, useRef } from "react";

import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [name, setName] = useState(localStorage.getItem("name"));
  const timeout = useRef(null);

  const refresh = async () => {
    let data = await fetch('/api/chat/')
    data = await data.json()
    setMessages(data)
    clearTimeout(timeout.current)
    timeout.current = setTimeout(refresh, 500)
  }

  const sendMessage = async (content) => {
    await fetch('/api/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, content})  
    })
    await refresh()
    setTimeout(() => {
      const mess = document.querySelector('.messages')
      mess.scrollTop = mess.scrollHeight;
    }, 50) // I takes some time before the data is rendered.
  }

  console.log(name)

  const storeName = (name) => {
    localStorage.setItem("name", name);
    setName(name)
  }

  const disconnect = () => {
    localStorage.removeItem("name");
    setName(null)
  }


  useEffect(() => {
    refresh().then(() => {
      setTimeout(() => {
        const mess = document.querySelector('.messages')
        mess.scrollTop = mess.scrollHeight;
      }, 50) // I takes some time before the data is rendered.
    })
  }, [])

  return (
    !name 
      ? <NameScreen setName={storeName} /> 
      : <div className="chat">
          <Disconnect disconnect={disconnect}/>
          <ChatScreen messages={messages}/>
          <InputMessage sendMessage={sendMessage}/>
      </div>
  );
}

export default App;
