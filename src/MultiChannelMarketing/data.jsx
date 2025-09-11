import { SiAltiumdesigner, SiMarketo } from "react-icons/si";
import {
  MdCorporateFare,
  MdOutlineBrandingWatermark,
  MdOutlineCampaign,
  MdOutlinePersonalInjury,
  MdSell,
} from "react-icons/md";
import { IoBriefcaseSharp } from "react-icons/io5";
import { FaGlobe, FaHotel, FaIndustry, FaPiggyBank, FaShieldAlt, FaStethoscope, FaStore } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";

import { GrOverview } from "react-icons/gr";
import { FaGift } from "react-icons/fa";
import { PiBroadcastFill } from "react-icons/pi";
import { FaBullhorn, FaChartLine, FaPaintBrush, FaTools } from 'react-icons/fa';
import { FaEnvelope, FaComments, FaPhoneAlt, FaWhatsapp, FaTelegram, FaCalendarAlt, FaRobot, FaEye, FaListUl } from 'react-icons/fa';
import Images from "../Images";


export const data = {
  benefits: [
    {
      heading: "Enhanced Outreach",
      subHeading: "Reach large audiences across multiple channels efficiently.",
      icon: <FaBullhorn />,
    },
    {
      heading: "Improved Engagement",
      subHeading: "Increase interaction with personalized and rich media content.",
      icon: <FaPaintBrush />,
    },
    {
      heading: "Efficient Management",
      subHeading: "Streamline campaign execution with scheduling, automation, and content management tools.",
      icon: <FaTools />,
    },
    {
      heading: "Data-Driven Insights",
      subHeading: "Optimize campaigns with AI-driven content creation and performance analytics.",
      icon: <FaChartLine />,
    },
    {
      heading: "Consistent Branding",
      subHeading: "Maintain a professional image with standardized templates and content previews.",
      icon: <FaBullhorn />,
    },
  ],
};


export const cards = {
  features: [
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Messaging Services",
      title: "SMS Bulk Messaging",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Create and send personalized SMS messages to large recipient lists. Schedule messages for optimal times to maximize reach and engagement.
          </>
        ),
      },
      properties: [
        {
          icon: <FaEnvelope />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Broad Audience Reach",
              description:
                "Reaches a large audience quickly with personalized communication.",
            },
            {
              topHeading: "Optimized Timing",
              description:
                "Automates scheduling to ensure messages are sent at the best times.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Message Personalization",
              description:
                "Personalize messages with variables like names and purchase history.",
            },
            {
              topHeading: "Scheduling",
              description:
                "Schedule messages to be sent at optimal times for better engagement.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Email Marketing",
      title: "Email Messaging",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Design and distribute bulk email campaigns with customizable templates. Track performance metrics and enhance targeting for effective communication.
          </>
        ),
      },
      properties: [
        {
          icon: <FaEnvelope />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Visually Appealing Content",
              description:
                "Delivers detailed content with customizable templates.",
            },
            {
              topHeading: "Enhanced Targeting",
              description:
                "Targets specific segments with personalized email content.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Campaign Tracking",
              description:
                "Track open rates, click-through rates, and bounce rates for performance insights.",
            },
            {
              topHeading: "Customizable Templates",
              description:
                "Design and distribute campaigns using customizable email templates.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Voice Messaging",
      title: "Voice Broadcast",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Send pre-recorded voice messages to large groups via phone calls. Personalize messages and schedule broadcasts for efficient communication.
          </>
        ),
      },
      properties: [
        {
          icon: <FaPhoneAlt />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Direct Communication",
              description:
                "Delivers clear and direct messages through phone calls.",
            },
            {
              topHeading: "Automated Delivery",
              description:
                "Reduces manual effort with scheduled and automated broadcasts.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Voice Personalization",
              description:
                "Personalize messages with recipient-specific details.",
            },
            {
              topHeading: "Broadcast Scheduling",
              description:
                "Schedule and automate voice message delivery for efficient communication.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Messaging & Advertising",
      title: "WhatsApp Messaging & Advertising",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Send bulk messages and advertisements via WhatsApp, including rich media content. Utilize automation and chatbots for enhanced engagement and support.
          </>
        ),
      },
      properties: [
        {
          icon: <FaWhatsapp />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Engaging Platform",
              description:
                "Engages users on a popular messaging platform with rich media content.",
            },
            {
              topHeading: "Improved Support",
              description:
                "Enhances customer support with automated responses.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Rich Media Messaging",
              description:
                "Send messages with images, videos, and interactive elements.",
            },
            {
              topHeading: "Automation",
              description:
                "Utilize chatbots and automation for efficient engagement and inquiries.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Messaging & Advertising",
      title: "Telegram Messaging & Advertising",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Distribute bulk messages and advertisements via Telegram, supporting rich media content, polls, and surveys. Automate interactions with Telegram bots.
          </>
        ),
      },
      properties: [
        {
          icon: <FaTelegram />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Dynamic Platform",
              description:
                "Reaches audiences on a growing platform with dynamic features.",
            },
            {
              topHeading: "Interactive Content",
              description:
                "Engages users with polls, surveys, and rich media content.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Rich Media & Bots",
              description:
                "Support rich media content and automate interactions with Telegram bots.",
            },
            {
              topHeading: "Polls and Surveys",
              description:
                "Conduct polls and surveys for increased user engagement.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Campaign Management",
      title: "Campaign Scheduling",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Plan and schedule campaigns across various channels in advance. Set start and end times, and manage multiple campaigns with a centralized scheduler.
          </>
        ),
      },
      properties: [
        {
          icon: <FaCalendarAlt />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Optimized Timing",
              description:
                "Ensures campaigns are released at the most impactful times.",
            },
            {
              topHeading: "Simplified Management",
              description:
                "Reduces manual effort by managing multiple campaigns centrally.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Centralized Scheduler",
              description:
                "Plan and automate content releases for multiple campaigns from one place.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Content Creation",
      title: "AI Integration for Content Creation",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Utilize AI tools to generate and optimize campaign content. Automate content creation for various channels and refine strategies based on data insights.
          </>
        ),
      },
      properties: [
        {
          icon: <FaRobot />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Increased Efficiency",
              description:
                "Speeds up content creation and ensures high-quality, engaging content.",
            },
            {
              topHeading: "Data-Driven Insights",
              description:
                "Enhances content relevance through AI analysis of performance metrics.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "AI-Powered Creation",
              description:
                "Automate content ideas, headlines, and visuals using AI tools.",
            },
            {
              topHeading: "Content Optimization",
              description:
                "Refine content strategies based on AI-driven data insights.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Content Quality Assurance",
      title: "Content Preview",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Preview how content appears across different channels before publishing. Ensure correct formatting and appearance on various devices and platforms.
          </>
        ),
      },
      properties: [
        {
          icon: <FaEye />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Error Reduction",
              description:
                "Ensures content is displayed correctly and professionally, reducing errors.",
            },
            {
              topHeading: "Enhanced User Experience",
              description:
                "Provides a well-formatted message to improve overall user experience.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Platform-Specific Previews",
              description:
                "Preview and adjust content for different platforms and devices.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Design Efficiency",
      title: "Standard Template Creation & Designs",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Create and manage standard templates for various messaging platforms, ensuring consistency and efficiency in your campaigns.
          </>
        ),
      },
      properties: [
        {
          icon: <MdOutlineBrandingWatermark />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Consistent Branding",
              description:
                "Maintains branding consistency across all communication channels.",
            },
            {
              topHeading: "Efficient Content Creation",
              description:
                "Speeds up content creation with reusable and customizable templates.",
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
                "Create, save, and apply templates to ensure professional and consistent messaging.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Contact Management",
      title: "Contact List Management",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Import, organize, and manage contact lists for targeted messaging. Segment lists based on various criteria and maintain accurate contact information.
          </>
        ),
      },
      properties: [
        {
          icon: <FaListUl />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Improved Targeting",
              description:
                "Enhances personalization and targeting of messages through organized contact lists.",
            },
            {
              topHeading: "Effective Campaigns",
              description:
                "Increases campaign effectiveness with up-to-date and well-segmented contact information.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "List Segmentation",
              description:
                "Segment contact lists based on demographics, behavior, and engagement.",
            },
            {
              topHeading: "Contact Management",
              description:
                "Import, organize, and update contact information to ensure accuracy.",
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
      sub_heading:
        "Streamline production alerts, inventory updates, and supplier notifications with multi-channel communication.",
      topHeading: "Production Alerts and Supplier Notifications",
      scenario:
        "A manufacturing company needs to efficiently communicate production updates, inventory alerts, and supplier notifications.",
      implementations: [
        {
          title: "SMS Bulk Messaging",
          description:
            "Send alerts about production schedules, equipment maintenance, or urgent updates directly to relevant stakeholders.",
        },
        {
          title: "Email Messaging",
          description:
            "Distribute detailed reports and updates to suppliers and other key stakeholders.",
        },
        {
          title: "Voice Broadcast",
          description:
            "Deliver urgent production or safety announcements directly to key team members.",
        },
        {
          title: "WhatsApp & Telegram Messaging",
          description:
            "Share real-time updates and interactive content with suppliers and production staff.",
        },
        {
          title: "Campaign Scheduling",
          description:
            "Plan and schedule regular updates and reminders to maintain consistent communication.",
        },
      ],
      benefits: [
        {
          item: "Streamlines communication with suppliers and internal teams.",
        },
        {
          item: "Ensures timely updates and reduces the risk of production delays.",
        },
        {
          item: "Enhances coordination and operational efficiency.",
        },
      ],
    },
    {
      title: "Banking Industry",
      icon: <FaPiggyBank />,
      sub_heading:
        "Enhance customer engagement with timely notifications, personalized offers, and effective promotional campaigns.",
      topHeading: "Customer Notifications and Promotional Campaigns",
      scenario:
        "A bank needs to inform customers about account updates, promotional offers, and service reminders.",
      implementations: [
        {
          title: "SMS Bulk Messaging",
          description:
            "Send transaction alerts, account status updates, and promotional offers to customers.",
        },
        {
          title: "Email Messaging",
          description:
            "Distribute newsletters, account summaries, and detailed promotional campaigns to customers.",
        },
        {
          title: "Voice Broadcast",
          description:
            "Notify customers about important updates or security alerts.",
        },
        {
          title: "WhatsApp & Telegram Messaging",
          description:
            "Provide customer support, offer personalized deals, and share interactive content.",
        },
        {
          title: "AI Integration for Content Creation",
          description:
            "Generate personalized offers based on customer behavior for more effective engagement.",
        },
      ],
      benefits: [
        {
          item: "Enhances customer engagement with timely and relevant updates.",
        },
        {
          item: "Improves customer service with multiple communication channels.",
        },
        {
          item: "Drives promotions and cross-selling opportunities effectively.",
        },
      ],
    },
    {
      title: "Insurance Industry",
      icon: <FaShieldAlt />,
      sub_heading:
        "Manage claims notifications and policy renewals efficiently with targeted communications and automated reminders.",
      topHeading: "Claims Updates and Policy Renewals",
      scenario:
        "An insurance company needs to manage claims notifications, policy renewal reminders, and customer engagement.",
      implementations: [
        {
          title: "SMS Bulk Messaging",
          description:
            "Send claims status updates, policy renewal reminders, and important notices to policyholders.",
        },
        {
          title: "Email Messaging",
          description:
            "Provide detailed policy documents, renewal confirmations, and promotional offers.",
        },
        {
          title: "Voice Broadcast",
          description:
            "Deliver critical information about claim processes or policy changes directly to customers.",
        },
        {
          title: "WhatsApp & Telegram Messaging",
          description:
            "Engage customers with interactive claim tracking and renewal reminders.",
        },
        {
          title: "Campaign Scheduling",
          description:
            "Automate renewal reminders and follow-ups to reduce manual efforts.",
        },
      ],
      benefits: [
        {
          item: "Keeps customers informed and engaged throughout the claims and renewal process.",
        },
        {
          item: "Reduces manual follow-ups with automated reminders and notifications.",
        },
        {
          item: "Enhances customer satisfaction with timely and relevant communication.",
        },
      ],
    },
    {
      title: "Retail & Wholesale Industry",
      icon: <FaStore />,
      sub_heading:
        "Boost sales and customer engagement with targeted promotions and effective order management through multi-channel communication.",
      topHeading: "Sales Promotions and Customer Engagement",
      scenario:
        "A retail chain needs to promote sales, manage customer inquiries, and handle order notifications.",
      implementations: [
        {
          title: "SMS Bulk Messaging",
          description:
            "Send promotional offers, discount codes, and order confirmations to customers.",
        },
        {
          title: "Email Messaging",
          description:
            "Distribute newsletters, product updates, and personalized offers to customers.",
        },
        {
          title: "Voice Broadcast",
          description:
            "Notify customers about special sales events or store openings.",
        },
        {
          title: "WhatsApp & Telegram Messaging",
          description:
            "Provide customer support, handle inquiries, and share promotions.",
        },
        {
          title: "Content Preview",
          description:
            "Ensure promotional content appears correctly across different channels before sending.",
        },
      ],
      benefits: [
        {
          item: "Drives sales with targeted promotions and offers.",
        },
        {
          item: "Enhances customer service with multiple communication channels.",
        },
        {
          item: "Improves order management and customer engagement.",
        },
      ],
    },
    {
      title: "Hospitality Industry",
      icon: <FaHotel />,
      sub_heading:
        "Enhance guest experience and streamline event management with personalized notifications and automated reminders.",
      topHeading: "Guest Reservations and Event Management",
      scenario:
        "A hotel chain needs to manage guest reservations, event bookings, and customer service efficiently.",
      implementations: [
        {
          title: "SMS Bulk Messaging",
          description:
            "Send reservation confirmations, check-in reminders, and special offers to guests.",
        },
        {
          title: "Email Messaging",
          description:
            "Provide booking details, event invitations, and promotional materials to guests.",
        },
        {
          title: "Voice Broadcast",
          description:
            "Notify guests about important updates or special events.",
        },
        {
          title: "WhatsApp & Telegram Messaging",
          description:
            "Engage guests with personalized service and real-time updates.",
        },
        {
          title: "Campaign Scheduling",
          description:
            "Automate guest reminders and promotional campaigns to ensure timely communication.",
        },
      ],
      benefits: [
        {
          item: "Enhances guest experience with timely updates and personalized service.",
        },
        {
          item: "Streamlines event management and booking confirmations.",
        },
        {
          item: "Increases engagement and drives repeat business.",
        },
      ],
    },
    {
      title: "Tourism Industry",
      icon: <FaGlobe />,
      sub_heading:
        "Increase travel bookings and customer engagement with engaging content and personalized marketing strategies.",
      topHeading: "Tour Bookings and Customer Engagement",
      scenario:
        "A travel agency needs to handle tour bookings, provide updates, and engage customers effectively.",
      implementations: [
        {
          title: "SMS Bulk Messaging",
          description:
            "Send booking confirmations, tour reminders, and promotional offers to travelers.",
        },
        {
          title: "Email Messaging",
          description:
            "Distribute detailed itineraries, travel tips, and special deals to customers.",
        },
        {
          title: "Voice Broadcast",
          description:
            "Notify customers about important travel updates or changes.",
        },
        {
          title: "WhatsApp & Telegram Messaging",
          description:
            "Provide real-time support, share interactive content, and handle inquiries.",
        },
        {
          title: "AI Integration for Content Creation",
          description:
            "Personalize travel offers based on customer preferences to enhance engagement.",
        },
      ],
      benefits: [
        {
          item: "Improves customer experience with timely and personalized communication.",
        },
        {
          item: "Enhances booking management and provides real-time support.",
        },
        {
          item: "Drives engagement and promotes additional services effectively.",
        },
      ],
    },
    {
      title: "Advertising Industry",
      icon: <FaBullhorn />,
      sub_heading:
        "Improve ad performance and client satisfaction with streamlined campaign management and AI-driven content creation.",
      topHeading: "Campaign Promotion and Client Communication",
      scenario:
        "An advertising agency needs to promote campaigns, manage client communication, and handle feedback effectively.",
      implementations: [
        {
          title: "SMS Bulk Messaging",
          description:
            "Send campaign updates, promotional offers, and event invitations to clients and target audiences.",
        },
        {
          title: "Email Messaging",
          description:
            "Distribute detailed campaign reports, client updates, and promotional materials.",
        },
        {
          title: "Voice Broadcast",
          description:
            "Notify clients about important meetings or campaign launches.",
        },
        {
          title: "WhatsApp & Telegram Messaging",
          description:
            "Engage clients with interactive content and real-time updates.",
        },
        {
          title: "Content Preview",
          description:
            "Ensure advertising content is visually appealing and correctly formatted across different platforms.",
        },
      ],
      benefits: [
        {
          item: "Enhances campaign visibility and client engagement.",
        },
        {
          item: "Streamlines client communication and feedback collection.",
        },
        {
          item: "Improves campaign effectiveness with well-managed promotions.",
        },
      ],
    },
    {
      title: "Healthcare Industry",
      icon: <FaStethoscope />,
      sub_heading:
        "Enhance patient engagement and reduce missed appointments with targeted notifications and personalized health information.",
      topHeading: "Patient Notifications and Appointment Reminders",
      scenario:
        "A healthcare provider needs to manage patient appointments, send reminders, and communicate health updates effectively.",
      implementations: [
        {
          title: "SMS Bulk Messaging",
          description:
            "Send appointment reminders, prescription updates, and health alerts to patients.",
        },
        {
          title: "Email Messaging",
          description:
            "Distribute appointment confirmations, health tips, and wellness newsletters to patients.",
        },
        {
          title: "Voice Broadcast",
          description:
            "Notify patients about important health information or appointment changes.",
        },
        {
          title: "WhatsApp & Telegram Messaging",
          description:
            "Provide real-time support, handle inquiries, and share health information with patients.",
        },
        {
          title: "Campaign Scheduling",
          description:
            "Automate appointment reminders and health updates to ensure consistent communication.",
        },
      ],
      benefits: [
        {
          item: "Reduces missed appointments with timely reminders.",
        },
        {
          item: "Enhances patient engagement with personalized communication.",
        },
        {
          item: "Improves overall patient management and care coordination.",
        },
      ],
    },
  ],
};

