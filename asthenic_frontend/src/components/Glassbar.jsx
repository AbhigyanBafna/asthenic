import React from 'react'
import logo from '../assets/logo.png'

const Glassbar = () => {
  return (
    <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200 firefox:bg-opacity-90">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <span className="text-gray-900 font-semibold"><img src={logo} width="250rem"/></span>
            <div className="flex space-x-4 text-gray-900">
              <a href="#">Dashboard</a>
              <a href="#">About</a>
              <a href="#">Projects</a>
              <a href="#">Contact</a>
            </div>
        </div>
      </div>
    </nav>
  )
}

export default Glassbar
