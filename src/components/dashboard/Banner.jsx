import  React,{ useEffect,useState } from "react";
import Logo from "../../constants/images/formulargray_03.png";

import {refreshSession} from '../../data/api/authenticatedRequests'
import {FaUserAlt} from 'react-icons/fa'
import {IoNotificationsOutline} from 'react-icons/io5'
import Drawer from "./Drawer";
import {GiHamburgerMenu} from 'react-icons/gi'
import {userStore} from '../../stores'
function Banner() {
    const [showDrawer,setShowDrawer]=useState(false);
    const user = userStore((state) => state.user);
    const setUser = userStore((state) => state.storeUser);
    useEffect(()=>{
        const getUser= async ()=>{
           const res=await refreshSession();
           console.log(res)
           setUser(res.data.user)
         
         }
        
         getUser();
           },[])
  return (
    <>
    <div className=' w-full  bg-[#E6E9EF]   top-0 pb-1 md:px-10 px-4 text-black '>
<div className=' flex flex-row md:flex-row-reverse justify-between items-center pb-2 pt-4'>
    <div className=" cursor-pointer md:hidden block p-2 rounded-full hover:bg-gray-200 hover:text-gray-900"
     onClick={()=>setShowDrawer(true)}>
<GiHamburgerMenu className=" text-2xl" />
    </div>
    
<div className=' flex space-x-6 space-y-2 items-center'>
    <div className="">
<GiHamburgerMenu className=" text-2xl" />
</div>
</div>
<div className=" text-black hidden md:block capitalize font-semibold text-lg">Dashboard User</div>
</div>  
    </div>
    {showDrawer&&<Drawer setShowDrawer={setShowDrawer} />}
    </>
  )
}

export default Banner
