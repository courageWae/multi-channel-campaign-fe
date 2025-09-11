import Model from "../Model";
import tw from "tailwind-styled-components";

const UpdateEmailTemplate = ({
    setOpenUpdateTemplateModel,
    emailEditTemplateMutate,
    emailTemplateUploadLoading,
    selectedData,
}) => {
    const updateTemplate = () => {
        emailEditTemplateMutate({templateId: selectedData });
    }

    return (
        <Model width={"w-11/12 max-w-md"} setOpenModel={setOpenUpdateTemplateModel}>
            <Title>Update Template?</Title>
            <SubTitle>You are about to update this Email Template?.</SubTitle>
            <div className="w-full flex items-center justify-center space-x-10 mt-8">
                <Cancel onClick={() => setOpenUpdateTemplateModel(false)}>Cancel</Cancel>
                <Delete onClick={updateTemplate}>
                    {"Update"}{" "}
                </Delete>
            </div>
        </Model>
    );
};

const Title = tw.h2` text-lg md:text-xl lg:text-2xl text-gray-600 mb-2 font-bold text-center`;
const SubTitle = tw.p` text-sm md:text-md  text-gray-400  text-center mb-6`;
const Delete = tw.button`px-10 py-2.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 font-semibold`;
const Cancel = tw.button`px-10 py-2.5 text-sm border border-gray-600 text-gray-600 rounded font-semibold hover:bg-gray-200`;


export default UpdateEmailTemplate;
