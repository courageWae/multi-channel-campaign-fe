import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import tw from "tailwind-styled-components";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useMutation, useQuery } from "react-query";
import Config from "../../Config";
import {
  Page,
  Container,
  Content,
  ContentHeader,
  HeaderTitle,
  HeaderSubTitle,
} from "../../components/Styles/PageStyles";
import {
  InputGroup,
  FieldWrappers,
  FieldWrapper,
  Label,
  SubmitBtn,
  CancelBtn,
} from "../../components/Styles/InputStyles";
import Loading from "components/Loading";
import NotFoundModel from "components/NotFoundModel";

import TopNavbar from "components/TopNavbar";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaRegCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

const SMSViewTemplate = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const { id } = useParams();
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const [bodyCharCount, setBodyCharCount] = useState(0);
  const [mediaUrlCharCount, setMediaUrlCharCount] = useState(0);

  const fetchFunction = async () =>
    await axios.get(`${Config.apiUrl}/template/sms/view/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user.token}`,
      },
    });

  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    "getContactGroups",
    fetchFunction,
    {
      onSuccess: () => {
        setGotInitialResp(true);
      },
      onError: (error) => {
        setGotInitialResp(true);
      },
    }
  );

  const InitialValues = {
    name: data?.data?.name,
    creationdate: data?.data?.created_at,
    body: data?.data?.message,

    status: data?.data?.status,
  };
  console.log(data?.data);

  useEffect(() => {
    if (InitialValues.body) {
      setBodyCharCount(InitialValues.body.length);
    }
  }, [InitialValues.body]);

  const getStatus = (status) => {
    if (status === 2) {
      return (
        <>
          <InactiveStatus>Inactive</InactiveStatus>
        </>
      );
    } else {
      return (
        <>
          <ActiveStatus>Active</ActiveStatus>
        </>
      );
    }
  };

  return (
    <Container>
      <Page>
        <TopNavbar />
        <Content>
          {!isLoading && gotInitialResp && (
            <>
              <ContentHeader>
                <HeaderTitle>{InitialValues.name}</HeaderTitle>
              </ContentHeader>

              <GeneralBox>
                <GeneralWrapper>
                  <Column>
                    <Heading>Template Name </Heading>
                    <Value className="mt-3">{InitialValues.name}</Value>
                  </Column>

                  <Column>
                    <Heading>Creation Date </Heading>
                    <Value className="mt-3">
                      {moment(InitialValues.creationdate).format(
                        "MMMM Do YYYY"
                      )}
                    </Value>
                  </Column>
                  <Column>
                    <Heading>Status </Heading>
                    <Value className="mt-3">
                      {getStatus(InitialValues.status)}
                    </Value>
                  </Column>
                </GeneralWrapper>
              </GeneralBox>
              <ContentBox>
                <Wrapper>
                  <InputGroup>
                    <Label htmlFor="body">Body</Label>
                    <FieldWrappers className="h-32 bg-gray-100 overflow-y-auto p-2 !flex-col !items-start">
                      <Value
                        className="text-sm w-10/12"
                        dangerouslySetInnerHTML={{
                          __html: InitialValues.body.replace(
                            /\r?\n/g,
                            "<br />"
                          ),
                        }}
                      >
                        {/* {InitialValues.body} */}
                      </Value>
                      <CharCount>
                        {Math.ceil(bodyCharCount / 160)} SMS
                      </CharCount>
                    </FieldWrappers>
                  </InputGroup>
                </Wrapper>
              </ContentBox>
            </>
          )}
          {(isLoading || !gotInitialResp) && <Loading />}
          {(error || data?.data == false) && !isLoading && gotInitialResp && (
            <NotFoundModel />
          )}
        </Content>
      </Page>
    </Container>
  );
};

const GeneralBox = tw.div`border border-gray-200 p-4 rounded-lg mb-4`;
const GeneralWrapper = tw.div`p-4 grid md:grid-cols-3 grid-cols-2 gap-6`;
const Column = tw.div``;
const Heading = tw.p`text-sm font-semibold`;
const Value = tw.p`text-md text-gray-800 `;
const ContentBox = tw.div`border border-gray-200 p-4 rounded-lg mb-4`;
const Wrapper = tw.div`grid gap-6  `;
const CharCount = tw.div`absolute bottom-2 right-2 text-xs text-gray-400`;
const MediaCharCount = tw.div`absolute top-2.5 right-2 text-xs text-gray-400`;
const ActiveStatus = tw.div`flex text-xs rounded-md px-2 py-1 font-medium bg-green-100 text-green-600 items-center max-w-fit`;
const InactiveStatus = tw.div`flex text-xs rounded-md px-2 py-1 font-medium bg-red-100 text-red-600 items-center max-w-fit`;
const PendingStatus = tw.div`flex text-xs rounded-md px-2 py-1 font-medium bg-yellow-100 text-yellow-600 items-center max-w-fit`;
const RejectStatus = tw.div`flex text-xs rounded-md px-2 py-1 font-medium bg-rose-100 text-rose-600 items-center max-w-fit`;
const SupportedChannels = tw.div`flex  my-5`;
const Channel = tw.div`
  flex text-sm rounded-md px-2 font-medium mx-2
  ${(p) =>
    p.valid
      ? "bg-green-100 text-green-600 items-center"
      : "bg-red-100 text-red-600 items-center"}
`;
export default SMSViewTemplate;
