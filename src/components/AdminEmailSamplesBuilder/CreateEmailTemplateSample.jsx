import Model from "../Model";
import tw from "tailwind-styled-components";

const CreateEmailTemplateSample = ({
    setOpenUploadTemplateModel,
    emailTemplateMutate,
    emailTemplateUploadLoading,
    selectedData,
}) => {
    const CreateTemplate = () => {
        emailTemplateMutate({templateId: selectedData });
    }

    return (
        <Model width={"w-11/12 max-w-md"} setOpenModel={setOpenUploadTemplateModel}>
            <Title>Save Sample?</Title>
            <SubTitle>You are about to save this Email Sample?.</SubTitle>
            <div className="w-full flex items-center justify-center space-x-10 mt-8">
                <Cancel onClick={() => setOpenUploadTemplateModel(false)}>Cancel</Cancel>
                <Delete onClick={CreateTemplate}>
                    {"Save"}{" "}
                </Delete>
            </div>
        </Model>
    );
};

const Title = tw.h2` text-lg md:text-xl lg:text-2xl text-gray-600 mb-2 font-bold text-center`;
const SubTitle = tw.p` text-sm md:text-md  text-gray-400  text-center mb-6`;
const Delete = tw.button`px-10 py-2.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 font-semibold`;
const Cancel = tw.button`px-10 py-2.5 text-sm border border-gray-600 text-gray-600 rounded font-semibold hover:bg-gray-200`;


export default CreateEmailTemplateSample;
