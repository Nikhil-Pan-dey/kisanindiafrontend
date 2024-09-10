import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {
    Table,
    Button,
    Container,
    Col,
    Row
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom' // Updated to useNavigate
import { useDispatch, useSelector } from 'react-redux'
import Message from './../../../../components/Message/Message'
import Loader from './../../../../components/Loader/Loader'
import { listLendMachineProducts, deleteLendMachineProduct, createLendMachine } from './../../../../actions/productLendMachinesActions'
import { MACHINE_CREATE_RESET } from './../../../../constants/productConstants'

const SeedList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate() // Updated to useNavigate

    const productLendMachinesList = useSelector(state => state.productLendMachinesList)
    const { loading: loadingMachine, error: errorMachine, productLendMachines } = productLendMachinesList

    const productLendMachinesDelete = useSelector(state => state.productLendMachinesDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productLendMachinesDelete

    const LendMachinesCreate = useSelector(state => state.LendMachinesCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: productCreate } = LendMachinesCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: MACHINE_CREATE_RESET })
        if (!userInfo.isAdmin && !userInfo) {
            navigate('/login') // Updated to useNavigate
        } else {
            if (successCreate) {
                navigate(`/admin/productlist/machine/${productCreate._id}/edit`) // Updated to useNavigate
            } else {
                dispatch(listLendMachineProducts())
            }
        }
    }, [dispatch, navigate, userInfo, successDelete, successCreate, productCreate])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteLendMachineProduct(id))
        }
    }

    const createMachineProductHandler = () => {
        dispatch(createLendMachine())
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1 style={{ marginBottom: '20px' }}>Lend Machines</h1>
                </Col>
                <Col className="text-end"> {/* Updated text-right to text-end */}
                    <Button className='my-3' onClick={createMachineProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            { loadingCreate && <Loader />}
            { errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            { loadingDelete && <Loader />}
            { errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingMachine ? <Loader />
                : errorMachine ? <Message variant='danger'>{errorMachine}</Message>
                    : (
                        <Table style={{ marginBottom: '50px' }} striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th> {/* Updated td to th for table headers */}
                                    <th>NAME</th>
                                    <th>TARGET PLANT</th>
                                    <th>MACHINE POWER</th>
                                    <th>EDIT / DELETE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productLendMachines.map(machine => (
                                        <tr key={machine._id}>
                                            <td>{machine._id}</td>
                                            <td>{machine.name}</td>
                                            <td>{machine.target_plant}</td>
                                            <td>{machine.machine_power}</td>
                                            <td>
                                                <LinkContainer to={`/admin/productlist/machine/${machine._id}/edit`}>
                                                    <Button variant="light" className="btn btn-sm">
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                </LinkContainer>
                                                <Button
                                                    variant="danger"
                                                    className="btn-sm ms-2" // Updated to ms-2
                                                    onClick={() => deleteHandler(machine._id)}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    )
            }
        </Container>
    )
}

export default SeedList
