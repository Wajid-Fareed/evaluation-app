'use client'
import Container from '@/components/layout/container/Container'
import { useProductContext } from '@/components/provider/Provider'
import { IProduct } from '@/type/type'
import Image from 'next/image'
import Link from 'next/link'
import { RxCross1 } from 'react-icons/rx'

const CartPage = () => {
    const { cart, setCart } = useProductContext();


    const handleAddToCart = (item: IProduct) => {

        const existingItem = cart.find((cartItem) => cartItem._id === item._id);
        if (existingItem && existingItem?.cartQuantity > 0) {
            const newItem = cart.map((cartItem) =>
                cartItem._id === item._id
                    ? { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 }
                    : cartItem
            )
            setCart(newItem);
            localStorage.setItem('Cart', JSON.stringify(newItem));
        }
    };
    const handleRemoveFromCart = (item: IProduct) => {
        const existingItem = cart.find((cartItem) => cartItem._id === item._id);
        if (existingItem && existingItem.cartQuantity > 1) {

            const newItem = cart.map((cartItem) =>
                cartItem._id === item._id
                    ? { ...cartItem, cartQuantity: cartItem.cartQuantity - 1 }
                    : cartItem
            )

            setCart(newItem);
            localStorage.setItem('Cart', JSON.stringify(newItem));
        }
        else if (existingItem && existingItem.cartQuantity == 1) {
            alert("Product Quantity cannot be zero");
            //   setCart(cart.filter((cartItem) => cartItem._id !== item._id));
        }
        else {
            alert("Product not found in cart");
        }
    };

    const handleDeleteFromCart = (item: IProduct) => {
        const newItem = cart.filter((cartItem) => cartItem._id !== item._id);
        setCart(newItem);
        localStorage.setItem('Cart', JSON.stringify(newItem));
    };



    return (
        <Container className="py-6">
            <div className='min-h-[82vh]'>
                <h2 className="text-4xl font-bold text-center">Shopping Cart</h2>
                <div className="grid grid-cols-1 py-6">
                    {cart.length > 0 ? (
                        <div className="overflow-auto">
                            {cart.map((item) => (
                                <div className="flex items-center flex-nowrap justify-between gap-4 my-2 min-w-[800px]" key={item._id}>
                                    <div className='flex gap-4 w-[500px]'>
                                        <Image src={item.posterImageUrl.imageUrl} alt={item.posterImageUrl.public_id} width={300} height={300} className="w-16 h-16 rounded-sm" />
                                        <div className="ml-4">
                                            <h3 className='text-xl font-medium'>{item.name}</h3>
                                            <h4 className='text-lg font-medium'>{item.code}</h4>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2 text-base font-medium'>Price: <span>${item.purchasePrice}</span><span className='line-through text-light'>${item.discountPrice}</span></div>
                                    <div className="flex items-center justify-between w-28 h-14 border">
                                        <button
                                            onClick={() => handleRemoveFromCart(item)}
                                            className="border w-10 h-full flex justify-center items-center text-xl font-semibold"
                                        >
                                            -
                                        </button>
                                        <span>{item.cartQuantity}</span>
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className="border w-10 h-full flex justify-center items-center text-xl font-semibold"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button className="text-sm font-semibold text-red-500 hover:text-red-700" onClick={() => handleDeleteFromCart(item)}>
                                        <RxCross1 size={30} />
                                    </button>
                                </div>
                            ))}
                        </div>) : (
                        <div className="text-center">
                            <h2 className="text-xl font-bold">No items in cart</h2>
                            <div className="text-center mt-6">
                                <Link href="/" className="bg-cta hover:bg-ctaHover text-white py-2 px-4 rounded-md">
                                    Start Shopping
                                </Link>
                            </div>
                        </div>
                    )}




                </div>
            </div>
        </Container>
    )
}

export default CartPage