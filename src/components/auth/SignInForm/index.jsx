import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setError } from '../../../store/userSlice';
import { validateEmail } from '../../../utils';

import SpinnerLoading from '../../shared/SpinnerLoading';

const SignInForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const { loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage('');
    };

    const handleInputFocus = () => {
        setErrorMessage('')
    }

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(setError(null));

        const { email, password } = formData;

        if (!email || !password || !validateEmail(email)) {
            setErrorMessage('Invalid username or password');
            return;
        }

        dispatch(loginUser({ email, password })).then((result) => {
            if (result && result.payload) {
                setFormData({ email: '', password: '' });
                if(result.payload.role === "Admin") {
                    navigate('/admin-dashboard')
                }else {
                    navigate('/home');
                }
            }
        });
    };

    return (
        <div className="form-login">
            <form onSubmit={handleLogin}>
                <div className={`notification ${(error || errorMessage) ? 'error' : 'success'}`}>
                    <p className="chakra-text">
                        {errorMessage || error || 'Sign in to your account'}
                    </p>
                </div>

                <div className="content">
                    <div role="group" className="chakra-form-control">
                        <label id="email-label" htmlFor="email" className="chakra-form__label">Email</label>
                        <input
                            value={formData.email}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            type="text"
                            name="email"
                            placeholder="name@host.com"
                            id="email" className="chakra-input"
                        />
                    </div>

                    <div role="group" className="chakra-form-control">
                        <label id="password-label" htmlFor="password" className="chakra-form__label">Password</label>
                        <input
                            value={formData.password}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            type="password"
                            name="password"
                            placeholder="Password"
                            id="password" className="chakra-input"
                        />
                    </div>

                    <p className="chakra-text">Forgot your password?</p>

                    <button
                        type="submit"
                        className={`${loading ? 'button-loading' : 'chakra-button-click'}`}
                    >
                        {loading ? <SpinnerLoading /> : 'Sign in'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
