import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000'; 

const UserList = ({ setSelectedUser }) => {
    const [users, setUsers] = useState([])

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(SOCKET_URL, {
            autoConnect: false,
            extraHeaders: {
                'x-token': localStorage.getItem('token'),
            },
        });

        newSocket.connect();
        setSocket(newSocket);

        fetch('http://localhost:3000/api/users/', {
            headers: {
                'x-token': localStorage.getItem('token'),
            }
        }).then( res => res.json())
        .then(data => setUsers(data.usuarios) || [])

        newSocket.on('usuario-desconectado', (uid) => {
            setUsers(prev => prev.map(u => u.uid === uid ? {
                ...u, online: dalse
            } : u))
        });

        return () => {
            newSocket.off('usuario-conectado');
            newSocket.off('usuario-desconectado');
            newSocket.disconnect()
        }

    }, [])
    return (
        <div className='w-1/4 bg-gray-200 p-4 h-screen overflow-y-auto'>
            <h2>Usuarios</h2>

            {users !== undefined && users.map((user, index) => (
                <div key={index} 
                className='p-2 mb-2 bg-white rounded-2xl cursor-pointer hover:bg-gray-500 flex items-center gap-2'>
                    <div className={`w-2 h-2 rounded-full ${user.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>{user.name}</span>
                </div>
            ))}
        </div>
    )
}

export default UserList