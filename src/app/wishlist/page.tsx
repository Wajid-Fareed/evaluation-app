'use client'
import Container from '@/components/layout/container/Container'
import { useProductContext } from '@/components/provider/Provider';
import { IProduct } from '@/type/type';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx';

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState<IProduct[]>([]);
    const { whishlistCount , setwhishlistcounter } = useProductContext();
    useEffect(() => {
        const localWishlistData = localStorage.getItem("Wishlist");
        const initialWishlist = localWishlistData ? JSON.parse(localWishlistData) : [];
        setWishlist(initialWishlist);
        const getwishlistCounter = localStorage.getItem('wishlist Counter');
        const wishlistCounterData = getwishlistCounter ? JSON.parse(getwishlistCounter) : 0;
        setwhishlistcounter(wishlistCounterData);
    }, [whishlistCount]);
    const handleDeleteFromWishlist = (item: IProduct) => {
        const updatedWishlist = wishlist.filter((product) => product._id !== item._id);
        setWishlist(updatedWishlist);
        localStorage.setItem("Wishlist", JSON.stringify(updatedWishlist));
        const getwishlistCounter = localStorage.getItem('wishlist Counter');
        let wishlistCounterData = getwishlistCounter ? JSON.parse(getwishlistCounter) : 0;
        wishlistCounterData -= 1;
        localStorage.setItem('wishlist Counter', JSON.stringify(wishlistCounterData));
        setwhishlistcounter(wishlistCounterData);
    };
    const handleAddToCartFromWishlist = (item: IProduct) => {
        const updatedWishlist = wishlist.filter((product) => product._id !== item._id);
        setWishlist(updatedWishlist);
        localStorage.setItem("Wishlist", JSON.stringify(updatedWishlist));
        const getwishlistCounter = localStorage.getItem('wishlist Counter');
        let wishlistCounterData = getwishlistCounter ? JSON.parse(getwishlistCounter) : 0;
        wishlistCounterData -= 1;
        localStorage.setItem('wishlist Counter', JSON.stringify(wishlistCounterData));
        setwhishlistcounter(wishlistCounterData);
        const getcart = localStorage.getItem('Cart');
        const cartData = getcart ? JSON.parse(getcart) : [];
        const getcartCounter = localStorage.getItem('cart Counter');
        let cartCounterData = getcartCounter ? JSON.parse(getcartCounter) : 0;
        cartCounterData += 1;
        localStorage.setItem('cart Counter', JSON.stringify(cartCounterData));
        const cartItem = cartData.find((item: IProduct) => item._id === item._id);
        if (cartItem) {
            const newCartData = cartData.map((item: IProduct) =>
                item._id === item._id ? { ...item, cartQuantity: (item.cartQuantity || 1) + 1 } : item
            );
            localStorage.setItem('Cart', JSON.stringify(newCartData));
        } else {
            const newCartData = [...cartData, { ...item, cartQuantity: 1 }];
            localStorage.setItem('Cart', JSON.stringify(newCartData));
        }
        window.location.href = "/cart";
    }
    return (
        <Container className="py-9">
            <div className="text-center">
                <h1 className="text-4xl font-semibold">Wishlist</h1>
            </div>
            {wishlist && wishlist.length > 0 ? (
                <div className="min-w-full overflow-x-auto min-h-[73vh]">
                    {wishlist.map((item) => (
                        <div className="flex justify-between items-center py-4 border-b gap-10 min-w-[975px]" key={item._id}>
                            <div className="flex gap-5 items-center flex-grow w-[350px]">
                                <div className='flex gap-4 w-[500px]'>
                                    <Image src={item.posterImageUrl.imageUrl} alt={item.posterImageUrl.public_id} width={300} height={300} className="w-16 h-16 rounded-sm" />
                                    <div className="ml-4">
                                        <h3 className='text-xl font-medium'>{item.name}</h3>
                                        <h4 className='text-lg font-medium'>{item.code}</h4>
                                    </div>
                                </div>
                                <p className='flex items-center gap-2 text-base font-medium'>Price: <span>${item.purchasePrice}</span><span className='line-through text-light'>${item.discountPrice}</span></p>

                            </div>
                            <div>
                                <button
                                    className="bg-cta hover:bg-ctaHover text-white py-2 px-4 rounded-md"
                                    onClick={() => handleAddToCartFromWishlist(item)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleDeleteFromWishlist(item)}
                                    className="w-20 h-10 flex justify-end items-center text-xl font-semibold text-black"
                                >
                                    <RxCross1 size={30} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center min-h-[75vh] mt-2">
                        <h2 className="text-xl font-bold">No items in Wishlist</h2>
                        <div className="text-center mt-6">
                            <Link href="/" className="bg-cta hover:bg-ctaHover text-white py-2 px-4 rounded-md">
                                Go to home
                            </Link>
                        </div>
                    </div>
            )}
        </Container>
    )
}

export default WishlistPage