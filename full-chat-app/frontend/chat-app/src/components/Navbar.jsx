import React from 'react'

const Navbar = ({ user, setToken }) => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        // desconextarse del soclet
        setToken('null')
    }

    return (
        <nav className='bg-gray-200 p-4 flex justify-between items-center'>
            <h1>Chat App</h1>

            {user &&
                <div className='flex flex-row items-center justify-center gap-5'>
                    <span>{user.name}</span>

                    <button onClick={handleLogout} className='p-2 bg-black rounded-full text-white transition-colors ease-in-out duration-300 cursor-pointer hover:text-black border border-black hover:bg-gray-100'>
                        <svg class="w-8 h-8 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>

                    </button>
                </div>
            }
        </nav>
    )
}

export default Navbar