import React, { useEffect, useReducer } from 'react';
import { Container,Row,Col } from 'reactstrap';
import Card from '../../components/Card/Card';
import { withRouter } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const initalUsers = {
    loading: true,
    users: [],
    errors: '',
    pageNo: 1,
}
const reducer = (state,action) => {
    switch(action.type){
        case 'FETCH_SUCCESS':
            return {
                loading: action.loading,
                users: action.payload,
                errors: '',
                pageNo: action.pageNo,
            }
        case 'FETCH_ERROR':
            return {
                loading: false,
                users: [],
                errors: "Something went wrong",
                pageNo: 1,
            }

        default:
            return state
    }
}
function Body() {
    const { pageNo } = useParams();
    const [state,DispatchState] = useReducer(reducer,initalUsers);

    useEffect(()=>{
        // console.log(pageNo);
        let startIndex = ((pageNo || 1) - 1) * 18;
        const data = fetch("https://raw.githubusercontent.com/MohitSojitra/react-blog-website/master/src/utils/db.json")
        data.then((res)=>res.json()).then((res) => res.authors.slice(startIndex, startIndex + 18)).then((res)=>{
            // console.log(res);
            DispatchState({
                type: 'FETCH_SUCCESS',
                loading: false,
                payload: res,
                pageNo: parseInt(),
            })
        }).catch((err)=>{
            DispatchState({
                type: 'FETCH_ERROR',
            })
        })
        // console.log(match.params.pageNo);
    },[])
  return (
    <div>
      <Container>
        {state.error !== '' ? (
            <h1 className='text-center text-black'>{state.error}</h1>
        ):('')}
        {state.laoding ? (
            <h1 className='text-black'>Loading... Please wait...</h1>
        ):('')}

        <Row className='flex flex-wrap justify-center gap-4'>
            {state.users.map((user) => (
                <Col key={user.id} md={4} sm={6} xs={12}>
                    <Card name={`${user.firstName} ${user.lastName}`} id={user.id} />
                </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default Body;
