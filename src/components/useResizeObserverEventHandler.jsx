import { useEffect } from 'react';

export default function useResizeObserverErrorHandler() {
    useEffect(() => {
        const resizeObserverErrorHandler = (event) => {
            event.stopImmediatePropagation();
            event.preventDefault();
        };

        window.addEventListener('error', resizeObserverErrorHandler, true);

        return () => {
            window.removeEventListener('error', resizeObserverErrorHandler, true);
        };
    }, []);
}
