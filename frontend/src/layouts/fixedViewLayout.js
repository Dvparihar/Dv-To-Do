import React from 'react'

const FixedViewLayout = ({ headerComponent, footerComponent, ...props}) => {
  return (
      <div>
          {headerComponent && headerComponent}
          {props?.children}
          {footerComponent && footerComponent}          
      </div>
  )
}

export default FixedViewLayout