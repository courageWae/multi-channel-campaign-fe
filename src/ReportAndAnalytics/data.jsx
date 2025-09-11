import { SiAltiumdesigner, SiMarketo } from "react-icons/si";
import {
  MdCorporateFare,
  MdOutlineCampaign,
  MdOutlinePersonalInjury,
  MdSell,
} from "react-icons/md";
import { IoBriefcaseSharp } from "react-icons/io5";
import { FaBroadcastTower, FaChartArea, FaDrawPolygon, FaExchangeAlt, FaGamepad, FaIndustry, FaMapMarker, FaRedoAlt, FaTags, FaUserCircle } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";

import { FaAcquisitionsIncorporated } from "react-icons/fa";
import { GiDeliveryDrone } from "react-icons/gi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GrOverview } from "react-icons/gr";
import { FaGift } from "react-icons/fa";
import { PiBroadcastFill } from "react-icons/pi";
import Images from "Images";
export const data = {
  benefits: [
    {
      heading: "High Open Rates",
      subHeading:
        "Messages have a 98% open rate, ensuring your messages are seen.",
      icon: <FaAcquisitionsIncorporated />,
    },
    {
      heading: "Instant Delivery",
      subHeading:
        "Messages are delivered instantly, providing timely communication.",
      icon: <GiDeliveryDrone />,
    },
    {
      heading: "Personalization",
      subHeading:
        "Personalizing messages increases engagement and response rates.",
      icon: <MdOutlinePersonalInjury />,
    },
    {
      heading: "Cost-Effective",
      subHeading:
        "Bulk messaging is a cost-effective way to reach a large audience",
      icon: <FaMoneyBillTransfer />,
    },
    {
      heading: "Interactive Campaigns",
      subHeading:
        "Two-way messaging enables real-time interactions with customers.",
      icon: <MdOutlineCampaign />,
    },
    {
      heading: "Professional Designs",
      subHeading: "Easily create professional-looking emails without coding",
      icon: <SiAltiumdesigner />,
    },
  ],
};

