import Images from "Images";
import { MdEmojiEvents, MdVolunteerActivism } from "react-icons/md";
import { RiFundsFill } from "react-icons/ri";
import { SiSimpleanalytics } from "react-icons/si";

export const communications = [
  {
    title: "Enhanced Communication",
    image:Images.social,
    description:
      "Streamlines and centralizes communication across SMS, email, and social media, ensuring timely and consistent messaging.",
  },
  {
    title: "Increased Engagement",
    image:Images.publicRelations,
    description:
      "Strengthens connections with congregation members through targeted updates, event promotions, and personalized interactions.",
  },
  {
    title: "Advanced Feedback Collection",
    image:Images.feedback,
    description:
      "Provides valuable insights through surveys and polls, aiding in the enhancement of services and community engagement.",
  },
  {
    title: "Effective Outreach",
    image:Images.networking,
    description:
      "Expands reach to potential new members and communities with targeted marketing and engagement campaigns.",
  },
  {
    title: "Personalized Member Interaction",
    image:Images.personalized,
    description:
      "Delivers customized communication based on member preferences and activities, fostering stronger relationships.",
  },
  {
    title: "Emergency Communication",
    image:Images.emergency,
    description:
      "Ensures rapid and clear dissemination of information during emergencies or critical events.",
  },
];

export const operations = [
  {
    title: "Improved Event Management",
    icon:<MdEmojiEvents className="text-orange-600 text-3xl"/>,
    description:
      "Facilitates effective planning, promotion, and management of religious events and services.",
  },
  {
    title: "Efficient Fundraising",
    icon:<RiFundsFill className="text-orange-600 text-3xl"/>,
    description:
      "Boosts fundraising efforts with integrated campaign tools, enabling effective donor outreach and contribution tracking.",
  },
  {
    title: "Streamlined Volunteer Coordination",
    icon:<MdVolunteerActivism className="text-orange-600 text-3xl"/>,
    description:
      "Simplifies volunteer scheduling and management, increasing participation and organizational efficiency.",
  },

  {
    title: "Comprehensive Analytics",
    icon:<SiSimpleanalytics className="text-orange-600 text-3xl"/>,
    description:
      "Offers detailed reporting and analytics to track performance, measure impact, and support strategic planning.",
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
    title: "Event Promotion and Management",
    useCase:
      "Promote and manage religious events such as sermons, special services, community gatherings, and online courses.",
    mechanics:
      "Utilize SMS, email, social media marketing, and scheduling tools for invitations, reminders, and live broadcasts.",
    image: Images.religion_img_one,
    benefit:
      "Increases event attendance, enhances community engagement, ensures organized scheduling, and improves event planning.",
  },
  {
    title: "Sermon and Content Broadcasting",
    useCase:
      "Broadcast live sermons, religious teachings, and other content to a broader audience.",
    mechanics:
      "Use voice broadcast, social media platforms like Facebook Live, YouTube, and Instagram, and AI integration for content creation and scheduling.",
    image: Images.religion_img_two,
    benefit:
      "Expands reach beyond physical locations, ensures consistent messaging, and engages remote congregants effectively.",
  },
  {
    title: "Prayer and Feedback Management",
    useCase: "Collect, manage, and respond to prayer requests and gather feedback.",
    mechanics:
      "Implement USSD menu options, online forms for submissions, and survey tools for feedback collection.",
    image: Images.religion_img_three,
    benefit:
      "Streamlines request handling, ensures confidentiality, engages members in decision-making, and enhances satisfaction.",
  },
  {
    title: "Fundraising and Donations",
    useCase: "Run campaigns to raise funds for various projects or causes and enable mobile giving options.",
    mechanics:
      "Use SMS, email, and social media to promote donation drives, integrate mobile money and payment gateways for easy donations, and track contributions.",
    image: Images.religion_img_four,
    benefit:
      "Enhances fundraising efforts, reaches a larger audience, supports consistent giving, and increases donor satisfaction.",
  },
  {
    title: "Volunteer and Membership Management",
    useCase: "Organize, manage volunteers, and maintain member information.",
    mechanics:
      "Use SMS, email, and CRM functionalities for scheduling, reminders, recruitment, and automated updates.",
    image: Images.religion_img_five,
    benefit:
      "Improves volunteer coordination, increases participation, enhances member relations, and provides insights into attendance trends.",
  },
  {
    title: "Member Engagement and Retention",
    useCase:
      "Engage congregation members with regular updates, personalized messages, loyalty programs, and retention initiatives.",
    mechanics:
      "Utilize bulk SMS, email newsletters, social media posts, and loyalty management features.",
    image: Images.religion_img_six,
    benefit:
      "Strengthens member connection, encourages continued involvement, recognizes contributions, and builds a supportive community.",
  },
  {
    title: "Emergency Communication",
    useCase: "Send alerts and updates during emergencies or critical events.",
    mechanics: "Use bulk SMS and voice broadcasts for rapid communication.",
    image: Images.religion_img_seven,
    benefit:
      "Ensures timely information dissemination, enhances safety, and provides clear instructions.",
  },
  {
    title: "Outreach and Community Engagement",
    useCase: "Reach out to potential new members and gather community opinions.",
    mechanics: "Employ SMS, email, social media campaigns, and polling tools to attract and inform.",
    image: Images.religion_img_eight,
    benefit:
      "Expands congregation base, raises awareness, gathers valuable data, and supports informed actions.",
  },
  {
    title: "Member Registration and Onboarding",
    useCase: "Facilitate new member registration and onboarding.",
    mechanics:
      "Use USSD menus and online forms for registration and onboarding processes.",
    image: Images.religion_img_nine,
    benefit:
      "Simplifies registration, improves member integration, and ensures a smooth onboarding experience.",
  },
  {
    title: "Survey and Feedback Collection",
    useCase: "Conduct surveys and polls to gather feedback from congregation members.",
    mechanics: "Use polling and survey tools integrated with SMS, email, and social media.",
    image: Images.religion_img_ten,
    benefit:
      "Provides valuable insights for improvement, engages members in decision-making, and enhances satisfaction.",
  },
];


