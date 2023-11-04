import React, { useEffect, useState } from 'react'
import './style.scss'
import { INTERESTS } from '../../../constants/interests';
import { getUserFromLocalStorage, changeUserName, changeInterests, updateUserFromLocalStorage } from '../../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerLoading from '../../shared/SpinnerLoading';

const Profile = () => {

  const [userInfo, setUserInfo] = useState('');
  const [userName, setUserName] = useState('');
  const [isOlder18, setIsOlder18] = useState(false);
  const [originalInterests, setOriginalInterests] = useState([]);

  // đánh dấu thay đổi
  //new interest state
  const [interestStates, setInterestStates] = useState([]);

  const [isInterestStateChanged, setIsInterestStateChanged] = useState(false);
  const [loadingInterestChange, setLoadingInterestChange] = useState(false)

  // thông báo error
  const [userNameError, setUserNameError] = useState('')

  const { loading, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleValueChangeUserName = (e) => {
    const { value } = e.target;
    setUserName(value);
    setUserNameError('');
  }

  const handleBlurUserName = (e) => {
    const { value } = e.target;

    if (value.length >= 4) {
      dispatch(changeUserName({ email: userInfo?.email, username: value }))
        .unwrap()
        .then((result) => {
          if (result?.status === 200) {
            updateUserFromLocalStorage({ userName: value })
            setUserName(value);
          }
        })
      setUserNameError('');
    } else {
      setUserNameError('Username must be at least 4 characters long.');
    }
  }

  const handleInterestClick = (id) => {
    if (interestStates.includes(id)) {
      setInterestStates(interestStates.filter(item => item !== id));
    } else {
      setInterestStates([...interestStates, id]);
    }
  }

  const handleChangeInterest = () => {
    setLoadingInterestChange(true)
    dispatch(changeInterests({ email: userInfo?.email, newInterests: interestStates }))
      .unwrap()
      .then((result) => {
        if (result?.status === 200) {
          setOriginalInterests(interestStates);
        }
      })

    setLoadingInterestChange(false)
  }

  const handleChangeSwitch = () => {
    setIsOlder18(!isOlder18)
  }

  useEffect(() => {
    setUserInfo(getUserFromLocalStorage());
  }, []);

  //Cập nhập giá trị ban đầu
  useEffect(() => {
    const updateStatesFromUserInfo = () => {
      if (userInfo) {
        if (userInfo.interests) {
          setInterestStates(userInfo.interests);
          setOriginalInterests(userInfo.interests);
        }
        if (userInfo.isOlder18 === 'true') {
          setIsOlder18(true);
        }
        if (userInfo.userName) {
          setUserName(userInfo.userName);
        }
      }
    }

    updateStatesFromUserInfo();
  }, [userInfo]);

  useEffect(() => {
    const isChanged = JSON.stringify(interestStates) !== JSON.stringify(originalInterests);
    setIsInterestStateChanged(isChanged);
  }, [interestStates, originalInterests]);

  return (
    <div className='profile-info'>
      <div className="chakra-stack">
        <div className="input-section">
          <p className="chakra-text">Your email</p>
          <p className="chakra-text note">This cannot be changed.</p>
          <div className="chakra-input__group" >
            <div className="chakra-input email disabled d-flex align-items-center">{userInfo?.email}</div>
          </div>
        </div>

        <div className="input-section">
          <p className="chakra-text">
            Your username
          </p>
          <p className="chakra-text note">Automatically saves as you change it to a valid username.</p>
          <div className="chakra-input__group d-flex justify-content-center align-items-center relative">
            <input maxLength="25" type="text" placeholder="myawesomeusername" className="chakra-input"
              value={userName}
              onChange={handleValueChangeUserName}
              onBlur={handleBlurUserName}
            />
          </div>

          {userNameError && <p className="text-warning note">{userNameError}</p>}
          {loading && <p className="text-primary note">Handling...</p>}
        </div>
      </div>

      <div className="interests-section">
        <p className="chakra-text">
          What are your interests?</p>
        <p className="chakra-text text-warning note">You must select at least one.</p>

        <div className="interest-list">
          {INTERESTS.map((item, index) => (
            <button type="button" key={index} id={item.id}
              className={`chakra-button ${interestStates.includes(item.id) ? 'active' : ''}`}
              onClick={() => handleInterestClick(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="older18 mt-3">
        <div className="chakra-stack d-flex align-items-center gap-2">

          {/* button switch */}
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch"
              checked={isOlder18}

              onChange={handleChangeSwitch}
            />
          </div>

          <div className="">
            <p className="chakra-text">I confirm that I am over 18 and want to show NSFW content by default</p>
            <p className="chakra-text note">Automatically saves on toggle.</p>
          </div>

          {/* <div className=''>
            <SpinnerLoading />
          </div> */}
        </div>
      </div>

      <div className="change-section">

        {isInterestStateChanged
          ?
          <div className="new-change">
            <p className="chakra-text">New changes detected. Click to save.</p>
          </div>
          :
          <></>
        }

        <div role="group" className="chakra-button__group">
          <button type="button" className={`${!isInterestStateChanged ? 'disable-button-change' : 'chakra-button'}`}
            disabled={!isInterestStateChanged}
            onClick={handleChangeInterest}
          >
            <svg viewBox="0 0 20 20" focusable="false" className='chakra-icon'>
              <path d="M19.03 6.86401L15.697 10.197C15.551 10.343 15.359 10.417 15.167 10.417C14.975 10.417 14.783 10.344 14.637 10.197L12.97 8.53003C12.677 8.23803 12.677 7.76199 12.97 7.46899C13.263 7.17599 13.738 7.17599 14.031 7.46899L15.168 8.60498L17.9709 5.802C18.2639 5.509 18.739 5.509 19.032 5.802C19.325 6.095 19.323 6.57101 19.03 6.86401ZM7.50903 8.5C9.71503 8.5 11.509 6.706 11.509 4.5C11.509 2.294 9.71503 0.5 7.50903 0.5C5.30303 0.5 3.50903 2.294 3.50903 4.5C3.50903 6.706 5.30303 8.5 7.50903 8.5ZM9.5 10.5H5.5C1.44 10.5 0 13.473 0 16.019V19C0 19.276 0.224 19.5 0.5 19.5H14.5C14.776 19.5 15 19.276 15 19V16.019C15 13.473 13.56 10.5 9.5 10.5Z" fill="currentColor">
              </path>
            </svg>
            {loadingInterestChange ? <SpinnerLoading /> : 'Save Changes'}
          </button>
        </div>
      </div>

    </div>
  )
}

export default Profile