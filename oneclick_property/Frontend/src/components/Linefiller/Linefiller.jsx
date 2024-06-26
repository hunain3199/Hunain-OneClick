import React, { useEffect, useRef } from 'react'

const Linefiller = ({step}) => {
  const ref=useRef()
  useEffect(() => {
    
  
    ref.current.children[step].style.transition='all .5s ease-in'
    ref.current.children[step].style.backgroundPosition='left bottom'
    ref.current.children[step].style.backgroundColor='#23970C'


  }, [])
  
  return (
    <div ref={ref} className='line-container'>
        <div  className="line-part" id="part1"></div>
        <div className="line-part" id="part2"></div>
        <div className="line-part" id="part3"></div>
    </div>
  )
}

export default Linefiller