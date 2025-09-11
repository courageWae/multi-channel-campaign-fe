import React from "react";
import { MdClose } from "react-icons/md";
import tw from "tailwind-styled-components";

const NewModel = ({ open, handleClose, title, children, setOpenModel }) => {
    const closeModel = () => setOpenModel(false);

    const getCurrentTarget = (e) => {
        const targetClass = Array.from(e.target.classList);
        if (targetClass.includes("addCommentModel")) closeModel();
    };

    return (
        open && (
            <Wrapper onClick={getCurrentTarget}>
                <Backdrop />
                <Box>
                    <CrossIcon onClick={closeModel} />
                    <h2 className="text-xl font-semibold mb-4" id="modal-modal-title">{title}</h2>
                    {children}
                </Box>
            </Wrapper>
        )
    );
};

const Wrapper = tw.div`
  fixed inset-0 z-50 flex items-center justify-center addCommentModel overflow-y-auto
`;

const Backdrop = tw.div`
  fixed inset-0 bg-black bg-opacity-50
`;

const Box = tw.div`
  relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 my-8
`;

const CrossIcon = tw(MdClose)`
  absolute top-3 right-3 w-6 h-6 cursor-pointer text-gray-700 z-10
`;

export default NewModel;
