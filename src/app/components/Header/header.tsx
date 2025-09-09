import React from 'react'
import Navbar from './Navbar/navbar';

const Header = () => {
  return (
    <header className='p-3 flex bg-(--primaryColor) text-(--background)'>
        <h1 className='text-(--background)!'>Student Run</h1>
        <Navbar />
    </header>
  )
}

export default Header