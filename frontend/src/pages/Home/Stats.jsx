import React, { useState } from 'react'
import doc from '/Logo/Stats/doc.svg'
import image from '/Logo/Stats/image.svg'
import other from '/Logo/Stats/other.svg'
import video from '/Logo/Stats/video.svg'
import ProgressBar from '../Common/ProgressBar'
function Stats() {

const [data,setData] = useState([
  {
    type:"image",
    quantity:154,

  },
  {
    type:"video",
    quantity:114,

  },
  {
    type:"document",
    quantity:96,

  },
  {
    type:"other",
    quantity:45,

  },
])

  return (
    <div className='p-8 w-full h-[50%] flex justify-between items-end font-inter'>
       {
        data.map((item,i)=>{
             return(
                 <div className='bg-[#e7e7e763] w-[24%] h-[50%] cursor-pointer rounded-[20px] p-3 flex-col hover:scale-105 duration-200 transition-all'>
                    <div className='flex w-full justify-between'>
                      <img src={item.type.includes('im') ? image :item.type.includes('vid')?video:item.type.includes('doc')?doc:other} alt="" />
                      <div className='w-[70%] flex flex-col justify-center items-start'>
                        <p className='font-bold'>{item.type.includes('im') ?"Images" :item.type.includes('vid')?"Videos":item.type.includes('doc')?"Documents":"Others"}</p>
                        <p>{item.quantity} Items</p>
                      </div>
                    </div>
                    <div className='w-full h-[80%] flex flex-col justify-center items-start'>
                      <ProgressBar total={100} available={30} px={0}/>
                      <p className="p-1 text-[12px]">75 GB OF 100 GB</p>
                    </div>
                 </div>
             )
        })
       }

    </div>
  )
}

export default Stats