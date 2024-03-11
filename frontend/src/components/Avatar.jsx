import React, { memo } from 'react'

const Avatar = memo(({label}) => {

  return (
    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {label}
                </div>
    </div>
  )
})

export default Avatar
