import { generateRandomInt } from '../helpers'

class Data {
    constructor(nameOrObject){
        this.lineColor = 'var(--defaultLineStrokeColor)';

        this.strokeWidth = 1.5;
        this.name = 'Temperature data';

        this.getMinTime = () => new Date(Math.min(...(this.data.map( d => d.time))));
        this.getMaxTime = () => new Date(Math.max(...(this.data.map( d => d.time))));
        this.getMinValue = () => Math.min(...(this.data.map( d => d.data)));
        this.getMaxValue = () => Math.max(...(this.data.map( d => d.data)));

        if(typeof(nameOrObject) == "object") Object.assign(this, nameOrObject);
        if(typeof(nameOrObject) == 'string') this.name = nameOrObject;
    }

    getTimeRange = () => [ this.getMinTime(), this.getMaxTime() ];
    getValueRange = () => [ this.getMinValue(), this.getMaxValue() ];
}

export const generateSingleEntry = () => ({
    time: new Date(),
    data: generateRandomInt(-10, 90)
})

export const generateDefaultRandomData = () => {
    let generationArgs = [
        new Date(),
        (new Date()).setDate((new Date()).getDate() + 1),
        -10, 90,
        20
    ]

    return generateRandomData(...generationArgs)
}

export const generateRandomData = (minTime, maxTime, minValue, maxValue, entriesCount) =>{
    const values = Array.from({length: entriesCount}, ()=>generateRandomInt(minValue, maxValue))
    const newData = [];
    const hours = (maxTime - minTime)/36e5; //36e5 == 3600000
    const part = hours/(values.length - 1)
    const h = Math.trunc(part);
    const partM = (part - h) * 60
    const m = Math.trunc(partM);
    const partS = (partM - m) * 60;
    const s = Math.trunc(partS);
    const ms = Math.trunc((partS - s) * 1000);

    const curH = minTime.getHours();
    const curM = minTime.getMinutes();
    const curS = minTime.getSeconds();
    const curMs = minTime.getMilliseconds();

    values.forEach((val, index) => {
        const newDate = new Date(minTime);
        newDate.setHours(curH + h*index, curM + m*index, curS + s*index, curMs + ms*index);
        newData.push({ time: newDate, data: val});
    });

    return newData;
}

export default Data;