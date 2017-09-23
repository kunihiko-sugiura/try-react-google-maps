import "babel-polyfill";
import * as React from 'react';
import ReactDOM from 'react-dom';

import MapContainer from "./components/MapContainer";
import EstateListContainer from  "./components/EstateListContainer";
import Actions from  "./actions";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 10,
            center: {
                lat: 35.1837659,
                lng: 136.9002941
            },
            selected: null,
            markers: [
                {
                    id: 0,
                    name: "名古屋城",
                    address: "愛知県名古屋市中区本丸１−１",
                    icon: null,
                    position: {
                        lat: 35.1837659,
                        lng: 136.9002941
                    }
                },
                {
                    id: 1,
                    name: "名古屋城東門",
                    address: "愛知県名古屋市緑区鳴海町城１",
                    icon: null,
                    position: {
                        lat: 35.1839971,
                        lng: 136.9031292
                    }
                },
                {
                    id: 2,
                    name: "岡崎城",
                    address: "愛知県岡崎市康生町 康生町561-1番地",
                    icon: {
                        url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                    },
                    position: {
                        lat: 34.9563427,
                        lng: 137.158794
                    }
                },
                {
                    id: 3,
                    name: "岐阜城",
                    address: "岐阜県岐阜市天主閣１８",
                    icon: null,
                    position: {
                        lat: 35.4338899,
                        lng: 136.7821026
                    }
                },
            ]
        };
    }
    dispatch( actionType, value ) {
        switch (actionType) {
            case Actions.selected:
                const marker = this.state.markers[value];
                this.setState(
                    Object.assign(
                        {},
                        this.state,
                        {
                            center: marker.position,
                            selected: value,
                        }
                    ));
                break;
        }
    }
    render() {
        return(
            <div style={{
                overflow: "hidden"
            }}>
                <div
                    style={{
                        width: "70vw",
                        float: "left",
                        position: "relative",
                        height: "100vh",
                    }}>
                        <MapContainer
                            zoom={this.state.zoom}
                            selected={this.state.selected}
                            markers={this.state.markers || []}
                            center={ this.state.center }
                        />
                </div>
                <div style={{
                    height: "100vh",
                    width: "28vw",
                    float: "right",
                }}>
                    <EstateListContainer
                        selected={this.state.selected}
                        markers={this.state.markers}
                        dispatch={this.dispatch.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('app')
);
