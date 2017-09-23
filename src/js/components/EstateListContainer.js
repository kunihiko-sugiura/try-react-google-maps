import React from 'react';
import PropTypes from 'prop-types';
import Actions from  "../actions";

class EstateListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        let list = [];
        for( let marker of this.props.markers ) {
            list.push(
                <EstateListItemContainer
                    key={ marker.id }
                    marker={marker}
                    dispatch={this.props.dispatch}
                    selected={marker.id === this.props.selected}
                />
            );
        }

        return (
            <ul style={{
                margin: 0,
                padding:0,
                height: "100vh",
                overflowY: "scroll",
            }}>
                {list}
            </ul>
        );
    }
}
export default EstateListContainer;
EstateListContainer.propTypes = {
    dispatch: PropTypes.func,
    markers: PropTypes.array
};


class EstateListItemContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    onClickHandler(event) {
        this.props.dispatch( Actions.selected, this.props.marker.id );
    }
    render() {
        return (
            <li
                style={{
                    height: 200,
                    cursor:"pointer",
                    listStyleType: "none",
                    borderBottom: "1px solid #CCC",
                    backgroundColor: this.props.selected ? "#DAF7A6" : "#fff"
                }}
                onClick={this.onClickHandler.bind(this)}>
                <div>{ this.props.marker.name }</div>
                <div>{ this.props.marker.address }</div>
            </li>
        );
    }
}
EstateListContainer.propTypes = {
    dispatch: PropTypes.func,
    marker: PropTypes.object,
};
