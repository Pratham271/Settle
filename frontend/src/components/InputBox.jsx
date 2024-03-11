import React, { useState } from 'react'
import EyeOpen from './EyeOpen'
import EyeClose from './EyeClose'

const InputBox = ({label, placeholder, onChange, type}) => {
  const [show,setShow] = useState(false)
  return (
    <>
      {type? <div>
        {/* <label htmlFor="First Name" className='text-sm font-medium text-slate-700'>{firstName}</label> */}
        <div className='text-sm font-medium text-left py-2'>
            {label}
        </div>
        <div className="relative">
        <input
          onChange={onChange}
          type={show?"text":type}
          placeholder={placeholder}
          className="mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-full pr-10" // Added pr-10 for padding on the right side
        />
        <button onClick={()=> setShow(!show)}>{show?<EyeClose/>:<EyeOpen/>}</button>
        
        </div>
  
    </div>: 
    <div>
    <div className='text-sm font-medium text-left py-2'>
        {label}
    </div>
    <input onChange={onChange} type="text" placeholder={placeholder} className='mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-full'/>
    </div>
  }
    </>
  )
}

export default InputBox
