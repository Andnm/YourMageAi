import React, { useState } from 'react'
import './style.scss'

const ToolkitSection = () => {
    const [activeCategory, setActiveCategory] = useState('Image Generation');

    const toolkitMenu = [
        {
            category: 'Image Generation',
        },
        {
            category: 'AI Canvas',
        },
        {
            category: '3D Texture Generation',
        },
    ]

    const toolkitItem = [
        {
            category: 'Image Generation',
            title: 'Envision The Extraordinary',
            first_content: 'Take creativity a step further with the transformative power of our Image Generation tool. It’s not just about bringing your concepts to life — redefine the impossible. From beginners to professionals, we offer a spectrum of settings that can be intuitively tailored to your needs.',
            second_content: 'Discover an unprecedented fusion of simplicity and power, designed to cater to creative minds at all levels.',
            src: 'https://leonardo-cdn.b-cdn.net/wp-content/uploads/2023/07/Generation-Tool-min.mp4'
        },
        {
            category: 'AI Canvas',
            title: 'Perfect Every Pixel',
            first_content: 'Our AI Canvas blends robust editing functions with the immersive creative process, providing you complete control. Erase distractions, adjust dimensions and finesse every detail of your designs — all under one roof.',
            second_content: 'With Canvas, you’re not just using a tool; you are the true alchemist of your creation.',
            src: 'https://leonardo-cdn.b-cdn.net/wp-content/uploads/2023/07/Canvas-min.mp4'
        },
        {
            category: '3D Texture Generation',
            title: 'Advancing 3D Texture Innovations',
            first_content: 'Breathe life into 3D assets like never before. Just upload your OBJ file, generate textures with contextual intelligence and download the enriched files tailor-made for diverse applications.',
            second_content: 'Supercharge the design process with our avant-garde tool, and take your projects to new heights.',
            src: 'https://leonardo-cdn.b-cdn.net/wp-content/uploads/2023/07/3D-TV-3.mp4'

        }
    ]

    const handleTabItemClick = (category) => {
        setActiveCategory(category);
    }

    return (
        <section className='toolkit-section'>
            <div className='container'>
                <h2 className='title'>
                    <span>YourMage's</span>
                    &nbsp;Toolkit&nbsp;
                    <img draggable="false" role="img" className="emoji" alt="🛠️" src="https://s.w.org/images/core/emoji/14.0.0/svg/1f6e0.svg"></img>
                </h2>

                <div className='content'>
                    <div className="tab-menu">
                        {toolkitMenu.map((item, index) => (
                            <div
                                className={`tab-menu-items ${item.category === activeCategory ? 'active' : ''}`}
                                onClick={() => handleTabItemClick(item.category)}
                                key={index}
                            >
                                {item.category}
                            </div>
                        ))}
                    </div>

                    <div className="tab-content">
                        {toolkitItem.map((item, index) => (
                            item.category === activeCategory &&
                            (
                                <div className="tab-content-items" key={index}>
                                    <div className='tab-content-items__left'>
                                        <p className='category-name'>{item.category}</p>
                                        <h1>{item.title}</h1>
                                        <div className='content'>
                                            <p>
                                                {item.first_content}
                                            </p>
                                            <p>
                                                {item.second_content}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='tab-content-items__right'>
                                        <video autoPlay={true} src={item.src} />
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ToolkitSection