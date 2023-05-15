import { ClassNames } from '@emotion/react'
import React from 'react'

export default function Custom404() {
  return (
    <center className='four'>
    <h1 className='oops'>Oops!</h1>
    <img className='uh-oh' src="https://www.freeiconspng.com/uploads/dog-png-9.png" width="350" alt="Dog Clip Art" />
    <h5 className='nopage'>Page Not Found</h5>
    <div className="link-container">
        <a target="_blank" href="/home" className="more-link">Go to Homepage</a>
      </div>
    </center>
  )
}
