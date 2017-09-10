import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
// const googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.28&libraries=places,geometry&language=ja&region=JP&key=" + process.env.GMAP_API_KEY;

const GoogleMapWrap = withGoogleMap(props => (
    <GoogleMap
        // googleMapURL={googleMapURL}
        defaultZoom={props.zoom}
        defaultCenter={props.center}
        // center={props.center}
        ref={(map) => map && map.panTo(props.center)}
    >
        {props.markers.map((marker, index) => (
        <Marker
            key={ marker.position.lat + ":" + marker.position.lng  }
            position={ marker.position }
            defaultAnimation={2}
            icon={ marker.icon ? marker.icon : null }
        />
        ))}
    </GoogleMap>
));

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <GoogleMapWrap
                zoom={this.props.zoom}
                center={this.props.center}
                markers={this.props.markers}
                containerElement={
                    <div style={{ height: `100%` }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
            />
        );
    }
}
export default MapContainer;
MapContainer.propTypes = {
    zoom: PropTypes.number,
    markers: PropTypes.array,
    center: PropTypes.object,
};
