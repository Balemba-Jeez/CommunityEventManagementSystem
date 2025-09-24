import React, { useEffect, useState, useRef } from 'react'
import { SendIcon, UsersIcon } from 'lucide-react'
const LiveChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Alex Chen',
      text: 'Hello everyone! Excited for this conference!',
      time: '2:05 PM',
      avatar:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: 2,
      user: 'Sarah Kim',
      text: "I'm looking forward to the React performance talk!",
      time: '2:06 PM',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: 3,
      user: 'Michael Brown',
      text: 'Does anyone know when the Q&A session starts?',
      time: '2:08 PM',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: 4,
      user: 'Emily Davis',
      text: 'The speaker is amazing! 🔥',
      time: '2:10 PM',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [participantCount, setParticipantCount] = useState(1245)
  const chatContainerRef = useRef(null)
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])
  // Simulate new messages coming in
  useEffect(() => {
    const randomMessages = [
      {
        user: 'Jordan Lee',
        text: 'This is so informative!',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      },
      {
        user: 'Taylor Smith',
        text: "Can't wait for the next session!",
        avatar:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      },
      {
        user: 'Jamie Wilson',
        text: 'Does anyone have a link to the slides?',
        avatar:
          'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      },
      {
        user: 'Casey Morgan',
        text: '👏 Great explanation!',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      },
      {
        user: 'Riley Johnson',
        text: "I'm taking so many notes right now",
        avatar:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      },
    ]
    const interval = setInterval(() => {
      const randomMessage =
        randomMessages[Math.floor(Math.random() * randomMessages.length)]
      const now = new Date()
      const timeString =
        now.getHours() +
        ':' +
        now.getMinutes().toString().padStart(2, '0') +
        ' ' +
        (now.getHours() >= 12 ? 'PM' : 'AM')
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          user: randomMessage.user,
          text: randomMessage.text,
          time: timeString,
          avatar: randomMessage.avatar,
        },
      ])
      // Randomly adjust participant count
      const fluctuation = Math.floor(Math.random() * 10) - 3
      setParticipantCount((prev) => Math.max(1000, prev + fluctuation))
    }, 8000)
    return () => clearInterval(interval)
  }, [])
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() === '') return
    const now = new Date()
    const timeString =
      now.getHours() +
      ':' +
      now.getMinutes().toString().padStart(2, '0') +
      ' ' +
      (now.getHours() >= 12 ? 'PM' : 'AM')
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        user: 'You',
        text: newMessage,
        time: timeString,
        avatar:
          'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      },
    ])
    setNewMessage('')
  }
  return (
    <div className="bg-white rounded-lg shadow h-full flex flex-col">
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Live Chat</h3>
          <div className="flex items-center text-gray-600">
            <UsersIcon size={16} className="mr-1" />
            <span className="text-sm">{participantCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 space-y-3"
        style={{
          maxHeight: 'calc(100vh - 12rem)',
        }}
      >
        {messages.map((message) => (
          <div key={message.id} className="flex items-start space-x-2">
            <img
              src={message.avatar}
              alt={message.user}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-baseline">
                <span className="font-medium text-sm">{message.user}</span>
                <span className="ml-2 text-xs text-gray-500">
                  {message.time}
                </span>
              </div>
              <p className="text-sm text-gray-800">{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSendMessage}
        className="p-3 border-t border-gray-200 flex items-center"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Send a message..."
          className="flex-1 py-2 px-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none"
        >
          <SendIcon size={20} />
        </button>
      </form>
    </div>
  )
}
export default LiveChat