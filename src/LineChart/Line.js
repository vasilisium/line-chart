import React, { Component } from 'react';
import { select, line, curveLinear } from 'd3';

export class Line extends Component{
    constructor(){
        super()
        this.ref = React.createRef();
    }

    componentDidMount(){
        this.drawLine();
    }

    componentDidUpdate(){
        this.drawLine()
    }

    drawLine(){
        const {
            data,
            xScale, yScale, 
        } = this.props

        if(xScale && yScale){
            const curvFunc = data?.curving || curveLinear;

            const lineFunc = line()
                .x(({time}) => xScale(time))
                .y(({data}) => yScale(data))
                .curve(curvFunc);

            const lineData = lineFunc(data.data);

            let path = select(this.ref.current);

            path.attr('class', 'LinePath')
            path.attr("fill", "none")
                .attr("stroke", data.lineColor)
                .attr("stroke-width", data.strokeWidth);
            path.attr('d', lineData);
        };
    }

    render = () => {
        const { data, xScale, yScale, } = this.props;

        if ( data && xScale && yScale ) return <path ref={this.ref}/>
        else return <></>
    }
}

export default Line;