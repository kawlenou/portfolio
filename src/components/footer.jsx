import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='absolute bottom-0'>
      <Link to="/login-with-google" className='text-center text-[#efefef]'>db</Link>
    </div>
  )
}
