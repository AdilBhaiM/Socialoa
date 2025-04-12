import React from 'react'
import Image from '../../assets/imgs/AuthleftImage.jpg'

const AuthLeft = () => {
  return (
    <div className="flex items-center w-[50%] justify-center h-screen">
      <img src={Image} alt="" className='rounded-2xl h-[98%] w-[98%] m-1 object-fill'/>
    </div>
  )
}

export default AuthLeft