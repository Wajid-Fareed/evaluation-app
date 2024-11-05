import { StaticImageData } from "next/image";

export interface IProduct {
    posterImageUrl: IPosterImg;
    _id: string;
    name: string;
    description: string;
    salePrice: number;
    purchasePrice: number;
    discountPrice: number;
    category: string;
    imageUrl: IProductImageUrl[];
    colors: IProductColors[];
    modelDetails: IProductModelDetails[];
    spacification: IProductSpacification[];
    createdAt: string;
    updatedAt: string;
    starRating: string;
    reviews: string;
    code: string;
    totalStockQuantity: number;
    variantStockQuantities: [];
    sizes: [];
    __v: number;
    cartQuantity: number;
    wishlist?: true;
}

interface IPosterImg {
    public_id: string;
    imageUrl: string | StaticImageData;
}

interface IProductImageUrl {
    imageIndex: number;
    public_id: string;
    imageUrl: string | StaticImageData;
    _id: string;
}

interface IProductColors {
    id: number;
    color: string;
}

interface IProductModelDetails{
    _id: string;
    detail: string;
    name: string;
}
interface IProductSpacification {
    _id: string;
    specsDetails: string;
}


export interface IProductContext {
    cartCount?: number;
    setcartCount: React.Dispatch<React.SetStateAction<number | undefined>>;
    whishlistCount?: number;
    setwhishlistcounter: React.Dispatch<React.SetStateAction<number | undefined>>;
    cart: IProduct[];
    setCart: React.Dispatch<React.SetStateAction<IProduct[]>>;
    wishlist: IProduct[];
    setWishlist: React.Dispatch<React.SetStateAction<IProduct[]>>;
  }