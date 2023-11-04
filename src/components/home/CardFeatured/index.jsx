import React, { useState } from 'react'
import './style.scss'
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs'
import ModalImageDetail from '../../shared/ModalImageDetail';

const CardFeatured = (props) => {

  const [isBookmarked, setIsBookmarked] = useState(false);

  const [openModalImageDetail, setOpenModalImageDetail] = useState(false);

  const { src, title, des } = props

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <>
      <div className='card-featured' onClick={() => {setOpenModalImageDetail(true)}}>

        <div className="card" style={{ width: "15rem" }}>
          <img className="card-img-top" src={src} alt="Card image cap" />

          <div className="bookmark-overlay">
            <div className='bookmark-div' onClick={toggleBookmark}>
              {isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
            </div>
          </div>

          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{des}</p>

            <div className="card-footer">
              <div className="chakra-stack">
                <svg width="calc(0.9rem * 1.2)" height="calc(0.9rem * 1.2)" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.50624 6.61458C3.8459 6.61458 2.49582 5.26379 2.49582 3.60417C2.49582 1.94454 3.8459 0.59375 5.50624 0.59375C7.16657 0.59375 8.51665 1.94454 8.51665 3.60417C8.51665 5.26379 7.16657 6.61458 5.50624 6.61458ZM5.50624 1.65625C4.43169 1.65625 3.55832 2.52962 3.55832 3.60417C3.55832 4.67871 4.43169 5.55208 5.50624 5.55208C6.58078 5.55208 7.45415 4.67871 7.45415 3.60417C7.45415 2.52962 6.58007 1.65625 5.50624 1.65625ZM8.33101 14.4062H2.66867C0.954499 14.4062 0.0102539 13.4677 0.0102539 11.7635C0.0102539 9.87861 1.077 7.67708 4.08317 7.67708H6.9165C9.92267 7.67708 10.9894 9.8779 10.9894 11.7635C10.9894 13.4677 10.0452 14.4062 8.33101 14.4062ZM4.08317 8.73958C1.29021 8.73958 1.07275 11.0537 1.07275 11.7635C1.07275 12.8713 1.55021 13.3438 2.66867 13.3438H8.33101C9.44947 13.3438 9.92692 12.8713 9.92692 11.7635C9.92692 11.0544 9.70946 8.73958 6.9165 8.73958H4.08317Z" fill="currentColor">
                  </path>
                </svg>

                <p className="chakra-text css-kief4z">YourMage</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {openModalImageDetail && (
        <ModalImageDetail
          show={openModalImageDetail}
          onHide={() => setOpenModalImageDetail(false)}
          detail={props}
        />
      )}
    </>
  )
}

export default CardFeatured