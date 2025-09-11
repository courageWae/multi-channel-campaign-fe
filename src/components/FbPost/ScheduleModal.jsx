import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import tw from 'tailwind-styled-components';
import Loading from "../Loading"
const ScheduleModal = ({ onClose, scheduleLoading, ScheduleMutate, images, postText, postType, videos }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [hour, setHour] = useState(new Date().getHours() % 12 || 12);
    const [minute, setMinute] = useState(new Date().getMinutes());
    const [amPm, setAmPm] = useState(new Date().getHours() >= 12 ? 'PM' : 'AM');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const getCurrentTarget = (e) => {
        const targetClass = Array.from(e.target.classList);
        if (targetClass.includes("addCommentModels")) onClose();
    };

    useEffect(() => {
        setIsButtonDisabled(isPastDateTime());
    }, [selectedDate, hour, minute, amPm]);

    const handleSchedule = () => {
        const selectedTime = new Date(selectedDate);
        selectedTime.setHours(amPm === 'PM' ? hour % 12 + 12 : hour % 12);
        selectedTime.setMinutes(minute);
        console.log('Scheduled date and time:', selectedDate, selectedTime);
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const formattedTime = `${String(selectedTime.getHours()).padStart(2, '0')}:${String(selectedTime.getMinutes()).padStart(2, '0')}`;
        const body = {
            date: formattedDate,
            time: formattedTime,
            postText: postText,
            images: images,
            isSchedule: "later",
            postType: postType,
            videos: videos,

        };

        ScheduleMutate(body);

        // onClose();
    };

    const isPastDateTime = () => {
        const now = new Date();
        const selectedTime = new Date(selectedDate);
        selectedTime.setHours(amPm === 'PM' ? hour % 12 + 12 : hour % 12);
        selectedTime.setMinutes(minute);
        return selectedTime <= now;
    };

    const generateHourOptions = () => {
        return Array.from({ length: 12 }, (_, i) => i + 1);
    };

    const generateMinuteOptions = () => {
        return Array.from({ length: 60 }, (_, i) => i);
    };

    return (
        <ModalContainer onClick={getCurrentTarget}>
            <ModalContent>
                {scheduleLoading && <Loading />}
                {!scheduleLoading && (
                    <><Header>
                        <h2>Schedule Post</h2>
                        <CloseButton onClick={onClose}>×</CloseButton>
                    </Header><Body>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}

                                inline
                                dateFormat="MMMM d, yyyy"
                                minDate={new Date()}
                                className="w-full px-1 py-1 border border-gray-300 rounded" />
                            <TimePickerContainer>
                                <TimePickerDropdown value={hour} onChange={(e) => setHour(Number(e.target.value))}>
                                    {generateHourOptions().map((h) => (
                                        <option key={h} value={h}>
                                            {h}
                                        </option>
                                    ))}
                                </TimePickerDropdown>
                                <TimePickerDropdown value={minute} onChange={(e) => setMinute(Number(e.target.value))}>
                                    {generateMinuteOptions().map((m) => (
                                        <option key={m} value={m}>
                                            {m < 10 ? `0${m}` : m}
                                        </option>
                                    ))}
                                </TimePickerDropdown>
                                <TimePickerDropdown value={amPm} onChange={(e) => setAmPm(e.target.value)}>
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </TimePickerDropdown>
                            </TimePickerContainer>
                            <Button
                            // onClick={handleSchedule} disabled={isButtonDisabled}
                            >
                                Schedule
                            </Button>
                        </Body></>)}
            </ModalContent>
        </ModalContainer>
    );
};

const ModalContainer = tw.div`addCommentModels fixed inset-0 flex items-center justify-center bg-black z-50 bg-opacity-50`;
const ModalContent = tw.div`bg-white rounded-lg p-6 w-full max-w-md`;
const Header = tw.div`flex justify-between items-center border-b pb-2 mb-4 font-semibold text-base`;
const CloseButton = tw.button`text-xl font-semibold`;
const Body = tw.div`flex w-full flex-col items-center`;
const TimePickerContainer = tw.div`flex space-x-2 mt-4 w-full`;
const TimePickerDropdown = tw.select`w-full px-2 py-1 border border-gray-300 rounded bg-white `;
const Button = tw.button`
    mt-4 w-full py-2 rounded-lg transition duration-300
    ${(props) => props.disabled ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}
`;

export default ScheduleModal;
