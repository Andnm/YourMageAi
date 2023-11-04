import React, { useState } from 'react'

import CardFeatured from '../CardFeatured'
import { LIST_CARD_FEATURE } from '../../../constants/image'
import './style.scss'

const FeaturedModels = () => {

    return (
        <div className='featured-models'>
            <div className="featured-models__header">
                <div className="title">
                    <h2 className="chakra-heading">
                        <span className="chakra-text">Featured
                        </span> Models
                    </h2>

                    <button type="button" className="chakra-button" aria-label="Get help">
                        <svg viewBox="0 0 16 16" focusable="false" className="chakra-icon" aria-hidden="true"><path d="M8 0.5C3.85775 0.5 0.5 3.85775 0.5 8C0.5 12.1423 3.85775 15.5 8 15.5C12.1423 15.5 15.5 12.1423 15.5 8C15.5 3.85775 12.1423 0.5 8 0.5ZM8.01501 12.125C7.60101 12.125 7.26117 11.789 7.26117 11.375C7.26117 10.961 7.59351 10.625 8.00751 10.625H8.01501C8.42976 10.625 8.76501 10.961 8.76501 11.375C8.76501 11.789 8.42901 12.125 8.01501 12.125ZM9.20227 8.39606C8.65402 8.76356 8.55195 8.96828 8.5332 9.02228C8.45445 9.25703 8.2355 9.40552 8 9.40552C7.94075 9.40552 7.88072 9.39647 7.82147 9.37622C7.52672 9.27722 7.36855 8.95851 7.4668 8.66376C7.60255 8.25876 7.95432 7.877 8.57532 7.46075C9.34107 6.94775 9.24276 6.38531 9.21051 6.20081C9.12576 5.71031 8.71248 5.29241 8.22723 5.20691C7.85823 5.13941 7.49758 5.23616 7.21558 5.47241C6.93208 5.71016 6.76917 6.06043 6.76917 6.43243C6.76917 6.74293 6.51717 6.99493 6.20667 6.99493C5.89616 6.99493 5.64417 6.74293 5.64417 6.43243C5.64417 5.72668 5.95324 5.06297 6.49249 4.61072C7.02649 4.16372 7.72922 3.97704 8.42297 4.10004C9.37322 4.26804 10.1525 5.05323 10.3183 6.00873C10.4833 6.95523 10.0865 7.80356 9.20227 8.39606Z" fill="url(#paint0_linear_1162_21608)"></path><defs><linearGradient id="paint0_linear_1162_21608" x1="-5.95" y1="0.499997" x2="17.4864" y2="-3.20338" gradientUnits="userSpaceOnUse"><stop offset="0.0001" stopColor="#FA5560"></stop><stop offset="0.499028" stopColor="#B14BF4"></stop><stop offset="1" stopColor="#4D91FF"></stop></linearGradient></defs>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="featured-models__gallery">
                <div className='gallery-container'>
                    <div className="list"
                    >
                        {LIST_CARD_FEATURE.map((item, index) => (
                            <CardFeatured src={item.src} title={item.title} des={item.description} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedModels