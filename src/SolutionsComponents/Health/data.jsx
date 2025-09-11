import Images from "Images";
import { GiHealthNormal } from "react-icons/gi";
import { MdEmojiEvents, MdLoyalty, MdOutlineLocalHospital, MdVolunteerActivism } from "react-icons/md";
import { RiFundsFill } from "react-icons/ri";
import { SiSimpleanalytics } from "react-icons/si";

export const communications = [
  {
    title: "Improved Patient Compliance",
    image: Images.hospitalization,
    description:
      "Automated reminders for appointments and medications increase adherence and reduce missed appointments.",
  },
  {
    title: "Enhanced Health Awareness",
    image: Images.campaign,
    description:
      "Multi-channel campaigns educate the public on health issues and preventive measures, promoting better health practices.",
  },
  {
    title: "Efficient Patient Feedback Collection",
    image: Images.feedback,
    description:
      "Surveys and polls provide valuable insights for improving care and service quality.",
  },
  {
    title: "Timely Emergency Communication",
    image: Images.emergency,
    description:
      "Bulk messaging and voice broadcasts ensure rapid dissemination of critical health alerts and updates.",
  },
  {
    title: "Streamlined Appointment Management",
    image: Images.timeManagement,
    description:
      "Automation of appointment scheduling and follow-ups reduces administrative workload and improves patient convenience.",
  },
  {
    title: "Effective Patient Education",
    image: Images.healthEducation,
    description:
      "Targeted content delivery enhances patient knowledge about conditions, treatments, and preventive measures.",
  },
];

export const operations = [
  {
    title: "Optimized Campaign Performance",
    icon: <SiSimpleanalytics className="text-orange-600 text-3xl" />,
    description:
      "Detailed analytics track campaign effectiveness, allowing for data-driven adjustments and improved outcomes.",
  },
  {
    title: "Increased Engagement and Retention",
    icon: <MdLoyalty className="text-orange-600 text-3xl" />,
    description:
      "Loyalty programs and targeted campaigns foster patient loyalty and increase engagement with health services.",
  },
  {
    title: "Improved Operational Efficiency",
    icon: <MdOutlineLocalHospital className="text-orange-600 text-3xl" />,
    description:
      "Integrated tools for virtual consultations, clinical trial recruitment, and internal communication streamline operations and reduce overhead.",
  },
  {
    title: "Enhanced Community Health Response",
    icon: <GiHealthNormal className="text-orange-600 text-3xl" />,
    description:
      "Geo-targeted campaigns and disease outbreak notifications provide timely and relevant information, improving public health response and safety.",
  },
];


export const useCases = [
  {
    title: "Event Promotion and Management",
    description:
      "Promote religious events such as sermons, special services, and community gatherings.",
    mechanics:
      "Utilize SMS, email, and social media marketing to send invitations and reminders.",
    benefits:
      "Increases event attendance, enhances community engagement, and ensures timely updates.",
  },
  {
    title: "Sermon Broadcast",
    description:
      "Broadcast live sermons and religious teachings to a broader audience.",
    mechanics:
      "Use voice broadcast and social media platforms like Facebook Live, YouTube, and Instagram.",
    benefits:
      "Expands reach beyond physical locations, increases accessibility, and engages remote congregants.",
  },
  {
    title: "Prayer Request Management",
    description:
      "Collect and manage prayer requests from congregation members.",
    mechanics: "Implement USSD menu options and online forms for submission.",
    benefits:
      "Streamlines request handling, ensures confidentiality, and provides organized responses.",
  },
  {
    title: "Fundraising Campaigns",
    description: "Run campaigns to raise funds for various projects or causes.",
    mechanics:
      "Use SMS, email, and social media to promote donation drives and track contributions.",
    benefits:
      "Enhances fundraising efforts, reaches a larger audience, and increases donation efficiency.",
  },
  {
    title: "Volunteer Coordination",
    description:
      "Organize and manage volunteers for community service or church activities.",
    mechanics:
      "Use SMS and email for scheduling, reminders, and updates. Leverage social media for recruiting.",
    benefits:
      "Improves volunteer management, increases participation, and streamlines communication.",
  },
  {
    title: "Member Engagement",
    description:
      "Engage congregation members with regular updates and inspirational messages.",
    mechanics: "Utilize bulk SMS, email newsletters, and social media posts.",
    benefits:
      "Strengthens member connection, provides consistent communication, and enhances community support.",
  },
  {
    title: "Membership Management",
    description: "Manage and update member information and track attendance.",
    mechanics:
      "Implement CRM functionalities with automated updates and reminders.",
    benefits:
      "Improves data accuracy, enhances member relations, and provides insights into attendance trends.",
  },
  {
    title: "Event Scheduling",
    description: "Schedule and manage religious events and appointments.",
    mechanics:
      "Use meetings and appointments module to set up events and send reminders.",
    benefits:
      "Ensures organized scheduling, reduces conflicts, and improves event planning.",
  },
  {
    title: "Survey and Feedback Collection",
    description:
      "Gather feedback from congregation members on services and activities.",
    mechanics: "Use polling and survey tools to collect and analyze feedback.",
    benefits:
      "Provides valuable insights for improvement, engages members in decision-making, and enhances satisfaction.",
  },
  {
    title: "Outreach Campaigns",
    description: "Reach out to potential new members and communities.",
    mechanics:
      "Employ SMS, email, and social media campaigns to attract and inform.",
    benefits:
      "Expands congregation base, raises awareness, and drives community engagement.",
  },
  {
    title: "Loyalty Programs",
    description: "Reward active members with loyalty programs or recognition.",
    mechanics:
      "Implement loyalty management features to track participation and rewards.",
    benefits:
      "Encourages continued involvement, recognizes contributions, and builds a supportive community.",
  },
  {
    title: "Emergency Communication",
    description:
      "Send alerts and updates during emergencies or critical events.",
    mechanics: "Use bulk SMS and voice broadcasts for rapid communication.",
    benefits:
      "Ensures timely information dissemination, enhances safety, and provides clear instructions.",
  },
  {
    title: "Online Course Promotion",
    description: "Promote religious education and online courses or webinars.",
    mechanics: "Leverage social media and email marketing for promotions.",
    benefits:
      "Increases course enrollment, expands reach, and provides educational opportunities.",
  },
  {
    title: "Member Registration and Onboarding",
    description: "Facilitate new member registration and onboarding.",
    mechanics:
      "Use USSD menus and online forms for registration and onboarding processes.",
    benefits:
      "Simplifies registration, improves member integration, and ensures a smooth onboarding experience.",
  },
  {
    title: "Personalized Communication",
    description:
      "Send personalized messages and updates to members based on their preferences and activities.",
    mechanics:
      "Utilize CRM and marketing automation features to tailor communication.",
    benefits:
      "Enhances engagement, builds stronger relationships, and increases relevance of communications.",
  },
  {
    title: "Community Polling",
    description: "Conduct polls to gauge community opinions or preferences.",
    mechanics:
      "Use polling tools integrated into SMS, email, and social media.",
    benefits:
      "Engages members in decision-making, gathers valuable data, and supports informed actions.",
  },
  {
    title: "Content Creation and Scheduling",
    description:
      "Create and schedule content for sermons, announcements, and social media posts.",
    mechanics:
      "Employ AI integration for content creation and campaign scheduling tools.",
    benefits:
      "Ensures consistent messaging, streamlines content management, and improves engagement.",
  },
  {
    title: "Member Retention Programs",
    description:
      "Implement programs to retain active members and encourage participation.",
    mechanics:
      "Use loyalty management and engagement tools to track and reward participation.",
    benefits:
      "Increases retention rates, encourages ongoing involvement, and builds community loyalty.",
  },
  {
    title: "Financial Reporting and Analysis",
    description:
      "Analyze financial data from donations, fundraising events, and other sources.",
    mechanics:
      "Use detailed reporting and analytics features to track and evaluate financial performance.",
    benefits:
      "Provides insights into financial health, aids in budgeting, and supports strategic planning.",
  },
  {
    title: "Multi-Channel Integration",
    description:
      "Integrate marketing efforts across multiple channels for cohesive communication.",
    mechanics:
      "Utilize the omni-channel engagement features to manage SMS, email, social media, and more.",
    benefits:
      "Provides a unified approach to communication, enhances reach, and ensures consistent messaging.",
  },
];


