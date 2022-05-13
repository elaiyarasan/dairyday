import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Col, Button,Card, CardBody, Table, CardHeader} from 'reactstrap'
import { getOrderList } from '../../action/orderAction'
import { useDispatch,useSelector } from 'react-redux'

function OrderList(){
    const dispatch = useDispatch();
    const store = useSelector(state=>state.order);
    useEffect(()=>{
        dispatch(getOrderList((JSON.parse(localStorage.getItem('user'))).user._id));
    },[getOrderList]);
    console.log(store)
return (
    <Fragment>
        <Card className='container'>
            <CardHeader>Order List
               <Link to={'/order/add'}> <Button   className='btn btn-sm col-md-1 float-right mt-3'>Create</Button></Link>
            </CardHeader>
        <CardBody>
            <Col md='12' sm='12'>
            {
               <Table striped bordered hover>
               <thead>
                   <tr>
                   <th>Order Id</th>
                   <th>Status</th>
                   <th>Order product count</th>
                   <th>Orderd By</th>
                   <th>Amount</th>
                   <th>Action</th>
                   </tr>
               </thead>
               <tbody key={1}>
               {
              store && store.allData ? store.allData.map((val,index) => {
                  return ( 
                    <tr key={index}>
                        <td>{'#'+val._id}</td>
                        <td>{val.status}</td>
                        <td>{val.count}</td>
                        <td>{val.user_email}</td>
                        <td>{`₹${val.amount}.00`}</td>
                        <td><Link to={`/order/view/${val._id}`}><button className='btn btn-success'>View</button></Link></td>
                    </tr>)
                }):''
                }
               </tbody>
           </Table>
                
            }
            </Col>
        </CardBody>
        </Card>
    </Fragment>
)
}

export default OrderList