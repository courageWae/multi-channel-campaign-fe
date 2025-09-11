import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

const Loading = ({ width, height, color, noPadding = false }) => {
    const [loadingDimensions, setloadingDimensions] = useState({
        width: 100,
        height: 100,
    });

    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        if (isMobile) setloadingDimensions({ width: 70, height: 70 });
    }, []);

    return (
        <div className={`grid place-items-center ${noPadding ? "" : "py-28"}`}>
            <ReactLoading
                type={"spinningBubbles"}
                color={color || "#f97316"}
                height={width || loadingDimensions.height}
                width={height || loadingDimensions.width}
            />
        </div>
    );
};

export default Loading;
