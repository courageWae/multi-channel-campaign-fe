import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  Page,
  Container,
  Content,
  HeaderTitle,
  HeaderSubTitle,
} from "components/Styles/PageStyles";
import TopNavbar from "components/TopNavbar";
import Loading from "components/Loading";
import NotFoundModel from "components/NotFoundModel";
import Config from "Config";
import UssdResponsesTable from "components/UssdSurvey/UssdResponsesTable";
import DeleteResponseModal from "components/UssdSurvey/DeleteResponseModal";

const UssdSurveyResponses = () => {
  const { ussdId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.UserReducer.user);
  
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [surveyInfo, setSurveyInfo] = useState(null);

  // Fetch survey responses
  const fetchResponses = async () => {
    const response = await axios.get(`${Config.apiUrl}/ussd/ussdResponses/${ussdId}`, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user.token}`,
      },
    });
    return response.data;
  };

  const { error, isLoading, refetch } = useQuery(
    ["ussdResponses", ussdId],
    fetchResponses,
    {
      onSuccess: (data) => {
        setResponses(data?.data || []);
        setSurveyInfo(data?.survey || null);
        setLoading(false);
      },
      onError: (error) => {
        console.error("Error fetching responses:", error);
        setLoading(false);
        toast.error("Failed to load survey responses");
      },
      enabled: !!ussdId && !!user?.token,
    }
  );

  // Delete response mutation
  const deleteResponseFunction = async (responseId) => {
    return await axios.delete(`${Config.apiUrl}/ussd/ussdResponses/${responseId}`, {
      headers: {
        "Content-Type": "application/json",
        Token: `${user.token}`,
      },
    });
  };

  const deleteSuccess = (data) => {
    toast.success("Response deleted successfully");
    setDeleteModal(false);
    setSelectedResponse(null);
    refetch();
  };

  const deleteError = (error) => {
    toast.error(error?.response?.data?.msg || "Failed to delete response");
    setDeleteModal(false);
    setSelectedResponse(null);
  };

  const { isLoading: deleteLoading, mutate: deleteResponse } = useMutation(
    deleteResponseFunction,
    {
      onSuccess: deleteSuccess,
      onError: deleteError,
    }
  );

  const handleDeleteResponse = (response) => {
    setSelectedResponse(response);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedResponse) {
      deleteResponse(selectedResponse.id);
    }
  };

  const handleBack = () => {
    navigate("/ussd-survey");
  };

  return (
    <>
      <Container>
        <Page>
          <TopNavbar />
          <Content className="p-4 sm:p-6 min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button
                    onClick={handleBack}
                    className="p-2 text-gray-600 rounded-lg transition-colors hover:text-gray-800 hover:bg-gray-200"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div>
                    <HeaderTitle className="text-lg sm:text-xl">Survey Responses</HeaderTitle>
                    {surveyInfo && (
                      <HeaderSubTitle className="text-gray-600 text-sm sm:text-base">
                        <span className="block sm:inline">{surveyInfo.survey_name}</span>
                        <span className="block sm:inline sm:ml-1">- {responses.length} responses</span>
                      </HeaderSubTitle>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="px-3 sm:px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <span className="text-xs sm:text-sm text-gray-600">Total Responses:</span>
                    <span className="ml-2 text-base sm:text-lg font-semibold text-blue-600">{responses.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Responses Table */}
            <div className="overflow-hidden bg-white rounded-xl border border-gray-100 shadow-lg">
              <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Response Data</h2>
                <p className="mt-1 text-sm text-gray-600">
                  View and manage all responses for this USSD survey
                </p>
              </div>
              
              <div className="p-4 sm:p-6">
                {isLoading || loading ? (
                  <Loading />
                ) : error ? (
                  <div className="py-8 sm:py-12 text-center">
                    <div className="mb-2 text-base sm:text-lg font-medium text-red-500">Error Loading Responses</div>
                    <p className="mb-4 text-sm sm:text-base text-gray-600">There was an error loading the survey responses.</p>
                    <button
                      onClick={() => refetch()}
                      className="px-4 py-2 text-white bg-[#F97316] rounded-lg transition-colors hover:bg-[#9d5521] text-sm sm:text-base"
                    >
                      Try Again
                    </button>
                  </div>
                ) : responses.length === 0 ? (
                  <NotFoundModel />
                ) : (
                  <UssdResponsesTable
                    responses={responses}
                    onDeleteResponse={handleDeleteResponse}
                    deleteLoading={deleteLoading}
                  />
                )}
              </div>
            </div>
          </Content>
        </Page>
      </Container>

      {/* Delete Response Modal */}
      {deleteModal && (
        <DeleteResponseModal
          response={selectedResponse}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteModal(false)}
          loading={deleteLoading}
        />
      )}
    </>
  );
};

export default UssdSurveyResponses;
