import React, { useState, useRef } from 'react';

import { bisectCenter as bisector } from 'd3';
import moment from 'moment';

import ToolTip from './ToolTip'

const Plot = (props) =>{
    const [isHovered, setIsHovered] = useState(false);
    const [pointersPos, setPointersPos] = useState([]);
    const [pointsIndexes, setPointsIndexes] = useState([]);
    const [tooltipPos, setTooltipPos] = useState({x:0, y:0});
    const [mousePos, setMousePos] = useState({x:0, y:0});
    const { 
        margin, size,
        xScale, yScale,
        lines
     } = props;
    const plotRectRef = useRef();
    const tooltipRef = useRef();

    // const too

    const move = (e) => {
        if (isHovered) {
            setMousePos({
                x: e.clientX,
                y: e.clientY,
            })
            const cursorPos = {
                x: e.clientX-plotRectRef.current.getBoundingClientRect().x,
                y: e.clientY-plotRectRef.current.getBoundingClientRect().y
            }
            const indexes = lines.map(line=>line.data)
                .map(dataArray=>dataArray.map(arrayElement=>arrayElement.time))
                .map(timeValue=>bisector(timeValue, xScale.invert(cursorPos.x)))

            setPointsIndexes(indexes);
            const pos = indexes.map((ci, i)=>({
                    x: xScale(lines[i].data[ci].time),
                    y: yScale(lines[i].data[ci].data)
            }))
            setPointersPos(pos)

            const ttRect = tooltipRef.current?.getBoundingClientRect();
            if (ttRect) setTooltipPos({
                x: e.clientX - (ttRect.width/2),
                y: e.clientY - ttRect.height - 15,
            });
        };
    }

    const renderTooltipContent = () =>{
        const xScale = props.xScale;
        const date = xScale.invert(mousePos.x);
        const formatedDate = moment(date).format('DD.MM.YYYY HH:mm').toString()

        return (<>
            <pre>{formatedDate}</pre>
            <div className='TTDataContainer'>
                { pointsIndexes.length>0 && pointsIndexes.map(
                    (pi,i)=> {
                        const di = pointsIndexes[i];
                        const value = props.lines[i].data[di].data;
                        const color = props.lines[i].lineColor
                        return (
                            <React.Fragment key={i}>
                                <div style={{width:10, height:10, backgroundColor:color, margin:'auto'}}></div>
                                <pre>{`${lines[i].name}: `}</pre>
                                <pre>{`${value}${props.labels.y.unit}`}</pre>
                            </React.Fragment>
                        )
                    } 
                )}
            </div>
        </>)
    }

    return (
        <g className='Plot' 
            transform={`translate(${margin.left}, ${margin.top})`} 
            width={size?.width} height={size?.height}
        >
            <rect className='PlotBackground' width={size?.width} height={size?.height}/>
            
            {props.children}
            { isHovered && pointersPos.map((pos, i)=>
                <circle cx={pos.x} cy={pos.y} r={5} className='PoinMarker' key={i} 
                style={{
                    strokeWidth: props.lines[i].strokeWidth,
                    stroke: props.lines[i].lineColor,
                }} />
            )}

            <ToolTip isShown={isHovered} divRef={tooltipRef}
                style={{
                    left: tooltipPos.x + 'px',
                    top: tooltipPos.y + 'px'
                }}
            >
                {renderTooltipContent()}
            </ToolTip>
           
            <rect fill={'transparent'} 
                ref={plotRectRef}
                width={size?.width} height={size?.height}
                onMouseMove={move}
                onMouseOver = {() =>setIsHovered(true)}
                onMouseLeave = {() =>setIsHovered(false)}
            ></rect>
        </g>
    )
}

export default Plot;