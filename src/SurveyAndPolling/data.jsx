
import { IoBriefcaseSharp } from "react-icons/io5";

import { FaBroadcastTower, FaChartBar, FaClock, FaDollarSign, FaGlobe, FaGraduationCap, FaHandshake, FaHeart, FaHeartbeat, FaHotel, FaIndustry, FaPhoneAlt, FaPiggyBank, FaShieldAlt, FaStethoscope, FaStore, FaUsers} from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { FaTools, FaBullseye, FaPaintBrush, FaBullhorn, FaClipboardCheck, FaChartLine } from "react-icons/fa";
import Images from "../Images";

export const data = {
  benefits: [
    {
      heading: "Informed Decision-Making",
      subHeading:
        "Enables businesses to gather valuable insights from their target audience, helping them make data-driven decisions about products, services, and campaigns.",
      icon: <FaChartLine />,
    },
    {
      heading: "Increased Customer Engagement",
      subHeading:
        "Interactive surveys, polls, and feedback forms create a more engaging experience, encouraging customers to share their opinions and feel involved in the brand's direction.",
      icon: <FaHandshake />,
    },
    {
      heading: "Real-Time Feedback Collection",
      subHeading:
        "Provides businesses with immediate feedback from customers, allowing for timely responses and adjustments to improve satisfaction or capitalize on positive responses.",
      icon: <FaClock />,
    },
    {
      heading: "Multi-Channel Distribution",
      subHeading:
        "Reaches a broader audience by distributing surveys and polls across SMS, email, web, and social media, increasing participation and reach.",
      icon: <FaBroadcastTower />,
    },
    {
      heading: "Enhanced Customer Segmentation",
      subHeading:
        "Targeted surveys and polls for different customer segments offer more relevant insights, helping businesses tailor their offerings to specific customer needs.",
      icon: <FaUsers />,
    },
    {
      heading: "Improved Customer Loyalty",
      subHeading:
        "By collecting and acting on customer feedback, businesses can build stronger relationships, increase customer satisfaction, and foster long-term loyalty.",
      icon: <FaHeart />,
    },
    {
      heading: "Cost Efficiency",
      subHeading:
        "Automated surveys and feedback collection reduce the time and resources required for manual data gathering, making it a more cost-effective solution.",
      icon: <FaDollarSign />,
    },
    {
      heading: "Actionable Insights",
      subHeading:
        "Comprehensive analytics and reporting provide businesses with easy-to-interpret data and actionable insights for improving campaigns, products, and services.",
      icon: <FaChartBar />,
    },
    {
      heading: "Compliance with Data Regulations",
      subHeading:
        "Ensures compliance with data privacy regulations like GDPR, ensuring that customer data is collected and managed securely and ethically.",
      icon: <FaShieldAlt />,
    },
  ],
};



