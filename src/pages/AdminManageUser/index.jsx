import React, { useEffect, useState } from 'react'
import './style.scss'
import AdminLoading from '../../components/shared/AdminLoading'

import { getAllUserByAdmin, getTotalUsers } from '../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../components/shared/Pagination';

const AdminManageUser = () => {
    const dispatch = useDispatch();

    const [dataUser, setDataUser] = useState('');
    const [totalUser, setTotalUser] = useState(0)
    const [loadingData, setLoadingData] = useState(true)
    const [loadingRow, setLoadingRow] = useState(false);

    const [selectedLevel, setSelectedLevel] = useState("All");

    useEffect(() => {
        dispatch(getTotalUsers(selectedLevel))
            .unwrap()
            .then((result) => {
                if (result?.status === 200) {
                    setTotalUser(result?.data)
                }
            })
    }, [selectedLevel]);

    //Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    //row
    const UserRow = ({ user, index, loading }) => {
        return (
            !loading ? (
                <tr key={index}>
                    <td>{user?.no}</td>
                    <td>{user?.email}</td>
                    <td>{user?.phoneNumber}</td>
                    <td>{user?.isOlder18 ? 'Older 18' : 'Younger 18'}</td>
                    <td>{user?.level}</td>
                    <td className={`fw-bold text-success`}>
                        Active
                    </td>
                </tr>
            ) : (
                <tr>
                    <td colSpan={6}>
                        <div className="skeleton skeleton-text"></div>
                    </td>
                </tr>
            )
        );
    };

    useEffect(() => {
        setLoadingRow(true)
        dispatch(getAllUserByAdmin({ pageIndex: currentPage, level: selectedLevel }))
            .unwrap()
            .then((result) => {
                console.log(result)
                if (result?.status === 200) {
                    setDataUser(result?.data);
                    setLoadingRow(false)
                    setLoadingData(false)
                }
            });
    }, [currentPage, selectedLevel]);

    const handleLevelChange = (selectedValue) => {
        setCurrentPage(1)
        setSelectedLevel(selectedValue);
    };

    const clearFilter = () => {
        setSelectedLevel('All');
    };

    return (
        loadingData
            ? <AdminLoading />
            :
            <div className="admin-transaction d-flex flex-column justify-content-between" style={{ height: '100%' }}>
                <div className='d-flex justify-content-between flex-column' style={{ height: '100%' }}>
                    <div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className="search-container">
                                <input placeholder="Search.." id="input" className="input" name="text" type="text" />
                            </div>

                            <div>
                                <div className="filter-container d-flex justify-content-between align-items-center">
                                    <label className="me-2" htmlFor="levelFilter">Filter by Level:</label>
                                    <select
                                        id="levelFilter"
                                        name="levelFilter"
                                        value={selectedLevel}
                                        onChange={(e) => handleLevelChange(e.target.value)}
                                        className="form-select me-2"
                                    >
                                        <option value="All">All</option>
                                        <option value="Free">Free</option>
                                        <option value="Apprentice">Apprentice</option>
                                        <option value="Artisan">Artisan</option>
                                        <option value="Maestro">Maestro</option>
                                    </select>
                                    <button
                                        onClick={clearFilter}
                                        className="btn btn-danger"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3">
                            <table className="table border table-striped">
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col">No</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Age</th>
                                        <th scope="col">Level</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataUser && dataUser.length > 0 ? (
                                        dataUser.map((user, index) => (
                                            <UserRow
                                                user={user}
                                                index={index}
                                                loading={loadingRow}
                                            />
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="text-center">
                                                {loadingData ? (
                                                    <div className="skeleton skeleton-text"></div>
                                                ) : (
                                                    <p>No data matching</p>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalUser}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
    )
}

export default AdminManageUser