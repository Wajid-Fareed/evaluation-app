'use client'
import Container from '@/components/layout/container/Container'
import { useProductContext } from '@/components/provider/Provider';
import { IProduct } from '@/type/type';
import Image from 'next/image';
import Link from 'next/link';
import { RxCross1 } from 'react-icons/rx';

const WishlistPage = () => {
    const { setWishlist, wishlist, cart, setCart } = useProductContext();

    const handleDeleteFromWishlist = (item: IProduct) => {
        const updatedWishlist = wishlist.filter((wishlistItem) => wishlistItem._id !== item._id)
        setWishlist(updatedWishlist);
        localStorage.setItem("Wishlist", JSON.stringify(updatedWishlist));
      };
    const handleAddToCartFromWishlist = (item: IProduct) => {
        const cartItem = cart.find((cartItem: IProduct) => cartItem._id === item._id);

        if (cartItem) {
            const newItem = cart.map((cartItem: IProduct) =>
                cartItem._id === item._id ? { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 } : cartItem
            )
            setCart(newItem);
            localStorage.setItem('Cart', JSON.stringify(newItem));
        } else {
            const newItem = [...cart, { ...item, cartQuantity: 1 }];
            setCart(newItem);
            localStorage.setItem('Cart', JSON.stringify(newItem));
        }
        const updatedWishlist = wishlist.filter((wishlistItem) => wishlistItem._id !== item._id)
        setWishlist(updatedWishlist);
        localStorage.setItem("Wishlist", JSON.stringify(updatedWishlist));
    };
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
                                <div className='flex items-center gap-2 text-base font-medium'>Price: <span>${item.purchasePrice}</span><span className='line-through text-light'>${item.discountPrice}</span></div>

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