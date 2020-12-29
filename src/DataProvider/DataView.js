import React, { Component } from 'react';

class DataView extends Component {
    constructor(props){
        super();
        // this.state = new Data(props.data);
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(e){
        this.props.changeHandler({...this.props.data, [e.target.name]: e.target.value})
    }

    render(){

        return (
            <div>
                <input type='text' value={this.props.data.name} name='name'  onChange={this.changeHandler}/>
                <input type='color' value={this.props.data.lineColor} name='lineColor' onChange={this.changeHandler}/>
                <input type='number' min="1" max="3" step='0.5' value={this.props.data.strokeWidth} name='strokeWidth' onChange={this.changeHandler}/>
                <select name='curving' 
                    // onChange={this.changeHandler}
                >
                    <option value={curveLinear} selected>None</option>
                    <option value={curveCardinal}>Curved</option>
                    <option value={curveStep}>Steps</option>
                </select>
                <div></div>
            </div>
        )
    }
}

export default DataView;