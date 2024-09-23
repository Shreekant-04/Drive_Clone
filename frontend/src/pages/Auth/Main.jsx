import React, { useState } from 'react'
import Auth from './Auth'
import Otp from './Otp'

function Main() {

const [page,setPage] = useState("auth")
const checkPage = (page)=>{
        setPage(page)
}

  return (
    <div className='w-full h-[100vh] flex flex-col  lg:flex-row font-inter justify-between'>
    <section className='leftAuth flex flex-col lg:flex-row relative h-[40%] md:h-[50%] lg:h-full w-full lg:w-[45%]'>
     
      <div className='absolute  h-[40vh] md:h-[50vh] lg:h-full  w-full lg:w-full rounded-b-full lg:rounded-r-full lg:rounded-b-none bg-[#03848462] z-1'></div>
      <div className='absolute  h-[35vh] md:h-[45vh] lg:h-full w-full lg:w-11/12 rounded-b-full lg:rounded-r-full lg:rounded-b-none bg-[#00787888] z-2'></div>
      <div className='absolute h-[30vh] md:h-[40vh] lg:h-full  w-full lg:w-10/12 rounded-b-full lg:rounded-r-full lg:rounded-b-none bg-[#0065659a] z-3'></div>

    </section>

    {
      page === "auth"?<Auth check={checkPage}/>:<Otp check={checkPage}/>
    }
   
</div>
  )
}

export default Main