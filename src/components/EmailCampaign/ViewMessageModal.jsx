import React from "react";
import tw from "tailwind-styled-components";
import Modal from "../Modal";
import { MdSubject } from "react-icons/md";
import moment from "moment";
import PreviewSelectedEmail from "./PreviewSelectedEmail";
import { FaTimes } from "react-icons/fa";

const ViewMessageModal = ({ setViewModel, data }) => {
  return (
    <Modal
      width={"w-8/12"}
      setOpenModel={setViewModel}
      title="Email Message Preview"
      className="text-xl font-bold"
      style={{ height: "100vh" }}
    >
      <button
        onClick={() => setViewModel(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <FaTimes className="text-3xl hover:text-gray-700" />
      </button>
      <Separator />
      <Box>
        {data.data && (
          <div className="col-span-5">
            <Title
              style={{
                marginBottom: "20px",
                color: "gray",
                fontWeight: "bold",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
              }}
            ></Title>
            <div className="p-4 bg-gray-200 rounded-md">
              <div className="p-4 bg-white rounded-md h-full">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <EmailSubject>
                    <MdSubject className="text-orange-600 mr-2" />
                    {data.subject}
                  </EmailSubject>
                  <Date>{`  ${moment(data.schedule).format(
                    "DD MMM YYYY, HH:mm"
                  )}`}</Date>
                </div>
                <Separator />
                <div
                  style={{
                    height: "25rem",
                    overflowY: "auto",
                    borderRadius: "5px",
                  }}
                >
                  <PreviewSelectedEmail htmlTemplate={data.data} />
                </div>
              </div>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
};

const Title = tw.h2`text-lg md:text-xl mb-6 text-gray-700 font-medium ml-3 font-bold mb-1`;
const Separator = tw.div`w-full h-0.5 bg-gray-100 rounded-full mb-1`;
const Box = tw.div`grid grid-cols-5 gap-3 w-full rounded-xl text-gray-800 border border-gray-200 bg-white px-16 py-10`;
const EmailSubject = tw.div`text-lg text-gray-500 font-semibold mb-4 flex items-center`;
const Date = tw.div`text-sm text-gray-400`;

export default ViewMessageModal;
