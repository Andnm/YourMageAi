import React, { useEffect, useState } from 'react'
import './style.scss'
import { LIST_CARD_RECENT_CREATION } from '../../../constants/image'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'

import { getAllImageGeneral } from '../../../store/imageGeneralSlice'
import { useDispatch, useSelector } from 'react-redux'

import ImageSkeletonLoading from '../../shared/ImageSkeletonLoading'
import ModalImageDetail from '../../shared/ModalImageDetail'

const GallerySection = () => {

  const [listCardRecentCreation, setListCardRecentCreation] = useState([]);

  const dispatch = useDispatch();
  const { loading, error, imageGeneral } = useSelector((state) => state.imageGeneral);

  const [selectedItem, setSelectedItem] = useState(null);

  const [openModalImageDetail, setOpenModalImageDetail] = useState(false);

  const openModalWithItem = (item) => {
    setSelectedItem(item)
    setOpenModalImageDetail(true)
  }

  const closeModalImageDetail = () => {
    setSelectedItem(null)
    setOpenModalImageDetail(false)
  }

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  // const toggleLike = (sectionIndex, itemIndex) => {
  //   const updatedList = [...listCardRecentCreation];
  //   updatedList[sectionIndex].list[itemIndex].isLiked = !updatedList[sectionIndex].list[itemIndex].isLiked; // Đảo ngược giá trị isLiked
  //   setListCardRecentCreation(updatedList);
  // };

  useEffect(() => {
    dispatch(getAllImageGeneral()).then((result) => {
      if (result?.payload?.status === 200) {
        setListCardRecentCreation(result?.payload?.data)
      }
    });
  }, []);

  return (
    <div className='gallery-section'>
      <div className='tool-section'>
        <div className='layout'>
          <div className='content'>
            <div className='content__header'>
              <div className="css-1w0fo11">
                <div className="css-1cje39n">
                  <div className="chakra-input__group css-196d9u8" data-group="true">
                    <div className="chakra-input__left-element css-1qocpo4">
                      <svg
                        stroke="currentColor"
                        fill="#FFFFFF"
                        strokeWidth="0"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        fontSize="calc(0.9rem * 1.125)"
                        height="1em"
                        width="1em"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      placeholder="Search temporarily disabled."
                      disabled
                      className="chakra-input css-a22nyf"
                      value=""
                    />
                    <button type="button" className="chakra-button css-cfjj11" >
                      Search
                    </button>
                  </div>
                </div>

                <div className="css-hs1dr5">
                  <div
                    role="group"
                    className="chakra-button__group css-4m8woj"
                    data-orientation="horizontal"
                  >
                    <button type="button" className="chakra-button-active explore-filter-button css-1tzb3os">
                      <span className="chakra-button__icon css-q3evsc">
                        <svg
                          width="calc(0.9rem * 0.6875)"
                          height="calc(0.9rem * 0.8750)"
                          viewBox="0 0 11 14"
                          fill="currentcolor"
                          aria-hidden="true"
                          focusable="false"
                          style={{ zIndex: 1 }}
                        >
                          <path d="M10.25 8.33161C10.25 11.0883 8.00733 13.3316 5.25 13.3316C2.49267 13.3316 0.25 11.0883 0.25 8.33161C0.25 6.83295 0.677997 5.76561 1.68066 4.76228C1.87733 4.56494 2.1 4.3676 2.33067 4.1636C3.27467 3.3276 4.25 2.46296 4.25 0.997629C4.25 0.874962 4.31801 0.761602 4.42601 0.703602C4.53401 0.645602 4.66534 0.651619 4.76801 0.720285C4.80801 0.746952 8.52666 3.2956 6.62 7.67426C7.06733 7.42426 7.60267 7.01426 7.93134 6.37759C8.142 5.96959 8.24933 5.50563 8.24933 4.99763C8.24933 4.8623 8.33133 4.74029 8.45667 4.68895C8.58067 4.63762 8.72533 4.66695 8.82066 4.76362C9.72933 5.68695 10.25 6.98761 10.25 8.33161Z"></path>
                        </svg>
                      </span>
                      <span className="css-tw4vmx">Trending</span>
                      <div
                        className="css-thv0x5"
                        data-projection-id="1474"
                        style={{ transform: 'none', transformOrigin: '50% 50% 0px', opacity: 1 }}
                      ></div>
                    </button>
                    <button type="button" className="chakra-button explore-filter-button css-lwwjaw">
                      <span className="chakra-button__icon css-q3evsc">
                        <svg
                          width="calc(0.9rem * 1.0625)"
                          height="calc(0.9rem * 1)"
                          viewBox="0 0 17 16"
                          stroke="currentcolor"
                          aria-hidden="true"
                          focusable="false"
                          style={{ zIndex: 1 }}
                        >
                          <path d="M2.25195 8H4.05215" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M12.4556 8H14.2558" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M8.25049 14.0033V12.2031" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M8.25049 3.8002V2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M12.5096 12.2615L11.1895 10.9414" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M5.30891 5.06233L3.98877 3.74219" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M12.5096 3.74219L11.1895 5.06233" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M5.30891 10.9414L3.98877 12.2615" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </span>
                      <span className="css-tw4vmx">New</span>
                    </button>
                    <button type="button" className="chakra-button explore-filter-button css-lwwjaw">
                      <span className="chakra-button__icon css-q3evsc">
                        <svg
                          width="calc(0.9rem * 1.0625)"
                          height="calc(0.9rem * 1)"
                          viewBox="0 0 17 16"
                          fill="none"
                          stroke="currentcolor"
                          aria-hidden="true"
                          focusable="false"
                          style={{ zIndex: 1 }}
                        >
                          <path d="M13.4658 9.21962C13.0877 12.8863 12.4867 13.4974 8.62763 13.4974C4.47172 13.4974 4.01625 12.5807 3.78951 9.21962C3.62462 6.77517 3.75904 6.16406 8.62764 6.16406C13.5198 6.16406 13.6969 6.97782 13.4658 9.21962Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M5.58594 4.33594H11.697" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M7.41406 2.5H9.85851" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </span>
                      <span className="css-tw4vmx">Top</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <hr aria-orientation="horizontal" className="chakra-divider"></hr>
      </div>

      <div className='list-img'>
        <div className='infinite-scroll-component'>
          {loading
            ?
            <>
              <div className='data-project'>
                <ImageSkeletonLoading />
                <ImageSkeletonLoading />
                <ImageSkeletonLoading />
              </div>
              <div className='data-project'>
                <ImageSkeletonLoading />
                <ImageSkeletonLoading />
                <ImageSkeletonLoading />
              </div>
              <div className='data-project'>
                <ImageSkeletonLoading />
                <ImageSkeletonLoading />
                <ImageSkeletonLoading />
              </div>
              <div className='data-project'>
                <ImageSkeletonLoading />
                <ImageSkeletonLoading />
                <ImageSkeletonLoading />
              </div>
              <div className='data-project'>
                <ImageSkeletonLoading />
                <ImageSkeletonLoading />
                <ImageSkeletonLoading />
              </div>
            </>
            :
            error
              ?
              <p className='text-danger' style={{ width: '500px' }}>
                An error occurred, please try again later!
              </p>
              :
              listCardRecentCreation.map((section, indexSection) => (
                <div className='data-project'
                  id={section.data_project}
                  key={indexSection}
                >
                  {section.list.map((item, indexItem) => (
                    <div className='img-div'
                      onClick={() => openModalWithItem(item)}
                      key={indexItem}
                    >
                      <img src={item.src} alt={item.name} />

                      <div className='overlay'>
                        <div className='overlay-content'>
                          <div className='overlay-content__header'>
                            <div className='d-flex align-items-center gap-1'>
                              <div className='author-avatar'>{item.author.substring(1, 0)}</div>
                              <p className='author'>{item.author}</p>
                            </div>

                            <div className='like-div'>
                              <p>{item.like}</p>

                              <div
                                // onClick={() => toggleLike(indexSection, indexItem)}
                              >
                                {item.isLiked ? <FcLike /> : <FcLikePlaceholder />}
                              </div>
                            </div>
                          </div>

                          <div className='overlay-content__footer'>
                            <h5>{truncateText(item.name, 20)}</h5>
                            <p>{truncateText(item.details, 100)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
          }

          {openModalImageDetail && (
            <ModalImageDetail
              show={openModalImageDetail}
              onHide={() => closeModalImageDetail()}
              detail={selectedItem}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default GallerySection