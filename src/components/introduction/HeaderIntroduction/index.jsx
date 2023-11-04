import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './style.scss'
import Auth from '../../../pages/Auth'

import line_introduction from '../../../assets/svg/line-introduction.svg'
import img_background from '../../../assets/images/leosplash-1.png'
import logo_brand from '../../../assets/images/logo_white_background.png'
import { IMG_AUTH_LIST } from '../../../constants/image'

const HeaderIntroduction = () => {

    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [randomImage, setRandomImage] = useState();

    const handleClickModal = () => {
        if (openLoginModal === false) {
            getRandomImage()
        }
        setOpenLoginModal(!openLoginModal)
    }

    const navLinkItem = [
        {
            path: '/faq',
            display: 'FAQ',
        },
        {
            path: '/contact-us',
            display: 'Contact us',
        },
    ]

    const servicesList = [
        {
            title: 'Cultivate Originality',
            content: 'Your imagination, our technology. Generate distinctive art with pre-trained AI models or train your own.'
        },
        {
            title: 'Simplified Mastery',
            content: 'Easy to grasp, rewarding to perfect. Be proficient in producing exquisite content quickly and efficiently.'
        },
        {
            title: 'Turbocharge Innovation',
            content: 'Fast-forward your ideation process. Conceptualise, iterate, and experiment at light speed.'
        },
    ]

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * IMG_AUTH_LIST.length);
        setRandomImage(IMG_AUTH_LIST[randomIndex]);
    };

    return (
        <>
            <header className='header-introduction'>
                <div className='container'>
                    <NavLink href='/#' className="section-left">
                        <div className='logo'>
                            <img src={logo_brand} alt="Logo Brand" />
                        </div>
                        <p>YourMage<span>.Ai</span></p>
                    </NavLink>

                    <div className='section-right'>
                        <div className="menu">
                            {navLinkItem.map((item, index) => (
                                <NavLink className="menu_items" to={item.path} key={index}>
                                    {item.display}
                                </NavLink>
                            ))}
                        </div>

                        <div className='btn-login' onClick={handleClickModal}>Launch App</div>

                        {openLoginModal && <Auth open={openLoginModal} onClose={handleClickModal} randomImage={randomImage} />}
                    </div>
                </div>
            </header>

            <section className='welcome-section'>
                <div className='color-background-blur'></div>
                <div className='img-background-div'>
                    <img width={'1280px'} height={'1280px'} src={img_background} className='img-background' alt="Image Background" />
                </div>
                <div className='container'>
                    <img src={line_introduction} className='svg' alt="SVG Icon" />

                    <div className="container-left">
                        <h1 className="h1-home">Unleash your
                            <span className="first-span-text"> Creativity </span>
                            with the power of
                            <span className="second-span-text"> YourMage Ai</span>
                        </h1>
                        <h2>Create production-quality visual assets for your  projects with  unprecedented quality, speed, and style-consistency.</h2>

                        <div className='create-account-div'>
                            <button className='create-account-btn'>
                                <NavLink onClick={handleClickModal}>Create an account</NavLink>
                            </button>
                            <div className='credit-card-info'>
                                No credit card needed
                            </div>
                        </div>
                    </div>
                </div>

                <div className='services'>
                    <div className='content'>
                        {servicesList.map((item, index) => (
                            <div className="content-items" key={index}>
                                <h3>{item.title}</h3>
                                <p>{item.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeaderIntroduction