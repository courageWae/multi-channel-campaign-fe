import tw from "tailwind-styled-components";
export const Container = tw.div`flex`;
export const Page = tw.section`flex-1 flex flex-col`;
export const Content = tw.section`py-10 px-8  flex flex-col gap-5`;
export const ContentHeader = tw.section`flex flex-col gap-2`;
export const HeaderTitle = tw.h1`Capitalize font-medium text-3xl text-black`;
export const HeaderSubTitle = tw.p`text-gray-700 font-light text-pretty`;
export const LearnMoreLink = tw.div`flex gap-4 items-center mt-4`;
export const PageOld = tw.section`py-24 md:pt-28 pb-14`;
export const BuilderContent = tw.section` px-8 flex flex-col gap-5`;
//export const BoxContainer = tw.div`Container md:rounded-md md:border md:shadow-md md:p-8 `;
export const BoxContainer = tw.div`Container md:mt-4 `;
export const BoxTitle = tw.div`text-xl  text-gray-700 font-medium  space-x-2    cursor-pointer `;
export const BoxSubTitle = tw.h3`mt-1 ml-1 sm:mt-2 lg:mt-3   text-gray-500 text-sm lg:text-base `;
export const ErrorText = tw.p`my-20 text-red-600 text-sm text-center`;

export const PrevBtn = tw.div`w-8  h-8 rounded-full cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed  text-sm  border border-gray-300 text-gray-300 hover:text-gray-700 hover:border-gray-700 flex justify-center items-center  `;

export const NextBtn = tw.div`w-8  h-8 rounded-full cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed text-sm  border border-gray-300 text-gray-300 hover:text-gray-700 hover:border-gray-700  flex justify-center items-center  `;

export const PaginationWrapper = tw.div`flex mt-5 justify-end gap-3 items-center text-sm text-gray-400 mr-2 mb-2`;
export const Underline = tw.div`w-12 h-0.5 bg-gray-700 mt-1.5 rounded-full `;
