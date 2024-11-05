'use client'
import { IProductContext } from '@/type/type';
import { createContext, ReactNode, useContext, useState } from 'react'

interface ProviderProps {
    children: ReactNode;
}
export const ProductContext = createContext<IProductContext | undefined>(undefined);
const Provider: React.FC<ProviderProps> = ({ children }) => {
    const [cartCount, setcartCount] = useState<number>();
    const [whishlistCount, setwhishlistcounter] = useState<number>();
    return (
        <ProductContext.Provider value={{cartCount , setcartCount , whishlistCount ,setwhishlistcounter}}>
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