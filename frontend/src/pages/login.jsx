import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContextProvider'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [ inputs, setInputs ] = useState({
        username: '',
        password: ''
    })
    const [ loading, setLoading ] = useState(false)
    const {setOwner}= useContext(AuthContext)
    const nav = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: inputs.username, password: inputs.password}),
            credentials: 'include'
          }) 
          const data = await res.json()
          if (!res.ok) {
            // Log the response status and data for debugging
            console.error('Error:', res.status, data);
            console.error(data.message || 'Signup failed');
            return;
          }
          if(data.error) {
             console.error(data.error)
            setLoading(false)
            return  
          }
          
          localStorage.setItem('authUser', JSON.stringify(data))
          setOwner(data)
          setLoading(false)
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false) 
        }
    }
  return (
    <div className='flex flex-col gap-2 w-[400px] mx-auto p-4'>
        <h1 className="text-3xl font-bold text-center text-slate-900">Login Page</h1>
        <form className='flex flex-col gap-2 mx-auto mt-10 w-full' onSubmit={handleSubmit}>
          <label className='flex flex-col gap-2 w-full mx-auto'>
            <span className='text-slate-900 font-bold '>

            Username:
            </span>
            <input type="text" name="username" className='w-full mx-auto p-2 text-white' value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})}/>
          </label>
          <label className='flex flex-col gap-2 w-full mx-auto '>
            <span className='text-slate-900 font-bold '>

            Password:
            </span>
            <input name="password" className='w-full text-white mx-auto p-2' value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})}/>
          </label>
          <button className='bg-slate-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4' type='submit'>{loading? <span className='loading loading-spinner'></span> :"Login"}</button>
        </form>
    </div>
  )
}

export default Login