import React, { useState, useEffect} from 'react'
import { Row, Col} from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import Axios from 'axios';
import { useDispatch} from 'react-redux';

function DetailProductPage(props) {
    const productId = props.match.params.productId;
    const [Product, setProduct] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
       Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
       .then(response => {
            if(response.data){
                setProduct(response.data[0]);
            }
       })
    }, [])
    
    return (
        <div  className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>
           <Row gutter={[16, 16]}>
               <Col lg={12} xs={24}>
                    <ProductImage detail={Product}/>
               </Col>
               <Col lg={12} xs={24}>
                    <ProductInfo detail={Product} />
                    <a href="/">Back</a>
               </Col>
               
           </Row>
           
        </div>
    )
}

export default DetailProductPage
