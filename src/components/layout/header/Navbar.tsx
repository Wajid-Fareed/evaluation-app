
'use client'
import Link from 'next/link'
import { CiHeart } from 'react-icons/ci'
import { HiBars3BottomRight, HiOutlineShoppingBag } from 'react-icons/hi2'
import Container from '../container/Container'
import { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { usePathname } from 'next/navigation'
import { useProductContext } from '@/components/provider/Provider'

const Navbar = () => {
    const { cart, wishlist } = useProductContext();
    const [visibleMenu, setVisibleMenu] = useState(false);
    const pathName = usePathname();
    const handleMenu = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setVisibleMenu(!visibleMenu);
    }
    const isActive = (href: string): string => {
        return pathName === href ? "text-cta border-primary animation-active" : "text-black group-hover:text-cta group-hover:border-primary border-transparent";
    };
    const cartCounters = () => {
        return cart.reduce((total, item) => total + item.cartQuantity, 0);
    };
    return (
        <header className='border-b shadow-sm'>
            <Container>
                <nav className="flex justify-between items-center h-16">
                    <Link href="/" className="text-lg xs:text-xl font-bold text-cta">
                        Evaluation <span className='text-primary'>App</span>
                    </Link>
                    <ul className="hidden gap-8 md:flex">
                        <li className='group'>
                            <Link href='/' className={`text-lg font-medium border-b-2 transition-all duration-300 ${isActive('/')}`}>
                                Home
                            </Link>
                        </li>
                        <li className='group'>
                            <Link href='/about-us' className={`text-lg font-medium border-b-2 transition-all duration-300 ${isActive('/about-us')}`}>
                                About
                            </Link>
                        </li>
                        <li className='group'>
                            <Link href='/profile' className={`text-lg font-medium border-b-2 transition-all duration-300 ${isActive('/profile')}`}>
                                Profile
                            </Link>
                        </li>
                    </ul>


                    <div className='flex items-center gap-4 xs:gap-6'>
                        <Link href='/cart' className='relative'>
                            <HiOutlineShoppingBag size={25} />
                            {cart.length > 0 ? (<span className='absolute -top-1 -right-2 bg-cta text-white text-12 w-6 h-5 rounded-lg flex justify-center items-center'>
                                {cartCounters()}
                            </span>) : ''}

                        </Link>
                        <Link href='/wishlist' className='relative'>
                            <CiHeart size={30} />
                            {wishlist.length > 0 ? (<span className='absolute top-0 -right-2 bg-cta text-white text-12 w-6 h-5 rounded-lg flex justify-center items-center'>
                                {wishlist.length}
                            </span>) : ''}
                        </Link>
                        <div className='block md:hidden'>
                            <button onClick={handleMenu}><HiBars3BottomRight size={30} /></button>
                            <div className={`absolute top-0 right-0 transition-all duration-300 bg-white h-full border shadow-md ${!visibleMenu ? 'opacity-0 w-0 p-0' : 'w-64 opacity-100 p-5'}`}>
                                <div className='relative'>
                                    <ul className='flex flex-col gap-4 overflow-hidden'>
                                        <li className='group'>
                                            <Link href='/' className={`text-lg font-medium border-b-2 transition-all duration-300 ${isActive('/')}`}>
                                                Home
                                            </Link>
                                        </li>
                                        <li className='group'>
                                            <Link href='/' className={`text-lg font-medium border-b-2 transition-all duration-300 ${isActive('/about-us')}`}>
                                                About
                                            </Link>
                                        </li>
                                        <li className='group'>
                                            <Link href='/profile' className={`text-lg font-medium border-b-2 transition-all duration-300 ${isActive('/profile')}`}>
                                                Profile
                                            </Link>
                                        </li>
                                    </ul>
                                    <button onClick={handleMenu} className='absolute top-0 right-0'><RxCross1 size={30} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Navbar