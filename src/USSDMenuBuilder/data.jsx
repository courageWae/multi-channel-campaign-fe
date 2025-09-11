import { SiMarketo } from "react-icons/si";
import {
  MdCorporateFare,
  MdOutlinePhoneIphone,
} from "react-icons/md";
import { IoBriefcaseSharp } from "react-icons/io5";
import { FaBuilding, FaBullhorn, FaChartLine, FaCog, FaCogs, FaDollarSign, FaEye, FaGlobe, FaHotel, FaLink, FaMoneyCheckAlt, FaPhoneAlt, FaPiggyBank, FaRobot } from "react-icons/fa";

import { GrOverview } from "react-icons/gr";
import { FaGift } from "react-icons/fa";
import { PiBroadcastFill } from "react-icons/pi";
import Images from "../Images";
export const data = {
  benefits: [
    {
      heading: "Wider Audience Reach",
      subHeading:
        "Accessible on any mobile phone, increasing participation even among users without smartphones or internet access.",
      icon: <FaGlobe />,
    },
    {
      heading: "Simplified Campaign Management",
      subHeading:
        "The drag-and-drop interface allows users to design, deploy, and manage complex USSD campaigns without needing technical expertise.",
      icon: <FaCog />,
    },
    {
      heading: "Real-Time Insights",
      subHeading:
        "Instant data collection and real-time analytics help track and measure campaign performance for ongoing improvements.",
      icon: <FaChartLine />,
    },
    {
      heading: "Cost-Effective Engagement",
      subHeading:
        "USSD provides a low-cost solution to engage with large audiences efficiently.",
      icon: <FaDollarSign />,
    },
    {
      heading: "Graphical Flow Builder",
      subHeading:
        "Design complex USSD menus using an intuitive, drag-and-drop graphical interface.",
      icon: <FaCogs />,
    },
    {
      heading: "Real-Time Preview & Testing",
      subHeading:
        "Preview and test USSD campaigns before deployment to ensure all features work correctly.",
      icon: <FaEye />,
    },
    {
      heading: "Multichannel Integration",
      subHeading:
        "Integrate seamlessly with CRM systems, data analytics platforms, and mobile network providers to enhance customer experience.",
      icon: <FaLink />,
    },
    {
      heading: "Automation",
      subHeading:
        "Automate responses, scheduling, and lead generation to minimize manual intervention.",
      icon: <FaRobot />,
    },
  ],
};


