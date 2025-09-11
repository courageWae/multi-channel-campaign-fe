import React from "react";
import tw from "tailwind-styled-components";
import Images from "../Images";
import { MdClose } from "react-icons/md";

const StatusNewModel = ({ width, setOpenModel, children, title }) => {
    const closeModel = () => setOpenModel(false);

    const getCurrentTarget = (e) => {
        const targetClass = Array.from(e.target.classList);
        if (targetClass.includes("addCommentModel")) closeModel();
    };

    return (
        <Wrapper onClick={getCurrentTarget}>
            <Box $width={width} style={{ maxHeight: "80vh", overflowY: "auto" }}>

                <div class="float-root pb-12">
                    <p className="float-left text-xl text-pretty">
                        {title}
                    </p>
                    <CrossIcon onClick={closeModel} />
                </div>
                {children}
            </Box>
        </Wrapper>
    );
};

const Wrapper = tw.div`
fixed top-0 higher-z-index right-0 bottom-0 left-0 BlackTransparentBg px-3 h-screen flex justify-center items-center  z-10 addCommentModel overflow-y-auto`;

const Box = tw.div`
${(p) => (p.$width ? ` bg-white ${p.$width} ` : " bg-white w-11/12 lg:w-3/5")}
mx-auto h-auto rounded-2xl px-8 pt-8 pb-8 relative z-20`;

const Cross = tw.img`
absolute top-5 right-5 w-3.5 z-10 cursor-pointer`;

const CrossIcon = tw(MdClose)`
absolute right-5 w-6 h-6 cursor-pointer text-gray-700 float-right`;

export default StatusNewModel;
