import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom' // Updated to useNavigate
import { Container } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2'
import Message from '../../../Message/Message'
import Loader from '../../../Loader/Loader'
import { listOrders } from '../../../../actions/orderAction'

const BarChart = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate() // Updated to useNavigate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderList = useSelector(state => state.orderList)
    const { loading, error } = orderList

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/login') // Updated to useNavigate
        }
    }, [dispatch, navigate, userInfo])

    const data = {
        labels: ['December', 'January'],
        datasets: [
            {
                label: 'Order List',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [1, 5] // Ensure the data array length matches labels length
            }
        ]
    }

    return (
        <Container style={{ marginTop: '40px' }}>
            <h4>Orders</h4>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Bar
                            data={data}
                            width={100}
                            height={180}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    )
            }
        </Container>
    )
}

export default BarChart
