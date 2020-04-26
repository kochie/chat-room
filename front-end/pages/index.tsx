import {useState} from 'react'
import Head from 'next/head'
import io from 'socket.io-client';
import { useEffect } from 'react/cjs/react.development';

export default function Home() {
    const socket = io("localhost:3001");
    const [text, setText] = useState("")
    const [messages, setMessages] = useState([])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      socket.emit('chat message', text)
      setText("")
    }

    const update = (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value)
    }

    useEffect(() => {
      socket.on('chat message', (msg) => {
        setMessages(messages => [...messages, {msg, id: (new Date()).getMilliseconds()}])
      })
    }, [])

    return (
      <>
        <Head>
          <title>Socket.IO chat</title>
        </Head>
        <div>
          <ul id="messages">
            {messages.map(message => (<li key={message.id}>{message.msg}</li>))}
          </ul>
          <form action="" onSubmit={onSubmit}>
            <input id="m" autoComplete="off" value={text} onChange={update}/><button>Send</button>
          </form>
        </div>
      </>
    )
}
