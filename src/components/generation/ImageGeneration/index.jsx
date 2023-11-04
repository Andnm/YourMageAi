import React, { useEffect, useState } from 'react'
import './style.scss'
import AdminLoading from '../../shared/AdminLoading'
import { getUser, getUserFromLocalStorage } from '../../../store/userSlice'
import { useDispatch } from 'react-redux'
import { formatISOToCustomDate } from '../../../utils'

import ModalGeneratedImage from '../../shared/ModalGeneratedImage'

const ImageGeneration = ({ randomImages, loading, error, prompt, dateCreate }) => {
    const [historyImage, setHistoryImage] = useState([]);

    const [selectedItem, setSelectedItem] = useState({
        date: '',
        prompt: '',
        src: ''
    });

    const [openModalGeneratedImage, setOpenModalGeneratedImage] = useState(false);

    const openModalWithItem = (date, prompt, src) => {
        setSelectedItem({
            date: date,
            prompt: prompt,
            src: src
        });
        setOpenModalGeneratedImage(true)
    }

    const closeModalImageDetail = () => {
        setSelectedItem({
            date: '',
            prompt: '',
            src: ''
          });
        setOpenModalGeneratedImage(false)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser(getUserFromLocalStorage()?.email)).then((result) => {
            if (result?.payload?.status === 200) {
                const reversedData = [];
                for (let i = result?.payload?.data?.historyImageGenerated?.length - 1; i >= 0; i--) {
                    reversedData.push(result?.payload?.data?.historyImageGenerated[i]);
                }
                setHistoryImage(reversedData)
            }
        })

    }, []);

    return (
        <div className='image-generation'>
            <div className="chakra-tabs__tablist">
                <button type="button" className="chakra-tabs__tab active">Image Generation</button>
                <button type="button" className="chakra-tabs__tab" >Prompt Generation</button>
            </div>

            {!loading
                ?
                error != null ?
                    <div className='text-danger mt-2'
                        style={{ marginLeft: '40px' }}>Something wrong! Please try again later
                    </div>
                    :
                    // generate real time
                    <div className='generation-image-main'>
                        {randomImages?.map((item, index) => (
                            <div className="chakra-aspect-ratio" key={index}>
                                <div className="chakra-card">
                                    <div className="chakra-card__body"
                                        onClick={() => openModalWithItem(dateCreate, prompt, item)}
                                    >
                                        <img src={item} alt="tmp" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                :
                <AdminLoading></AdminLoading>
            }

            <div className='d-flex justify-content-center flex-column'>
                {historyImage?.map((item, index) => (
                    <div key={index}>
                        <div className='text-center generation-image-header d-flex justify-content-center align-items-center flex-column'>
                            <div className='text-header'>
                                <p>Generation history</p>
                            </div>

                            <div className='line d-flex justify-content-center align-items-center flex-column mt-2' style={{ width: '100%' }}>
                                <hr aria-orientation="horizontal" className="chakra-divider"></hr>

                                <div className="date-container">
                                    <p>{formatISOToCustomDate(item.createdAt)}</p>
                                </div>
                            </div>
                        </div>

                        <div className='prompt-name-div'>
                            <p className='prompt-name'>{item.prompt}</p>
                        </div>

                        {/* History generation */}
                        <div className='generation-image-main'>
                            {item?.imageGenerate?.map((image, indexImage) => (
                                <div className="chakra-aspect-ratio" key={indexImage}>
                                    <div className="chakra-card">
                                        <div className="chakra-card__body"
                                            onClick={() => openModalWithItem(item.createdAt, item.prompt, image)}
                                        >
                                            <img src={image} alt="tmp" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {openModalGeneratedImage && (
                <ModalGeneratedImage
                    show={openModalGeneratedImage}
                    onHide={() => closeModalImageDetail()}
                    detail={selectedItem}
                />
            )}

        </div>
    )
}

export default ImageGeneration