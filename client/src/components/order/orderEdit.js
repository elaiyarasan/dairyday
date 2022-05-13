import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, Button, CardHeader } from 'reactstrap'
import { AvForm } from 'availity-reactstrap-validation-safe'
import { CreateOrederData } from '../../action/orderAction'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import OrderEntity from './orderEntity'

function OrderEdit () {
    const history = useHistory();
    const dispatch = useDispatch();
    const [entityCount,setEntityCount] = useState(1);
    const [orderData,setOrderData] = useState([]);
    const [totalAmount,setTotalAmount] = useState([]);

    const handleSubmit = () => {
        let label = {category_id:'Category',product_id:'Product',quantity:'Quantity'};
        let requiredFields = ['category_id','product_id','quantity'];
        for(let i=0;i<orderData.length;i++){
            for(let f=0;f<requiredFields.length;f++){
                if(!orderData[i][requiredFields[f]]){
                    alert(`Please enter ${label[requiredFields[f]]} in ${i+1}!`)
                }
            }
        }
        let total = 0;
        for(let i=0;i<totalAmount.length;i++){
            total += totalAmount[i];
        }
        let data = {};
        data['total_amount'] = total;
        const userData  = JSON.parse(localStorage.getItem('user'));
        if(userData.user && userData.user.email){
        data['user_id'] = userData.user._id;
        data['order_collection'] = orderData;
        dispatch(CreateOrederData(data)).then((re)=>{
            alert('Created successfully');
            history.push('/order/list');
        }).catch(()=>{
            alert('error')
        });
    }else{
        alert('error')
    }

    }
    

    return (
        <div>
            <AvForm>
                <Card className='col-md-10 container'>
                    <CardHeader>
                        Order Form
                        <Link to={'/order/list'} className={'float-right'}><Button color={'primary'} className='btn btn-primary'>Back</Button></Link>
                    </CardHeader>
                    <CardBody>
                    <OrderEntity entityCount={entityCount} setEntityCount={setEntityCount} setOrderData={setOrderData} orderData={orderData} totalAmount = {totalAmount} setTotalAmount={setTotalAmount}/>
                        <Row>
                            <Col className={'col-md-3'}>
                                <Button onClick={handleSubmit} type='submit'>Place Order</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </AvForm>
        </div>
    )
}
export default OrderEdit
