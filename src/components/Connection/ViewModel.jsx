import React from "react";
import tw from "tailwind-styled-components";
import Images from "../../Images";
import Model from "../Model";
import moment from "moment";
import Loading from "../Loading";

const ViewModel = ({ setViewModel, selectedItem, checkStatusMutate, restartMutate, isRestartLoading, isCheckStatusLoading }) => {

    const checkStatus = () => {
        checkStatusMutate({ id: selectedItem.id });
    }

    const restart = () => {
        restartMutate({ id: selectedItem.id });
    }

    const getMethod = (type) => {
        if (type == "1") {
            return <p>SMPP</p>;
        } else {
            return <p>GET</p>;
        }
    };
    const getStatus = (status) => {
        if (status == "1") {
            return <p>Active</p>;
        } else {
            return <p>Inactive</p>;
        }
    };
    return (
        <Model width={"w-11/12 max-w-xl"} setOpenModel={setViewModel} title="View Connection">
            <Wrapper>
                <SingleItem name={"Name"} value={selectedItem?.name} />
                <SingleItem name={"Method"} value={getMethod(selectedItem.type)} />
                <SingleItem name={"Status"} value={getStatus(selectedItem.status)} />
                <SingleItem name={"Host"} value={selectedItem?.host} />
                <SingleItem name={"SMPP Host"} value={selectedItem?.smtp_host} />
                <SingleItem name={"SMPP Port"} value={selectedItem?.smtp_port} />
                <SingleItem name={"User Name"} value={selectedItem?.username} />
                <SingleItem name={"Password"} value={selectedItem?.password} />
                <SingleItem name={"Admin Port"} value={selectedItem?.admin_port} />
                <SingleItem name={"SMS Box Port"} value={selectedItem?.sms_box_port} />
                <SingleItem name={"SMSC"} value={selectedItem?.smsc} />
                {/* {selectedItem.type == "2" && <SingleItem name={"URL"} value={selectedItem?.url} />}
                {selectedItem.type == "1" && <SingleItem name={"Host"} value={selectedItem?.host} />}
                {selectedItem.type == "1" && <SingleItem name={"Port"} value={selectedItem?.port} />} */}

                {
                    selectedItem.type == "1" &&
                    <div className="flex gap-4 mt-8 justify-end">
                        <Status onClick={checkStatus}> {!isCheckStatusLoading && "Check Status"}
                            {isCheckStatusLoading && (
                                <Loading noPadding={true} color={"white"} height={12} width={12} />
                            )}</Status>
                        <Restart onClick={restart}>
                            {!isRestartLoading && "Restart"}
                            {isRestartLoading && (
                                <Loading noPadding={true} color={"white"} height={12} width={12} />
                            )}
                        </Restart>


                    </div>
                }

            </Wrapper>
        </Model>
    );
};

const SingleItem = ({ name, value, link, url }) => (
    <div className="flex items-center py-2 border-b border-gray-100 ">
        <Name>{name}</Name> <p className="w-10">:</p>
        {link && (
            <LinkValue href={url} target="_blank" title="Click to open">
                {value}
            </LinkValue>
        )}
        {!link && <Value>{value}</Value>}
    </div>
);

const Wrapper = tw.div`px-4`;
const Title = tw.h2`text-lg md:text-xl mb-6 text-gray-700 font-medium text-center`;
const Name = tw.p`text-sm text-gray-500  w-40`;
const Value = tw.p`text-sm text-gray-800 font-medium max-w-xs word-break `;
const LinkValue = tw.a`text-sm text-blue-500 max-w-xs truncate cursor-pointer `;

const Status = tw.button`px-8 py-3 text-sm bg-blue-500 text-white rounded hover:bg-blue-600`;
const Restart = tw.button`px-8 py-3 text-sm bg-orange-400 text-white-600 rounded hover:bg-orange-200`;

const Box = tw.div`text-center text-gray-800 border border-gray-100 bg-gray-50 p-5`;
export default ViewModel;
