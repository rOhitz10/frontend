import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { IoHomeOutline, IoTicketOutline } from "react-icons/io5";
import { SlLogin } from "react-icons/sl";
import { ImTree } from "react-icons/im";
import { AiOutlineTeam } from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";
import { FaKeycdn } from "react-icons/fa6";
import { GiNewspaper } from "react-icons/gi";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useAuth } from '../AuthContext';
// import jwt_decode from 'jwt-decode';
import {jwtDecode} from 'jwt-decode';
 

const Card = ({ icon, title, onClick }) => {
  return (
    <div
      className="flex items-center justify-start px-4 py-2 w-full bg-white rounded-md shadow-sm transition-all duration-300"
      onClick={onClick} // Attach onClick here
    >
      <div className="text-blue-500">{icon}</div>
      <h3 className="ml-4 text-sm font-light text-gray-700">{title}</h3>
    </div>
  );
};

function Sidebar() {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const { logout, isAdmin } = useAuth();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("User"); // Fallback for userName
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
     
      try {
        const decoded = jwtDecode(token);
        console.log(decoded.name)
        setUserId(decoded.epin);
        setUserName(decoded.name || "User"); // Use decoded userName or fallback
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);
  
  
 
  const handleLogout = () => {
    logout();
  };


  return (
    <div className="flex flex-col items-start p-4 h-screen bg-white  shadow-md">
      <h1 className="text-xl font-bold mb-6">Help'n'Groww</h1>

      <div className="bg-slate-200 rounded-xl p-4 m-4">
        <div className="flex items-center w-full cursor-pointer">
          <img
            src="https://cdnb.artstation.com/p/assets/images/images/026/142/657/large/sleepy-jhin-roronoa-zoro-portrait.jpg?1587999560"
            alt="Profile"
            className="rounded-full w-10 h-10"
          />
          <div className="ml-3">
            <h3 className="text-sm font-semibold">{userName}</h3>
            <p className="text-xs text-gray-600">{userId}</p>
          </div>
          <button
            className="mx-4 text-sm focus:outline-none"
            onClick={() => setProfileOpen(!isProfileOpen)}
          >
            {isProfileOpen ? '▲' : '▼'}
          </button>
        </div>

        {isProfileOpen && (
          <div className="ml-4 my-2 space-y-2 text-sm text-gray-700">
            <Link to="/dashboard/profile" >
            <div  className="px-2 border-2 rounded-lg hover:bg-slate-500 hover:text-blue-600">My Profile</div>
            </Link>
            <Link to="/dashboard/financial-info">
            <div  className="px-2 border-2 rounded-lg hover:bg-slate-500 hover:text-blue-600">Financial </div>
            </Link>
            {/* <div className="px-2 border-2 rounded-lg hover:bg-slate-500 hover:text-blue-600">Password</div> */}
           
          </div>
        )}
      </div>

      <div className="w-full space-y-4">
        { isAdmin &&
          <Link to={`/admin/dashboard`}>
          <Card icon={<IoHomeOutline className="text-lg" />} title="Admin Panel" />
        </Link>
        }
        <h2 className="text-xs font-semibold text-gray-500 px-4">MAIN</h2>
        <Link to={`/dashboard`}>
          <Card icon={<IoHomeOutline className="text-lg" />} title="Dashboard" />
        </Link>
        
        {/* Updated Link for SignUp with onClick */}
        <Link to="/signup">
          <Card icon={<SlLogin className="text-lg" />} title="SignUp" onClick={handleLogout} />
        </Link>

        <h2 className="text-xs font-semibold text-gray-500 px-4 mt-4">NETWORK</h2>
        <Link to={`/dashboard/LevelTree`}>
          <Card icon={<ImTree className="text-lg" />} title="Level Tree" />
        </Link>
        <Link to={`/dashboard/myteam`}>
          <Card icon={<AiOutlineTeam className="text-lg" />} title="My Team" />
        </Link>

        <h2 className="text-xs font-semibold text-gray-500 px-4 mt-4">EPIN</h2>
        <Link to={`/dashboard/myepins`}>
          <Card icon={<BsShieldLock className="text-lg" />} title="My Epins" />
        </Link>
        <Link to={`/dashboard/Levelupdate`}>
          <Card icon={<FaKeycdn className="text-lg" />} title="Level Update" />
        </Link>

        <h2 className="text-xs font-semibold text-gray-500 px-4 mt-4">SUPPORT</h2>
        <Link to="#">
          <Card icon={<IoTicketOutline className="text-lg" />} title="Tickets" />
        </Link>

        <h2 className="text-xs font-semibold text-gray-500 px-4 mt-4">UTILITY</h2>
        <Link to="#">
          <Card icon={<GiNewspaper className="text-lg" />} title="News" />
        </Link>
      </div>

      {/* Sign Out Button */}
      <button
        className="flex items-center mt-auto text-gray-700 hover:text-blue-600"
        onClick={handleLogout} // Attach handleLogout here
      >
        <LiaSignOutAltSolid className="w-6 h-6 mr-2" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}

export default Sidebar;
