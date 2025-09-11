
import { IoBriefcaseSharp } from "react-icons/io5";

import { FaGlobe, FaHotel, FaIndustry, FaPiggyBank, FaShieldAlt, FaStethoscope, FaStore, FaUniversity} from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { FaTools, FaBullseye, FaPaintBrush, FaBullhorn, FaClipboardCheck, FaChartLine } from "react-icons/fa";
import Images from "../Images";

export const data = {
  benefits: [
    {
      heading: "Comprehensive Management",
      subHeading:
        "Centralize and streamline campaign management across multiple social media platforms.",
      icon: <FaTools />,
    },
    {
      heading: "Optimized Scheduling",
      subHeading:
        "Automate posting schedules to maximize engagement and reach.",
      icon: <FaClipboardCheck />,
    },
    {
      heading: "Enhanced Content Creation",
      subHeading:
        "Leverage AI for efficient and effective content generation.",
      icon: <FaPaintBrush />,
    },
    {
      heading: "Consistent Branding",
      subHeading:
        "Maintain brand consistency with standard templates and content previews.",
      icon: <FaBullhorn />,
    },
    {
      heading: "Effective Targeting",
      subHeading:
        "Utilize well-managed contact lists for precise campaign targeting.",
      icon: <FaBullseye />, 
    },
    {
      heading: "Informed Strategy",
      subHeading:
        "Use feedback and performance analytics to refine and improve campaigns.",
      icon: <FaChartLine />, 
    },
  ],
};


export const cards = {
  features: [
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Scheduling Solutions",
      title: "Online Scheduling & Booking System",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Provides an intuitive online calendar interface where users can schedule meetings and appointments. Clients and team members can book available time slots based on real-time availability.
          </>
        ),
      },
      properties: [
        {
          icon: <IoBriefcaseSharp />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Reduces Conflicts",
              description:
                "Reduces scheduling conflicts and double-bookings, enhancing user experience by automating the booking process.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Intuitive Calendar Interface",
              description:
                "Provides a user-friendly calendar where appointments can be scheduled and managed effortlessly.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Scheduling Solutions",
      title: "Automated Reminders & Notifications",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Sends automated reminders and notifications via email, SMS, or push notifications before meetings or appointments. Customize reminder intervals and message content.
          </>
        ),
      },
      properties: [
        {
          icon: <IoBriefcaseSharp />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Reduces No-Shows",
              description:
                "Reduces no-show rates by reminding participants of upcoming meetings, improving attendance and punctuality.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Customizable Reminders",
              description:
                "Allows customization of reminder intervals and message content to suit different needs.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Scheduling Solutions",
      title: "Meeting Rescheduling & Cancellation",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Provides options for users to reschedule or cancel appointments through an easy-to-navigate interface, automatically updating the calendar and notifying all involved parties of changes.
          </>
        ),
      },
      properties: [
        {
          icon: <IoBriefcaseSharp />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Offers Flexibility",
              description:
                "Accommodates changes in availability while ensuring all participants are informed of schedule changes, minimizing confusion.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Easy Rescheduling",
              description:
                "Provides an easy-to-use interface for rescheduling or canceling appointments, streamlining the management process.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Scheduling Solutions",
      title: "Customizable Meeting Types & Templates",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Allows users to create and manage different types of meetings with specific templates, including agendas, follow-up actions, and required materials.
          </>
        ),
      },
      properties: [
        {
          icon: <IoBriefcaseSharp />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Standardizes Processes",
              description:
                "Ensures consistency and efficiency by using pre-defined templates for different types of meetings.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Template Management",
              description:
                "Customizable templates for various meeting types help in maintaining professionalism and organization.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Integration Solutions",
      title: "Integration with CRM & Other Tools",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Integrates with CRM systems and other business tools, syncing meeting and appointment data with customer profiles and project details.
          </>
        ),
      },
      properties: [
        {
          icon: <IoBriefcaseSharp />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Holistic View",
              description:
                "Provides a comprehensive view of customer interactions and project statuses while streamlining workflows.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Seamless Integration",
              description:
                "Syncs scheduling data with CRM and project management tools for improved coordination and data accuracy.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Analytics Solutions",
      title: "Meeting Analytics & Reporting",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Offers analytics and reporting features to track meeting metrics such as attendance rates, rescheduling patterns, and meeting outcomes.
          </>
        ),
      },
      properties: [
        {
          icon: <IoBriefcaseSharp />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Evaluates Effectiveness",
              description:
                "Provides data to evaluate meeting effectiveness and optimize scheduling practices for better engagement.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Performance Tracking",
              description:
                "Tracks key metrics and trends to assist in strategic planning and improving meeting practices.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Mobile Solutions",
      title: "Mobile Access & Management",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Offers mobile access to the scheduling and appointment management system through dedicated apps or responsive web interfaces, allowing users to manage meetings on-the-go.
          </>
        ),
      },
      properties: [
        {
          icon: <IoBriefcaseSharp />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Flexibility and Convenience",
              description:
                "Provides the ability to manage appointments from mobile devices, enhancing productivity and real-time updates.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "On-the-Go Management",
              description:
                "Access and manage scheduling information from anywhere, ensuring real-time updates and convenience.",
            },
          ],
        },
      ],
    },
  ],
};


export const useCases = {
  cases: [
    {
      title: "Manufacturing Industry",
      icon: <FaIndustry />,
      sub_heading: "Reduces scheduling conflicts and ensures timely updates on supply chain issues through streamlined scheduling and integration.",
      topHeading: "Production Scheduling and Supplier Meetings",
      scenario: "A manufacturing company needs to coordinate meetings with suppliers, production teams, and stakeholders to streamline production schedules and manage supply chain logistics.",
      implementations: [
        {
          title: "Online Scheduling",
          description: "Schedule regular meetings with suppliers to discuss inventory levels and delivery schedules, allowing suppliers to book time slots based on availability.",
        },
        {
          title: "Automated Reminders",
          description: "Send reminders to suppliers and production managers about upcoming meetings to ensure timely attendance.",
        },
        {
          title: "Integration with CRM",
          description: "Sync meeting details with supplier profiles to track interaction history and manage relationships.",
        },
      ],
      benefits: [
        {
          item: "Reduces scheduling conflicts and ensures timely updates on supply chain issues.",
        },
        {
          item: "Enhances communication with suppliers and production teams, improving operational efficiency.",
        },
        {
          item: "Streamlines production planning and inventory management.",
        },
      ],
    },
    {
      title: "Banking Industry",
      icon: <FaPiggyBank />,
      sub_heading: "Facilitates easy scheduling and improves internal coordination through customizable booking and meeting analytics.",
      topHeading: "Client Consultations and Internal Team Meetings",
      scenario: "A bank needs to manage appointments with clients for financial consultations and internal team meetings for strategy planning and operational reviews.",
      implementations: [
        {
          title: "Customizable Booking Pages",
          description: "Create booking pages for clients to schedule consultations with financial advisors based on available time slots.",
        },
        {
          title: "Video Conferencing Integration",
          description: "Include video call links in appointment invitations for remote consultations.",
        },
        {
          title: "Meeting Analytics",
          description: "Track meeting metrics to analyze client engagement and advisor performance.",
        },
      ],
      benefits: [
        {
          item: "Facilitates easy scheduling of client consultations, enhancing customer service.",
        },
        {
          item: "Improves internal coordination by managing team meeting schedules effectively.",
        },
        {
          item: "Provides data insights to optimize client interactions and internal workflows.",
        },
      ],
    },
    {
      title: "Insurance Industry",
      icon: <FaShieldAlt />,
      sub_heading: "Enhances client experience and improves claims processing through automated reminders and role-based access.",
      topHeading: "Claims Processing and Policy Review Meetings",
      scenario: "An insurance company needs to manage meetings with clients to discuss claims processing and policy reviews.",
      implementations: [
        {
          title: "Automated Reminders",
          description: "Send automated reminders to clients about scheduled meetings for claims processing and policy reviews.",
        },
        {
          title: "Meeting Rescheduling",
          description: "Allow clients to easily reschedule or cancel appointments if needed.",
        },
        {
          title: "Role-Based Access",
          description: "Set permissions for insurance agents to manage appointments and access client details securely.",
        },
      ],
      benefits: [
        {
          item: "Enhances client experience by providing timely reminders and easy rescheduling options.",
        },
        {
          item: "Improves efficiency in claims processing and policy reviews.",
        },
        {
          item: "Ensures secure and organized management of client interactions.",
        },
      ],
    },
    {
      title: "Retail & Wholesale Industry",
      icon: <FaStore />,
      sub_heading: "Streamlines supplier meetings and enhances customer service through online scheduling and customizable booking pages.",
      topHeading: "Supplier Meetings and Customer Appointments",
      scenario: "A retail chain needs to schedule meetings with suppliers for product orders and manage customer appointments for personalized shopping experiences or consultations.",
      implementations: [
        {
          title: "Online Scheduling",
          description: "Allow suppliers to book meetings for order placements and inventory discussions.",
        },
        {
          title: "Customizable Booking Pages",
          description: "Create booking pages for customers to schedule appointments for personal shopping or consultations.",
        },
        {
          title: "Mobile Access",
          description: "Enable retail managers to manage and track appointments on-the-go.",
        },
      ],
      benefits: [
        {
          item: "Streamlines supplier meetings and enhances procurement efficiency.",
        },
        {
          item: "Provides a personalized shopping experience for customers, increasing satisfaction and loyalty.",
        },
        {
          item: "Improves inventory management and customer service.",
        },
      ],
    },
    {
      title: "Hospitality Industry",
      icon: <FaHotel />,
      sub_heading: "Enhances guest experience and improves event management through online scheduling and automated reminders.",
      topHeading: "Guest Reservations and Event Planning",
      scenario: "A hotel chain needs to manage guest reservations, meeting rooms, and event planning efficiently.",
      implementations: [
        {
          title: "Online Scheduling",
          description: "Allow guests to book reservations and request meeting rooms for conferences or events through an online booking system.",
        },
        {
          title: "Automated Reminders",
          description: "Send reminders to guests about their bookings and event organizers about upcoming events.",
        },
        {
          title: "Integration with CRM",
          description: "Sync booking details with guest profiles for personalized service and follow-up.",
        },
      ],
      benefits: [
        {
          item: "Enhances guest experience by providing a seamless booking process.",
        },
        {
          item: "Improves event management by organizing room reservations and event schedules efficiently.",
        },
        {
          item: "Streamlines operations and improves guest satisfaction.",
        },
      ],
    },
    {
      title: "Tourism Industry",
      icon: <FaGlobe />,
      sub_heading: "Increases interest in travel destinations and improves package sales through engaging content and personalized marketing.",
      topHeading: "Tour Bookings and Travel Agency Meetings",
      scenario: "A travel agency needs to manage tour bookings, customer consultations, and meetings with local tour operators.",
      implementations: [
        {
          title: "Customizable Booking Pages",
          description: "Allow customers to book tours and consultations with travel agents online.",
        },
        {
          title: "Video Conferencing Integration",
          description: "Facilitate virtual meetings with clients for travel planning.",
        },
        {
          title: "Meeting Analytics",
          description: "Track booking and consultation metrics to optimize service offerings.",
        },
      ],
      benefits: [
        {
          item: "Simplifies the booking process for tours and consultations.",
        },
        {
          item: "Enhances client engagement with virtual planning options.",
        },
        {
          item: "Provides insights to improve tour offerings and customer service.",
        },
      ],
    },
    {
      title: "Advertising Industry",
      icon: <FaBullhorn />,
      sub_heading: "Improves client satisfaction and ad performance through streamlined campaign management and AI-driven content.",
      topHeading: "Client Meetings and Creative Review Sessions",
      scenario: "An advertising agency needs to manage meetings with clients to discuss campaign strategies and review creative materials.",
      implementations: [
        {
          title: "Online Scheduling",
          description: "Schedule client meetings for campaign discussions and creative reviews.",
        },
        {
          title: "Customizable Meeting Types",
          description: "Create templates for different meeting types (e.g., strategy sessions, creative reviews).",
        },
        {
          title: "Meeting Analytics",
          description: "Analyze client meeting data to assess engagement and campaign effectiveness.",
        },
      ],
      benefits: [
        {
          item: "Facilitates efficient scheduling of client meetings and creative review sessions.",
        },
        {
          item: "Enhances collaboration and feedback collection for campaign improvements.",
        },
        {
          item: "Improves client satisfaction by providing organized and effective meeting management.",
        },
      ],
    },
    {
      title: "Healthcare Industry",
      icon: <FaStethoscope />,
      sub_heading: "Improves patient access and care coordination through easy appointment scheduling and integrated patient records.",
      topHeading: "Patient Appointments and Consultations",
      scenario: "A healthcare provider needs to manage patient appointments, consultations, and follow-up visits.",
      implementations: [
        {
          title: "Online Scheduling",
          description: "Allow patients to book appointments online with healthcare providers based on availability.",
        },
        {
          title: "Automated Reminders",
          description: "Send reminders to patients about upcoming appointments and follow-up visits.",
        },
        {
          title: "Integration with CRM",
          description: "Sync appointment details with patient records for comprehensive care management.",
        },
      ],
      benefits: [
        {
          item: "Improves patient access to healthcare services by providing an easy booking process.",
        },
        {
          item: "Reduces no-show rates with automated reminders.",
        },
        {
          item: "Enhances care coordination by integrating appointment details with patient records.",
        },
      ],
    },
    {
      title: "Education Industry",
      icon: <FaUniversity />,
      sub_heading: "Enhances student advising and faculty coordination through streamlined scheduling and data-driven insights.",
      topHeading: "Student Advising and Faculty Meetings",
      scenario: "An educational institution needs to manage student advising sessions, faculty meetings, and academic consultations.",
      implementations: [
        {
          title: "Customizable Booking Pages",
          description: "Create booking pages for students to schedule advising sessions with academic advisors.",
        },
        {
          title: "Automated Reminders",
          description: "Send reminders to students and faculty about upcoming meetings and consultations.",
        },
        {
          title: "Meeting Analytics",
          description: "Track advising and meeting metrics to improve scheduling and resource allocation.",
        },
      ],
      benefits: [
        {
          item: "Enhances the student advising experience by providing a streamlined scheduling process.",
        },
        {
          item: "Improves faculty meeting coordination and academic planning.",
        },
        {
          item: "Provides data insights to optimize scheduling and resource use.",
        },
      ],
    },
  ],
};



