import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from "react-router-dom";
import SidebarDefault from '../../components/sidebar/SidebarDefault';
import SidebarImageGenerations from '../../components/sidebar/SidebarImageGenerations';
import './style.scss'

const UserLayout = () => {
    const [isAiGenerations, setIsAiGenerations] = useState(false);

    const location = useLocation();
    useEffect(() => {
        setIsAiGenerations(location.pathname === '/ai-generations');
    }, [location]);

    return (
        <div className='user-layout'>
            <div className='user-layout__left'>
                {isAiGenerations ? <SidebarImageGenerations /> : <SidebarDefault />}
            </div>
            <div className='user-layout__right'>
                <Outlet />
            </div>
        </div>
    )
}

export default UserLayout