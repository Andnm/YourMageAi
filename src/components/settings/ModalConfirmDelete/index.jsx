import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import './style.scss'

import { deleteUser, getUserFromLocalStorage, removeOtpUserToLocalStorage } from '../../../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import SpinnerLoading from '../../shared/SpinnerLoading'
import { useNavigate } from 'react-router-dom'

const ModalConfirmDelete = (props) => {

    const [userInfo, setUserInfo] = useState(null);

    const [valueConfirm, setValueConfirm] = useState('');

    const { loading, error, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChangeValueConfirm = (e) => {
        const { value } = e.target
        setValueConfirm(value)
    }

    const handleDeleteAccount = () => {
        dispatch(deleteUser(userInfo.email))
            .unwrap()
            .then((result) => {
                if (result.status === 200 || result.status === 201) {
                    navigate('/');
                }
            });
    }

    useEffect(() => {
        setUserInfo(getUserFromLocalStorage());
    }, [user]);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modal-delete"
        >
            <Modal.Body>
                <div className='chakra-stack'>
                    <div class="icon-warning">
                        <svg width="calc(1rem * 3.7500)" height="calc(1rem * 3.4375)" viewBox="0 0 60 55" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M23.2419 4.46812C26.2063 -0.801872 33.7939 -0.801875 36.7583 4.46812L58.393 42.9299C61.3005 48.0987 57.5653 54.4853 51.6348 54.4853H8.36535C2.43491 54.4853 -1.30028 48.0987 1.60718 42.9299L23.2419 4.46812ZM33.8768 42.8548C33.8768 44.996 32.141 46.7318 29.9998 46.7318C27.8586 46.7318 26.1228 44.996 26.1228 42.8548C26.1228 40.7136 27.8586 38.9778 29.9998 38.9778C32.141 38.9778 33.8768 40.7136 33.8768 42.8548ZM29.9998 11.839C27.8586 11.839 26.1228 13.5747 26.1228 15.7159V27.3469C26.1228 29.4881 27.8586 31.2239 29.9998 31.2239C32.141 31.2239 33.8767 29.4881 33.8767 27.3469V15.7159C33.8767 13.5747 32.141 11.839 29.9998 11.839Z" fill="#E45F35">
                        </path>
                        </svg>
                    </div>

                    <h2 class="chakra-heading">Do you really want to delete YourMage account?</h2>

                    <p class="chakra-text">If you delete it, all its contents and associated data will also be permenantly deleted and it will be impossible to recover.</p>

                    <p class="chakra-text-2">Type your username, <span class="chakra-text"></span> to confirm.</p>

                    <div class="chakra-input__group"><input type="text" class="chakra-input " value={valueConfirm} onChange={handleChangeValueConfirm} /></div>

                    <div class="button-section">
                        <button type="button" class="button-cancel" onClick={props.onHide}>Cancel</button>
                        <button type="button" class="button-delete" onClick={handleDeleteAccount}>
                            {loading ? <SpinnerLoading /> : 'Delete My Account'}
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalConfirmDelete