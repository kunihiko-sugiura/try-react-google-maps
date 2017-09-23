import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, InfoWindow, Marker } from "react-google-maps";

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
            icon={ marker.icon ? marker.icon : null } >
            { props.selected === marker.id && (
                <InfoWindow>
                    <div>{marker.name}</div>
                </InfoWindow>)
            }
        </Marker>
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
                selected={this.props.selected}
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
