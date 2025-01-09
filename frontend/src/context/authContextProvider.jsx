import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
  const [ owner, setOwner ] = useState(JSON.parse(localStorage.getItem('authUser')) || null)
  return (
    <AuthContext.Provider value={{ owner, setOwner }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider