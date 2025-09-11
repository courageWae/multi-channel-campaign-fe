


// most accurate
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaFacebook } from 'react-icons/fa';
import tw from 'tailwind-styled-components';
import { MdClose } from 'react-icons/md';
import { IoDuplicate } from "react-icons/io5";
import CreatePostModal from './FbPostModel';

const localizer = momentLocalizer(moment);

const events = [
    {
        id: 0,
        title: 'Thought of the day Embrace each moment with gratitude. #gratitude #positivity #mindfulness #blessed #inspiration',
        allDay: false,
        start: new Date(2024, 7, 1, 11, 0),
        end: new Date(2024, 7, 1, 12, 0),
        photoUrl: 'https://buffer-media-uploads.s3.amazonaws.com/66951b1a6997627dcb032a84/6698ac0cd00dbcbd3802c59f/fd03059a30bde6bddba342587f60fcdf.original.jpg',
    },
    {
        id: 1,
        title: 'The dashboard',
        allDay: false,
        start: new Date(2024, 6, 1, 12, 5),
        end: new Date(2024, 6, 1, 13, 5),
        photoUrl: 'https://via.placeholder.com/80',
    },
    {
        id: 2,
        title: 'The dashboard',
        allDay: false,
        start: new Date(2024, 6, 1, 7, 30),
        end: new Date(2024, 6, 1, 8, 30),
    },
    {
        id: 3,
        title: 'The dashboard',
        allDay: false,
        start: new Date(2024, 6, 1, 8, 50),
        end: new Date(2024, 6, 1, 9, 50),
        photoUrl: 'https://via.placeholder.com/80',
    },
    {
        id: 4,
        title: 'The dashboard',
        allDay: false,
        start: new Date(2024, 6, 1, 14, 40),
        end: new Date(2024, 6, 1, 15, 40),
        photoUrl: 'https://via.placeholder.com/80',
    },
    {
        id: 5,
        title: 'The dashboard',
        allDay: false,
        start: new Date(2024, 6, 1, 21, 20),
        end: new Date(2024, 6, 1, 22, 20),
        photoUrl: 'https://via.placeholder.com/80',
    },
    {
        id: 6,
        title: 'The dashboard',
        allDay: false,
        start: new Date(2024, 6, 1, 4, 10),
        end: new Date(2024, 6, 1, 5, 0),
        photoUrl: 'https://via.placeholder.com/80',
    },

];

const EventTooltip = ({ event, position, onClose }) => {
    const popupRef = useRef(null);
    const [isFbModalOpen, setIsFbModalOpen] = useState(false);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);
    if (!event) return null;

    const { title, start, photoUrl } = event;

    const tooltipStyle = {
        top: position.y,
        left: position.x,
        transform: 'translate(-80%, 5%)',
    };

    return (
        <div style={tooltipStyle} ref={popupRef} className='z-10 absolute'>
            {isFbModalOpen && <CreatePostModal setIsFbModalOpen={setIsFbModalOpen} />}
            <Triangle />
            <Card >
                <div className="flex items-center justify-between px-4 py-2 border-b ">
                    <div className="flex items-center">
                        <IconWrapper >
                            <BackgroundCircle>
                                <img src="https://via.placeholder.com/40" alt="Avatar" className="w-8 h-8 rounded-full" />
                            </BackgroundCircle>
                            <FacebookBadge >
                                <FacebookIcon />
                            </FacebookBadge>
                        </IconWrapper>
                        <div className="ml-2">
                            <p className="text-gray-800 font-semibold text-base">ThoughtsOf</p>
                            {/* <p className="text-gray-500 text-sm">{moment(start).format('h:mm A')}</p> */}
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold text-sm">{moment(start).format('h:mm A')}</p>
                        {/* <MdClose className="text-gray-500 text-lg cursor-pointer hover:bg-gray-700 hover:text-white rounded-full" onClick={onClose} /> */}
                    </div>
                </div>
                <CardContent>
                    <TextContent>{title}</TextContent>
                    {photoUrl && (
                        <img src={photoUrl} alt="Event" className="w-24 h-24 rounded " />
                    )}
                </CardContent>
                <CardStats>
                    <StatItem>
                        <span>Likes</span>
                        <span className="font-semibold">0</span>
                    </StatItem>
                    <StatItem>
                        <span>Comments</span>
                        <span className="font-semibold">0</span>
                    </StatItem>
                    <StatItem>
                        <span>Shares</span>
                        <span className="font-semibold">0</span>
                    </StatItem>
                    <StatItem>
                        <span>Clicks</span>
                        <span className="font-semibold">0</span>
                    </StatItem>
                    <StatItem>
                        <span>Reach</span>
                        <span className="font-semibold">0</span>
                    </StatItem>
                </CardStats>
                <CardFooter>
                    <div className="flex items-center">
                        <div className="ml-2">
                            <button className="mr-2 font-medium text-base text-gray-600">View Post</button>
                            <Button>Share Link</Button>
                            {/* <button
                                className="ml-2 hover:text-black"
                                type="button"
                                onClick={() => setIsFbModalOpen(true)}
                            >
                                <IoDuplicate className="mt-1.5" title="Duplicate Post" /></button> */}
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

const EventComponent = ({ event }) => {
    return (
        <div className=" flex items-center justify-between  rounded-lg bg-gray-100 relative z-0">
            <div className="flex items-center">
                <FaFacebook className="text-blue-500 text-base mx-1" />
                <div className="text-black text-sm">
                    {moment(event.start).format('h:mm A')}
                </div>
            </div>
            {event.photoUrl && (
                <img src={event.photoUrl} alt="Event" className="w-7 h-7 rounded ml-2" />
            )}
        </div>
    );
};

const CalendarView = ({ view: initialView }) => {
    const [view, setView] = useState(initialView);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [showPopup, setShowPopup] = useState(false);
    const calendarRef = useRef(null);

    useEffect(() => {
        setView(initialView);
    }, [initialView]);

    const handleViewChange = (newView) => {
        setView(newView);
    };

    const handleSelectEvent = (event, e) => {
        const calendarNode = calendarRef.current;
        if (calendarNode) {
            const rect = calendarNode.getBoundingClientRect();
            setTooltipPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
        setSelectedEvent(event);
        setShowPopup(true);
    };
    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedEvent(null);
    };
    const eventPropGetter = (event) => ({
        style: {
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8px',
            color: 'red',
            overflow: 'visible',
            zIndex: 0,
        },
        // className: 'bg-[#F5F5F5]',
        className: view === Views.WEEK ? 'week-view-event' : '',
    });

    return (
        <div style={{ position: 'relative' }} ref={calendarRef} >
            <Calendar
                localizer={localizer}
                events={events}
                popup
                step={2}
                timeslots={10}
                style={{ height: 700, overflow: 'visible', zIndex: 0 }}
                view={view}
                onView={handleViewChange}
                views={[Views.WEEK, Views.MONTH]}
                onSelectEvent={handleSelectEvent}
                components={{
                    event: (props) => <EventComponent {...props} />,
                }}
                eventPropGetter={eventPropGetter}
            />
            {showPopup && <EventTooltip event={selectedEvent} position={tooltipPosition} onClose={handleClosePopup} />}
        </div>
    );
};

const Card = tw.div` border rounded-lg w-96  bg-white shadow-lg border border-gray-400 rounded-lg`;
const CardContent = tw.div`p-4 flex bg-gray-100 gap-6`;
const TextContent = tw.p`w-full text-black overflow-y-auto text-[15px]`;
const CardStats = tw.div`flex justify-between px-4 border-t py-2  `;
const StatItem = tw.div`flex flex-col items-left font-medium text-gray-700 text-[15px]`;
const CardFooter = tw.div`flex justify-end items-center border-t px-4 py-2 text-gray-700`;
const Button = tw.button`border rounded h-8 px-3 text-gray-500 border border-gray-400`;
const IconWrapper = tw.div`relative w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ring-2 ring-blue-500 bg-[#63A3F2]`;
const BackgroundCircle = tw.div`w-8 h-8 rounded-full flex items-center justify-centerbg-blue-300`;
const FacebookBadge = tw.div`absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center`;
const FacebookIcon = tw(FaFacebook)`text-blue-500`;
const Triangle = tw.div`w-5 h-5 bg-white absolute -top-[0.65rem] right-1/4 transform rotate-45  border-l border-t border-t-gray-400 border-l-gray-400 border-b-gray-200 border-r-gray-200`;
const DuplicateButton = tw.button`px-2 h-8 border rounded`
export default CalendarView;