export const cards = {
  features: [
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Geo-Targeting",
      title: "Geo-Targeting",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Precisely target campaigns based on users' geographic locations for higher engagement and conversion.
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
              topHeading: "Increased Relevance & Foot Traffic",
              description:
                "Delivers highly personalized content based on users' locations, enhancing engagement and driving visits to stores or events through targeted promotions.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Location-Based Targeting & Geofencing",
              description:
                "Combines real-time location targeting, geofencing, and location-based segmentation to send messages and offers based on users' proximity to specific areas or entry into defined zones.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Geofencing",
      title: "Geofencing",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Set up virtual boundaries to trigger marketing actions as users move in and out of specific areas.
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
              topHeading: "Effective Location-Based Promotions",
              description:
                "Enhances user engagement and increases promotional effectiveness by delivering timely, relevant messages based on users' proximity.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Geofence Creation & Real-Time Alerts",
              description:
                "Defines geographic areas using GPS data and triggers automatic notifications or offers when users enter or exit these zones.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Location-Based Offers & Promotions",
      title: "Location-Based Offers & Promotions",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Deliver targeted offers and promotions based on users' current or preferred locations.
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
              topHeading: "Higher Conversion Rates",
              description:
                "Drives immediate action by providing location-specific offers and dynamic content, increasing sales and engagement.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Localized Promotions & Dynamic Content",
              description:
                "Sends customized offers and adjusts promotional content based on geographic data and local events.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Location Analytics & Reporting",
      title: "Location Analytics & Reporting",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Analyze and report on the performance of geo-location campaigns for optimized marketing strategies.
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
              topHeading: "Data-Driven Optimization",
              description:
                "Provides insights into campaign effectiveness across locations, helping refine strategies for better results.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Geo-Performance Metrics & Heatmaps",
              description:
                "Tracks engagement and conversion rates, provides heatmaps of user activity, and analyzes trends in user behavior by location.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Proximity Marketing",
      title: "Proximity Marketing",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Market to users based on their proximity to specific locations using beacons and geolocation.
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
              topHeading: "Enhanced Customer Engagement",
              description:
                "Improves user experience by delivering timely, relevant information as users approach specific locations, driving immediate visits and actions.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Proximity Alerts & Beacon Integration",
              description:
                "Utilizes proximity alerts and beacon technology to trigger notifications and offers based on users' closeness to specific areas.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Custom Geo-Location Rules",
      title: "Custom Geo-Location Rules",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Create and manage custom rules for targeted marketing based on precise location data.
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
              topHeading: "Flexible Targeting",
              description:
                "Enhances campaign effectiveness with customizable rules for engaging users based on specific location-based criteria.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Rule Creation & Flexible Conditions",
              description:
                "Defines rules for triggering messages or actions based on users' location, such as distance or time spent in an area.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Location Data Integration",
      title: "Location Data Integration",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Integrate external location data sources to enhance geo-location targeting accuracy.
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
              topHeading: "Improved Targeting Accuracy",
              description:
                "Refines geo-location strategies by leveraging additional external location data for more precise targeting.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Data Enrichment & Integration",
              description:
                "Integrates with third-party data providers to enrich and refine location-based targeting.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "User Privacy & Data Compliance",
      title: "User Privacy & Data Compliance",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Ensure compliance with privacy regulations and manage user consent for location-based marketing.
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
              topHeading: "User Trust & Compliance",
              description:
                "Builds trust by adhering to data protection regulations and providing transparency in location data usage.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Consent Management & Privacy Controls",
              description:
                "Implements tools for managing user consent and ensures data practices are compliant with legal standards.",
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
      title: "Geo-Targeting",
      icon: <FaMapMarker />,
      sub_heading: "Delivers highly personalized content based on users' locations, enhancing engagement and driving visits to stores or events through targeted promotions.",
      topHeading: "Location-Based Campaigns and Engagement",
      scenario: "A business wants to increase local foot traffic and engagement by targeting users based on their current location or proximity to specific areas.",
      implementations: [
        {
          title: "Location-Based Targeting",
          description: "Send personalized messages or offers to users when they are near specific locations, encouraging them to visit the store or participate in events.",
        },
        {
          title: "Geofencing",
          description: "Set up virtual boundaries around target areas and trigger automated messages when users enter or exit these areas.",
        },
        {
          title: "Real-Time Alerts",
          description: "Notify users about local deals or events based on their current location in real-time.",
        },
      ],
      benefits: [
        {
          item: "Increases local engagement and foot traffic by delivering timely, relevant content to users, enhancing customer experience with personalized and location-based offers, and improving marketing ROI by targeting users most likely to engage based on their location.",
        },
      ],
    },
    {
      title: "Geofencing",
      icon: <FaDrawPolygon />,
      sub_heading: "Enhances user engagement and increases promotional effectiveness by delivering timely, relevant messages based on users' proximity.",
      topHeading: "Location-Specific Campaigns and Notifications",
      scenario: "A retail chain wants to promote new store openings and drive foot traffic by reaching users within a defined radius.",
      implementations: [
        {
          title: "Geofence Creation",
          description: "Define geographic zones around new store locations and set up notifications to be triggered when users enter these zones.",
        },
        {
          title: "Real-Time Tracking",
          description: "Monitor user movement within the geofenced areas to understand engagement patterns.",
        },
        {
          title: "Automated Messaging",
          description: "Send automated messages or offers to users when they enter or exit the geofenced areas.",
        },
      ],
      benefits: [
        {
          item: "Drives foot traffic and sales by targeting users near new store locations, improves promotional effectiveness by reaching users at the right time and place, and provides valuable insights into user behavior and movement patterns.",
        },
      ],
    },
    {
      title: "Location-Based Offers & Promotions",
      icon: <FaTags />,
      sub_heading: "Drives immediate action by providing location-specific offers and dynamic content, increasing sales and engagement.",
      topHeading: "Targeted Offers and Promotions",
      scenario: "A restaurant chain wants to increase sales during off-peak hours by offering special discounts to nearby customers.",
      implementations: [
        {
          title: "Localized Promotions",
          description: "Create special offers or discounts for customers within a certain radius during specific times of the day.",
        },
        {
          title: "Dynamic Content",
          description: "Adjust promotional content based on real-time location data and customer preferences.",
        },
        {
          title: "Push Notifications",
          description: "Send push notifications to nearby customers about current offers and promotions.",
        },
      ],
      benefits: [
        {
          item: "Increases sales by driving traffic during off-peak hours with timely offers, enhances customer loyalty through personalized, location-specific promotions, and boosts engagement by providing relevant content based on real-time location data.",
        },
      ],
    },
    {
      title: "Location Analytics & Reporting",
      icon: <FaChartArea />,
      sub_heading: "Provides insights into campaign effectiveness across locations, helping refine strategies for better results.",
      topHeading: "Campaign Performance and User Insights",
      scenario: "A marketing team wants to analyze the effectiveness of their location-based campaigns and optimize future strategies.",
      implementations: [
        {
          title: "Geo-Performance Metrics",
          description: "Track engagement, conversion rates, and user movement data across different locations.",
        },
        {
          title: "Heatmaps",
          description: "Visualize user activity and engagement levels on a geographical map.",
        },
        {
          title: "Trend Analysis",
          description: "Analyze trends in user behavior and campaign performance by location and time.",
        },
      ],
      benefits: [
        {
          item: "Improves campaign ROI by identifying high-performing locations and refining targeting strategies, provides actionable insights into user behavior and engagement patterns, and helps in planning future campaigns based on data-driven analysis.",
        },
      ],
    },
    {
      title: "Proximity Marketing",
      icon: <FaBroadcastTower />,
      sub_heading: "Improves user experience by delivering timely, relevant information as users approach specific locations, driving immediate visits and actions.",
      topHeading: "Localized Engagement and Promotions",
      scenario: "A retail store wants to capture the attention of nearby shoppers and increase store visits.",
      implementations: [
        {
          title: "Beacon Integration",
          description: "Use beacons to detect nearby users and send them promotional messages or offers.",
        },
        {
          title: "Proximity Alerts",
          description: "Trigger alerts when users come within a certain range of the store.",
        },
        {
          title: "Exclusive Deals",
          description: "Offer exclusive deals to customers who are in close proximity to the store.",
        },
      ],
      benefits: [
        {
          item: "Drives immediate store visits and sales by capturing the attention of nearby customers, enhances user engagement with timely and relevant information, and improves customer experience with personalized and exclusive deals.",
        },
      ],
    },
    {
      title: "Cross-Channel Marketing",
      icon: <FaExchangeAlt />,
      sub_heading: "Boosts brand visibility and engagement by integrating campaigns across multiple platforms, providing a seamless user experience.",
      topHeading: "Omni-Channel Campaigns and User Reach",
      scenario: "A business wants to increase its reach and engagement by running integrated campaigns across multiple channels such as social media, email, and SMS.",
      implementations: [
        {
          title: "Unified Messaging",
          description: "Deliver consistent messages across all channels to maintain brand coherence.",
        },
        {
          title: "Multi-Channel Analytics",
          description: "Track performance across different channels to optimize engagement and conversions.",
        },
        {
          title: "Dynamic Retargeting",
          description: "Use user behavior data to retarget customers with personalized ads across multiple platforms.",
        },
      ],
      benefits: [
        {
          item: "Increases brand visibility and engagement through cohesive messaging, enhances customer experience by providing a seamless journey across platforms, and improves marketing effectiveness with data-driven retargeting strategies.",
        },
      ],
    },
    {
      title: "Personalized Marketing",
      icon: <FaUserCircle />,
      sub_heading: "Increases conversion rates by delivering tailored content to specific customer segments based on their preferences and behaviors.",
      topHeading: "Targeted Content and Customer Engagement",
      scenario: "A business aims to improve conversion rates by providing tailored content and offers to different customer segments.",
      implementations: [
        {
          title: "Customer Segmentation",
          description: "Segment customers based on demographics, behavior, and purchase history to deliver personalized content.",
        },
        {
          title: "Behavioral Triggers",
          description: "Use triggers like browsing history or past purchases to send relevant messages or offers.",
        },
        {
          title: "Dynamic Content Personalization",
          description: "Adjust website content and email marketing materials dynamically based on user behavior.",
        },
      ],
      benefits: [
        {
          item: "Enhances customer engagement by providing relevant, personalized content, increases conversion rates by targeting specific customer needs and preferences, and builds customer loyalty through tailored experiences.",
        },
      ],
    },
    {
      title: "Interactive Campaigns",
      icon: <FaGamepad />,
      sub_heading: "Boosts engagement by encouraging user participation in quizzes, polls, and interactive content.",
      topHeading: "Gamified Marketing and Customer Interaction",
      scenario: "A company wants to create buzz and increase engagement through interactive campaigns such as quizzes and polls.",
      implementations: [
        {
          title: "Gamified Content",
          description: "Incorporate quizzes, polls, and contests to engage users and encourage participation.",
        },
        {
          title: "Reward-Based Campaigns",
          description: "Offer incentives like discounts or freebies to users who participate in interactive campaigns.",
        },
        {
          title: "Social Sharing Features",
          description: "Enable easy sharing of interactive content on social media to increase reach.",
        },
      ],
      benefits: [
        {
          item: "Increases user engagement by making marketing campaigns more interactive and fun, encourages social sharing to boost brand awareness, and enhances customer loyalty with reward-based incentives.",
        },
      ],
    },
    {
      title: "Behavioral Retargeting",
      icon: <FaRedoAlt />,
      sub_heading: "Improves conversion rates by re-engaging users who showed interest but did not complete an action, using targeted ads and messages.",
      topHeading: "User Retargeting and Engagement Optimization",
      scenario: "An e-commerce site wants to re-engage visitors who abandoned their shopping carts or viewed products without purchasing.",
      implementations: [
        {
          title: "Abandoned Cart Emails",
          description: "Send automated emails to remind users of the items left in their shopping carts.",
        },
        {
          title: "Personalized Retargeting Ads",
          description: "Show ads to users based on their browsing history and abandoned carts.",
        },
        {
          title: "Exit Intent Popups",
          description: "Display special offers or discounts when users are about to leave the site.",
        },
      ],
      benefits: [
        {
          item: "Increases conversion rates by re-engaging users who showed interest, reduces cart abandonment rates with timely reminders and incentives, and enhances user experience with personalized retargeting strategies.",
        },
      ],
    },
  ],
};

