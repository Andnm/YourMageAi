import React, { useState, useEffect } from 'react'
import './style.scss'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getFirstLetter } from '../../../utils';
import { logoutUser, getUserFromLocalStorage } from '../../../store/userSlice'
import { DEFAULT_SIDEBAR } from '../../../constants/navLink';
import BrandContainer from '../BrandContainer';
import LevelSection from '../LevelSection';

const SidebarDefault = () => {

  const dataUser = useSelector((state) => state.user);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setUser(getUserFromLocalStorage());
  }, [dataUser]);

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <div className='layout-sidebar'>
      <div></div>
      <div></div>
      <div className='sidebar-container'>

        <BrandContainer/>

        <LevelSection/>

        {DEFAULT_SIDEBAR.map((section, index) => (
          <div className='section' key={index}>
            <p className='chakra-text'>{section?.title}</p>

            {section.items.map((item, itemIndex) => (
              <NavLink key={itemIndex}
                className='chakra-link'
                to={item?.path}
              >
                <div role="group" className={window.location.pathname === item?.path ? 'active' : ''}>
                  {
                    window.location.pathname === item?.path
                      ?
                      (
                        <svg viewBox={item?.viewBox}
                          focusable="false"
                          className="chakra-icon"
                        >
                          {item?.pathIcon}
                          <defs>
                            <linearGradient id={item?.gradient?.id} x1="-9.46" y1="-3.51187e-06" x2="24.5048" y2="-6.55974" gradientUnits="userSpaceOnUse">
                              {item?.gradient?.stops?.map((stop, stopIndex) => (
                                <stop key={stopIndex} offset={stop?.offset} stopColor={stop?.stopColor} />
                              ))}
                            </linearGradient>
                          </defs>
                        </svg>
                      )
                      :
                      (item?.svg)
                  }
                  {item?.display}
                </div>
              </NavLink>
            ))}

          </div>
        ))}

        <div className='break-line'></div>

        <div className='info-auth'>
          <NavLink className="chakra-link" to='/'>
            <div role="group" className="chakra-link-item" onClick={handleLogout}>
              <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" focusable="false" className="chakra-icon css-1t03brf" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </div>
          </NavLink>

          <NavLink className="chakra-link " to="/settings">
            <div role="group" className="chakra-link-item">
              <div className="chakra-stack">
                <span className="chakra-avatar ">
                  <div role="img" aria-label={user?.userName} className="chakra-avatar__initials css-uo84k3">
                    {getFirstLetter(user?.userName)}
                  </div>
                </span>
                <div className="">
                  <p className="chakra-text fw-bold text-light">
                    {user?.userName}
                  </p>
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default SidebarDefault