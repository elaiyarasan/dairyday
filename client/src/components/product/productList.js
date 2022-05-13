import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Col, Button,Card, CardBody, Table, CardHeader} from 'reactstrap'
import { getProductList } from '../../action/productAction'
import { useDispatch,useSelector } from 'react-redux'

function ProductList(){
    const dispatch = useDispatch();
    const store = useSelector(state=>state.product);

    useEffect(()=>{
        dispatch(getProductList());
    },[dispatch]);
return (
    <Fragment>
        <Card className='container'>
            <CardHeader>Product List
               <Link to={'/product/add'}> <Button   className='btn btn-sm col-md-1 float-right mt-3'>Create</Button></Link>
            </CardHeader>
        <CardBody>
            <Col md='12' sm='12'>
               <Table striped bordered hover>
                   <thead>
                       <th>Category Name</th>
                       <th>Product Name</th>
                       <th>Pieces Per Outer</th>
                       <th>Mrp Per Outer</th>
                       <th>Mrp Per Pieces</th>
                       <th>Visibility</th>
                   </thead>
                   <tbody>
                 {store && store.allData ? store.allData.map((data,i)=>{
                          return <tr key={`list-${i}`}>
                                    <td>{data.category.category_name}<small> {data.category.quantity}</small></td>
                                    <td>{data.product_name}</td>
                                    <td>{data.pieces_per_outer}</td>
                                    <td>{data.mrp_per_outer}</td>
                                    <td>{data.mrp_per_pieces}</td>
                                    <td>{data.visibility}</td> 
                                </tr>
                    }):''
                    }
                   </tbody>
               </Table>
            </Col>
        </CardBody>
        </Card>
    </Fragment>
)
}

export default ProductList