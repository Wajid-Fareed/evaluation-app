import React from 'react'

interface ContainerProps {
    className?: string;
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({children , className}) => {
  return (
    <div className={`max-w-screen-2xl w-screen overflow-hidden px-4 mx-auto ${className}`}>{children}</div>
  )
}

export default Container