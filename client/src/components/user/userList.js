import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Col, Button,Card, CardBody, Table, CardHeader} from 'reactstrap'
import { getUserList } from '../../action/userAction'
import { useDispatch,useSelector } from 'react-redux'

function UserList(){
    const dispatch = useDispatch();
    const store = useSelector(state=>state.users);

    useEffect(()=>{
        dispatch(getUserList())
    },[])
return (
    <Fragment>
        <Card className='container'>
            <CardHeader>User List
               <Link to={'/user/add'}> <Button   className='btn btn-sm col-md-1 float-right mt-3'>Create</Button></Link>
            </CardHeader>
        <CardBody>
            <Col md='12' sm='12'>
               <Table striped bordered hover>
                   <thead>
                       <th>Name</th>
                       <th>Mobile Number</th>
                       <th>Email</th>
                       <th>Role</th>
                   </thead>
                   <tbody>
                 {store && store.allData ? store.allData.map((data,i)=>{
                          return <tr key={`list-${i}`}>
                             <td>{data.name}</td>
                           <td>{data.phone}</td>
                            <td>{data.email}</td> 
                            <td>{data.role}</td> 
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

export default UserList