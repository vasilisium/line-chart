import React, { Component } from 'react';
// import Data from './Data';

class DataProvider extends Component {
    // constructor(){
    //     super();
    // }

    getTimeRange = () => this.props.data.getTimeRange();
    getValueRange = () => this.props.data.getValueRange();

    render = () => <></>;
}

export default DataProvider;