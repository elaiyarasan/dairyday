import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, Button, CardHeader } from 'reactstrap'
import { AvForm, AvField, AvGroup, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation-safe'
import { CreateUserData } from '../../action/userAction'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function UserEdit () {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (event, value, error) => {
        dispatch(CreateUserData(value)).then((re)=>{
            alert('Created successfully');
            history.push('/user/list');
        }).catch(()=>{
            alert('error')
        });

    }
    return (
        <div>
            <AvForm onValidSubmit={handleSubmit}>
                <Card className='col-md-10 container'>
                    <CardHeader>User
                    <Link to={'/user/list'} className={'float-right'}><Button color={'primary'} className='btn btn-primary'>Back</Button></Link>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col className={'col-md-4'}>
                                <AvGroup>
                                    <label htmlFor='name'>Name</label>
                                    <AvField type='text' name='name' id='name' required/>
                                </AvGroup>
                            </Col>
                            <Col className={'col-md-4'}>
                                <AvGroup>
                                    <label htmlFor='email'>email</label>
                                    <AvField type='email' name='email' id='email' required/>
                                </AvGroup>
                            </Col>
                            <Col className={'col-md-4'}>
                                <AvGroup>
                                    <label htmlFor='phone'>phone</label>
                                    <AvField type='phone' name='phone' id='phone' maxLength={10} required/>
                                </AvGroup>
                            </Col>
                            <Col className={'col-md-4'}>
                                <AvGroup>
                                    <label htmlFor='password'>Password</label>
                                    <AvField type='password' name='password' id='password' required/>
                                </AvGroup>
                            </Col>
                            <Col className={'col-md-4'}>
                                <AvGroup>
                                <label htmlFor='role'>Role</label>
                                <AvField type="select" name="role" className={`select form-control`}>
                                    <option value={`admin`}>admin</option>
                                    <option value={`distributor`}>distributor</option>
                                 </AvField>
                                 </AvGroup>
                            </Col>
                            {/* <Col className={'col-md-4'}>
                                <AvGroup>
                                    <label htmlFor='display_order'>Display Order</label>
                                    <AvField type='number' name='display_order' id='display_order' required/>
                                </AvGroup>
                            </Col> */}
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
export default UserEdit
