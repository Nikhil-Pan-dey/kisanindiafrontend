import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'react-bootstrap'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api'
import Message from '../../Message/Message'
import Loader from '../../Loader/Loader'
import { listSupplierProducts } from '../../../actions/supplierProduct'
import MapStyles from './MapStyles'
import Rating from './Rating/Rating'

const center = { lat: 6.927079, lng: 79.861244 } // Default center for the map
const mapContainerStyle = { width: '100%', height: '400px' } // Adjust map size as needed
const options = { styles: MapStyles }

const Map = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate() // Updated to useNavigate

    const [selectedPlace, setSelectedPlace] = useState(null)

    const supplierProductList = useSelector(state => state.supplierProductList)
    const { loading: loadingProducts, error: errorProducts, products } = supplierProductList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login') // Updated to useNavigate
        } else {
            dispatch(listSupplierProducts())
        }
    }, [dispatch, navigate, userInfo])

    const { isLoaded, loadError } = useLoadScript({
        // googleMapsApiKey: 'AIzaSyDy9aOFZCQibPub3XitK2FkcjwUCO7_1Wg' // Replace with your actual API key
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
    })

    if (loadError) return <Message variant='danger'>Error loading maps</Message>
    if (!isLoaded) return <Loader />

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
            options={options}
        >
            {
                loadingProducts ? <Loader />
                    : errorProducts
                        ? <Message variant='danger'>{errorProducts}</Message>
                        : (
                            products.map(place => (
                                <Marker
                                    key={place._id}
                                    position={{ lat: place.latitude, lng: place.longitude }}
                                    onClick={() => setSelectedPlace(place)}
                                    icon={{
                                        url: '/mapIcon.svg',
                                        scaledSize: new window.google.maps.Size(25, 25)
                                    }}
                                />
                            ))
                        )
            }
            {
                selectedPlace && (
                    <InfoWindow
                        position={{ lat: selectedPlace.latitude, lng: selectedPlace.longitude }}
                        onCloseClick={() => setSelectedPlace(null)}
                    >
                        <div>
                            <Image className="mx-auto d-block img-fluid mb-1" rounded width="120px" src={selectedPlace.image} alt={selectedPlace.name} />
                            <h4 style={{ textAlign: "center" }}>{selectedPlace.cropSelection}</h4>
                            <p>
                                Farmer: <span style={{ fontWeight: "bold" }}>{selectedPlace.name}</span><br />
                                Description: {selectedPlace.description}<br />
                                Address: {selectedPlace.address}<br />
                                Reviewed: {
                                    selectedPlace.isReviwed
                                        ? (<>
                                            <i className="fas fa-check" style={{ color: "green" }}></i>
                                            <p><Rating text="Rating" value={selectedPlace.rating} /></p>
                                        </>
                                        )
                                        : (<i className="fas fa-times" style={{ color: "red" }} />)
                                }
                            </p>
                        </div>
                    </InfoWindow>
                )
            }
        </GoogleMap>
    )
}

export default Map
