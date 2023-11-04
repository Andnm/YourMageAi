import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserFromLocalStorage } from '../../../store/userSlice';
import './style.scss'
import { NavLink } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io(`${process.env.REACT_APP_URL}`);

const LevelSection = () => {

    const dataUser = useSelector((state) => state.user);
    const [user, setUser] = useState(null);

    const [tokenCount, setTokenCount] = useState('');

    useEffect(() => {
        setUser(getUserFromLocalStorage());
        setTokenCount(getUserFromLocalStorage().tokens)

        socket.on('updateTokens', (data) => {
            setTokenCount(data.tokens)
        })

    }, [socket]);

    return (
        <div className='level-section'>
            <div className='token-section'>
                <div className='token-content'>
                    <div className='token-quantity'>
                        <p className="chakra-text">{tokenCount}</p>
                        <div className='icon'>
                            <svg width="calc(0.9rem * 1.250)" height="calc(0.9rem * 1.250)" viewBox="0 0 32 32" fill="none"><g filter="url(#filter-1-coins-gradient-icon)">
                                <path d="M10 20.0133C10 20.9867 10.2933 21.8666 10.84 22.6266C7.26667 22.4 4 21.0933 4 18.68V17.5067C5.4 18.6 7.46667 19.3333 10 19.5733V20.0133ZM10.0533 14.5867C10.04 14.6 10.04 14.6133 10.04 14.6266C10.0134 14.76 10 14.8934 10 15.0267V17.5733C6.77333 17.2 4 15.92 4 13.6934V12.52C5.4 13.6267 7.48004 14.36 10.04 14.5867H10.0533ZM15.2533 9.70671C13.2267 10.3334 11.64 11.36 10.76 12.64C7.21334 12.4133 4 11.1067 4 8.70671V7.79997C5.74667 9.1733 8.54667 9.97331 12 9.97331C13.16 9.97331 14.2533 9.88004 15.2533 9.70671ZM20 7.79997V8.70671C20 8.82671 19.9866 8.93337 19.9733 9.04004C18.92 9.04004 17.92 9.13329 16.9867 9.29329C18.1867 8.93329 19.2 8.42663 20 7.79997ZM12 0C8 0 4 1.33332 4 3.98665C4 6.66665 8 7.97331 12 7.97331C16 7.97331 20 6.66665 20 3.98665C20 1.33332 16 0 12 0ZM20 21.0133C16.6533 21.0133 13.8 20.1334 12 18.7067V20.0133C12 22.6667 16 24 20 24C24 24 28 22.6667 28 20.0133V18.7067C26.2 20.1334 23.3467 21.0133 20 21.0133ZM20 11.04C15.5867 11.04 12 12.8267 12 15.0267C12 17.2267 15.5867 19.0133 20 19.0133C24.4133 19.0133 28 17.2267 28 15.0267C28 12.8267 24.4133 11.04 20 11.04Z" fill="url(#linear-gradient-1-coins-gradient-icon)">
                                </path></g><defs><filter id="filter-1-coins-gradient-icon" x="0" y="0" width="calc(0.9rem * 2)" height="calc(0.9rem * 2)" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="4"></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect-1-coins-gradient-icon"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect-1-coins-gradient-icon" result="shape"></feBlend></filter><linearGradient id="linear-gradient-1-coins-gradient-icon" x1="-6.32" y1="-4.6825e-06" x2="31.1782" y2="-5.92541" gradientUnits="userSpaceOnUse"><stop offset="0.0001" stopColor="#FA5560"></stop><stop offset="0.499028" stopColor="#B14BF4"></stop><stop offset="1" stopColor="#4D91FF"></stop></linearGradient></defs></svg>
                        </div>
                    </div>

                    <span className='question-mark'>
                        <svg width="calc(0.9rem * 1.0000)" height="calc(0.9rem * 1.0000)" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8Z" fill="#777777">
                            </path>
                            <path d="M7.25928 9.75V9.70313C7.26449 9.20573 7.31657 8.8099 7.41553 8.51563C7.51449 8.22135 7.65511 7.98307 7.8374 7.80078C8.01969 7.61849 8.23844 7.45052 8.49365 7.29688C8.6473 7.20313 8.78532 7.09245 8.90771 6.96484C9.03011 6.83464 9.12646 6.6849 9.19678 6.51563C9.26969 6.34635 9.30615 6.15885 9.30615 5.95312C9.30615 5.69792 9.24626 5.47656 9.12646 5.28906C9.00667 5.10156 8.84652 4.95703 8.646 4.85547C8.44548 4.75391 8.22282 4.70312 7.97803 4.70312C7.76449 4.70312 7.55876 4.7474 7.36084 4.83594C7.16292 4.92448 6.99756 5.0638 6.86475 5.25391C6.73193 5.44401 6.65511 5.69271 6.63428 6H5.6499C5.67074 5.55729 5.78532 5.17839 5.99365 4.86328C6.20459 4.54818 6.48193 4.30729 6.82568 4.14062C7.17204 3.97396 7.55615 3.89062 7.97803 3.89062C8.43636 3.89062 8.8348 3.98177 9.17334 4.16406C9.51449 4.34635 9.77751 4.59635 9.9624 4.91406C10.1499 5.23177 10.2437 5.59375 10.2437 6C10.2437 6.28646 10.1994 6.54557 10.1108 6.77734C10.0249 7.00911 9.8999 7.21615 9.73584 7.39844C9.57438 7.58073 9.37907 7.74219 9.1499 7.88281C8.92074 8.02604 8.73714 8.17708 8.59912 8.33594C8.4611 8.49219 8.36084 8.67839 8.29834 8.89453C8.23584 9.11068 8.20199 9.38021 8.19678 9.70313V9.75H7.25928ZM7.75928 12.0625C7.56657 12.0625 7.4012 11.9935 7.26318 11.8555C7.12516 11.7174 7.05615 11.5521 7.05615 11.3594C7.05615 11.1667 7.12516 11.0013 7.26318 10.8633C7.4012 10.7253 7.56657 10.6563 7.75928 10.6563C7.95199 10.6563 8.11735 10.7253 8.25537 10.8633C8.39339 11.0013 8.4624 11.1667 8.4624 11.3594C8.4624 11.487 8.42985 11.6042 8.36475 11.7109C8.30225 11.8177 8.21761 11.9036 8.11084 11.9688C8.00667 12.0312 7.88949 12.0625 7.75928 12.0625Z" fill="#777777">
                            </path>
                        </svg>
                    </span>

                    <NavLink type='button' className='chakra-button' to="/upgrade-level">
                        {user?.level === 'Free' ? 'Upgrade' : user?.level}
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default LevelSection