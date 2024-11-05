'use client'
import Container from '@/components/layout/container/Container'
import { useProductContext } from '@/components/provider/Provider'
import { IProduct } from '@/type/type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'

const CartPage = () => {
    const [cartData, setCartData] = useState<IProduct[]>([]);
    const { setcartCount } = useProductContext();
    useEffect(() => {
        const getcart = localStorage.getItem('Cart');
        const cartData = getcart ? JSON.parse(getcart) : [];
        setCartData(cartData);
    }, [cartData]);
    const handleAddToCard = (item: IProduct) => {
        const getcart = localStorage.getItem('Cart');
        const cartData = getcart ? JSON.parse(getcart) : [];
        const getcartCounter = localStorage.getItem('cart Counter');
        let cartCounterData = getcartCounter ? JSON.parse(getcartCounter) : 0;
        cartCounterData += 1;
        localStorage.setItem('cart Counter', JSON.stringify(cartCounterData));
        setcartCount(cartCounterData);
        const cartItem = cartData.find((item: IProduct) => item._id === item._id);

        if (cartItem) {
            const newCartData = cartData.map((item: IProduct) =>
                item._id === item._id ? { ...item, cartQuantity: (item.cartQuantity || 1) + 1 } : item
            );
            setCartData(newCartData);
            localStorage.setItem('Cart', JSON.stringify(newCartData));
        } else {
            const newCartData = [...cartData, { ...item, cartQuantity: 1 }];
            setCartData(newCartData);
            localStorage.setItem('Cart', JSON.stringify(newCartData));
        }
    };
    const handleRemoveFromCart = (itemToRemove: IProduct) => {
        const getcart = localStorage.getItem('Cart');
        const cartData = getcart ? JSON.parse(getcart) : [];
        const getCartCounter = localStorage.getItem('cart Counter');
        let cartCounterData = getCartCounter ? JSON.parse(getCartCounter) : 0;

        const existingItem = cartData.find((cartItem: IProduct) => cartItem._id === itemToRemove._id);

        if (existingItem) {
            if (existingItem.cartQuantity > 1) {
                const newCartData = cartData.map((cartItem: IProduct) =>
                    cartItem._id === itemToRemove._id
                        ? { ...cartItem, cartQuantity: cartItem.cartQuantity - 1 }
                        : cartItem
                );
                localStorage.setItem('Cart', JSON.stringify(newCartData));
                cartCounterData = Math.max(cartCounterData - 1, 0);
                localStorage.setItem('cart Counter', JSON.stringify(cartCounterData));
                setCartData(newCartData);
                setcartCount(cartCounterData);
            } else {
                const newCartData = cartData.filter((cartItem: IProduct) => cartItem._id !== itemToRemove._id);
                localStorage.setItem('Cart', JSON.stringify(newCartData));
                cartCounterData = Math.max(cartCounterData - 1, 0);
                localStorage.setItem('cart Counter', JSON.stringify(cartCounterData));
                setCartData(newCartData);
                setcartCount(cartCounterData);
            }
        }
    };

    const handleDeleteFromCart = (itemToRemove: IProduct) => {
        const getCart = localStorage.getItem('Cart');
        const cartData = getCart ? JSON.parse(getCart) : [];
        const getCartCounter = localStorage.getItem('cart Counter');
        let cartCounterData = getCartCounter ? JSON.parse(getCartCounter) : 0;
        const existingItem = cartData.find((cartItem: IProduct) => cartItem._id === itemToRemove._id);

        if (existingItem) {
            cartCounterData = Math.max(cartCounterData - existingItem.cartQuantity, 0);
            setcartCount(cartCounterData);
            const newCartData = cartData.filter((cartItem: IProduct) => cartItem._id !== itemToRemove._id);
            localStorage.setItem('Cart', JSON.stringify(newCartData));
            localStorage.setItem('cart Counter', JSON.stringify(cartCounterData));
            setCartData(newCartData);
        }
    };



    return (
        <Container className="py-6">
            <div className='min-h-[82vh]'>
                <h2 className="text-4xl font-bold text-center">Shopping Cart</h2>
                <div className="grid grid-cols-1 py-6">
                    {cartData.length > 0 ? (
                        <div className="overflow-auto">
                            {cartData.map((item) => (
                                <div className="flex items-center flex-nowrap justify-between gap-4 my-2 min-w-[800px]" key={item._id}>
                                    <div className='flex gap-4 w-[500px]'>
                                        <Image src={item.posterImageUrl.imageUrl} alt={item.posterImageUrl.public_id} width={300} height={300} className="w-16 h-16 rounded-sm" />
                                        <div className="ml-4">
                                            <h3 className='text-xl font-medium'>{item.name}</h3>
                                            <h4 className='text-lg font-medium'>{item.code}</h4>
                                        </div>
                                    </div>
                                    <p className='flex items-center gap-2 text-base font-medium'>Price: <span>${item.purchasePrice}</span><span className='line-through text-light'>${item.discountPrice}</span></p>
                                    <div className="flex items-center justify-between w-28 h-14 border">
                                        <button
                                            onClick={() => handleAddToCard(item)}
                                            className="border w-10 h-full flex justify-center items-center text-xl font-semibold"
                                        >
                                            +
                                        </button>
                                        <p>{item.cartQuantity}</p>
                                        <button
                                            onClick={() => handleRemoveFromCart(item)}
                                            className="border w-10 h-full flex justify-center items-center text-xl font-semibold"
                                        >
                                            -
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