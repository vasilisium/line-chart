import React, { useRef, useEffect } from 'react';
import { select, axisBottom } from 'd3';

const XAxis = (props) => {
    const ref = useRef();

    useEffect(()=>{

        const { xScale, transitionType, useTransition, transisionDuration  } = props;
        const plotHeight = props?.plotSize?.height;

        let axis = select(ref.current)
        if(useTransition) {
            axis = axis.transition();
            if (transitionType) axis = axis.ease(transitionType);
            if(transisionDuration) axis = axis.duration(transisionDuration)
        }
        axis.call(axisBottom(xScale))
            .attr('transform', `translate(0, ${plotHeight})`);
    }, 
    [ props ])

    return(
        <g className='XAxis' ref={ref}/>
    )
}

export default XAxis;