export const features = [
  {
    title: "Patient Appointment and Follow-Up Management",
    useCase:
      "Remind patients of upcoming appointments, manage scheduling, and automate follow-up care coordination.",
    mechanics:
      "Utilize SMS, email, and voice broadcasts for appointment reminders, scheduling management, and post-visit follow-ups.",
    image: Images.religion_img_one,
    benefit:
      "Reduces no-show rates, enhances patient compliance, improves scheduling efficiency, and ensures continuity of care.",
  },
  {
    title: "Health Awareness and Education Campaigns",
    useCase:
      "Promote health awareness, preventive measures, and educate patients on conditions and treatments.",
    mechanics:
      "Run multi-channel campaigns via SMS, email, social media, and distribute educational content to target audiences.",
    image: Images.religion_img_two,
    benefit:
      "Increases community awareness, promotes healthy behaviors, and leads to better-informed patients.",
  },
  {
    title: "Medication Adherence Programs",
    useCase: "Improve medication adherence among patients.",
    mechanics:
      "Send automated reminders via SMS or voice broadcasts to remind patients to take their medications.",
    image: Images.religion_img_three,
    benefit:
      "Improves medication adherence, reduces missed doses, and enhances patient outcomes.",
  },
  {
    title: "Emergency Alerts and Disease Outbreak Notifications",
    useCase:
      "Send urgent health alerts or updates during emergencies and notify the public about disease outbreaks.",
    mechanics:
      "Use bulk messaging and voice broadcasts to communicate critical information during emergencies or health advisories.",
    image: Images.religion_img_four,
    benefit:
      "Ensures timely communication of critical information, improves response times, and enhances public safety.",
  },
  {
    title: "Patient Feedback and Satisfaction Surveys",
    useCase: "Collect feedback on patient experiences and service quality.",
    mechanics:
      "Use surveys and polls to gather patient feedback on services, care, and overall experiences.",
    image: Images.religion_img_five,
    benefit:
      "Provides insights for improving patient care, identifies areas for operational improvements, and enhances overall care quality.",
  },
  {
    title: "Virtual Health Consultations",
    useCase: "Facilitate remote consultations for patients.",
    mechanics:
      "Schedule and manage virtual consultations via integrated appointment and meeting management tools.",
    image: Images.religion_img_six,
    benefit:
      "Reduces patient travel, provides flexible healthcare options, and facilitates remote consultations.",
  },
  {
    title: "Targeted Health Campaigns",
    useCase: "Run targeted campaigns to specific patient groups.",
    mechanics:
      "Use geo-location and demographic data to deliver relevant health campaigns to specific patient groups.",
    image: Images.religion_img_seven,
    benefit:
      "Enhances campaign relevance, increases engagement, and improves health outcomes for targeted groups.",
  },
  {
    title: "Clinical Trial Recruitment",
    useCase: "Recruit participants for clinical trials effectively.",
    mechanics:
      "Promote and manage recruitment for clinical trials using targeted campaigns and lead generation tools.",
    image: Images.religion_img_eight,
    benefit:
      "Expands recruitment reach, improves participant engagement, and supports successful trial outcomes.",
  },
  {
    title: "Healthcare Service Promotions",
    useCase: "Promote new healthcare services and programs.",
    mechanics:
      "Run promotional campaigns for new services or health programs using social media, SMS, and email.",
    image: Images.religion_img_nine,
    benefit:
      "Increases awareness of new services, attracts new patients, and boosts service utilization.",
  },
  {
    title: "Staff and Provider Communication",
    useCase: "Facilitate internal communication with healthcare staff and providers.",
    mechanics:
      "Use SMS, email, and internal notifications to ensure timely updates and enhance coordination.",
    image: Images.religion_img_ten,
    benefit:
      "Improves internal coordination, ensures timely updates, and enhances operational efficiency.",
  },
];
