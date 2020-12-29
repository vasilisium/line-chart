import React, {Component} from 'react';
import { 
    scaleLinear, 
    scaleTime,
} from 'd3';

import Plot from './Plot';
import XAxis from './XAxis';
import YAxis from './YAxis';
import Line from './Line';
import { 
    getRefSize,
    //  getMaxValue, deepValue
} from '../helpers';
import './LineChart.css';

class LineChart extends Component {
    constructor(props){
        super()
        this.svgContainerRef = React.createRef()
        this.svgRef = React.createRef()

        this.handleResize = this.handleResize.bind(this);
        this.resizeObserver = new ResizeObserver( this.handleResize )

        this.state = {};
    }

    componentDidMount(){
        this.resizeObserver.observe(this.svgContainerRef.current);
        this.updateScales();
    }
    componentWillUnmount(){
        this.resizeObserver.unobserve(this.svgContainerRef.current);
    }

    handleResize(){
        this.updateSizes();
    }

    updateSizes(){
        const svgSize = getRefSize(this.svgRef);
        const plotSize = this.getPlotSize(svgSize);

        this.setState((state) => ({ 
            ...state,
            plotSize,
        }))

        return plotSize;
    }
    updateScales(){
        const [ plotWidth, plotHeight, ] = 
            [ this.state?.plotSize?.width, this.state?.plotSize?.height, ];

        if(!plotWidth) return { xScale: undefined, yScale: undefined }

         const ranges = this.getRanges();

        const timesDomain = ranges.timeRange;
        const timesRange = [0, plotWidth];

        const valuesDomain = ranges.valueRange;
        const valuesRange = [plotHeight, 0];

        const xScale = scaleTime().domain(timesDomain).range(timesRange)
        const yScale = scaleLinear().domain(valuesDomain).range(valuesRange)

        return { xScale, yScale};
    }

    getMargin = () => Object.assign({}, { 
        top: 20, left: 30, bottom: 30, right: 20,
        ...this.props?.margin,
    });
    getPlotSize = (svgSize) => {
        if(!svgSize) return null;
        const { width, height } = svgSize;
        const margin = this.getMargin();

        return { 
            width: width - margin.left - margin.right,
            height: height - margin.top - margin.bottom
        };
    }
    getTransitionSettings = () => ({
        useTransition: this.props?.useTransition,
        transitionType: this.props?.transitionType,
        transisionDuration: this.props?.transisionDuration,
    });
    getRanges(){
        const getRange = (l) => ({ timeRange:l.getTimeRange(), valueRange:l.getValueRange()});
        const ranges = this.props.lines
            .map( l => getRange(l))
            .reduce( 
                (r1, r2) => ({
                    timeRange:[
                        new Date(Math.min(
                            r1.timeRange[0],
                            r2.timeRange[0]
                        )), 
                        new Date(Math.max(
                            r1.timeRange[1],
                            r2.timeRange[1]
                        )),
                    ], 
                    valueRange:[
                        Math.min(
                            r1.valueRange[0],
                            r2.valueRange[0]
                        ), 
                        Math.max(
                            r1.valueRange[1],
                            r2.valueRange[1]
                        ),
                    ]
                })
            )
        return ranges;
    };

    render(){
        const margin = this.getMargin();
        const {xScale, yScale} = this.updateScales();
        const transitionSettings = this.getTransitionSettings();
        const {labels} = this.props;

        return (
            <div ref={ this.svgContainerRef } className='ChartContainer'>
                <svg ref={ this.svgRef } className='LineChart'>

                    { this.props?.lines.length===0 &&
                        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">No data</text>
                    }   

                    { this.props?.lines.length>0 && this.state.plotSize && xScale && yScale &&
                        <Plot {...
                        { 
                            margin, xScale, yScale, labels,
                            lines: this.props.lines,
                            size: this.state.plotSize,
                        }}>
                            <XAxis
                                xScale = { xScale }
                                plotSize = { this.state.plotSize }
                                {...transitionSettings}
                            />
                            <YAxis 
                                yScale = { yScale }
                                plotSize = { this.state.plotSize }
                                {...transitionSettings}
                            />
                            
                            { this.props.lines.map( (l, index) => { return (
                                <Line
                                    data={l} 
                                    xScale = { xScale }
                                    yScale = { yScale }
                                    
                                    key={index}
                                />
                            )})} 
                        </Plot>
                    }
                </svg>
                <div id='toolTipContainer'/>
            </div>
    )}
}

export default LineChart;