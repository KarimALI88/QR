import React from 'react'

const QrGoal = ({icon, feature, selected}) => {
  return (
    <div>
      <div className={`${selected ? "bg-mainColor" : "bg-white"} flex ${selected ? "text-white" : "text-mainColor"} pl-2 mx-auto py-3 rounded-lg w-36 shadow-lg border-2 border-mainColor cursor-pointer`}>
        <span className='block mr-2'>{icon}</span>
        <span className='text-lg font-medium'>{feature}</span>
      </div>
    </div>
  )
}

export default QrGoal
