"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { truncateText } from "@/utils/truncateText"
import { formatPrice } from "@/utils/formatPrice"
import { Rating } from "@mui/material"


interface ProductCardProps{
    data: any
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const router = useRouter()
    const { id, images, name, price, reviews } = data || {}
    const productRating = reviews?.reduce((acc: number, item: any) => item.rating + acc, 0) / reviews.length

    return (
        <div
            onClick={() => router.push(`/product/${id}`)}
            className="col-span-1 cursor-pointer border-[1.2px] bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm">
            <div className="flex flex-col w-full gap-1 text-slate-500 text-sm">
                <div className="aspect-square overflow-hidden relative w-full ">
                    <Image fill src={images[0]?.image} alt={name} className="w-full h-full object-contain" />
                </div>
                <div className="mt-4">{truncateText(name)}</div>
                <div><Rating value={productRating} readOnly /></div>
                <div>{reviews.length} reviews</div>
                <div className="font-semibold">{formatPrice(price)}</div>
            </div>
        </div>
    )
}
 
export default ProductCard;