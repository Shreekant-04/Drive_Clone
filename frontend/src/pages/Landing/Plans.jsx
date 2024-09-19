import React from 'react'

function Plans() {
  return (
    <div className='bg-gray-900 p-8  lg:p-16 '>
        <div className=''>
            <h2 className='text-teal-500 text-xl md:text-2xl lg:text-4xl font-semibold'>Premium Plans</h2>
            <h2 className='text-gray-100 text-2xl md:text-3xl lg:text-5xl font-semibold sm:mt-2 lg:mt-6'>We have attractive and budget-friendly offers!</h2>
            <h2 className='text-gray-400 lg:text-xl mt-2'>We offer a range of cost-effective options that can serve as alternatives based on your requirements</h2>
        </div>
        <div className="plans-cards mt-6 flex flex-col gap-5 items-center md:flex-row lg:flex-row  lg:gap-28">

            {/* Card 1 */}
            <div className="plans-card1 w-10/12  p-4 lg:w-4/12  rounded-xl lg:lg:p-7 lg:py-5 bg-white cursor-pointer">
                <div className='plans-price'>
                    <h3 className='bg-teal-100 text-teal-800 lg:text-lg font-medium p-2 px-4 w-fit rounded-full'>Freemium Pack</h3>
                    <p className='py-4 text-gray-400 lg:text-lg border-b-2 border-gray-300'><span className='lg:text-5xl text-gray-800 font-semibold'>$0</span>/Account</p>
                </div>
                <div className="plans-features mt-4">
                    <div className='flex items-center gap-3 '>
                        <i className="fa-solid fa-circle-check text-teal-800 lg:text-lg"></i>
                        <p className='lg:text-lg'>32 GB Storage</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className="fa-solid fa-circle-check text-teal-800 lg:text-lg"></i>
                        <p className='lg:text-lg'>Share link your folder</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className="fa-solid fa-circle-check text-teal-800 lg:text-lg"></i>
                        <p className='lg:text-lg'>2 Account Admin</p>
                    </div>
                </div>
                <button className='plans-button mt-6 p-2 border-2 rounded border-teal-200 text-teal-800 transition lg:text-lg font-semibold w-full hover:border-white hover:bg-teal-800 hover:text-white'>
                    Join Now
                </button>
            </div>

            {/* Card 2 */}
            <div className="plans-card2 w-10/12 p-4 lg:w-4/12 border-transparent border-2 rounded-xl lg:p-7 lg:py-5 bg-teal-800 cursor-pointer">
                <div className='plans-price'>
                    <h3 className='bg-white w-fit text-teal-800 lg:text-lg font-medium p-2 px-4 rounded-full'>Premium Pack</h3>
                    <p className='py-4 text-gray-100 lg:text-lg border-b-2 border-gray-300'><span className='lg:text-5xl text-white font-semibold'>$55</span>/Month</p>
                </div>
                <div className="plans-features mt-4">
                    <div className='flex items-center gap-3 '>
                        <i className="fa-solid fa-circle-check text-white lg:text-lg"></i>
                        <p className='lg:text-lg text-white'>128 GB Storage</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className="fa-solid fa-circle-check text-white lg:text-lg"></i>
                        <p className='lg:text-lg text-white'>Share link your folder</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className="fa-solid fa-circle-check text-white lg:text-lg"></i>
                        <p className='lg:text-lg text-white'>10 Account Admin</p>
                    </div>
                </div>
                <button className='plans-button mt-6 p-2 border-2 border-gray-100 rounded text-teal-800 bg-gray-100 lg:text-lg font-semibold w-full  '>
                    Buy Now
                </button>
            </div>

            {/* Card 3 */}
            <div className="plans-card1 w-10/12 p-4 lg:w-4/12  rounded-xl lg:lg:p-7 lg:py-5 bg-white cursor-pointer">
                <div className='plans-price'>
                    <h3 className='bg-teal-100 w-fit text-teal-800 lg:text-lg font-medium p-2 px-4 rounded-full'>Bussiness Pack</h3>
                    <p className='py-4 text-gray-400 lg:text-lg border-b-2 border-gray-300'><span className='lg:text-5xl text-gray-800 font-semibold'>$75</span>/Month</p>
                </div>
                <div className="plans-features mt-4">
                    <div className='flex items-center gap-3 '>
                        <i className="fa-solid fa-circle-check text-teal-800 lg:text-lg"></i>
                        <p className='lg:text-lg'>1 TB Storage</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className="fa-solid fa-circle-check text-teal-800 lg:text-lg"></i>
                        <p className='lg:text-lg'>Share link your folder</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className="fa-solid fa-circle-check text-teal-800 lg:text-lg"></i>
                        <p className='lg:text-lg'>52 Account Admin</p>
                    </div>
                </div>
                <button className='plans-button mt-6 p-2 border-2 rounded border-teal-200 text-teal-800 lg:text-lg font-semibold w-full hover:border-white hover:bg-teal-800 hover:text-white'>
                    Buy Now
                </button>
            </div>
        </div>
    </div>
  )
}

export default Plans