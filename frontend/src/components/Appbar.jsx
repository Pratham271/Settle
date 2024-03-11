import React from 'react'
import Avatar from './Avatar'

const Appbar = ({firstName, onClick}) => {
  return (
    <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            Settle
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                <button className='bg-none border-none' onClick={onClick}>Logout</button>
            </div>
            <Avatar label={firstName[0]}/>
        </div>
    </div>
  )
}

export default Appbar
