import React,{useState,useEffect,useRef} from 'react';
import { Link, useParams} from 'react-router-dom';
import { Row, Col, Card, CardBody, Button, CardHeader, Table, CardTitle } from 'reactstrap'
import { AvForm } from 'availity-reactstrap-validation-safe'
import { getOrderData } from '../../action/orderAction'
import { useHistory } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import logo from "./logo192.jpg";

function OrderView () {
    const history = useHistory();
    const dispatch = useDispatch();
    const store = useSelector(state=>state.order);
    const { id } = useParams();
    const data = store.data;
    const componentRef = useRef();

    useEffect(()=>{
        dispatch(getOrderData(id));
    },[]);
    return (
        <div>
            <AvForm>
                <Card className='col-md-10 container'>
                    <CardHeader>
                        Order View
                        <Link to={'/order/list'} className={'float-right'}><Button color={'primary'} className='btn btn-primary btn-sm'>Back</Button></Link>
                        <Button className={'float-right btn btn-sm mr-1'} onClick={() => exportComponentAsJPEG(componentRef)}>
                            Export As image
                        </Button>
                         {/* <Button className={'float-right btn btn-sm mr-1'} onClick={() => exportComponentAsPDF(componentRef)}>
                            Export As PDF
                        </Button>
                        <Button className={'float-right btn btn-sm mr-1'} onClick={() => exportComponentAsPNG(componentRef)}>
                            Export As PNG
                        </Button>  */}
                    </CardHeader>
                    <CardBody>

                    <div ref={componentRef} className={'table-responsive'}>
                    <Table className="table table-bordered table-hover table-sm" >
                        <thead >
                            <tr><th> Date</th><td colSpan={3}>{store && store.data && store.data.length >0 ? store.data[0].updatedAt :''}</td> 
                            <td rowSpan={4} colSpan={1}><center><img width={'120px'} height={'120px'} src={logo}/></center></td>
                            </tr>
                            <tr><th> Order Id</th><td colSpan={3}>{store && store.data && store.data.length >0 ? '#'+store.data[0].order_id :''}</td></tr>
                            <tr><th> Dealer Name</th><td colSpan={3}>{store && store.data && store.data.length >0 ? store.data[0].users :''}</td></tr>
                            <tr><th> Status</th><td colSpan={3}>{store && store.data && store.data.length >0 ? store.data[0].status :''}</td></tr>
                        </thead>
                        <thead class="thead-light">
                            <tr>
                                <th> Category </th>
                                <th> Product </th>
                                <th> Quantity </th>
                                <th> Amount Per Quantity</th>
                                <th> Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        store && store.data && store.data.length >0 ? store.data.map((val,index) => {
                            return ( 
                                        <tr key={index}>
                                            <td>{val.category_name} </td>
                                            <td>{val.product_name}</td>
                                            <td>{val.quantity}</td>
                                            <td>₹ {val['mrp_'+val.sale_type]}.00</td>
                                            <td>₹ {val.amount}.00</td>
                                        </tr>
                            )
                            }):''
                            }
                            <tr><td colspan="4">Total Amount</td><td>{store && store.data && store.data.length >0 ? '₹'+ store.data[0].total_amount +'.00':''}</td></tr>
                            </tbody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
            </AvForm>
        </div>
    )
}
export default OrderView
