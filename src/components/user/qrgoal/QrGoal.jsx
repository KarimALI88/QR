import React from 'react'

const QrGoal = ({icon, feature}) => {
  return (
    <div>
      <div className='bg-white flex text-black pl-2 py-3 rounded-lg w-36 shadow-lg border-2 border-gray-700 cursor-pointer'>
        <span className='block mr-2'>{icon}</span>
        <span className='text-lg font-medium'> {feature}</span>
      </div>
    </div>
  )
}

export default QrGoal
