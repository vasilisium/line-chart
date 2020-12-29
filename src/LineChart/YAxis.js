import React, { useRef, useEffect } from 'react';
import { select, axisLeft } from 'd3';

const YAxis = (props) => {
    const ref = useRef();

    useEffect(()=>{

        const { yScale, transitionType, useTransition, transisionDuration } = props;
        
        let axis = select(ref.current)
        if(useTransition) {
            axis = axis.transition();
            if (transitionType) axis = axis.ease(transitionType);
            if(transisionDuration) axis = axis.duration(transisionDuration)
        }
        axis.call(axisLeft(yScale))
    }, 
    [ 
        props,
    ])

    return(
        <g className='YAxis' ref={ref}/>
    )
}

export default YAxis;