'use client'
import { IProduct, IProductContext } from '@/type/type';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface ProviderProps {
    children: ReactNode;
}
export const ProductContext = createContext<IProductContext | undefined>(undefined);
const Provider: React.FC<ProviderProps> = ({ children }) => {
    const [cartCount, setcartCount] = useState<number>();
    const [whishlistCount, setwhishlistcounter] = useState<number>();
    const [cart, setCart] = useState<IProduct[]>([]);
    const [wishlist, setWishlist] = useState<IProduct[]>([]);
    useEffect(() => {
        const localCartData = localStorage.getItem("Cart");
        const localWhishlistData = localStorage.getItem("Wishlist");
        const initialCart = localCartData? JSON.parse(localCartData) : [];
        const initialWhishlist = localWhishlistData? JSON.parse(localWhishlistData) : [];
        setCart(initialCart);
        setWishlist(initialWhishlist);
    },[])
    
    return (
        <ProductContext.Provider value={{cartCount , setcartCount , whishlistCount ,setwhishlistcounter ,cart, setCart , wishlist, setWishlist}}>
            {children}
        </ProductContext.Provider>
    )
}

export default Provider

export const useProductContext = (): IProductContext => {
    const context = useContext(ProductContext);
    if (!context) {
      throw new Error('useProductContext must be used within a UserProvider');
    }
    return context;
  };