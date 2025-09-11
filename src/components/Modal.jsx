import React from "react";
import tw from "tailwind-styled-components";
import { MdClose } from "react-icons/md";

const Modal = ({ width, setOpenModel, title, header, children }) => {
    const closeModel = () => setOpenModel(false);

    const getCurrentTarget = (e) => {
        const targetClass = Array.from(e.target.classList);
        if (targetClass.includes("addCommentModel")) closeModel();
    };

    return (
        <Wrapper onClick={getCurrentTarget}>
            <Box $width={width}>
                {header && (
                    <Header>
                        {header}
                        <CrossIcon onClick={closeModel} />
                    </Header>
                )}
                <Content>
                    <div className="float-root pb-12">
                        <p className="float-left text-xl text-pretty">{title}</p>
                    </div>
                    {children}
                </Content>
            </Box>
        </Wrapper>
    );
};

const Wrapper = tw.div`
fixed top-0 higher-z-index right-0 bottom-0 left-0 BlackTransparentBg px-3 h-screen flex justify-center items-center z-10 addCommentModel overflow-y-auto`;

const Box = tw.div`
${(p) => (p.$width ? ` bg-white ${p.$width} ` : " bg-white w-11/12 lg:w-3/5")}
mx-auto h-auto rounded-2xl relative z-20`;

const Header = tw.div`
sticky top-0 bg-white w-full flex justify-between items-center px-8 py-4 z-30 border-b`;

const Content = tw.div`
px-8 pt-8 pb-8 overflow-y-auto max-h-[calc(100vh-50px)]`;

const CrossIcon = tw(MdClose)`
w-6 h-6 cursor-pointer text-gray-700`;

export default Modal;
