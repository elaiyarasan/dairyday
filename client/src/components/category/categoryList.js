import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Col, Button,Card, CardBody, Table, CardHeader} from 'reactstrap'
import { getCategoryList } from '../../action/categoryAction'
import { useDispatch,useSelector } from 'react-redux'

function CategoryList(){
    const dispatch = useDispatch();
    const store = useSelector(state=>state.category);

    useEffect(()=>{
        if(store.allData.length==0){

            dispatch(getCategoryList());
        }
    },[getCategoryList()])
return (
    <Fragment>
        <Card className='container'>
            <CardHeader>Category List
               <Link to={'/category/add'}> <Button   className='btn btn-sm col-md-1 float-right mt-3'>Create</Button></Link>
            </CardHeader>
        <CardBody>
            <Col md='12' sm='12'>
               <Table striped bordered hover>
                   <thead>
                       <th>Name</th>
                       <th>Quantity</th>
                       <th>Visibility</th>
                   </thead>
                   <tbody>
                 {store && store.allData ? store.allData.map((data,i)=>{
                          return <tr key={`list-${i}`}>
                             <td>{data.category_name}</td>
                           <td>{data.quantity}</td>
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

export default CategoryList