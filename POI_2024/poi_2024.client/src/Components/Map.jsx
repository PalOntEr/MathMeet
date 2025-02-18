import React from 'react';

const Map = ({ latitude, longitude }) => {

    const mapsApiKey = '';
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${latitude},${longitude}&zoom=15`;

    return (
        <div className="map-container">
            <iframe
                style={{ border: 0, height: '100%', width: '100%' }}
                src={mapUrl}
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default Map;