// src/components/ChatWindow.jsx
import { useState, useEffect, useRef } from 'react';

export default function ChatWindow({ selectedUser, socket, currentUser }) {
  console.log(socket)

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      fetch(`/api/mensajes/${selectedUser.uid}`, {
        headers: {
          'x-token': localStorage.getItem('token'),
        },
      })
        .then(res => res.json())
        .then(data => setMessages(data.mensajes));
    }

    // socket.on('mensaje-personal', (payload) => {
    //   if (
    //     (payload.de === currentUser.uid && payload.para === selectedUser.uid) ||
    //     (payload.de === selectedUser.uid && payload.para === currentUser.uid)
    //   ) {
    //     setMessages(prev => [...prev, payload]);
    //   }
    // });

    // return () => socket.off('mensaje-personal');
  }, [selectedUser, socket, currentUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedUser) return;

    const payload = {
      de: currentUser.uid,
      para: selectedUser.uid,
      mensaje: message,
    };

    socket.emit('mensaje-personal', payload);
    setMessages(prev => [...prev, payload]);
    setMessage('');
  };

  if (!selectedUser) {
    return (
      <div className="w-3/4 flex items-center justify-center">
        <p className="text-gray-500">Selecciona un usuario para chatear</p>
      </div>
    );
  }

  return (
    <div className="w-3/4 flex flex-col h-screen">
      <div className="bg-gray-200 p-4">
        <h2 className="text-lg font-bold">{selectedUser.nombre}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${msg.de === currentUser.uid ? 'text-right' : 'text-left'}`}
          >
            <span
              className={`inline-block p-2 rounded ${
                msg.de === currentUser.uid ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {msg.mensaje}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="p-4 bg-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 rounded border"
            placeholder="Escribe un mensaje..."
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}