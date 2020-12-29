import {useEffect, useState} from 'react';

export const useResizeObserver = ref => {
    const [dimensions, setDimensions] = useState(null);

    useEffect(()=>{
        const traget = ref.current;

        if (!traget) return;
        const resizeObserver = new ResizeObserver(entries => {
            setDimensions(entries[0].contentRect)
        })

        resizeObserver.observe(traget);
        return ()=>{
            resizeObserver.unobserve(traget)
        }
    },[ref])

    return dimensions || null;
}