import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, Button, CardHeader } from 'reactstrap'
import { AvForm, AvField, AvGroup, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation-safe'
import { CreateCategoryData } from '../../action/categoryAction'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function CategoryEdits () {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (event, value, error) => {
        dispatch(CreateCategoryData(value)).then((re)=>{
            alert('Created successfully');
            history.push('/category/list');
        }).catch(()=>{
            alert('error')
        });

    }
    return (
        <div>
            <AvForm onValidSubmit={handleSubmit}>
                <Card className='col-md-10 container'>
                    <CardHeader>Category
                    <Link to={'/category/list'} className={'float-right'}><Button color={'primary'} className='btn btn-primary'>Back</Button></Link>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col className={'col-md-4'}>
                                <AvGroup>
                                    <label htmlFor='category_name'>Name</label>
                                    <AvField type='text' name='category_name' id='category_name' required/>
                                </AvGroup>
                            </Col>
                            <Col className={'col-md-4'}>
                                <AvGroup>
                                    <label htmlFor='quantity'>Quantity</label>
                                    <AvField type='text' name='quantity' id='quantity' required/>
                                </AvGroup>
                            </Col>
                            <Col className={'col-md-4'}>
                                <AvGroup>
                                    <label htmlFor='display_order'>Display Order</label>
                                    <AvField type='number' name='display_order' id='display_order' required/>
                                </AvGroup>
                            </Col>
                            <Col className={'col-md-4'}>
                                <label htmlFor='visibility'>visibility</label>
                                <AvGroup>
                                <AvRadioGroup inline name='visibility' id='visibility' required>
                                    <AvRadio label="Yes" value="Yes"/>
                                    <AvRadio label="No" value="No"/>
                                </AvRadioGroup>
                                </AvGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={'col-md-3'}>
                                <Button  type='submit'>Submit</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </AvForm>
        </div>
    )
}
export default CategoryEdits
