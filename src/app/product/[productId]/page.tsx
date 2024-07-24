import Container from '@/app/components/Container'
import { products } from '@/utils/product'
import ProductDetails from './ProductDetails' 
    
interface IPrams{
    productId?: string
}

const Product = ({ params }: { params: IPrams }) => {
    const product = products.find(item => item.id === params.productId)
    
    return (
        <div className="p-8">
            <Container>
                <ProductDetails product={product} />
            </Container>
        </div>
    )
}

export default Product