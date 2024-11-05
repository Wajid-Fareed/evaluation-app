import React from 'react'
import Container from '../container/Container'

const Footer = () => {
  return (
    <footer className='shadow-sm border-t'>
      <Container className='flex justify-center items-center h-11'>
        <p className='text-lg font-medium'>Evaluation App © 2024. All Rights Reserved</p>
      </Container>
    </footer>
  )
}

export default Footer