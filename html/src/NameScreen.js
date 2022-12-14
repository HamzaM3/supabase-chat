import { useRef } from "react"

export const NameScreen = ({ setName }) => {
  const name = useRef(null)

  return <div className="name-screen">
    <input type='text' id='name' ref={name}/>
    <button className="set-name" onClick={() => { setName(name.current.value) }}>SET NAME</button>
  </div>
}