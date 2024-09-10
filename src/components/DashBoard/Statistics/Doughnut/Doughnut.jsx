import React, { useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useNavigate } from 'react-router-dom' // Updated to useNavigate
import { useDispatch, useSelector } from 'react-redux'
import Message from './../../../../components/Message/Message'
import Loader from './../../../../components/Loader/Loader'
import { listSupplierProducts } from './../../../../actions/supplierProduct'

const data = {
    labels: ['Paddy', 'Seeds', 'Fruits'],
    datasets: [{
        data: [2, 1, 3],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
}

const DoughnutComponent = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate() // Updated to useNavigate

    const supplierProductList = useSelector(state => state.supplierProductList)
    const { loading: loadingProducts, error: errorProducts } = supplierProductList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login') // Updated to useNavigate
        } else {
            dispatch(listSupplierProducts())
        }
    }, [dispatch, navigate, userInfo])

    return (
        <div>
            <h4 style={{ marginTop: "40px", textAlign: "center" }}>Suppliers</h4>
            {loadingProducts ? <Loader />
                : errorProducts ? <Message variant='danger'>{errorProducts}</Message>
                    : (
                        <Doughnut data={data} />
                    )
            }
        </div>
    )
}

export default DoughnutComponent
