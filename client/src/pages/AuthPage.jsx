import React from 'react'
import AuthLeft from '../components/Auth/AuthLeft'
import AuthRight from '../components/Auth/AuthRight'


const AuthPage = () => {
  return (
    <div className='flex justify-between relative w-full bg-gray-900'>
      <AuthLeft />
      <AuthRight />
    </div>
  )
}

export default AuthPage