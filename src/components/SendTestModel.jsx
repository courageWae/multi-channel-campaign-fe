
import React from 'react';
import tw from 'tailwind-styled-components';
import { MdClose } from 'react-icons/md';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    InputGroup,
    FieldWrappers,
    Label,
    SubmitBtn,
    CancelBtn,
} from './Styles/InputStyles';
import { BiLogoTelegram } from "react-icons/bi";
import ReactAudioPlayer from "react-audio-player";
import Config from 'Config';
const SendTestModel = ({
    setOpenTestModel,
    SendTestMutate,
    SendTestLoading,
    campaignName,
    sender,
    smsTemplate,
    audioFile,
    selectedTemplateMessage,
    type,
    caller,
    selectedTemplateUrl,
}) => {
    const handleClose = () => {
        setOpenTestModel(false);
    };

    const initialValues = {
        phoneNumber: '',
        smsTemplate: smsTemplate,
        sender: sender,
        campaignName: campaignName,
        type: type,
        selectedTemplateMessage: selectedTemplateMessage,
        audioFile: audioFile,
        caller: caller,
        selectedTemplateUrl: selectedTemplateUrl,
    };


    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .required('Phone number is required')
            .matches(/^\d{7,15}$/, 'Invalid phone number'),
    });
    const isAudioUrl = (file) => {
        return typeof file === 'string';
    };
    const handleSubmit = (values) => {
        const sendTestData = {
            phoneNumber: values.phoneNumber,
            campaignName: values.campaignName,
            sender: values.sender,
            smsTemplate: values.smsTemplate,
            type: values.type,
            message: values.selectedTemplateMessage,
            audioFile: values.audioFile,
            caller: values.caller,
            isUrl: isAudioUrl(values.audioFile),
            templateUrl: values.selectedTemplateUrl,
        };

        SendTestMutate(sendTestData);
        console.log(values);
    };

    return (
        <ModalBackground>
            <ModalContainer>
                <Header>
                    <Title>Send a Test</Title>
                    <CloseButton onClick={handleClose}>
                        <MdClose size={24} />
                    </CloseButton>
                </Header>
                <Content>
                    {selectedTemplateMessage && (
                        <MessagePreview>

                            <MsgContent>

                                <p>{selectedTemplateMessage || "Please select sms template and sender id first."}</p>

                            </MsgContent>

                        </MessagePreview>)}
                    {audioFile && (
                        <AudioPreview>

                            <AudioContent>
                                <ReactAudioPlayer
                                    // src={URL.createObjectURL(audioFile)}
                                    src={audioFile instanceof File ? URL.createObjectURL(audioFile) : audioFile}

                                    controls
                                />
                            </AudioContent>

                        </AudioPreview>)}
                    <SendTestSection>
                        <Heading>Send test {type === Config.CampaignType.Sms && <span>SMS</span>} {type === Config.CampaignType.Voice && <span>Voice</span>} to a contact</Heading>
                        <SubHeading>
                            Ensure your recipient is registered in your contact
                            list with a valid mobile phone number in the{' '}
                            {type === Config.CampaignType.Sms && <span className="font-medium">SMS</span>} {type === Config.CampaignType.Voice && <span className="font-medium">Voice</span>} field.
                        </SubHeading>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <InputGroup className=" my-3">
                                        <Label htmlFor="phoneNumber" className="text-base text-pretty font-normal">
                                            Phone Number *
                                        </Label>
                                        <FieldWrappers>
                                            <Field
                                                type="number"
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                autoComplete="off"
                                                className="truncate"
                                                required
                                            />

                                        </FieldWrappers>
                                        <ErrorMessage
                                            name="phoneNumber"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </InputGroup>
                                    <div className="flex justify-end pt-8">
                                        <BtnWrapper>
                                            <SubmitBtn
                                                type="submit"
                                                disabled={isSubmitting}
                                                className='flex justify-center'
                                            >
                                                <BiLogoTelegram className='mr-2' />  Send Test
                                            </SubmitBtn>
                                        </BtnWrapper>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </SendTestSection>
                </Content>
            </ModalContainer>
        </ModalBackground>
    );
};

const BtnWrapper = tw.div`flex justify-center items-center`;
const ModalBackground = tw.div`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`;
const ModalContainer = tw.div`bg-white rounded-2xl shadow-lg max-w-3xl w-full p-6`;
const Header = tw.div`flex justify-between items-center mb-8 px-4`;
const Title = tw.h2`text-xl text-pretty`;
const CloseButton = tw.button`text-gray-500 hover:text-gray-700`;
const Content = tw.div`my-4 flex space-x-6 px-4`;
const MessagePreview = tw.div`w-1/2 p-8  border rounded-md bg-gray-100 h-80 overflow-y-auto  items-center`;
const MsgContent = tw.div`w-full bg-white rounded-md whitespace-pre-line p-4 items-center overflow-y-auto`;
const SendTestSection = tw.div`w-1/2 pt-4 px-4 border rounded-md`;
const Heading = tw.h1`text-xl text-pretty mb-2`;
const SubHeading = tw.p`text-gray-600 text-sm font-normal`;
const AudioPreview = tw.div`w-1/2 p-2 border rounded-md bg-gray-100 h-80 overflow-y-auto flex justify-center  items-center`;
const AudioContent = tw.div` bg-white rounded-md  p-1 items-center overflow-y-auto`;
export default SendTestModel;
