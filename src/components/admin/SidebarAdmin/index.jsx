import React, { useEffect, useState } from 'react'
import logo from '../../../assets/images/logo_white_background.png'
import './style.scss'
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromLocalStorage, logoutUser } from '../../../store/userSlice';
import { LuLayoutDashboard } from 'react-icons/lu'
import { CiMoneyCheck1 } from 'react-icons/ci'
import { BiLogOut } from 'react-icons/bi'

const SidebarAdmin = () => {

  const [userInfo, setUserInfo] = useState(null);

  const { loading, error, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserInfo(getUserFromLocalStorage());
  }, [user]);

  const menuItem = [
    {
      path: "/admin-dashboard",
      name: "Dashboard",
      icon: <LuLayoutDashboard />
    },
    {
      path: "/admin-transaction",
      name: "Transaction Management",
      icon: <CiMoneyCheck1 />
    },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/')
  }

  return (
    <div className="sidebar-admin">
      <div className="sidebar-admin__top d-flex justify-content-center align-items-center">

      </div>

      <div className="sidebar-admin__middle d-flex justify-content-center flex-column">
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
          >
            {item.icon}
            <div className="link_text">{item.name}</div>
          </NavLink>
        ))}
      </div>

      <div className='sidebar-admin__bottom__btn d-flex '>

        <div className='d-flex justify-content-center align-items-center'>
          <div className="logo-div">
            <img src={logo} alt=""></img>
          </div>
        </div>

        <div className='d-flex justify-content-center align-items-center'>
          <p className="fs-6">
            {userInfo?.userName}
          </p>
        </div>

        <button className="btn logout_btn" onClick={handleLogout}>
          <BiLogOut />
        </button>
      </div>

    </div>
  )
}

export default SidebarAdmin