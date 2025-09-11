import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import Modal from "../Modal";
import { MdSubject } from "react-icons/md";
import { GiBulletImpacts } from "react-icons/gi";
import moment from "moment";
import axios from "axios";
import Config from "Config";
import { useSelector } from "react-redux";
import Loading from "components/Loading";

import { FaTimes } from "react-icons/fa";
import PreviewSelectedEmail from "./PreviewSelectedEmail";

const ViewModel = ({ setViewModel, selectedData }) => {
  const user = useSelector((state) => state.UserReducer.user);

  const [contactList, setContactList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedData?.template_id) {
      setLoading(true);
      const body = { id: selectedData.group_id };
      const fetchContactList = async () => {
        try {
          const response = await axios.post(
            `${Config.apiUrl}/getContactList`,
            body,
            {
              headers: {
                "Content-Type": "application/json",
                Token: `${user.token}`,
              },
            }
          );
          setContactList(response.data.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchContactList();
    }
  }, [selectedData, user.token]);

  console.log("contactList", contactList);

  function getInitials(fromName) {
    const senderParts = fromName.split(" ");
    const firstPart = senderParts[0];
    let secondPart;
    let initials;
    initials = firstPart.charAt(0).toUpperCase();
    if (senderParts.length > 1) {
      secondPart = senderParts[1];
      initials =
        firstPart.charAt(0).toUpperCase() + secondPart.charAt(0).toUpperCase();
    }
    return initials;
  }

  return (
    <Modal
      width={"w-11/12 max-w-[1280px]"}
      setOpenModel={setViewModel}
      title="Email Message Preview"
      className="text-xl font-bold"
      style={{height:"100vh"}}
    >
      <button
        onClick={() => setViewModel(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <FaTimes className="text-3xl hover:text-gray-700" />
      </button>
      <Separator />
      <Box>
        {selectedData.group_id && (
          <div className="col-span-2 border border-gray-300" style={{border:"1px solid lightgray",borderRadius:"5px", padding:"20px"}}>
            <Title>{"Recipients"}</Title>
            <div className="mt-6 h-96 overflow-y-auto">
              {loading ? (
                <Loading />
              ) : (
                contactList?.map((contact) => {
                  return (
                    <div
                      style={{
                        background: "#ffffff",
                        padding: "20px",
                        borderRadius: "5px",
                        border: "1px solid lightgray",
                        width: "80%",
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                      className="shadow-sm"
                    >
                      <div>
                        <div
                          style={{
                            height: "2.5rem",
                            width: "2.5rem",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          className={`bg-gray-200`}
                        >
                          <p className={`text-gray-500`}>
                            {getInitials(
                              `${contact.first_name} ${contact.last_name}`
                            )}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          marginLeft: "10px",
                        }}
                      >
                        <EmailName>{`${contact.first_name} ${contact.last_name}`}</EmailName>
                        <EmailAccount>{contact.email}</EmailAccount>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
        {selectedData.template_id && (
          <div
            style={{
              border: "1px solid lightgray",
              borderRadius: "5px",
              padding: "20px",
            }}
            className="col-span-3"
          >
            <Title
              style={{
                marginBottom: "20px",
                color: "gray",
                fontWeight: "bold",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <GiBulletImpacts className="text-orange-600 mr-2" /> Message
              Preview
            </Title>
            <div className="p-4 bg-gray-200 rounded-md">
              <div className="p-4 bg-white rounded-md h-96">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <EmailSubject>
                    <MdSubject className="text-orange-600 mr-2" />
                    {selectedData.subject}
                  </EmailSubject>
                  <Date>{`  ${
                    selectedData.is_scheduled === 1
                      ? "Scheduled for " +
                        moment(selectedData.schedule).format(
                          "DD MMM YYYY, HH:mm"
                        )
                      : "Running on: " +
                        moment(selectedData.updated_at).format(
                          "DD MMM YYYY, HH:mm"
                        )
                  }`}</Date>
                </div>
                <Separator />
                <div
                  style={{
                    height: "18rem",
                    overflowY: "auto",
                    borderRadius: "5px",
                  }}
                >
                  {loading && <Loading />}
                  <PreviewSelectedEmail templateId={selectedData.template_id} />
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
const EmailName = tw.div`text-md font-bold`;
const EmailAccount = tw.div`text-sm text-gray-400`;
const EmailSubject = tw.div`text-lg text-gray-500 font-semibold mb-4 flex items-center`;
const Date = tw.div`text-sm text-gray-400`;

export default ViewModel;
