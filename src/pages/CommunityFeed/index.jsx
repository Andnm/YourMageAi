import React, { useEffect } from 'react'
import GallerySection from '../../components/home/GallerySection'

const CommunityFeed = () => {

  const styleCommunityHeader = {
    margin: '2rem 2rem 0rem 2rem',
    color: 'white',
    fontSize: '1rem',
  }

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  
  return (
    <>
      <div className='community-feed-header' style={styleCommunityHeader}>
        <h2 className="chakra-heading">
          <p className="chakra-text">Community Feed</p>
        </h2>
      </div>

      <GallerySection />
    </>

  )
}

export default CommunityFeed