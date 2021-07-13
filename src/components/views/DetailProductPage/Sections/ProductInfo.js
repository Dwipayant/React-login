import React, { useState, useEffect} from 'react'
import { Descriptions, Button } from 'antd';
import '../Sections/detailView.css';

function ProductInfo(props) {
    const [Product, setProduct] = useState({})    
    useEffect(() => {
       if(props.detail){
        setProduct(props.detail)
       }
    }, [props.detail])

    return (<div>
                <table style={{"width":"100%"}}>
                    <tr>
                        <th>Model Wear</th>
                        <th>Height</th>
                        <th>Bust</th>
                    </tr>
                    <tr>
                        <td>{Product.modelWear}</td>
                        <td>{Product.height}</td>
                        <td>{Product.bust}</td>
                    </tr>
                    <tr>
                        <th>Waist</th>
                        <th>High Hip</th>
                        <th>Low Hip</th>
                    </tr>
                    <tr>
                        <td>{Product.waist}</td>
                        <td>{Product.highhip}</td>
                        <td>{Product.lowhip}</td>
                    </tr>
                </table>
            </div>)
}

export default ProductInfo
