import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Model from "../Model";
import moment from "moment";
import permissionsArr from "./userPermissions";

const ViewModel = ({ setOpenViewModel, selectedItem }) => {
    const [permissions, setPermissions] = useState("");

    useEffect(() => {
        const activeUserPermissions = permissionsArr.find(
            (item) => item.type == selectedItem?.type
        );
        if (activeUserPermissions) {
            const per = selectedItem?.permissions?.split(",");

            const newPermissionsValue = per
                .map((permission) => {
                    const temp = activeUserPermissions.permissions.find(
                        (item) => item.value == permission
                    );

                    if (temp) return temp.name;
                })
                .filter((item) => item)
                .join(", ");

            setPermissions(newPermissionsValue);
        } else setPermissions("N/A");
    }, [selectedItem]);
    return (
        <Model width={"w-11/12 max-w-2xl"} setOpenModel={setOpenViewModel} title="View Details">
            <Wrapper>

                <SingleItem name={"User Name"} value={selectedItem?.name} />
                <SingleItem name={"User Id"} value={selectedItem?.id} />
                <SingleItem name={"M Id"} value={selectedItem?.m_id} />

                <SingleItem name={"Phone Number"} value={selectedItem?.phone} />
                <SingleItem name={"Email"} value={selectedItem?.email} />
                <SingleItem name={"Permissions"} value={permissions} />
                {selectedItem?.social_id && (
                    <SingleItem name={"Social Id"} value={selectedItem?.social_id} />
                )}
                {selectedItem?.address && (
                    <SingleItem name={"Address"} value={selectedItem?.address} />
                )}
                {selectedItem?.city && (
                    <SingleItem name={"City"} value={selectedItem?.city} />
                )}
                {selectedItem?.state_name && (
                    <SingleItem name={"State"} value={selectedItem?.state_name} />
                )}
                {selectedItem?.country && (
                    <SingleItem name={"Country"} value={selectedItem?.country} />
                )}
                <SingleItem
                    name={"Created Date"}
                    value={moment(selectedItem?.created_at).format("DD-MM-YYYY hh:mm A")}
                />
            </Wrapper>
        </Model >
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
const Title = tw.h2`text-lg md:text-xl mb-6 text-gray-700 font-medium text-left`;
const Name = tw.p`text-sm text-gray-500  w-40`;
const Value = tw.p`text-sm text-gray-800 font-medium max-w-xs `;
const LinkValue = tw.a`text-sm text-blue-500 max-w-xs truncate cursor-pointer`;

export default ViewModel;
