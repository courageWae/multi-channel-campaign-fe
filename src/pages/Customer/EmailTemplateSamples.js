import React, { useState, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import {useNavigate, useParams } from "react-router-dom";
import TopNavbar from "components/TopNavbar";
import { useMutation } from "react-query";
import axios from "axios";

import Loading from "components/Loading";
import NotFoundModel from "components/NotFoundModel";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import { FaDotCircle } from "react-icons/fa";
import PreviewEmailTemplateSample from "components/EmailTemplateBuilder/PreviewEmailTemplateSample";
import Config from "Config";
const EmailTemplateSamples = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const [searchValue, setSearchValue] = useState("");
  const [gotInitialResp, setGotInitialResp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmailHtml, setCurrentEmailHtml] = useState("");
  const [templateNameValue, setTemplateNameValue] = useState("");
  const { id, templateId } = useParams();
  const refs = useRef(new Map());
  const navigate = useNavigate();
  


  const handleMouseEnter = (templateId) => {
    const ref = refs.current.get(templateId);
    if (ref) {
      ref.scroll({
        top: ref.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleMouseLeave = (templateId) => {
    const ref = refs.current.get(templateId);
    if (ref) {
      ref.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const previewEmail = (emailHtml, templateNameValue) => {
    setCurrentEmailHtml(emailHtml);
    setTemplateNameValue(templateNameValue);
    setIsModalOpen(true);
  };

  const handleUseTemplate = (sample_id) => {
    const params = new URLSearchParams({ key: sample_id,  }).toString();
    if(templateId) {
      navigate(`/edit/email-template/build/${templateId}?${params}`);
    }
    else{
      navigate(`/build/email-template?${params}`);
    }

  };

  const fetchFunction = async (values) =>
    await axios.get(`${Config.apiUrl}/template/email/sample/get`, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user.token}`,
      },
    });

  const getListSuccess = (data) => {
    setGotInitialResp(true);
  };

  const getListError = (data) => {
    setGotInitialResp(true);
  };

  const {
    isLoading,
    error,
    data,
    mutate: getListMutate,
  } = useMutation(fetchFunction, {
    onSuccess: getListSuccess,
    onError: getListError,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      getListMutate({
        searchValue: searchValue,
        id: id,
      });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, getListMutate, id]);

  const redirectToBuilder = () => {
    window.history.back();
  };

  return (
    <>
      <Container>
        <Page>
          <TopNavbar />
          <Content>
            <ContentHeader>
              <div className="flex items-center justify-between">
                <HeaderTitle className="flex items-center">
                  <span>
                    <FaArrowLeft
                      onClick={redirectToBuilder}
                      style={{
                        marginRight: "10px",
                        color: "orange",
                        cursor: "pointer",
                      }}
                    />
                  </span>
                  Email Template Samples
                </HeaderTitle>
                <div className="flex">
                  <SearchWrapper>
                    <SearchInput style={{ border: "1px solid lightgray" }}>
                      <input
                        type="text"
                        placeholder="Search in all templates"
                        className="w-full px-3 py-2 outline-none"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </SearchInput>
                  </SearchWrapper>
                </div>
              </div>
              <HeaderSubTitle>
                You can choose from any of the templates below and add it to
                your collection of templates
              </HeaderSubTitle>
            </ContentHeader>
            {(isLoading || !gotInitialResp) && <Loading />}
            {(error || data?.data?.data?.length === 0) &&
              !isLoading &&
              gotInitialResp && <NotFoundModel />}
            <TemplatesGrid>
              {data?.data?.data?.map((template) => (
                <TemplateCard
                  key={template.id}
                  onMouseEnter={() => handleMouseEnter(template.id)}
                  onMouseLeave={() => handleMouseLeave(template.id)}
                >
                  <TemplateWrapper>
                    <h2 className="flex items-center justify-start text-2xl font-semibold text-left">
                      <FaDotCircle className="mr-2 text-orange-500" />
                      {template.name}
                    </h2>
                    <TemplateInfo>
                      <TemplateDescription>
                        <ScaledContentWrapper>
                          <ScaledContent
                            ref={(el) => refs.current.set(template.id, el)}
                            className="custom-html-content"
                            dangerouslySetInnerHTML={{ __html: template.data }}
                          ></ScaledContent>
                          <Overlay>
                            <OverlayContent>
                              <Button
                                className="border-2 border-orange-500"
                                style={{ border: "2px solid orange" }}
                                onClick={() => previewEmail(template.data, template.name)}
                              >
                                <FaEye className="w-5 h-5 mr-1 text-orange-500" />{" "}
                                Preview
                              </Button>
                              <ActionBtn>
                                <TemplateButton onClick={() => handleUseTemplate(template.id)}>Use Template</TemplateButton>
                              </ActionBtn>
                            </OverlayContent>
                          </Overlay>
                        </ScaledContentWrapper>
                      </TemplateDescription>
                    </TemplateInfo>
                  </TemplateWrapper>
                </TemplateCard>
              ))}
            </TemplatesGrid>
          </Content>
        </Page>
        <PreviewEmailTemplateSample
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          emailHtml={currentEmailHtml}
          templateName={templateNameValue}
        />
      </Container>
    </>
  );
};

const Container = tw.div`min-h-screen bg-white flex flex-col`;
const Page = tw.div`flex-1 flex flex-col`;
const Content = tw.div`flex-1 p-6`;
const ContentHeader = tw.div`mb-6`;
const HeaderTitle = tw.h1`text-2xl font-semibold text-gray-800`;
const HeaderSubTitle = tw.p`text-gray-600 mt-1`;

const SearchWrapper = tw.div`flex items-center w-full max-w-sm ml-auto`;
const SearchInput = tw.div`w-[350px] field-wrapper relative px-2 gap-2 rounded-xl bg-white h-10 border border-orange-400 flex items-center overflow-hidden ml-auto`;

const TemplatesGrid = tw.div`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 gap-y-3`;
// const TemplateCard = tw.div`group border-2 border-gray-100 bg-white shadow-lg rounded-lg p-6 w-full h-4/6 max-w-xl hover:scale-105 transition-all duration-300 relative`;
// const TemplateWrapper = tw.div`flex flex-col items-between h-full gap-2`;

const TemplateCard = tw.div`group border-2 border-gray-100 bg-white shadow-lg rounded-lg p-6 w-full h-[600px] max-w-xl hover:scale-105 transition-all duration-300 relative`; // Adjusted height to h-64
const TemplateWrapper = tw.div`flex flex-col items-start gap-1 h-full overflow-y-auto`;

const TemplateInfo = tw.div`h-full overflow-hidden rounded-lg h-full`;
const TemplateDescription = tw.div`text-gray-600 overflow-hidden h-full flex items-center justify-center`;

const ScaledContentWrapper = tw.div`w-full h-full flex justify-center items-center bg-gray-100 relative`;
const ScaledContent = tw.div`transform scale-65 origin-center max-w-full max-h-full overflow-auto`;

const Overlay = tw.div`
  absolute inset-0 bg-black bg-opacity-50 rounded-lg flex justify-center flex-col gap-2 items-center
  opacity-0 group-hover:opacity-100
  transform translate-y-full group-hover:translate-y-0
  transition-transform duration-300
`;
const OverlayContent = tw.div`text-center space-y-4`;
const Button = tw.button`w-32 flex items-center justify-center bg-white border-2 border-orange-500 text-orange-500 py-2 rounded-md hover:bg-white`;
const TemplateButton = tw.button`p-4 rounded-md w-full bg-orange-500 text-white py-2 border-4 transition-all border-orange-500 mt-3 hover:bg-orange-600 hover:text-white`;
const ActionBtn = tw.div`flex align-center justify-center`;

export default EmailTemplateSamples;
