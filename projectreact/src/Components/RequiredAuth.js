import React from 'react'
import { useAuth } from './Auth'
import { Navigate } from 'react-router-dom'

export const Requiredauth = ({children}) => {
    const auth=useAuth()
  if (!auth.user){
  console.log(auth.user)
  return <Navigate to='/'></Navigate>
}
return children
}