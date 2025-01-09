import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import { AuthContext } from './context/authContextProvider'

const App = () => {
  const { owner } = useContext(AuthContext)
  console.log(owner)
  return (
    <div className='bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
      <Routes>
        <Route path='/login' element={owner ?  <Navigate to='/' /> : <Login/>} />
        <Route path='/' element={owner ? <Home /> : <Navigate to={'/login'}/>} />
      </Routes>
      
    </div>
  )
}

export default App