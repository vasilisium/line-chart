import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class ToolTip extends Component {
    // constructor(props){
    //     super();

    // }

    render() {
        const {
            children, isShown, divRef,
            top, left
        } = this.props;
        
        const propStyle = this.props?.style;

        if (!isShown) return null;

        const objectSettedStyle = this.style
        const resStyle = Object.assign({}, {top, left}, objectSettedStyle, propStyle)

        const content = (
            <div className='ChartTooltip' style={resStyle} ref={divRef}>
                {children}
            </div>
        )
        const tooltipContainer = document.getElementById('toolTipContainer');
        if (tooltipContainer) return ReactDOM.createPortal(content, tooltipContainer);
        return null;
    }
}

export default ToolTip