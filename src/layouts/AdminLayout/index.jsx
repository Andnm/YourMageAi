import React from 'react'
import SidebarAdmin from '../../components/admin/SidebarAdmin'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div className='d-flex'>
            <SidebarAdmin />
            <div className="main flex-grow-1 p-5 main-admin" style={{height: '100vh', overflowY: 'auto'}}>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout