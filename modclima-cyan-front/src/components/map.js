import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Card } from 'semantic-ui-react'

class MapContainer extends Component {

    mapStyles = {
        width: this.props.width + '%',
        height: this.props.height + '%',
    };

    render() {
        let lat = 0;
        let lng = 0;
        if (this.props.points.length > 0) {
            lat = this.props.points[0][0];
            lng = this.props.points[0][1]
        }
        return (
            <div>
                {this.props.points.length === 0 && <Card fluid color='red'
                    description='There is no field with these characteristics.'
                />}
                <Map
                    google={this.props.google}
                    zoom={8}
                    style={this.mapStyles}
                    initialCenter={{ lat: lat, lng: lng }}
                    center={{ lat: lat, lng: lng }}
                >
                    {this.props.points.map((point, i) => {
                        return (
                            <Marker key={i} position={{ lat: point[0], lng: point[1] }} />
                        );
                    })}

                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ''
})(MapContainer);
