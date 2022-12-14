import { useEffect } from "react"

export const ChatScreen = ({ messages }) => {
  const getAssociatedColor = (name) => {
    let res = name.split('').map(x => x.charCodeAt(0))
    res = res.reduce((x, y) => x*y % 16777259 , 1)
    res = res % 16**6
    res = res.toString(16).padStart(6, '0')
    return '#' + res;
  }

  return <div className="messages">
    {
      messages.map(({ name, content }, i) => {
        return <div key={i}><span style={{color: getAssociatedColor(name), fontWeight: 'bold'}}>{name}</span> : {content}</div>
      })
    }
  </div>
}
