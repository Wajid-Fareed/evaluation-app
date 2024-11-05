import React from 'react'
import Container from '../layout/container/Container'
import { ProductData } from '@/data/data'
import Card from '../re-usable/Card'

const Products = () => {
  return (
    <Container className='py-5'>
        <div className='grid grid-cols-4 gap-5'>
            {ProductData.map((item) => (
                <Card card={item} key={item._id} />
            ))}
        </div>
    </Container>
  )
}

export default Products