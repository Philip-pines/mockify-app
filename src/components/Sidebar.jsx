import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`h-full p-2 flex-col text-white hidden lg:flex ${isCollapsed ? 'w-[5%]' : 'w-[30%]'}`}>
            <div className='bg-[#000000] h-[11%] rounded flex flex-col justify-round cursor-pointer'>
                    <div className='flex pl-4 cursor-pointer mt-2'>
                        <a href="/">
                            <img className='w-9' src={assets.mockify_circle} alt="" />
                        </a>
                    </div>
            </div>
            <div className='bg-[#121212] h-[100%] rounded'>
                <div className='p-4 flex items-center justify-between'>
                    <div className="flex items-center gap-3">
                        <button className="cursor-pointer" onClick={toggleSidebar}>
                            <div className='flex mt-2'>
                                <img className='w-8' src={assets.stack_icon} alt="" />
                                {!isCollapsed && <>
                                    {/* <div className="flex items-center gap-">
                                    <img className='w-5' src={assets.arrow_icon} alt="" />
                                    <img className='w-5' src={assets.plus_icon} alt="" />
                                    </div> */}
                                </>}
                            </div>
                        </button>
                    </div>
                    {/* <div className="flex items-center gap-3">
                        <img className='w-5' src={assets.arrow_icon} alt="" />
                        <img className='w-5' src={assets.plus_icon} alt="" />
                    </div> */}
                </div>
                {!isCollapsed && (
                    <>
                        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
                            <h1>Create your first playlist</h1>
                            <p className='font-light'>it's easy we will help you</p>
                            <button className="px-4 py-1.5 bg-[#FFD515] text-[15px] text-black rounded-full mt-4">Create playlist</button>
                        </div>
                        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
                            <h1>Podcasts</h1>
                            <p className='font-light'>new episodes</p>
                            <button className="px-4 py-1.5 bg-[#FFD515] text-[15px] text-black rounded-full mt-4">Browse podcasts</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
