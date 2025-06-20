import React from 'react'

import bannerImg from "../../assets/banner.png"

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
      <div className='md:w-1/2 w-full flex items-center md:justify-end'>
        <img src={bannerImg} alt="" />
      </div>

      <div className='md:w-1/2 w-full'>
        <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Releases This Week</h1>
        <p className='mb-2'>     Refresh your bookshelf with this weeks most talked-about literary gems. Whether you're into gripping thrillers or inspiring memoirs, these new releases promise unforgettable journeys.
          Dive into stories that stir the soul and spark the imagination—there is a perfect pick waiting for every kind of reader.</p>
        <p className='mb-10'><i>From bestselling authors to exciting new voices, these books are making waves for a reason. Start reading today and discover your next favorite page-turner.</i></p>

      </div>


    </div>
  )
}

export default Banner