export const cards = {
  features: [
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Graphical Designing USSD Flows",
      title: "Graphically Designing USSD Flows Using Drag and Drop",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            This sub-feature allows users to create USSD menus and service flows through an easy-to-use drag-and-drop interface. Users can visually design the structure of their USSD campaigns by adding elements such as menus, options, and responses.
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
              topHeading: "User-Friendly Interface",
              description:
                "No coding required, allowing non-technical users to design complex flows easily.",
            },
            {
              topHeading: "Time-Saving",
              description:
                "Quickly design and modify USSD menus in minutes.",
            },
            {
              topHeading: "Flexibility",
              description:
                "Easily adjust flow to optimize the user experience and engagement.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Previewing of the Flow",
      title: "Previewing of the Flow",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            This feature allows users to preview the USSD menu before deployment. By simulating the flow, businesses can ensure all steps function correctly and provide a smooth user experience.
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
              topHeading: "Error Detection",
              description:
                "Identify and fix errors before launching a campaign, reducing downtime.",
            },
            {
              topHeading: "Improved User Experience",
              description:
                "Ensures that the final flow is intuitive, improving overall customer satisfaction.",
            },
            {
              topHeading: "Real-Time Testing",
              description:
                "Immediate feedback on how the menu will behave in real-world scenarios.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Surveys and Feedback",
      title: "Surveys and Feedback Feature",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            The surveys and feedback feature allows businesses to collect responses from users via USSD. This can be used to gauge customer satisfaction, gather market research, or receive feedback on products and services.
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
              topHeading: "Real-Time Data Collection",
              description:
                "Surveys are immediately completed and transmitted, offering instant insights.",
            },
            {
              topHeading: "Wider Reach",
              description:
                "USSD surveys reach users without internet access, increasing participation.",
            },
            {
              topHeading: "Cost-Effective",
              description:
                "Provides a low-cost solution for gathering large-scale feedback and customer insights.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Polling Services",
      title: "Polling Services Feature",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            This feature allows businesses to set up polls via USSD to capture user opinions on various topics. Customers respond to predefined options through simple numeric inputs.
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
              topHeading: "High Participation Rates",
              description:
                "Polling via USSD is fast and easy for users, leading to higher response rates.",
            },
            {
              topHeading: "Instant Feedback",
              description:
                "Provides real-time polling results, which can be used for quick decision-making.",
            },
            {
              topHeading: "Widespread Reach",
              description:
                "Polls can reach users on any mobile device, including basic feature phones, making it accessible to a broader audience.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Voting Feature",
      title: "Voting Feature",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            The voting feature allows businesses to create interactive voting campaigns where users cast their votes via USSD menus. This feature is widely used for campaigns that require public voting, such as talent shows or product competitions.
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
              topHeading: "Engagement",
              description:
                "Encourages audience participation by offering an easy voting process through USSD.",
            },
            {
              topHeading: "Security",
              description:
                "Ensures secure and accurate vote counting with real-time tallying.",
            },
            {
              topHeading: "Scalability",
              description:
                "Handle thousands of votes in real-time, ensuring efficiency and reliability.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Lead Generation Campaigns",
      title: "Lead Generation Campaign Feature",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            This sub-feature allows businesses to capture customer details and inquiries via USSD campaigns. Potential leads can enter personal information, such as names and phone numbers, directly through USSD prompts.
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
              topHeading: "Effective Data Collection",
              description:
                "Captures leads quickly without requiring internet access.",
            },
            {
              topHeading: "Automation",
              description:
                "Integrates with CRM systems to automatically store and manage lead information.",
            },
            {
              topHeading: "Cost-Effective",
              description:
                "Low-cost method for generating a high volume of leads.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "USSD Menu Shortcode Activation",
      title: "USSD Menu Shortcode Activation",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            This feature provides businesses with the ability to activate and manage their USSD shortcodes, which are the unique codes users dial to access USSD menus. Shortcodes can be dedicated to specific campaigns, services, or promotional activities.
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
              topHeading: "Brand Customization",
              description:
                "Unique shortcodes can be tied to specific brand campaigns, increasing visibility.",
            },
            {
              topHeading: "Easy Access",
              description:
                "Customers can quickly engage with the service by dialing a shortcode, increasing participation rates.",
            },
            {
              topHeading: "Efficient Management",
              description:
                "Allows businesses to manage multiple shortcodes for various campaigns from a centralized platform.",
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
      title: "Corporate Organizations",
      icon: <FaBuilding />,
      sub_heading: "Enhance internal communications and gather employee insights through USSD-based feedback systems.",
      topHeading: "Employee Feedback & Internal Surveys",
      scenario: "A corporation aims to streamline employee feedback and internal surveys to improve workplace satisfaction and productivity.",
      implementations: [
        {
          title: "USSD Feedback Menus",
          description: "Implement USSD menus for employees to quickly provide feedback on workplace conditions, policies, and management.",
        },
        {
          title: "Internal Surveys",
          description: "Conduct regular surveys on company culture, employee engagement, and job satisfaction using USSD codes.",
        },
        {
          title: "Information Dissemination",
          description: "Use USSD to quickly disseminate important information, updates, or emergency alerts to all employees.",
        },
      ],
      benefits: [
        { item: "Facilitates quick and easy collection of employee feedback." },
        { item: "Improves internal communication and transparency." },
        { item: "Enhances employee engagement by showing responsiveness to their input." },
      ],
    },
    {
      title: "Marketing & Advertising Agencies",
      icon: <FaBullhorn />,
      sub_heading: "Maximize audience engagement and campaign performance through interactive polling and promotions.",
      topHeading: "Lead Generation & Campaign Engagement",
      scenario: "An agency wants to run lead generation campaigns, polls, and promotional activities to drive engagement.",
      implementations: [
        {
          title: "USSD Lead Generation",
          description: "Create USSD campaigns for lead generation where participants can opt-in by dialing a short code.",
        },
        {
          title: "Polling Services",
          description: "Conduct real-time polls or surveys via USSD to gauge audience opinions on specific topics or campaigns.",
        },
        {
          title: "Promotional Campaigns",
          description: "Launch USSD-based promotional campaigns with instant rewards, offers, or discounts to increase brand interaction.",
        },
      ],
      benefits: [
        { item: "Drives higher engagement through easy-to-access polling and promotions." },
        { item: "Captures real-time audience data for refining marketing strategies." },
        { item: "Generates leads and increases customer acquisition rates." },
      ],
    },
    {
      title: "Telecommunications Industry",
      icon: <FaPhoneAlt />,
      sub_heading: "Enhance customer experience and service efficiency through USSD-based self-service options.",
      topHeading: "Self-Service Options for Customers",
      scenario: "A telecom company wants to provide self-service options to reduce support calls and improve customer satisfaction.",
      implementations: [
        {
          title: "Balance Checks",
          description: "Allow customers to check their balances via a simple USSD code.",
        },
        {
          title: "Data Renewals and Subscription Management",
          description: "Enable data renewals, plan upgrades, and subscription management through interactive USSD menus.",
        },
        {
          title: "Network Feedback",
          description: "Use USSD to gather feedback on network quality, coverage, and customer service experiences.",
        },
      ],
      benefits: [
        { item: "Reduces customer support load by enabling self-service." },
        { item: "Improves customer satisfaction with easy and quick access to services." },
        { item: "Enhances network quality and service through targeted feedback." },
      ],
    },
    {
      title: "Hospitality Businesses",
      icon: <FaHotel />,
      sub_heading: "Boost guest satisfaction and loyalty through interactive booking and feedback systems.",
      topHeading: "Interactive Booking & Feedback Systems",
      scenario: "A hotel chain wants to improve guest experiences by offering USSD-based bookings and feedback options.",
      implementations: [
        {
          title: "Interactive Booking Systems",
          description: "Allow guests to make reservations via USSD, checking room availability, and pricing instantly.",
        },
        {
          title: "Feedback Surveys",
          description: "Conduct surveys via USSD after check-in, during stay, and post-checkout to assess guest satisfaction.",
        },
        {
          title: "Personalized Offers",
          description: "Send personalized offers and discounts to guests who provide feedback through USSD.",
        },
      ],
      benefits: [
        { item: "Improves guest experience by simplifying booking and feedback processes." },
        { item: "Enhances loyalty through personalized engagement and offers." },
        { item: "Reduces negative reviews by addressing issues during the guest's stay." },
      ],
    },
    {
      title: "Financial Institutions",
      icon: <FaPiggyBank />,
      sub_heading: "Provide secure, accessible mobile banking services through USSD.",
      topHeading: "USSD-Based Mobile Banking",
      scenario: "A bank aims to extend its reach by offering mobile banking services to customers without smartphones.",
      implementations: [
        {
          title: "Balance Enquiry",
          description: "Allow customers to check their account balances via a USSD code.",
        },
        {
          title: "Funds Transfer",
          description: "Enable quick and secure funds transfer between accounts using USSD menus.",
        },
        {
          title: "Loan Applications",
          description: "Provide an easy interface for customers to apply for loans and check loan statuses via USSD.",
        },
      ],
      benefits: [
        { item: "Increases financial inclusion by providing banking services to non-smartphone users." },
        { item: "Enhances security through simple, yet effective USSD authentication." },
        { item: "Improves customer experience by offering convenient mobile services." },
      ],
    },
  ],
};


