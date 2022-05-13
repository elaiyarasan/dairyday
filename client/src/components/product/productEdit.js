import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, Button, CardHeader } from 'reactstrap'
import { AvForm, AvField, AvGroup, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation-safe'
import { CreateProductData } from '../../action/productAction'
import { getCategoryList } from '../../action/categoryAction'
import { useHistory } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

function ProductEdit () {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCategoryList());
    })
    const store = useSelector(state=>state.category);
    const handleSubmit = (event, value, error) => {
        dispatch(CreateProductData(value)).then((re)=>{
            alert('Created successfully');
            history.push('/product/list');
        }).catch(()=>{
            alert('error')
        });

    }
    return (
        <div>
            <AvForm onValidSubmit={handleSubmit}>
                <Card className='col-md-10 container'>
                    <CardHeader>
                        Product
                        <Link to={'/product/list'} className={'float-right'}><Button color={'primary'} className='btn btn-primary'>Back</Button></Link>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col className={'col-md-4'}>
                                <AvGroup>
                                    <label htmlFor='category_id'>Category Name</label>
                                    <AvField type="select" className="form-control" name="category_id" id="category_id" placeholder={'-Select Category-'} required>
                                        {store && store.allData ? store.allData.map((data,i)=>{
                                            return <option key={data._id} value={data._id}>{data.category_name} {data.quantity}</option>
                                            }):''
                                            }
                                    </AvField>
                                </AvGroup>
                            </Col>
                            <Col className={'col-md-4'}>
                                <AvGroup>
                                    <label htmlFor='product_name'>Product Name</label>
                                    <AvField type='text' name='product_name' id='product_name' required/>
                                </AvGroup>
                            </Col>
                            <Col className={'col-md-4'}>
                                <AvGroup>
                                    <label htmlFor='pieces_per_outer'>Pieces Per Outer</label>
                                    <AvField type='text' name='pieces_per_outer' id='pieces_per_outer' required/>
                                </AvGroup>
                            </Col>
                            <Col className={'col-md-4'}>
                                <AvGroup>
                                    <label htmlFor='mrp_per_outer'>MRP Per Outer</label>
                                    <AvField type='text' name='mrp_per_outer' id='mrp_per_outer' required/>
                                </AvGroup>
                            </Col>
                            <Col className={'col-md-4'}>
                                <AvGroup>
                                    <label htmlFor='mrp_per_pieces'>MRP Per Pieces</label>
                                    <AvField type='text' name='mrp_per_pieces' id='mrp_per_pieces' required/>
                                </AvGroup>
                            </Col>
                            <Col className={'col-md-4'}>
                                <AvGroup>
                                    <label htmlFor='display_order'>Display Order</label>
                                    <AvField type='text' name='display_order' id='display_order' required/>
                                </AvGroup>
                            </Col>
                            <Col className={'col-md-4'}>
                                <AvGroup>
                                <label htmlFor='sale_type'>Sale Type</label>
                                <AvRadioGroup inline name='sale_type' id='sale_type' required>
                                    <AvRadio label="Per Outer" value="per_outer"/>
                                    <AvRadio label="Per Pieces" value="per_pieces"/>
                                </AvRadioGroup>
                                </AvGroup>
                            </Col>
                            <Col className={'col-md-4'}>
                                <AvGroup>
                                <label htmlFor='visibility'>Visibility</label>
                                <AvRadioGroup inline name='visibility' id='visibility' required>
                                    <AvRadio label="Yes" value="Yes"/>
                                    <AvRadio label="No" value="No"/>
                                </AvRadioGroup>
                                </AvGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={'col-md-3'}>
                                <Button type='submit'>Submit</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </AvForm>
        </div>
    )
}
export default ProductEdit
