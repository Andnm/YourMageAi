import React from 'react'
import './style.scss'
import logo_brand from '../../../assets/images/logo_white_background.png'


const FooterIntroduction = () => {
    return (
        <footer className='footer-introduction'>
            <div className='content'>
                <div className='main-footer'>
                    <div className="brand items">
                        <div>
                            <img src={logo_brand} />
                            <p>YourMage<span>.Ai</span></p>
                        </div>
                    </div>

                    <div className="about items">
                        <h1 className='title'>About</h1>
                        <ul>
                            <li>FAQ</li>
                            <li>Contact us</li>
                        </ul>
                    </div>

                    <div className="social items">
                        <h1 className='title'>Stay tuned!</h1>
                        <ul>
                            <li>Discord</li>
                            <li>Facebook</li>
                            <li>Linkedin</li>
                            <li>Twitter</li>
                            <li>Youtube Community</li>
                        </ul>
                    </div>

                    <div className="get-app items">
                        <h1 className='title'>Get the App</h1>
                        <div>
                            <img src="https://leonardo-cdn.b-cdn.net/wp-content/uploads/2023/08/Frame-427318315.svg" className="css-filter size-full" alt="" decoding="async" loading="lazy" />
                        </div>
                    </div>
                </div>

                <div className="policy-footer">
                    <p>Legal Notice</p>
                    <p>Terms of Service</p>
                    <p>Cookie Policy</p>
                </div>
            </div>
        </footer>
    )
}

export default FooterIntroduction