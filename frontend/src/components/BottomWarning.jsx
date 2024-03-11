import React from 'react'
import { Link } from 'react-router-dom'

const BottomWarning = ({label, innerText, to}) => {
  return (
    <div className="py-2 text-sm flex justify-center">
        <div>{label}</div>
        <Link to={to} className='pointer underline pl-1 cursor-pointer'>{innerText}</Link>
    </div>
  )
}

export default BottomWarning
