import React, { Component } from 'react';

import { curveLinear, curveStep, curveCardinal as curved } from 'd3';

import './LineView.css'

const curvingToString = (curFun) =>(
    {
        [curveLinear]: 'None',
        [curved]: 'Curved',
        [curveStep]: 'Steps',
    }[curFun]
)

const stringToCurving = (curCaption) => (
    {
        'None': curveLinear,
        'Curved': curved,
        'Steps': curveStep,
    }[curCaption]
)

class LineView extends Component {
    constructor(props){
        super();
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(e){
        this.props.changeHandler({
            ...this.props.data,
            [e.target.name]: 
                e.target.name==='curving' 
                ? stringToCurving(e.target.value) 
                : e.target.value
        })
    }

    render = () => {
        const curvProp =  curvingToString( this.props.data?.curving || curveLinear );
        // console.log(typeof curv)

        return (
            <div className='LineViewContainer'> 
                <input type='text' name='name' 
                    value={this.props.data.name}  onChange={this.changeHandler}
                />
                <input type='color' name='lineColor'
                    value={this.props.data.lineColor} onChange={this.changeHandler}
                />
                <input type='number' name='strokeWidth' 
                    min="1" max="3" step='0.5' 
                    value={this.props.data.strokeWidth}  onChange={this.changeHandler}
                />
                <select name='curving' value={curvProp}
                    onChange={this.changeHandler}
                >
                    <option value={'None'}>None</option>
                    <option value={'Curved'}>Curved</option>
                    <option value={'Steps'}>Steps</option>
                </select>
            </div>
        )
    }
}

export default LineView;