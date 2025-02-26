import React from 'react'



const Tooltip = ({label, className}: {label: string; className?: string;}) => {


  return (

    <div className='absolute -top-6 start-7 
        hidden group-hover:flex items-center
        bg-slate-300 text-slate-700 px-2 py-1.5
        rounded-lg z-40'
        >
          <span className={className}>{label}</span>
    </div>

  )
}

export default Tooltip