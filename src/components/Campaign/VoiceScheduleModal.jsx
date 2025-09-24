import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Formik, Form } from "formik";
import {
    SubmitBtn,
    CancelBtn
} from "../Styles/InputStyles";
import Loading from "../Loading";
import { MdClose } from "react-icons/md";
import * as Yup from "yup";

const VoiceScheduleModal = ({
    setOpenUploadModel,
    ScheduleMutate,
    scheduleLoading,
    campaignName,
    campaignId,
    recipients,
    recipientName,
    audioFile,
    type,
    caller,
}) => {
    const [defaultDate, setDefaultDate] = useState("");
    const [defaultHours, setDefaultHours] = useState("");
    const [defaultMinutes, setDefaultMinutes] = useState("");
    const [defaultAmPm, setDefaultAmPm] = useState("");

    useEffect(() => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 15);

        const date = now.toISOString().split("T")[0];
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12;
        hours = hours ? hours : 12;

        setDefaultDate(date);
        setDefaultHours(String(hours).padStart(2, '0'));
        setDefaultMinutes(minutes);
        setDefaultAmPm(ampm);
    }, []);

    const initialValues = {
        schedule: "now",
        date: defaultDate,
        hours: defaultHours,
        minutes: defaultMinutes,
        ampm: defaultAmPm,
        campaignName: campaignName,
        campaignId: campaignId,
        recipients: recipients,
        type: type,
        audioFile: audioFile,
        caller: caller,
    };

    const validationSchema = Yup.object({
        // Simplified validation since we're not using scheduling anymore
    });
    
    const handleSubmit = (values) => {
        // Voice blast logic - immediate sending
        if (values.recipients) {
            // Use the GET endpoint /start_voice/{contact_group_id}
            const contactGroupId = values.recipients;
            ScheduleMutate({ contactGroupId, method: 'GET' });
        } else {
            console.error('No contact group selected');
        }
    };

    const handleClose = () => {
        setOpenUploadModel(false);
    };

    return (
        <div className="flex flex-col w-full h-screen bg-white overflow-hidden">
            <div className="flex items-center justify-between bg-[#06173A] py-6 px-4 flex-shrink-0">
                <Title className="text-white">Voice Campaign Blast</Title>
                <button onClick={handleClose}>
                    <MdClose color="white" size={24} />
                </button>
            </div>
            {scheduleLoading && <Loading />}

            <div className="flex flex-col flex-1 px-8 py-4 overflow-y-auto">
                {!scheduleLoading && (
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize>
                        {({ errors, touched, setFieldValue, values }) => (
                            <Form className="flex flex-col h-full">
                                <div className="flex-1">
                                    <Wrapper>
                                        {/* Voice campaign confirmation */}
                                        <div className="py-6 text-center">
                                            <div className="p-6 mb-6 bg-blue-50 rounded-lg border border-blue-200">
                                                <div className="flex justify-center items-center mb-4">
                                                    <div className="p-3 bg-blue-100 rounded-full">
                                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <h3 className="mb-2 text-lg font-semibold text-gray-900">Ready to Blast Your Voice Campaign?</h3>
                                                <p className="mb-4 text-gray-600">
                                                    Your voice campaign will be sent immediately to all recipients in the selected contact group.
                                                </p>
                                                <div className="p-4 bg-white rounded-md border border-blue-200">
                                                    <div className="text-sm text-gray-700">
                                                        <div className="flex justify-between mb-2">
                                                            <span className="font-medium">Campaign:</span>
                                                            <span className="text-gray-600">{campaignName}</span>
                                                        </div>
                                                        <div className="flex justify-between mb-2">
                                                            <span className="font-medium">Recipients:</span>
                                                            <span className="text-gray-600">{recipientName || (recipients ? 'Selected Group' : 'No group selected')}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="font-medium">Audio File:</span>
                                                            <span className="text-gray-600">{audioFile ? 'Ready' : 'No file'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Click "Blast Campaign" to proceed with sending your voice campaign immediately.
                                            </p>
                                        </div>
                                    </Wrapper>
                                </div>

                                <div className="flex justify-between p-4 mt-auto border-t border-gray-200 bg-gray-50">
                                    <CancelBtn type="button" onClick={handleClose}>
                                        Cancel
                                    </CancelBtn>
                                    <BtnWrapper>
                                        <SubmitBtn type="submit">Blast Campaign</SubmitBtn>
                                    </BtnWrapper>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    );
};

const Wrapper = tw.div`grid gap-6 my-6`;
const Title = tw.h1`text-lg md:text-xl font-medium text-center text-gray-800`;
const BtnWrapper = tw.div`flex justify-center items-center`;

export default VoiceScheduleModal;
