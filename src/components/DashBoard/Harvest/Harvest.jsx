import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Table,
    Button,
    Container,
    Image
} from 'react-bootstrap'
import { Scrollbar } from 'react-scrollbars-custom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message/Message'
import Loader from '../../../components/Loader/Loader'
import { listSupplierProducts } from '../../../actions/supplierProduct'

const Harvest = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const supplierProductList = useSelector(state => state.supplierProductList)
    const { loading: loadingProducts, error: errorProducts, products } = supplierProductList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login')
        } else {
            dispatch(listSupplierProducts())
        }
    }, [dispatch, navigate, userInfo])

    return (
        <Container fluid>
            <Scrollbar style={{ width: '100%', height: 450 }}>
                {loadingProducts ? <Loader />
                    : errorProducts ? <Message variant='danger'>{errorProducts}</Message>
                        : (
                            <Table style={{ marginBottom: '50px', marginTop: "5px" }} striped bordered hover responsive className='table-sm'>
                                <thead style={{ fontWeight: "bold" }}>
                                    <tr>
                                        <th>NAME</th>
                                        <th>ADDRESS</th>
                                        <th>IMAGE</th>
                                        <th>DESCRIPTION</th>
                                        <th>CONTACT</th>
                                        <th>CROP</th>
                                        <th>MORE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map(product => (
                                            <tr key={product._id}>
                                                <td>{product.name}</td>
                                                <td>{product.address}</td>
                                                <td>
                                                    <Image src={product.image} rounded width="60px" />
                                                </td>
                                                <td>{product.description}</td>
                                                <td>
                                                    {product.phonenumber ? (
                                                        <a rel="noreferrer" target='_blank' href={`https://wa.me/${product.phonenumber}`}>
                                                            {product.phonenumber}
                                                        </a>
                                                    ) : 'Null'}
                                                </td>
                                                <td>{product.cropSelection}</td>
                                                <td>
                                                    {product.isReviwed ? (
                                                        <Link to={`/supplierproducts/${product._id}/review`}>
                                                            <Button
                                                                disabled
                                                                variant="danger"
                                                                className="btn-sm mr-2"
                                                            >
                                                                Reviewed
                                                            </Button>
                                                        </Link>
                                                    ) : (
                                                        <Link to={`/supplierproducts/${product._id}/review`}>
                                                            <Button
                                                                variant="primary"
                                                                className="btn-sm mr-2"
                                                            >
                                                                <i className="fas fa-eye"></i> Review
                                                            </Button>
                                                        </Link>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        )
                }
            </Scrollbar>
        </Container>
    )
}

export default Harvest
