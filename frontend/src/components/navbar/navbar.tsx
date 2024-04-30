import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='w-full h-20 bg-white shadow-lg flex items-center justify-between gap-20 px-20'>
      <div>
        <Link to='/' className="font-bold text-2xl text-[#FC4B03]">Nekoroid</Link>
      </div>
      <div className="flex flex-1 gap-5 items-center">
        <div className="flex gap-3 items-center justify-center w-full py-2 px-4 border-2 rounded-md">
          <i className="text-[#FC4B03]"><FontAwesomeIcon icon={faMagnifyingGlass} /></i>
          <input type="text" placeholder="Search product..." className="w-full text-[13px] outline-none" />
        </div>
        <i className="text-lg text-[#FC4B03] cursor-pointer"><Link to='/cart'><FontAwesomeIcon icon={faCartShopping} /></Link></i>
        <i className="text-lg text-[#FC4B03] cursor-pointer"><Link to='/wishlist'><FontAwesomeIcon icon={faHeart} /></Link></i>
      </div>
      <div className="flex items-center justify-between gap-3">
        <Link to='/login'><button className="px-4 py-2 rounded-[5px] bg-[#FC4B03] text-white text-xs">Sign Up</button></Link>
        <Link to='/login'><button className="px-4 py-2 rounded-[5px] bg-[#FC4B03] text-white text-xs">Log In</button></Link>
      </div>
    </div>
  )
}
