import tw from "tailwind-styled-components";

export const InputGroup = tw.div`w-full flex flex-col space-y-1.5`;

export const CombineInputGroup = tw.div`w-full flex flex-row space-x-4 items-end`;

export const FieldWrapper = tw.div`
${(p) => (p.$select ? "h-10" : "pl-2   field-wrapper border border-gray-300")}
 relative  rounded-md  w-full  flex items-center `;
export const FieldWrapperSelect = tw.div` relative  rounded-md  w-full  flex items-center border border-gray-300 h-10`;
export const FieldWrappers = tw.div`pl-2 relative  rounded-md  w-full  flex items-center border border-gray-300 h-10`;
export const Label = tw.label`text-base text-black font-semibold`;

export const FormContainer = tw.div` grid max-w-2xl gap-5 md:gap-7 mt-4`;
export const FormContainer2 = tw.div` grid w-full gap-5 md:gap-7 mt-4`;

export const FormContainerVertical = tw.div` grid  gap-5 md:gap-7 mt-4`;

export const SubmitBtn = tw.button`
text-sm  w-32  md:w-32 h-10 grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed   md:text-base bg-orange-600 hover:bg-orange-700 text-white shadow-md rounded-xl`;

export const ModelDangerBtn = tw.button`
text-sm  w-32  md:w-32 h-10 grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed md:text-base bg-red-600 hover:bg-orange-700 text-white shadow-md rounded-xl`;
export const ModelGreenBtn = tw.button`
text-sm  w-32  md:w-32 h-10 grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed md:text-base bg-green-600 hover:bg-green-700 text-white shadow-md rounded-xl`;

export const CancelBtn = tw.button`hover:bg-purple-100 p-2 rounded-xl transition-all duration-100 hover:text-topBar-purple text-blue-500 font-semibold`;

export const PreviewBtn = tw.button`
text-sm  w-32  md:w-44 h-12 grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed   md:text-base bg-cyan-100 hover:bg-cyan-200 text-cyan-600 rounded-md shadow-md`;

export const OtherBtn = tw.button`
  text-sm  w-32  md:w-44 h-12 grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed   md:text-base bg-green-100 hover:bg-green-200 text-gray-600 rounded-md shadow-md`;

export const SmallBtn = tw.button`
  whitespace-nowrap text-xs px-4 py-2 sm:px-6 sm:py-2.5 rounded-md bg-white-400  cursor-pointer hover:bg-gray-200 shadow border transition duration-200 text-gray-600 sm:text-sm`;
