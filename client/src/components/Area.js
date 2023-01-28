import React from 'react'

function Area({chooseArea, value}) {
  return (
    <div className='area' onClick={chooseArea}>
        {value}
    </div>
  )
}

export default Area;