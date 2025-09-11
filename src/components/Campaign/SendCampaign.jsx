
import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Formik, Field, Form } from "formik";
import {
    InputGroup,
    FieldWrappers,
    Label,
    SubmitBtn,
    CancelBtn
} from "../Styles/InputStyles";
import Loading from "../Loading";
import { MdClose } from "react-icons/md";
import * as Yup from "yup";

const SendCampaign = ({
    setOpenUploadModel,
    ScheduleMutate,
    scheduleLoading,
    campaignName,
    campaignId,
    recipients,
    sender,
    smsTemplate,
    selectedTemplateMessage,
    audioFile,
    type,
    caller,
    selectedTemplateUrl,
    images,
    postText,
}) => {
    const [scheduleLater, setScheduleLater] = useState(false);
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
        sender: sender,
        smsTemplate: smsTemplate,
        type: type,
        selectedTemplateMessage: selectedTemplateMessage,
        audioFile: audioFile,
        caller: caller,
        selectedTemplateUrl: selectedTemplateUrl,
        postText: postText,
        image: images,
    };

    const validationSchema = Yup.object({
        date: scheduleLater ? Yup.string().required("Date is required") : Yup.string(),
        hours: scheduleLater ? Yup.string().required("Hours are required") : Yup.string(),
        minutes: scheduleLater ? Yup.string().required("Minutes are required") : Yup.string(),
        ampm: scheduleLater ? Yup.string().required("AM/PM is required") : Yup.string(),
    });
    const isAudioUrl = (file) => {
        return typeof file === 'string';
    };
    const handleSubmit = (values) => {
        const hours24 = values.ampm === "PM" && values.hours !== "12" ?
            String(parseInt(values.hours, 10) + 12) :
            values.ampm === "AM" && values.hours === "12" ? "00" : values.hours;
        const time = `${hours24}:${values.minutes}`;
        const scheduleData = {
            isSchedule: values.schedule,
            campaignName: values.campaignName,
            groupId: values.recipients,
            senderId: values.sender,
            templateId: values.smsTemplate,
            type: values.type,
            message: values.selectedTemplateMessage,
            campaignId: values.campaignId,
            audioFile: values.audioFile,
            caller: values.caller,
            isUrl: isAudioUrl(values.audioFile),
            templateUrl: values.selectedTemplateUrl,
            postText: values.postText,
            image: values.image,
        };

        if (values.schedule === 'later') {
            scheduleData.date = values.date;
            scheduleData.time = time;
        }

        ScheduleMutate(scheduleData);
    };

    const handleClose = () => {
        setOpenUploadModel(false);
    };

    const generateHourOptions = (selectedDate, selectedAmPm) => {
        const now = new Date();
        const currentHours = now.getHours();
        const hours = currentHours % 12 || 12;
        const ampm = currentHours >= 12 ? "PM" : "AM";

        return Array.from({ length: 12 }, (_, i) => {
            const hour = String(i + 1).padStart(2, '0');
            const disable = selectedDate === defaultDate && (selectedAmPm === ampm && hour < hours);
            return (
                <option key={hour} value={hour} disabled={disable}>
                    {hour}
                </option>
            );
        });
    };

    const generateMinuteOptions = (selectedDate, selectedHours, selectedAmPm) => {
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const hours = currentHours % 12 || 12;
        const minutes = currentMinutes % 60;
        const ampm = currentHours >= 12 ? "PM" : "AM";

        return Array.from({ length: 60 }, (_, i) => {
            const minute = String(i).padStart(2, '0');
            const disable = selectedDate === defaultDate &&
                selectedAmPm === ampm &&
                ((selectedHours == hours && i < minutes) ||
                    (selectedAmPm === "AM" && hours == 12 && selectedHours == 12 && i < minutes) ||
                    (selectedAmPm === "PM" && hours == 12 && selectedHours == 12 && i < minutes));
            return (
                <option key={minute} value={minute} disabled={disable}>
                    {minute}
                </option>
            );
        });
    };


    const amPmOptions = ["AM", "PM"].map((period) => {
        const now = new Date();
        const currentHours = now.getHours();
        const ampm = currentHours >= 12 ? "PM" : "AM";

        return (
            <option key={period} value={period} disabled={period === "AM" && ampm === "PM" && defaultDate === initialValues.date}>
                {period}
            </option>
        );
    });

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="flex items-center justify-between bg-[#06173A] py-10 px-4">
                <Title className="text-white">Schedule</Title>
                <button onClick={handleClose}>
                    <MdClose color="white" size={24} />
                </button>
            </div>
            {scheduleLoading && <Loading />}

            <div className="px-8 h-full flex flex-col justify-between pb-4">
                {!scheduleLoading && (
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize>
                        {({ errors, touched, setFieldValue, values }) => (
                            <Form className="flex flex-col h-full justify-between">
                                <Wrapper>

                                    <Label>When would you like to send the campaign?</Label>
                                    <div className="flex flex-col items-start space-y-4">
                                        <Label className="flex space-x-2">
                                            <Field
                                                type="radio"
                                                name="schedule"
                                                value="now"
                                                onChange={() => {
                                                    setFieldValue("schedule", "now");
                                                    setScheduleLater(false);
                                                }}
                                                checked={values.schedule === "now"}
                                                className="form-radio text-purple-600"
                                            />
                                            <span>Now</span>
                                        </Label>

                                        <Label className="flex space-x-2">
                                            <Field
                                                type="radio"
                                                name="schedule"
                                                value="later"
                                                onChange={() => {
                                                    setFieldValue("schedule", "later");
                                                    setScheduleLater(true);
                                                }}
                                                checked={values.schedule === "later"}
                                                className="form-radio text-purple-600"
                                            />
                                            <span>Later</span>
                                        </Label>
                                    </div>

                                    {scheduleLater && (
                                        <div className="flex flex-col gap-4 mx-5">
                                            <InputGroup>
                                                <Label htmlFor="date">Date *</Label>
                                                <FieldWrappers>
                                                    <Field
                                                        type="date"
                                                        name="date"
                                                        id="date"
                                                        className="form-input w-full"
                                                        onChange={(e) => setFieldValue("date", e.target.value)}
                                                        value={values.date}
                                                        min={defaultDate}
                                                    />
                                                </FieldWrappers>
                                                {errors.date && touched.date ? (
                                                    <div className="text-red-500 text-sm mt-1">{errors.date}</div>
                                                ) : null}
                                            </InputGroup>

                                            <InputGroup className="w-full">
                                                <Label htmlFor="hours">Time *</Label>
                                                <div className="flex gap-4">
                                                    <FieldWrappers>
                                                        <Field
                                                            as="select"
                                                            name="hours"
                                                            id="hours"
                                                            className="form-select w-full"
                                                            onChange={(e) => setFieldValue("hours", e.target.value)}
                                                            value={values.hours}
                                                        >
                                                            <option value="" label="Select hour" />
                                                            {generateHourOptions(values.date, values.ampm)}
                                                        </Field>
                                                    </FieldWrappers>
                                                    {errors.hours && touched.hours ? (
                                                        <div className="text-red-500 text-sm mt-1">{errors.hours}</div>
                                                    ) : null}

                                                    <FieldWrappers>
                                                        <Field
                                                            as="select"
                                                            name="minutes"
                                                            id="minutes"
                                                            className="form-select w-full"
                                                            onChange={(e) => setFieldValue("minutes", e.target.value)}
                                                            value={values.minutes}
                                                        >
                                                            <option value="" label="Select minutes" />
                                                            {generateMinuteOptions(values.date, values.hours, values.ampm)}
                                                        </Field>
                                                    </FieldWrappers>
                                                    {errors.minutes && touched.minutes ? (
                                                        <div className="text-red-500 text-sm mt-1">{errors.minutes}</div>
                                                    ) : null}

                                                    <FieldWrappers>
                                                        <Field
                                                            as="select"
                                                            name="ampm"
                                                            id="ampm"
                                                            className="form-select w-full"
                                                            onChange={(e) => setFieldValue("ampm", e.target.value)}
                                                            value={values.ampm}
                                                        >
                                                            {amPmOptions}
                                                        </Field>
                                                    </FieldWrappers>
                                                    {errors.ampm && touched.ampm ? (
                                                        <div className="text-red-500 text-sm mt-1">{errors.ampm}</div>
                                                    ) : null}
                                                </div>

                                            </InputGroup>
                                        </div>
                                    )}
                                </Wrapper>

                                <div className="flex justify-between p-4">
                                    <CancelBtn type="button" onClick={handleClose}>
                                        Cancel
                                    </CancelBtn>
                                    <BtnWrapper>
                                        <SubmitBtn type="submit">Schedule</SubmitBtn>
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

export default SendCampaign;
