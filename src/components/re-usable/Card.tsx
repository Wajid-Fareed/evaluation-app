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
    const { cart, setCart, wishlist, setWishlist } = useProductContext();
    const handleAddToCard = () => {
        const cartItem = cart.find((item: IProduct) => item._id === card._id);

        if (cartItem) {
            const newItem = cart.map((item: IProduct) =>
                item._id === card._id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
            )
            setCart(newItem);
            localStorage.setItem('Cart', JSON.stringify(newItem));
        } else {
            const newItem = [...cart, { ...card, cartQuantity: 1 }];
            setCart(newItem);
            localStorage.setItem('Cart', JSON.stringify(newItem));
        }
    };

    const handleAddToWislist = () => {
        const existingwisklist = wishlist.find((wishlistItem) => wishlistItem._id === card._id);
        const existingcart = cart.find((cartItem) => cartItem._id === card._id);
        if (!existingwisklist && !existingcart) {
            const newWishlist = [...wishlist, card];
            localStorage.setItem("Wishlist", JSON.stringify(newWishlist))
            setWishlist(newWishlist);
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
                <div>
                    <div className='flex items-center gap-2 text-base font-medium'>Price: <span>${card.purchasePrice}</span><span className='line-through text-light'>${card.discountPrice}</span></div></div>
                <button onClick={handleAddToCard} className='bg-cta hover:bg-ctaHover text-white py-2 px-4 rounded-md'>Add to Cart</button>
            </div>

        </div>
    )
}

export default Card