"use client"
import { IProduct } from '@/type/type'
import Image from 'next/image'
import { CiHeart } from 'react-icons/ci'
import 'react-toastify/dist/ReactToastify.css';
import { useProductContext } from '../provider/Provider'

interface CardProps {
    card: IProduct
}
const Card: React.FC<CardProps> = ({ card }) => {
    const { setcartCount , setwhishlistcounter } = useProductContext();
    const handleAddToCard = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const getcart = localStorage.getItem('Cart');
        const cartData = getcart ? JSON.parse(getcart) : [];
        const getcartCounter = localStorage.getItem('cart Counter');
        let cartCounterData = getcartCounter ? JSON.parse(getcartCounter) : 0;
    
        cartCounterData += 1;
        localStorage.setItem('cart Counter', JSON.stringify(cartCounterData));
        setcartCount(cartCounterData);
        const cartItem = cartData.find((item: IProduct) => item._id === card._id);
    
        if (cartItem) {
            const newCartData = cartData.map((item: IProduct) =>
                item._id === card._id ? { ...item, cartQuantity: (item.cartQuantity || 1) + 1 } : item
            );
            localStorage.setItem('Cart', JSON.stringify(newCartData));
        } else {
            const newCartData = [...cartData, { ...card, cartQuantity: 1 }];
            localStorage.setItem('Cart', JSON.stringify(newCartData));
        }
    };

    const handleAddToWislist = () => {
        const localWishlistData = localStorage.getItem("Wishlist");
    const initialWishlist = localWishlistData ? JSON.parse(localWishlistData) : [];
        const existingwisklist = initialWishlist.find((wishlistItem:IProduct) => wishlistItem._id === card._id);
        const getcart = localStorage.getItem('Cart');
        const cartData = getcart ? JSON.parse(getcart) : [];
    const existingcart = cartData.find((wishlistItem:IProduct) => wishlistItem._id === card._id);
    if (!existingwisklist && !existingcart) {
      localStorage.setItem("Wishlist" ,JSON.stringify([...initialWishlist, card]))
      const getwishlistCounter = localStorage.getItem('wishlist Counter');
        let wishlistCounterData = getwishlistCounter ? JSON.parse(getwishlistCounter) : 0;
        wishlistCounterData += 1;
        localStorage.setItem('wishlist Counter', JSON.stringify(wishlistCounterData));
        setwhishlistcounter(wishlistCounterData);
    }
    }
    
    return (
        <div className='flex flex-col gap-4 group'>
            <div className='relative'>
                <Image src={card.posterImageUrl.imageUrl} alt={card.posterImageUrl.public_id} width={400} height={300} />
                <div className='flex flex-col gap-4 absolute top-4 right-4 transition-opacity opacity-0 group-hover:opacity-100'>
                    {/* <div className='bg-cta text-white text-12 w-12 h-12 rounded-full flex justify-center items-center'><HiOutlineShoppingBag size={25} /></div> */}
                    <div className='bg-cta text-white text-12 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer' onClick={handleAddToWislist}><CiHeart size={30} /></div>
                </div>
            </div>
            <div className='flex flex-col gap-2 items-center'>
                <h2 className='text-xl font-medium'>{card.name}</h2>
                <h3 className='text-lg font-medium'>{card.code}</h3>
                <p className='flex items-center gap-2 text-base font-medium'>Price: <span>${card.purchasePrice}</span><span className='line-through text-light'>${card.discountPrice}</span></p>
                <button onClick={handleAddToCard} className='bg-cta hover:bg-ctaHover text-white py-2 px-4 rounded-md'>Add to Cart</button>
            </div>

        </div>
    )
}

export default Card