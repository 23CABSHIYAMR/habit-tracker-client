import React from 'react'
import Image from "next/image";
import ImgInBtn from '../ui/ImgInBtn';

export default function TopBar({logoutUser}) {
  return (
    <div className="w-100 p-1 top-bar d-flex justify-content-end">
              <ImgInBtn
                clickEvent={logoutUser}
                dir={"topBar/logout.svg"}
                alt={"logout"}
                className='bg-white'
                />
        </div>
  )
}
