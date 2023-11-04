import React from 'react'
import './style.scss'
import BrandContainer from '../BrandContainer'
import LevelSection from '../LevelSection'
import { motion } from 'framer-motion'
import sidebar_tmp from '../../../assets/images/sidebar_generation_tmp.png'

const SidebarImageGenerations = () => {
  return (
    <motion.div
      initial={{ x: "-7rem", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5, type: "spring" }}
    >
      <div className='layout-sidebar'>
        <div className='sidebar-container sidebar-img-generation align-items-center'>

          <BrandContainer />

          <LevelSection />

          <hr></hr>

          <div className='img-div-main'>
            <img src={sidebar_tmp} alt="tmp sidebar"/>
          </div>
        </div>
      </div>

    </motion.div>

  )
}

export default SidebarImageGenerations