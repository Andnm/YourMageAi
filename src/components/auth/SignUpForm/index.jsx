import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setError } from '../../../store/userSlice';
import {
    validateEmail,
    validateContainLowerCase,
    validateContainUpperCase,
    validateContainNumber,
    validateContainCharacters,
    validateNotContainSpace,
} from '../../../utils';
import { createUser, sendOtpRegister } from '../../../store/userSlice';

import SpinnerLoading from '../../shared/SpinnerLoading';

import './style.scss';
import OtpForm from '../OtpForm';

const PasswordValidationMessage = ({ isValid, message }) => (
    <li className={`li-item ${isValid ? 'valid' : 'invalid'}`}>
        {isValid ? (
            //svg valid
            <svg viewBox="0 0 24 24" focusable="false" className="chakra-icon chakra-icon css-ieplgi" xmlns="http://www.w3.org/2000/svg" role="presentation">
                <path d="M8.99978 17.9992C8.99878 17.9992 8.99778 17.9992 8.99578 17.9992C8.72878 17.9982 8.47477 17.8913 8.28777 17.7013L4.28778 13.6393C3.89978 13.2453 3.90478 12.6123 4.29878 12.2253C4.69278 11.8383 5.32478 11.8422 5.71278 12.2362L9.00577 15.5802L18.2938 6.29325C18.6848 5.90225 19.3168 5.90225 19.7078 6.29325C20.0988 6.68325 20.0988 7.31725 19.7078 7.70725L9.70777 17.7073C9.51977 17.8943 9.26478 17.9992 8.99978 17.9992Z" fill="currentColor"></path>
            </svg>
        ) : (
            //svg invalid
            <svg viewBox="0 0 24 24" focusable="false" className="chakra-icon css-1x6bgkz" role="presentation">
                <path d="M17.657 6.34375L12.0001 12.0006M12.0001 12.0006L6.34326 17.6575M12.0001 12.0006L17.657 17.6575M12.0001 12.0006L6.34326 6.34375" strokeWidth={2} stroke="currentColor"></path>
            </svg>
        )}
        {message}
    </li>
);

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [catchPwdValidate, setCatchPwdValidate] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const [openOtpForm, setOpenOtpForm] = useState(false)

    const { loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const resetErrors = () => {
        setErrorMessage('');
    };

    const handleEmailChange = (e) => {
        const { value } = e.target;
        setEmail(value);
        resetErrors();

        setIsFormValid((value.trim() !== '') && validatePassword());
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setPassword(value);
        resetErrors();
        setIsFormValid(validateEmail(email) && validatePassword());
        if (value.trim() !== '') {
            setCatchPwdValidate(true);
        } else {
            setCatchPwdValidate(false);
        }
    };

    const validatePassword = () => {
        return (
            validateContainLowerCase(password) &&
            validateContainUpperCase(password) &&
            validateContainNumber(password) &&
            validateContainCharacters(password) &&
            validateNotContainSpace(password)
        );
    };

    const handleSignup = (e) => {
        e.preventDefault();
        resetErrors();
        dispatch(setError(null));

        if (!validateEmail(email)) {
            setErrorMessage('Email is not valid!');
            return;
        }

        const userCredentials = {
            email,
            password,
        };

        dispatch(createUser(userCredentials))
            .unwrap()
            .then((result) => {
                if (result.status === 200 || result.status === 201) {
                    dispatch(sendOtpRegister({ email }))
                        .unwrap()
                        .then((result) => {
                            if(result.status === 200 || result.status === 201) {
                                setOpenOtpForm(true)
                            }
                        })

                }
            });
    };

    return (
        <div className="form-login form-signup">

            {!openOtpForm
                ?
                <form onSubmit={handleSignup}>
                    <div className={`notification ${(error || errorMessage) ? 'error' : 'success'}`}>
                        <p className="chakra-text">
                            {errorMessage || error || 'Sign up with a new account'}
                        </p>
                    </div>

                    <div className="content">
                        <div role="group" className="chakra-form-control">
                            <label id="email-label" htmlFor="email" className="chakra-form__label">Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="name@host.com"
                                onChange={handleEmailChange}
                                id="email"
                                className="chakra-input"
                            />
                        </div>

                        <div role="group" className="chakra-form-control">
                            <label id="password-label" htmlFor="password" className="chakra-form__label">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handlePasswordChange}
                                id="password"
                                className="chakra-input"
                            />
                        </div>

                        <div className={`chakra-collapse ${catchPwdValidate ? 'active' : ''}`}>
                            <ul role="list" className="ul-list">
                                <PasswordValidationMessage isValid={validateContainLowerCase(password)} message="Password must contain a lower case letter" />
                                <PasswordValidationMessage isValid={validateContainUpperCase(password)} message="Password must contain an upper case letter" />
                                <PasswordValidationMessage isValid={validateContainNumber(password)} message="Password must contain a number" />
                                <PasswordValidationMessage isValid={validateContainCharacters(password)} message="Password must contain at least 8 characters" />
                                <PasswordValidationMessage isValid={validateNotContainSpace(password)} message="Password must not contain a leading or trailing space" />
                            </ul>
                        </div>

                        <button
                            type="submit"
                            className={`${isFormValid ? 'chakra-button-click' : 'button-no-action'} ${loading ? 'button-loading' : ''}`}
                            disabled={!isFormValid}
                        >
                            {loading ? <SpinnerLoading /> : 'Sign in'}
                        </button>
                    </div>
                </form>
                :
                <OtpForm email={email} password={password}/>
            }

        </div>
    );
};

export default SignUpForm;
