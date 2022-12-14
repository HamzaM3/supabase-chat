import { useRef, useEffect } from 'react';

export const InputMessage = ({ sendMessage }) => {
  const content = useRef();

  const enter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage(content.current.value)
      content.current.value = ''
    }
  }

  const click = () => {
    sendMessage(content.current.value)
    content.current.value = ''
  }
  
  return <div className="input-message">
    <textarea type="textarea" onKeyDown={enter} id="content" ref={content}/>
    <button className="send" onClick={click}>SEND</button>
  </div>
}

