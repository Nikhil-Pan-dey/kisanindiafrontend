import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api';
import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';
import { listSupplierProductsForAll } from './../../actions/supplierProduct';
import MapStyles from './MapStyles';
import Rating from './Rating/Rating';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 6.927079,
    lng: 79.861244
};

const Map = () => {
    const dispatch = useDispatch();
    const [selectedPlace, setSelectedPlace] = useState(null);

    const supplierProductForAllList = useSelector(state => state.supplierProductForAllList);
    const { loading: loadingProducts, error: errorProducts, products } = supplierProductForAllList;

    useEffect(() => {
        dispatch(listSupplierProductsForAll());
    }, [dispatch]);

    return (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                options={{ styles: MapStyles }}
            >
                {
                    loadingProducts ? <Loader />
                        : errorProducts
                            ? <Message variant='danger'>{errorProducts}</Message>
                            : (
                                products.map(place => (
                                    <Marker
                                        key={place._id}
                                        position={{
                                            lat: place.latitude,
                                            lng: place.longitude
                                        }}
                                        onClick={() => {
                                            setSelectedPlace(place);
                                        }}
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
                            position={{
                                lat: selectedPlace.latitude,
                                lng: selectedPlace.longitude
                            }}
                            onCloseClick={() => {
                                setSelectedPlace(null);
                            }}
                        >
                            <div>
                                <Image className="mx-auto d-block img-fluid mb-1" rounded width="120px" src={selectedPlace.image} alt={selectedPlace.name} />
                                <h4 style={{ textAlign: "center" }}>{selectedPlace.cropSelection}</h4>
                                <p>
                                    Description: {selectedPlace.description}<br />
                                    {
                                        selectedPlace.isReviewed
                                            ? (
                                                <p><Rating text="Rating" value={selectedPlace.rating} /></p>
                                            )
                                            : ''
                                    }
                                </p>
                            </div>
                        </InfoWindow>
                    )
                }
            </GoogleMap>
        </LoadScript>
    );
}

export default Map;
