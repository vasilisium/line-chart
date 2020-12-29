export const getMaxValue = (valuesArray) => Math.max(...valuesArray);
export const getRefSize = (ref) => {
    if (!ref.current) return null;
    const { width, height } = ref.current.getBoundingClientRect();

    const res = { width, height };

    return res;
}

export const deepValue = (obj, path) => {
    for (var i=0, paths = path.split('.'), len=paths.length; i<len; i++){
        if (paths[i] in obj) obj = obj[paths[i]]
        else return undefined;
    };
    return obj;
}

export const isValidDate = (date) => date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);

export const randomColor = () => '#' + Array.from({length: 6}, () => "1234567890abcdef"[Math.floor(Math.random()*16)]).join('');
    // "#"+((1<<24)*Math.random()|0).toString(16)
    // '#' + Math.floor(Math.random()*Math.floor(16777215)).toString(16);
    //  `hsl(${ generateRandomInt(360) }, 100%, 50%)`;

export const generateRandomInt = (min, max) => {
    if( min>max) return undefined;
    if(!max) return Math.floor(Math.random() * Math.floor(min+1));
    return Math.floor(Math.random() * (+max + 1 - +min)) + +min;
}