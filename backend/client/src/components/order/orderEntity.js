import React, { useEffect,useState } from 'react';
import { AvForm, AvField, AvGroup, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation-safe'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, CardBody, Button, CardHeader, CardFooter } from 'reactstrap'
import Select from 'react-select';
import { getCategoryList } from '../../action/categoryAction'
import { getProductListByCategory,getProductList } from '../../action/productAction'
const OrderEntity = ({ entityCount, setEntityCount, setOrderData, orderData ,totalAmount, setTotalAmount}) => {
    const dispatch = useDispatch();
    const categoryStore = useSelector(state=>state.category);
    const productStore = useSelector(state=>state.product);
    const [categories,setCategories] = useState([]);
    const [demo,setDemo] = useState(0);
    const [sumAmount,setSumAmount]=useState(0);
  useEffect(() => {
   dispatch(getCategoryList())
   dispatch(getProductListByCategory())
   dispatch(getProductList())
  },[]);

if(categoryStore && categoryStore.allData){
    let data = categoryStore.allData;
    if(data.length>0){
        data.forEach(category => {
            categories.push( { value: category._id, label: category.category_name })
        });
    }
}

const handleCategoryChange = (index,_id) =>{
    orderData[index] = {};
    orderData[index]['category_id'] = _id;
    totalAmount[index]=0;
    let total = 0;
    for(let i=0;i<totalAmount.length;i++){
        total += totalAmount[i];
    }
    setSumAmount(total);
    console.log(orderData)
    setDemo(demo+1);
}

const handleProduct = (index,value)=>{
    for(let o=0;o<orderData.length;o++){
        if((orderData[o]['category_id']  && orderData[o]['category_id'] === orderData[index]['category_id']) && (orderData[o]['product_id'] && orderData[o]['product_id'] === value)){
            alert('You where selected the existing product, Please select different product!');
            return false;
        }
    }
    if(!orderData[index]){
        orderData[index] = {};
    }
    orderData[index]['product_id'] = value;
    orderData[index]['quantity'] = '';
    orderData[index]['amount'] = '0.00';
    totalAmount[index]=0;
    let total = 0;
    for(let i=0;i<totalAmount.length;i++){
        total += totalAmount[i];
    }
    setSumAmount(total);
    setDemo(demo+1);
}

const handleOrderCalculation = (index,value)=>{
    if(orderData[index] && orderData[index]['product_id'] && orderData[index]['product_id']['value']){
        let data = productStore.allData.find(element=>element._id == orderData[index]['product_id']['value']);
        orderData[index]['amount'] = (value) * data[`mrp_${data['sale_type']}`];
        orderData[index]['sale_type'] = data['sale_type'];
        totalAmount[index] = orderData[index]['amount'];
        orderData[index]['quantity'] = value;
        orderData[index]['pieces_per_outer'] = data['pieces_per_outer'];
        orderData[index]['mrp_per_outer'] = data['mrp_per_outer'];
        orderData[index]['mrp_per_pieces'] = data['mrp_per_pieces'];
        let total = 0;
         for(let i=0;i<totalAmount.length;i++){
             total += totalAmount[i];
         }   
    console.log(orderData)

        setSumAmount(total);
        setDemo(demo+1);
    }else{
        alert('Please Enter required data!');
        if(orderData[index] && orderData[index]['quantity']){
            orderData[index]['quantity'] = '';
        }
        setDemo(demo+1);
        return false;
    }
}

const removeElement = (index) =>{
        orderData.splice(index,1);
        setEntityCount(entityCount-1);
        totalAmount[index]=0;
        let total = 0;
        for(let i=0;i<totalAmount.length;i++){
            total += totalAmount[i];
        }   
       setSumAmount(total);
       console.log(orderData);
       setDemo(demo+1);
    }

    const entityReturn = () => {
        const htmlElement = [];
        for (let i = 0; i < entityCount; i++) {
            htmlElement.push(
                <Card className='container mb-2' key={`element${i}`}>
                    <Row>
                        <Col className={'col-md-1 btn mt-4'}> <span>{i+1}</span></Col>
                        <Col className={'col-md-3'}>
                            <AvGroup>
                                <label htmlFor={`category_id${i}`}>Category Name</label>
                                <Select
                                    onChange={(e)=>{handleCategoryChange(i,e.value)}}
                                    options={categories}
                                    name={`category_id${i}`}
                                />
                            </AvGroup>
                        </Col>
                        <Col className={'col-md-3'}>
                            <AvGroup>
                                <label htmlFor={`product_id${i}`}>Product Name</label>
                                <Select 
                                    options={orderData[i] && orderData[i]['category_id'] ? productStore.categoryBasedProduct[orderData[i]['category_id']]:[]} 
                                    name={`product_id${i}`}
                                    id={`product_id${i}`}
                                    value={orderData[i] && orderData[i]['product_id'] ? orderData[i]['product_id'] :[]}
                                    onChange={(e)=>{handleProduct(i,e)}}
                                 />
                            </AvGroup>
                        </Col>
                        <Col className={'col-md-1'}>
                            <AvGroup>
                                <label htmlFor={`quantity${i}`}>Quantity</label>
                                <AvField type='text' value={orderData && orderData[i] && orderData[i]['quantity'] ? orderData[i]['quantity'] : ''} name={`quantity${i}`} onChange={(e)=>handleOrderCalculation(i,e.target.value)} id={`quantity${i}`}/>
                            </AvGroup>
                        </Col>
                        <Col className={'col-md-2'}>
                            <AvGroup>
                                <label htmlFor={`amount${i}`}>Amount</label>
                                <AvField value={orderData && orderData[i] && orderData[i]['amount'] ? orderData[i]['amount'] : '0.00'} type='0.00' readOnly name={`amount${i}`} id={`amount${i}`}/>
                            </AvGroup>
                        </Col>
                        <Col className={'col-md-1 mt-1'}>
                        {i !== 0 ? 
                            <AvGroup>
                                <label htmlFor={`amount${i}`}></label>
                                <Button className='btn btn btn-primary' id={`removeButton${i}`} onClick={() => {removeElement(i)}}>Remove</Button> 
                            </AvGroup>
                            :''
                        }
                        </Col> 
                        <Col className={'col-md-12'}>
                            <AvGroup>
                                {
                                    i === entityCount - 1 ? 
                                    <CardFooter>
                                        <span id='total_amount'>{`Total Amount Rs ${sumAmount}`}</span>
                                        <Button className='float-right' onClick={() => { setEntityCount(entityCount + 1) }}>Add</Button> 
                                    </CardFooter>
                                    : ''
                                }
                            </AvGroup>
                        </Col>
                    </Row>
                </Card>
            )
        }
        
        return (htmlElement);
    }
    return (entityReturn())

}

export default OrderEntity;