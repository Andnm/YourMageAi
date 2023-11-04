import React, { useEffect, useState } from 'react'
import { Modal, NavLink } from 'react-bootstrap'
import './style.scss'
import logo from '../../assets/images/logo_white_background.png'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { AiOutlineClose } from 'react-icons/ai'
import google_icon from '../../assets/svg/google.svg'
import apple_icon from '../../assets/svg/apple.svg'
import fb_icon from '../../assets/svg/facebook.svg'
import SignInForm from '../../components/auth/SignInForm'
import SignUpForm from '../../components/auth/SignUpForm'
import { loginGoogle, setError } from '../../store/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import AdminLoading from '../../components/shared/AdminLoading'
import { useNavigate } from 'react-router-dom';

const Auth = (props) => {
    const { open, onClose, randomImage } = props

    const { loading, error, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [isSignIn, setIsSignIn] = useState(true);

    const handleToggleChangeForm = () => {
        dispatch(setError(null))
        setIsSignIn(!isSignIn);
    };

    const handleLoginGoogle = (accessToken) => {
        dispatch(loginGoogle(accessToken))
            .unwrap()
            .then((result) => {
                onClose()
                navigate('/home');
            });
    }

    useEffect(() => {
        console.log('asd', process.env.REACT_APP_GOOGLE_CLIENT_ID)
    }, []);

    return (
        <Modal dialogClassName="auth-modal" show={open} onHide={onClose} centered >

            <div className='btn-close-modal' onClick={onClose}>
                <AiOutlineClose />
            </div>

            <div className='authentication-container'>
                <div className='authentication-container__left'>
                    <div className="logo">
                        <img src={logo} alt="Logo Img" />
                    </div>

                    <div className="main">
                        <div className="main__top">
                            <p>Sign up or Sign In with</p>
                            <div className='button-login-gg'>
                                <GoogleOAuthProvider
                                    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                                >
                                    <GoogleLogin
                                        onSuccess={
                                            credentialResponse => handleLoginGoogle(credentialResponse.credential)
                                        }
                                    />
                                </GoogleOAuthProvider>
                            </div>

                            <button type="button" className="chakra-button">
                                <img src={apple_icon} alt="apple icon" />
                                Apple
                            </button>

                            <button type="button" className="chakra-button">
                                <img src={fb_icon} alt="fb icon" />
                                Facebook
                            </button>

                            <div className='break-line'>
                                <hr></hr>
                                <div className='text'>
                                    <p>Or</p>
                                </div>
                            </div>
                        </div>

                        <div className="main__bottom">

                            {isSignIn ? <SignInForm /> : <SignUpForm />}

                            <div className="signup-container">
                                <p className="chakra-text">
                                    {isSignIn ? "Need an account?" : "Already have an account?"}
                                    <span className="chakra-link" onClick={handleToggleChangeForm}>
                                        {isSignIn ? "Sign up" : "Sign in"}
                                    </span>
                                </p>
                            </div>

                            <div className='get-app'>
                                <p className="chakra-text css-10rvbm3">Available now on iOS</p>
                                <img src="https://leonardo-cdn.b-cdn.net/wp-content/uploads/2023/08/Frame-427318315.svg" className="css-filter size-full" alt="" decoding="async" loading="lazy" />
                            </div>
                        </div>
                    </div>

                    <div className="footer">
                        <div className="items">
                            <p className="chakra-text">
                                <NavLink target="_blank">Privacy Policy</NavLink>
                            </p>
                        </div>
                        <div className="items">
                            <p className="chakra-text">
                                <NavLink target="_blank">Terms of Service</NavLink>
                            </p>
                        </div>

                    </div>
                </div>

                <div className='authentication-container__right' style={{ backgroundImage: `url(${randomImage})` }}>
                    <div className='overlay'>‘Neo-Renaissance Man’ by
                        <span className="chakra-text"> @YourMage</span>
                    </div>
                </div>
            </div>

        </Modal >
    )
}

export default Auth