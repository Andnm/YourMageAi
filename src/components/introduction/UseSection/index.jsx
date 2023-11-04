import React from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import './style.scss'

const UseSection = () => {

    const slideImages = [
        {
            url: 'https://leonardo-cdn.b-cdn.net/wp-content/uploads/2023/07/1-63.png',
            caption: 'Inspiration'
        },
        {
            url: 'https://leonardo-cdn.b-cdn.net/wp-content/uploads/2023/07/1-64.png',
            caption: 'Character Design'
        },
        {
            url: 'https://leonardo-cdn.b-cdn.net/wp-content/uploads/2023/07/1-66.png',
            caption: 'Game Assets'
        },
        {
            url: 'https://leonardo-cdn.b-cdn.net/wp-content/uploads/2023/07/1-65.png',
            caption: 'Concept Art'
        },
        {
            url: 'https://leonardo-cdn.b-cdn.net/wp-content/uploads/2023/07/1-62.png',
            caption: 'Graphic Design'
        },
        {
            url: 'https://leonardo-cdn.b-cdn.net/wp-content/uploads/2023/07/1-68.png',
            caption: 'Fashion'
        },
        {
            url: 'https://leonardo-cdn.b-cdn.net/wp-content/uploads/2023/07/1-61.png',
            caption: 'Marketing'
        },
    ]

    return (
        <section className='use-section'>
            <div className='container'>
                <h2>Use YourMage today for</h2>

                <div className='content'>
                    <Slide duration={1500}>
                        {slideImages.map((slideImage, index) => (
                            <div key={index} className='slide-container'>
                                <div className='title'>
                                    <p>
                                        {slideImage.caption}
                                    </p>
                                </div>

                                <div className='img-container'>
                                    <div className="blur-effect" style={{ 'backgroundImage': `url(${slideImage.url})` }}>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </Slide>
                </div>
            </div>
        </section>
    )
}

export default UseSection