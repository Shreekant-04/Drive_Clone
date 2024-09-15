import React from 'react'

function Navbar() {
  return (
    <div className='w-full h-20 flex items-center p-4  border-b-[1px] border-[#979797]'>
    <div className='flex items-center justify-between w-full'>
        <div className='flex justify-start items-center w-2/12'>
        <img src="/Logo/logo.svg" alt="" />
        <p className='font-roboto text-4xl font-bold'>rive</p>
        </div>
        <div className='searchContainer flex w-11/12 items-center justify-center '>
           <p className='font-inter mx-4'>File Manager</p>
           <div className='searchBox border-[1px] border-[#5F6368] w-4/5 rounded-2xl p-2'>
             <div className='flex justify-between font-inter'>
                <img src="/Logo/search.svg" alt="" />
                <input type="search" className='w-11/12 p-2 outline-none' name="" id="" placeholder='search'/>
                <img src="/Logo/filter.svg" alt="" />
             </div>

           </div>
        </div>
        <div className='w-5/12 flex justify-end'>
        <div className='flex justify-evenly w-2/5'>
        <img src="/Logo/notification.svg" alt="" />
            <img src="/Logo/settings.svg" alt="" />
            <img src="/Logo/profile.svg" alt="" />

        </div>
            
        </div>
          
    </div>


    </div>
  )
}

export default Navbar