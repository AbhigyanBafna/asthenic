import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import { categories } from '../utils/data';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-grey-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-black border-r-2 transition-all duration-200 ease-in-out capitalize'

const Sidebar = ({user, closeToggle}) => {
  const handleCloseSidebar = () => {
    if(closeToggle) closeToggle(false);
  }

  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 h-scrollbar'>
      <div className='flex flex-col'>
        <Link
          to="/"
          className='flex my-3 items-center relative right-4'
          onClick={handleCloseSidebar}>
            <img src={logo} alt="logo" width="220px" />
        </Link>
        <div className = 'flex flex-col gap-5'>
          <h3 className='mt-2 px-5 font-base text-lg 2xl:text-xl'>
            Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
              onClick={handleCloseSidebar}
              key={category.name}>
                <img src={category.image} alt='category' className="w-10 h-10 rounded-full shadow-sm" />
                {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-2xl mx-3'
          onClick={ handleCloseSidebar }>
            <img src={user.image} alt='User' className='w-12 h-12 rounded-full'/>
            <p>{user.userName}</p>
        </Link>
      )}
    </div>
  )
}

export default Sidebar