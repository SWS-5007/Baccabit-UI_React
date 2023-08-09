import React from 'react'
import video from '../../../public/vedios/bbs_anim.gif';
import './loader.css'

export const Loader = () => {
  return (
    <div className='loader-wrap'>
 <img src={video} />
   </div>
  )
}
