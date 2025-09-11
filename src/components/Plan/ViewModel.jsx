import React from "react";
import tw from "tailwind-styled-components";
import Model from "../Model";
import moment from "moment";

const ViewModel = ({ setOpenViewModel, selectedData }) => {
    return (
        <Model width={"w-11/12 max-w-lg"} setOpenModel={setOpenViewModel} title="View Details">
            <Wrapper>

                <SingleItem name={"Plan Name"} value={selectedData?.name} />
                <SingleItem name={"Type"} value={selectedData?.type} />
                <SingleItem name={"Price (₵ /month)"} value={selectedData?.price} />
                <SingleItem name={"Discount (%)"} value={selectedData?.discount} />
                <SingleItem name={"Description"} value={selectedData?.plan_short_description} />
                <SingleItem name={"Features"} htmlValue={selectedData?.key_features} />

            </Wrapper>
        </Model>
    );
};

const SingleItem = ({ name, value, link, url, htmlValue }) => (
    <div className="flex items-center py-2 border-b border-gray-100 ">
        <Name>{name}</Name> <p className="w-10">:</p>
        {link && (
            <LinkValue href={url} target="_blank" title="Click to open">
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
const Value = tw.p`text-sm text-gray-800 font-medium max-w-xs `;
const LinkValue = tw.a`text-sm text-blue-500 max-w-xs truncate cursor-pointer`;
const HtmlValue = tw.div`text-sm text-gray-800 font-medium max-w-xs`;
export default ViewModel;
