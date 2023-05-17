import React, { ReactNode } from 'react'
import Navbar from './Navbar'

function Layout({children}:{children:ReactNode}) {
  return (
    <>    
        <Navbar />
        {children}
    </>
  )
}

export default Layout