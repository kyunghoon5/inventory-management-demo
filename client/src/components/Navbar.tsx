import { NavLink } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import VanessaLogo from '../assets/VanessaLogo.jpeg';
import LoginBar from './LoginBar';

const NavBar = () => {
  interface Link {
    label: string;
    to: string;
  }

  const Links: Link[] = [
    { label: 'Dashboard', to: '/' },
    { label: 'Vendor', to: '/vendor' },
    { label: 'Pre Order', to: '/preorder' },
    { label: 'Products', to: '/products' },
    { label: 'Tracking', to: '/tracking' },
    { label: 'Planning', to: '/planning' },
    { label: 'New Launch', to: '/newlaunch'},
    
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full relative top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7 ">
        <div className="text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
          <Link to={'/'}>
            <img src={VanessaLogo} />
          </Link>
          {/* 
          <div className="flex items-center ">
            <div className="ml-4 hidden md:block">
              <CgProfile size={20} />
            </div>
            <div className="ml-4 hidden md:block">
              <AiOutlineStar size={20} />
            </div>
            <div className="ml-4 hidden md:block">
              <AiOutlineMessage size={20} />
            </div>
            <div className="ml-4 hidden md:block">
              <IoNotificationsOutline size={20} />
            </div>
          </div> */}
        </div>
        {/* <LoginBar /> */}
      </div>

      <div
        onClick={() => setOpen(!open)}
        className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
      >
        {open ? <IoCloseSharp /> : <AiOutlineMenu />}
      </div>

      <div
        className={`md:flex items-center justify-start  py-4 md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-8 pl-9 transition-all duration-500 ease-in ${
          open ? 'top-20' : 'top-[-490px]'
        }`}
      >

        <ul className="md:flex md:items-center ">
          {Links.map((item) => (
            <li
              key={item.to}
              className="md:ml-2 md:mr-8 md:my-0 my-7 text-xl font-bold  "
            >
              <NavLink
                to={item.to}
                style={({ isActive }) => {
                  return {
                    textDecoration: isActive ? 'none' : 'none',
                    color: isActive ? '#facc15' : '#1f2937',
                  };
                }}
                className="duration-500"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        
      </div>
    </div>
  );
};

export default NavBar;
