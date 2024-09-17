import React, { useState } from 'react'
import Auth from './Auth'
import Otp from './Otp'

function Main() {

const [page,setPage] = useState("auth")
const checkPage = (page)=>{
        setPage(page)
}

  return (
    <div className='w-full h-[100vh] flex font-inter justify-between'>
    <section className='leftAuth flex w-[45%]'>
       <img src="/Logo/Auth/r1.svg" alt="" /> 
       <img src="/Logo/Auth/r2.svg" alt="" /> 
       <img src="/Logo/Auth/r3.svg" alt="" /> 
    </section>

    {
      page === "auth"?<Auth check={checkPage}/>:<Otp check={checkPage}/>
    }
   
</div>
  )
}

export default Main