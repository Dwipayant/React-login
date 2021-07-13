import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Row, Card, Button, Layout } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import SearchBox from './Sections/SearchBox';
import { useHistory } from 'react-router-dom';
import ProductInfo from '../DetailProductPage/Sections/ProductInfo';
import './landing.css';
import { useDispatch } from "react-redux";
import { editModelData } from '../../../_actions/userActions';

const { Meta } = Card;
const { Sider, Content } = Layout;

function LandingPage() {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState();
    const [SearchTerm, setSearchTerm] = useState('')
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
        let payload = {
            skip: Skip,
            limit: Limit
        }
        getProducts(payload);
    }, [])

    const getProducts = (payload)=>{
        Axios.post('/api/product/getProduct', payload)
        .then(response => {
            if(response.data.success){
                if(payload.loadMore){
                    setProducts([...Products, ...response.data.products])
                }else{
                    setProducts(response.data.products);
                }
                setPostSize(response.data.postSize);
                
            }else{
                alert('Failed to fetch products')
            }
        })
    }

    const editModel = (product) => {
        history.push(`/editModel/${product._id}`);
    }

    const deleteModel = (id) => {
        console.log(id);
        Axios.delete('/api/product/deleteModel', { params: { id: id } }).then(response => {
            if(response.data.success) { 
                history.push('/');
            }
        })
    }

    const renderCards = Products.map((product, index) => {
        return (<>
        <div className="blog-card">
            <div className="meta">
                <div className="photo">
                        <ImageSlider images={product.images} />
                </div>
                <ul className="details">
                    <li>Model Name <a href="#">{product.modelname}</a></li>
                    <li className="author"onClick={()=>editModel(product)}><a href="#" >Edit</a></li>
                    <li className="author"><a href="#" onClick={()=>deleteModel(product._id)}>Delete</a></li>
                </ul>
            </div>
            <div className="description">
                <ProductInfo detail={product} />
                <p className="read-more">
                <a href={`/product/${product._id}`}>Detail</a>
                </p>
            </div>
        </div>
      </>)
    })

    const onLoadMore = ()=>{
        let skip = Skip + Limit;
        let payload = {
            skip: Skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(payload)
        setSkip(skip);
    }

    const updateSearchTerms = (newSerachTerms)=>{
        const payload = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSerachTerms
        }
        setSkip(0);
        setSearchTerm(newSerachTerms);
        getProducts(payload);
    }

    const addNewModel = () =>{
        history.push('/product/upload');
    }

    return (
        <div style={{ width: '75%', margin: '2rem auto'}}>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <h1 style={{ textAlign: 'center'}}>Model List Page</h1>
            </div>
            <div><Button onClick={addNewModel}>Add New Model</Button></div>
            <div style={{display: 'flex', justifyContent: 'flex-end', margin: '1rem auto'}}>
                <SearchBox
                    handleSearch={updateSearchTerms}
                />
            </div>
           
            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>

                </div>
            }
            {
                PostSize >= Limit && 
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={onLoadMore}>Load More</Button>
                </div>
            }
        </div>
    )
}

export default LandingPage
