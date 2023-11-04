import React, { useEffect, useState } from 'react'
import './style.scss'
import SpinnerLoading from '../../shared/SpinnerLoading'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyOtp, setError, removeOtpUserToLocalStorage, loginUser } from '../../../store/userSlice';

const getOtpInfoFromLocalStorage = () => {
    const otpInfo = JSON.parse(localStorage.getItem("otpInfo")) || null;
    return otpInfo;
};

const OtpForm = (props) => {

    const { email, password } = props

    const { loading, error, user } = useSelector((state) => state.user);
    const [otp, setOtp] = useState();
    const [otpExpired, setOtpExpired] = useState(user?.data?.otpExpired);
    const [otpStored, setOtpStored] = useState(user?.data?.otpStored);
    const [disabledSubmit, setDisabledSubmit] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOtpCodeChange = (e) => {
        const { value } = e.target;
        setOtp(value);

        if (value.trim() !== '') {
            setDisabledSubmit(true)
        } else {
            setDisabledSubmit(false);
        }
    }

    const convertToNumber = (inputString) => {
        const number = parseFloat(inputString);

        if (!isNaN(number)) {
            return number;
        }
    }

    const hideEmail = (email) => {
        const atIndex = email.indexOf('@');

        if (atIndex !== -1) {
            const prefix = email.slice(0, atIndex);
            const domain = email.slice(atIndex + 1);

            const hiddenPrefix = prefix.slice(0, 3) + '***';

            const hiddenDomain = domain[0] + '***';

            const hiddenEmail = `${hiddenPrefix}@${hiddenDomain}`;

            return hiddenEmail;
        } else {
            return email;
        }
    }

    const handleOtp = (e) => {
        e.preventDefault();
        dispatch(setError(null));

        const userCredentials = {
            otp: convertToNumber(otp),
            otpExpired,
            otpStored,
            email
        };

        dispatch(verifyOtp(userCredentials))
            .unwrap()
            .then((result) => {
                if (result.status === 200 || result.status === 201) {
                    dispatch(loginUser({ email, password })).then((result) => {
                        removeOtpUserToLocalStorage()
                        navigate('/home');
                    });
                }
            });
    };

    useEffect(() => {
        const otpInfo = getOtpInfoFromLocalStorage();
        setOtpExpired(otpInfo?.data?.otpExpired)
        setOtpStored(otpInfo?.data?.otpStored)
    }, [user]);

    return (
        <form onSubmit={handleOtp}>
            <div className={`notification ${(error) ? 'error' : 'success'}`}>
                <p className="chakra-text">
                    {error || `We have sent a code by email to ${hideEmail(email)}. Enter it below to confirm your account`}
                </p>
            </div>

            <div className="content">
                <div role="group" className="chakra-form-control mb-1">
                    <label id="otp-label" htmlFor="otp" className="chakra-form__label">Verification Code</label>
                    <input
                        type="text"
                        name="otp"
                        placeholder=""
                        onChange={handleOtpCodeChange}
                        id="otp"
                        className="chakra-input"
                    />
                </div>

                <button
                    type="submit"
                    className={`${disabledSubmit ? 'chakra-button-click' : 'button-no-action'} ${loading ? 'button-loading' : ''}`}
                    disabled={!disabledSubmit}
                >
                    {loading ? <SpinnerLoading /> : 'Confirm Account'}
                </button>
            </div>
        </form>
    )
}

export default OtpForm