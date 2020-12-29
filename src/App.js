import React, { Component } from 'react';

// import { easeExpOut as anim } from 'd3'
// import { easeElasticOut as anim } from 'd3';

import LineChart from './LineChart/LineChart';
import Data, { generateDefaultRandomData } from './DataProvider/Data';
import LineView from './DataProvider/LineView'
import { randomColor } from './helpers'

const getNewDataSource = (props) => {
    const defaultLineProps = {
        lineColor: randomColor(),
        strokeWidth: 1.5,
        
        // curving: curveStep,
    }

    return new Data(Object.assign(
        {},
        defaultLineProps,
        { ...props, data: generateDefaultRandomData() },
    ))
}

class App extends Component {
    constructor(){
        super();

        this.changeHandler = this.changeHandler.bind(this);
        this.newLineNameInput = React.createRef();

        this.state = {
            lines:[
                getNewDataSource({ name: 'Line1'}),
            ]
        };
    }

    changeHandler(newData, index){
        const newLines = [...this.state.lines];
        newLines[index] = newData;
        this.setState({
            ...this.state, 
            lines:newLines
        })
    }

    render(){
        return (
            <div className="App">
                <LineChart 
                    lines={this.state.lines}
                    labels = {{
                        x: {
                            caption:"Time",
                            unit:''
                        },
                        y:{
                            caption:'Temperature',
                            unit:'\u2103'
                        }
                    }}

                    // useTransition = { true }
                    // transitionType = { anim }
                    // transisionDuration = { 700 } 
                />

                <div>
                    <div>
                        <input type='text' placeholder='line name' ref={this.newLineNameInput}></input>
                        <button onClick={() => {
                            const input = this.newLineNameInput.current;
                            const newLineName = input.value;
                            if( newLineName !== '' ) {
                                this.setState({lines: [...this.state.lines, getNewDataSource( { name: newLineName} )]})
                                input.value = '';
                            }
                            else {
                                alert('input the line name');
                                input.focus();
                            }
                        }}>Add data source</button>
                        {/* <input type="color" ></input> */}
                    </div>
                    <div style={{padding: '5px 0 10px 10px'}}>
                        {this.state.lines.map((d, ind) => <LineView data={d} 
                            changeHandler={ (newData) => this.changeHandler(newData, ind)}
                            key={ind}/>
                        )}
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default App;