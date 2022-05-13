import React from "react";
import {login} from '../../action/authAction'
import { AvForm, AvInput, AvGroup } from 'availity-reactstrap-validation-safe'
import { Button, Label, Card, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function Login()  {

  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogin = (event, errors, values) =>{
    if(errors.length === 0){
      dispatch(login(values)).then(()=>{
            var userData = JSON.parse(localStorage.getItem('user'));
            if(userData.token){
                history.push(`/order/list`)
            }
        })
    }else{
        alert('Please enter valid '+errors[0]);
        return false;
    }
  }

    return (
      <div className="col-md-12">
        <div className="card card-container row col-md-6">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
            style={{height:'100px',width:'100px',alignSelf: 'center'}}
          />
            <Card>
            <CardBody>
            <AvForm onSubmit={handleLogin}>
                <AvGroup>
                    <Label className='form-label' for='email'>Email <span className="text-danger">*</span></Label>
                    <AvInput type='text' id='email' name='email' placeholder='Enter Email' required />
                </AvGroup>
                <AvGroup>
                    <Label className='form-label' for='password'>Password <span className="text-danger">*</span></Label>
                    <AvInput type='text' id='password' name='password' placeholder='Enter Password' required />
                </AvGroup>
                <Button className='mb-1 mb-sm-0 mr-0 mr-sm-1' type='submit' color='primary'>
                    Login
                </Button>
            </AvForm>
            </CardBody>
            </Card>
        </div>
      </div>
    );
}
export default Login