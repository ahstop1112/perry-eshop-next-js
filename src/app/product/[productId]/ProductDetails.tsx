"use client"
import React, { useState, useCallback, useEffect } from 'react'
import { Rating } from '@mui/material'
import { useCart } from '@/hooks/useCart'
import Button from '@/app/components/Button'
import SetColor from '@/app/components/products/SetColor'
import SetQuantity from '@/app/components/products/SetQuantity'
import ProductImage from '@/app/components/products/ProductImage'
import { formatPrice } from "@/utils/formatPrice"
import { MdCheckCircle } from "react-icons/md"
import { useRouter } from 'next/navigation';

interface ProductDetailsProps{
    product: any;
}

export type CartProductType = {
    id: string,
    name: string,
    description: string, 
    category: string,
    brand: string,
    selectedImg: SelectedImgType,
    quantity: number,
    price: number
}

export type SelectedImgType = {
    color: string,
    colorCode: string,
    image: string
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2"/>
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const { handleAddProductToCart, cartTotalQty, cartProducts } = useCart()
    const [isProductInCart, setIsProductInCart] = useState(false)
    const [cartProduct, setCartProduct] =
        useState<CartProductType>({
            id: product.id,
            name: product.name,
            description: product.description, 
            category: product.category,
            brand: product.brand,
            selectedImg: { ...product.images[0]},
            quantity: 1,
            price: product.price
        })
    const router = useRouter()
    
    useEffect(() => {
        setIsProductInCart(false)
        
        if (cartProducts) {
            const existingIndex = cartProducts.findIndex((item: CartProductType) => item.id === product.id)

            if (existingIndex > -1) {
                setIsProductInCart(true)
            }
        }
    }, [cartProducts])

    const { name, description, price, images, brand, inStock, reviews, category } = product || {}
    const productRating = reviews?.reduce((acc: number, item: any) => item.rating + acc, 0) / reviews.length

    const handleColorSelect = useCallback((value: SelectedImgType) => {
        setCartProduct((prev) => {
            return { ...prev, selectedImg: value }
        })
    }, [cartProduct.selectedImg])
    

    const handleQtyIncrease = useCallback(() => {
        if (cartProduct.quantity === 99) {
            return
        }

        setCartProduct((prev) => {
            return{...prev, quantity: prev.quantity+1}
        })
    }, [cartProduct?.quantity])

    const handleQtyDecrease = useCallback(() => {
        if (cartProduct.quantity === 1) {
            return 1
        }

        setCartProduct((prev) => {
            return{...prev, quantity: prev.quantity-1}
        })
    }, [cartProduct?.quantity])

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect} /> 
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{name}</h2>
                <h3 className="text-2xl font-semibold text-slate-700">{formatPrice(price)}</h3>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} readOnly />
                    <div>{reviews.length} reviews</div>
                </div>
                <Horizontal/>
                <div className="text-justify">{description}</div>
                <Horizontal/>
                <div>
                    <span className="font-semibold w-[30%]">CATEGORY:</span> {category}
                </div>
                <div>
                    <span className="font-semibold w-[30%]">BRAND:</span> {brand}
                </div>
                <div className={inStock ? 'text-teal-400' : 'text-rose-400'}>{inStock ? 'In stock' : 'Out of stock'}</div>
                <Horizontal />
                {isProductInCart ? (<>
                    <p className="mb-2 text-slate-500 flex items-center gap-1">
                        <MdCheckCircle className="text-teal-400" size={20}/>
                        <span>Product added to the cart</span>
                    </p> 
                    <div className="max-w-[300px]">
                        <Button label="View Cart" outline onClick={() => {
                            router.push('/cart')
                        }} />
                    </div>
                 </>) : (
                    <>
                        <SetColor cartProduct={cartProduct} images={images} handleColorSelect={handleColorSelect} />
                        <Horizontal />
                        <SetQuantity 
                            cartProduct={cartProduct}
                            handleQtyIncrease={handleQtyIncrease}
                            handleQtyDecrease={handleQtyDecrease}
                        />
                        <Horizontal />
                        <div className="max-w-[300px]">
                            <Button  
                                label="Add To Cart"
                                onClick={() => handleAddProductToCart(cartProduct)}
                            />
                        </div>
                    </>
                 )}
            </div>
        </div>
    )
}
 
export default ProductDetails