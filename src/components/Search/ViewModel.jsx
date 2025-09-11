import React from "react";
import tw from "tailwind-styled-components";
import Model from "../Model";
import moment from "moment";

const ViewModel = ({ setOpenViewModel, selectedItem, searchType }) => {
    return (
        <Model width={"w-11/12 max-w-2xl"} setOpenModel={setOpenViewModel}>
            <Wrapper>
                <Title>View Details</Title>
                <SingleItem name={"User Id"} value={selectedItem?.user_id} />
                <SingleItem name={"User Name"} value={selectedItem?.userName} />
                <SingleItem name={"Sender Id"} value={selectedItem?.sender_id} />

                <SingleItem
                    name={"Sent At"}
                    value={moment(selectedItem?.created_at).format("DD-MM-YYYY hh:mm A")}
                />
                {selectedItem?.status == 2 && (
                    <SingleItem
                        name={"Delivered At"}
                        value={moment(selectedItem?.updated_at).format(
                            "DD-MM-YYYY hh:mm A"
                        )}
                    />
                )}
                <SingleItem name={"Phone Number"} value={selectedItem?.contact} />

                <SingleItem name={"Message Id"} value={selectedItem?.message_id} />
                {searchType !== "EMAIL" && (
                    // <SingleItem name={"Message"} value={selectedItem?.message} />
                    <SingleItem name={"Message"} htmlValue={selectedItem?.message} />
                )}
            </Wrapper>
        </Model>
    );
};

const SingleItem = ({ name, value, link, url, htmlValue }) => (
    <div className="flex items-center py-2 border-b border-gray-100 ">
        <Name>{name}</Name> <p className="w-10">:</p>
        {link && (
            <LinkValue href={value} target="_blank" title="Click to open">
                {value}
            </LinkValue>
        )}
        {!link && !htmlValue && <Value>{value}</Value>}
        {htmlValue && <HtmlValue dangerouslySetInnerHTML={{ __html: htmlValue }} />}
    </div>
);

const Wrapper = tw.div`px-4`;
const Title = tw.h2`text-lg md:text-xl mb-6 text-gray-700 font-medium text-left`;
const Name = tw.p`text-sm text-gray-500  w-40`;
const Value = tw.p`text-sm text-gray-800 font-medium max-w-xs break-words `;
const LinkValue = tw.a`text-sm text-blue-500 max-w-xs break-words cursor-pointer`;
const HtmlValue = tw.div`text-sm text-gray-800 font-medium max-w-xs`;
export default ViewModel;
