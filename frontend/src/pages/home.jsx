import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContextProvider'

const Home = () => {
  const {setOwner}=useContext(AuthContext)
  const [ loading, setLoading ] = useState(false)
  const handleLogout = async() => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/auth/logout',{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()
      if(data.error) throw new Error(data.error)
      
      localStorage.removeItem('authUser')
      setOwner(null)
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='flex flex-col gap-2 w-[400px] mx-auto p-4 text-slate-900'>
        <h1 className="text-3xl font-bold text-center underline">Home Page</h1>
        <p>Welcome to the Home Page!</p>
      <p>This is a simple React app created using Vite, React Router, and Tailwind CSS.</p>
      <div className='w-full flex justify-end'>
        <button className='btn btn-accent text-white' onClick={handleLogout}>{
          loading ? <span className='loading loading-spinner'></span> : "Logout"
          }</button>
      </div>
    </div>
  )
}

export default Home