export const cards = {
  features: [
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Survey Tools",
      title: "Survey Creation & Customization",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Design and customize surveys to meet specific business goals with multiple question types, dynamic logic, and multilingual support.
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
              topHeading: "Highly Customized Surveys",
              description:
                "Enables creation of surveys tailored to specific needs with customizable question types and dynamic logic.",
            },
            {
              topHeading: "Time and Cost Efficient",
              description:
                "Saves time with pre-built templates and supports global audiences with multilingual options.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Survey Builder",
              description:
                "Drag-and-drop survey builder, multiple question formats, dynamic logic, and multilingual support.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Polling Tools",
      title: "Polling Services",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Create and manage real-time or scheduled polls to gather quick feedback or opinions from your audience.
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
              topHeading: "Interactive Engagement",
              description:
                "Enhances audience interaction through real-time polls during events or live sessions.",
            },
            {
              topHeading: "Instant Feedback",
              description:
                "Provides real-time results for immediate decision-making during campaigns.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Poll Creation",
              description:
                "Simple poll creation with customizable questions and real-time voting updates across multiple channels.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Feedback Tools",
      title: "Feedback Management & Forms",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Capture direct customer feedback through customizable forms, embedded on websites, sent via email, or delivered through SMS and USSD.
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
              topHeading: "Streamlined Feedback Collection",
              description:
                "Simplifies the collection of valuable feedback and enables quick responses to improve customer satisfaction.",
            },
            {
              topHeading: "Actionable Insights",
              description:
                "Helps identify areas for improvement in products and services based on collected feedback.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Feedback Forms",
              description:
                "Create customizable forms and automate feedback requests with real-time notifications and categorization.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Distribution Tools",
      title: "Multi-Channel Distribution",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Distribute surveys, polls, and feedback requests across various communication channels, including SMS, email, web, and social media.
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
              topHeading: "Maximized Reach",
              description:
                "Increases response rates by distributing through multiple communication channels.",
            },
            {
              topHeading: "Adaptive Distribution",
              description:
                "Enables businesses to adapt distribution based on audience behavior and preferences.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Channel Management",
              description:
                "Automated distribution and dynamic channel management for optimal response rates.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Analytics Tools",
      title: "Real-Time Analytics & Reporting",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Provides in-depth analytics and reporting on survey, polling, and feedback results, tracking key metrics and trends.
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
              topHeading: "Data-Driven Decisions",
              description:
                "Empowers businesses to make informed decisions with real-time analytics and visual reporting.",
            },
            {
              topHeading: "Trend Identification",
              description:
                "Identifies trends and patterns in customer feedback for service and product improvements.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Analytics & Reporting",
              description:
                "Detailed response analytics, comparative analysis, and customizable reports in various formats (CSV, Excel, PDF).",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Automation Tools",
      title: "Survey Scheduling & Automation",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Schedule and automate surveys and feedback forms to ensure timely data collection at key customer touchpoints.
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
              topHeading: "Timely Feedback Collection",
              description:
                "Ensures feedback is collected at critical moments in the customer journey with minimal manual effort.",
            },
            {
              topHeading: "Efficient Automation",
              description:
                "Reduces manual work with automated survey distribution and reminders.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Automation Features",
              description:
                "Automated survey triggers based on customer behavior and scheduled surveys for routine feedback collection.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Segmentation Tools",
      title: "Customer Segmentation for Targeted Feedback",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Segment your audience to target specific groups for surveys or polls based on demographic, behavioral, or transactional data.
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
              topHeading: "Relevant Insights",
              description:
                "Increases survey relevance by targeting specific customer groups for more accurate insights.",
            },
            {
              topHeading: "Personalized Marketing",
              description:
                "Allows for tailored marketing and service adjustments based on customer segment data.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Segmentation Tools",
              description:
                "Segment audience based on data like age, location, and purchase history with tailored questions for each segment.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Incentive Tools",
      title: "Reward & Incentive Management",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Encourage participation in surveys and feedback forms by offering rewards, discounts, or points.
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
              topHeading: "Automated Rewards",
              description:
                "Streamlines reward distribution with automated delivery and integration with loyalty programs.Boosts survey participation rates through appealing incentives.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Incentive Management",
              description:
                "Automated reward delivery and customizable reward options, integrated with loyalty programs.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Compliance Tools",
      title: "Data Privacy & Compliance",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Ensure that all feedback, survey, and polling activities comply with data protection regulations like GDPR.
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
              topHeading: "Regulatory Compliance",
              description:
                "Protects against legal issues by ensuring all data collection and storage practices are compliant with regulations.",
            },
            {
              topHeading: "Customer Trust",
              description:
                "Builds customer trust by being transparent about data usage and obtaining necessary consents.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Compliance Features",
              description:
                "Automated consent collection and compliance monitoring with audit trails for feedback activities.",
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
      sub_heading: "Gather product quality feedback to enhance manufacturing processes and customer satisfaction.",
      topHeading: "Product Quality Feedback",
      scenario: "A manufacturing company launches a new product line and seeks feedback on product quality and user experience.",
      implementations: [
        {
          title: "Surveys via SMS and Email",
          description: "Send surveys to distributors and retailers for feedback on product performance, durability, and design.",
        },
        {
          title: "QR Codes on Packaging",
          description: "Collect feedback from consumers using QR codes on product packaging leading to online surveys.",
        },
        {
          title: "Post-Purchase Polls",
          description: "Run polls asking customers to rate satisfaction and suggest improvements after purchase.",
        },
      ],
      benefits: [
        {
          item: "Identifies quality issues or areas for improvement early.",
        },
        {
          item: "Provides data for refining product features based on actual usage and customer needs.",
        },
        {
          item: "Increases customer satisfaction by showing responsiveness to feedback.",
        },
      ],
    },
    {
      title: "Banking Industry",
      icon: <FaPiggyBank />,
      sub_heading: "Measure customer satisfaction and improve service delivery through targeted polling.",
      topHeading: "Customer Satisfaction Polling",
      scenario: "A bank wants to measure customer satisfaction after completing transactions or using mobile banking services.",
      implementations: [
        {
          title: "SMS-Based Polls",
          description: "Trigger polls after mobile banking or branch transactions asking customers to rate their experience.",
        },
        {
          title: "Multi-Channel Surveys",
          description: "Collect feedback on services such as loans, savings, and account management through email and app surveys.",
        },
        {
          title: "Incentives for Feedback",
          description: "Offer incentives like loyalty points for participating in detailed feedback surveys.",
        },
      ],
      benefits: [
        {
          item: "Gauges customer satisfaction and identifies service bottlenecks.",
        },
        {
          item: "Improves digital services based on real-time feedback.",
        },
        {
          item: "Increases customer retention by addressing issues immediately.",
        },
      ],
    },
    {
      title: "Insurance Industry",
      icon: <FaShieldAlt />,
      sub_heading: "Enhance claim processing efficiency and customer satisfaction through targeted feedback.",
      topHeading: "Claim Processing Feedback",
      scenario: "An insurance company wants to improve its claim processing experience by gathering customer feedback.",
      implementations: [
        {
          title: "Post-Claim Surveys",
          description: "Send surveys after processing a claim to gather feedback on satisfaction with the claim handling process.",
        },
        {
          title: "Experience Polls",
          description: "Poll customers on claim submission, approval time, and customer support.",
        },
        {
          title: "Feedback Analysis",
          description: "Analyze feedback to identify specific pain points and optimize the claim process.",
        },
      ],
      benefits: [
        {
          item: "Enhances customer satisfaction by refining the claim process based on feedback.",
        },
        {
          item: "Helps reduce claim disputes by proactively addressing customer concerns.",
        },
        {
          item: "Improves the overall brand image by demonstrating responsiveness to customer needs.",
        },
      ],
    },
    {
      title: "Retail & Wholesale Industry",
      icon: <FaStore />,
      sub_heading: "Drive repeat business and enhance customer experience through post-purchase feedback and tailored promotions.",
      topHeading: "Post-Purchase Feedback and Promotions",
      scenario: "A retail chain wants to gather feedback on customer satisfaction post-purchase and drive repeat business through tailored promotions.",
      implementations: [
        {
          title: "Automated Feedback Forms",
          description: "Send automated feedback forms via email and SMS after a purchase.",
        },
        {
          title: "Post-Purchase Polls",
          description: "Ask customers about their shopping experience, product availability, and staff assistance.",
        },
        {
          title: "Personalized Promotions",
          description: "Offer personalized promotions or discount codes based on survey responses.",
        },
      ],
      benefits: [
        {
          item: "Improves the overall customer shopping experience by identifying strengths and weaknesses.",
        },
        {
          item: "Drives customer loyalty through targeted promotions and personalized offers.",
        },
        {
          item: "Increases repeat purchases by engaging customers post-transaction.",
        },
      ],
    },
    {
      title: "Hospitality Industry",
      icon: <FaHotel />,
      sub_heading: "Improve guest experiences and boost loyalty through timely feedback and personalized offers.",
      topHeading: "Guest Experience Survey",
      scenario: "A hotel chain seeks to improve the guest experience by collecting feedback during and after stays.",
      implementations: [
        {
          title: "Surveys During Stay",
          description: "Send SMS or email surveys after check-in, during the stay, and post-checkout to rate the hotel’s services.",
        },
        {
          title: "Feedback Forms",
          description: "Assess guest satisfaction on amenities, room cleanliness, food quality, and customer service.",
        },
        {
          title: "Guest Polls",
          description: "Poll guests about the likelihood of returning or recommending the hotel and gather suggestions for improvement.",
        },
      ],
      benefits: [
        {
          item: "Provides actionable data to improve service delivery and guest experiences.",
        },
        {
          item: "Boosts customer loyalty by addressing concerns during the stay, reducing negative online reviews.",
        },
        {
          item: "Encourages repeat business and recommendations through personalized offers for guests who provide feedback.",
        },
      ],
    },
    {
      title: "Tourism Industry",
      icon: <FaGlobe />,
      sub_heading: "Enhance visitor experiences and boost destination marketing through real-time feedback and targeted promotions.",
      topHeading: "Visitor Experience Surveys for Attractions",
      scenario: "A tourism board or travel company wants to gather insights into tourist experiences at local attractions.",
      implementations: [
        {
          title: "Polling Stations",
          description: "Deploy quick polling stations at tourist spots to gather real-time feedback on attractions, amenities, and tour guides.",
        },
        {
          title: "Post-Visit Surveys",
          description: "Distribute surveys asking tourists to rate their experience, service quality, and recommend improvements.",
        },
        {
          title: "Feedback Analysis",
          description: "Analyze trends in tourist feedback to enhance marketing of destinations and services.",
        },
      ],
      benefits: [
        {
          item: "Provides detailed insights into visitor satisfaction, leading to improved experiences.",
        },
        {
          item: "Enables more focused marketing efforts by understanding visitor preferences.",
        },
        {
          item: "Helps tourism businesses optimize services and attract more visitors through enhanced offerings.",
        },
      ],
    },
    {
      title: "Advertising Industry",
      icon: <FaBullhorn />,
      sub_heading: "Optimize campaign performance and client satisfaction through effective feedback and targeted content.",
      topHeading: "Campaign Effectiveness Polling",
      scenario: "An advertising agency wants to measure the effectiveness of marketing campaigns across different channels.",
      implementations: [
        {
          title: "Online Polls and SMS Surveys",
          description: "Distribute polls and surveys asking about brand recall, message clarity, and campaign engagement.",
        },
        {
          title: "A/B Testing",
          description: "Run A/B tests by polling customers exposed to different ad versions to see which resonates better.",
        },
        {
          title: "Feedback Collection",
          description: "Collect feedback on ad effectiveness across channels (TV, digital, print) to adjust media buying strategies.",
        },
      ],
      benefits: [
        {
          item: "Helps fine-tune marketing campaigns by identifying the most effective ads.",
        },
        {
          item: "Enables more efficient use of the advertising budget by focusing on high-impact channels.",
        },
        {
          item: "Provides feedback on campaign reach and audience perception, improving future campaigns.",
        },
      ],
    },
    {
      title: "Healthcare Industry",
      icon: <FaStethoscope />,
      sub_heading: "Enhance patient care and engagement through targeted surveys and feedback analysis.",
      topHeading: "Patient Satisfaction Surveys",
      scenario: "A hospital or clinic wants to improve patient care by collecting feedback on healthcare services.",
      implementations: [
        {
          title: "Post-Appointment Surveys",
          description: "Send SMS or email surveys after appointments or hospital stays asking patients to rate their care.",
        },
        {
          title: "Service Polls",
          description: "Poll patients about their experience with specific healthcare services such as outpatient consultations and lab services.",
        },
        {
          title: "Feedback Analysis",
          description: "Analyze feedback to identify areas for improvement in patient care and hospital operations.",
        },
      ],
      benefits: [
        {
          item: "Enables hospitals to improve patient care by acting on feedback.",
        },
        {
          item: "Helps reduce patient complaints by proactively addressing service issues.",
        },
        {
          item: "Increases patient retention and loyalty by continuously improving the care experience.",
        },
      ],
    },
    {
      title: "Education Industry",
      icon: <FaGraduationCap />,
      sub_heading: "Enhance course offerings and student satisfaction through targeted feedback and evaluations.",
      topHeading: "Student Feedback and Course Evaluation",
      scenario: "An educational institution wants to improve course offerings by gathering student feedback.",
      implementations: [
        {
          title: "End-of-Term Surveys",
          description: "Send surveys to students to evaluate their learning experience, course material, and instructor performance.",
        },
        {
          title: "Student Polls",
          description: "Gather student preferences on upcoming courses, extracurricular activities, and campus facilities.",
        },
        {
          title: "Feedback Utilization",
          description: "Use feedback to adjust course content, teaching methods, and campus offerings.",
        },
      ],
      benefits: [
        {
          item: "Improves course content and delivery based on student preferences and feedback.",
        },
        {
          item: "Boosts student satisfaction and engagement, leading to better academic outcomes.",
        },
        {
          item: "Provides data for institutional improvements, enhancing the overall educational experience.",
        },
      ],
    },
    {
      title: "Health & Wellness Industry",
      icon: <FaHeartbeat />,
      sub_heading: "Improve wellness programs and retain clients through targeted feedback and program evaluations.",
      topHeading: "Program Evaluation and Feedback",
      scenario: "A wellness center or fitness program seeks to improve services by gathering participant feedback.",
      implementations: [
        {
          title: "Post-Program Surveys",
          description: "Send surveys to participants after fitness classes or wellness programs asking about trainer quality, program structure, and facilities.",
        },
        {
          title: "Participant Polls",
          description: "Poll participants on preferred schedules, class types, and wellness services to adjust offerings accordingly.",
        },
        {
          title: "Program Optimization",
          description: "Use feedback to optimize program delivery and increase membership retention.",
        },
      ],
      benefits: [
        {
          item: "Provides insights for tailoring fitness and wellness programs to meet client needs.",
        },
        {
          item: "Improves service delivery by making adjustments based on client feedback.",
        },
        {
          item: "Helps retain clients by offering programs that resonate with their preferences.",
        },
      ],
    },
    {
      title: "Telecommunications Industry",
      icon: <FaPhoneAlt />,
      sub_heading: "Enhance network quality and customer service through targeted feedback and data analysis.",
      topHeading: "Network Quality and Customer Service Feedback",
      scenario: "A telecom company wants to gather feedback on network performance and customer service experiences.",
      implementations: [
        {
          title: "Customer Service Surveys",
          description: "Send surveys after customer service interactions or network outage resolutions, asking customers to rate the support received.",
        },
        {
          title: "Network Quality Polls",
          description: "Poll customers about network quality, coverage issues, and call drop rates across various regions.",
        },
        {
          title: "Data Analysis",
          description: "Use collected data to improve network infrastructure and optimize customer service training.",
        },
      ],
      benefits: [
        {
          item: "Helps improve network reliability by identifying problem areas through customer feedback.",
        },
        {
          item: "Boosts customer satisfaction by addressing concerns related to customer service and network quality.",
        },
        {
          item: "Reduces churn by actively working to resolve issues identified in feedback.",
        },
      ],
    },
  ],
};



