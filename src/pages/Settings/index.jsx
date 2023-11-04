import React, { useState } from 'react'
import './style.scss'

import Profile from '../../components/settings/Profile'
import AccountManagement from '../../components/settings/AccountManagement'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className='profile-page'>
      <h2 className="chakra-heading">Settings</h2>

      <div className="main">
        <div className="chakra-tabs__tablist">
          <button
            type="button"
            className={`chakra-tabs__tab ${activeTab === 'Profile' ? 'active' : ''}`}
            onClick={() => handleTabClick('Profile')}
          >
            Profile
          </button>

          <button
            type="button"
            className={`chakra-tabs__tab ${activeTab === 'UserAPI' ? 'active' : ''}`}
            onClick={() => handleTabClick('UserAPI')}
            disabled=""
          >
            User API
            <span className="note">BETA</span>
          </button>

          <button
            type="button"
            className={`chakra-tabs__tab ${activeTab === 'AccountManagement' ? 'active' : ''}`}
            onClick={() => handleTabClick('AccountManagement')}
          >
            Account Management
          </button>
        </div>

        {activeTab === 'Profile' && <Profile />}
        {activeTab === 'AccountManagement' && <AccountManagement />}

      </div>
    </div>
  )
}

export default Settings