
import { IoBriefcaseSharp } from "react-icons/io5";
import { FaBullseye, FaCalendarAlt, FaCar, FaChartBar, FaClock, FaCogs, FaConciergeBell, FaHamburger, FaHotel, FaMapMarkedAlt, FaMusic, FaSmile, FaStore, FaWalking } from "react-icons/fa";

import { GrOverview } from "react-icons/gr";
import Images from "Images";
export const data = {
  benefits: [
    {
      heading: "Increased Relevance",
      subHeading: "Delivers highly relevant and personalized content based on users' locations, leading to higher engagement and conversion rates.",
      icon: <FaMapMarkedAlt />,
    },
    {
      heading: "Enhanced Targeting",
      subHeading: "Enables precise targeting of audiences in specific geographic areas, improving the effectiveness of marketing campaigns.",
      icon: <FaBullseye />,
    },
    {
      heading: "Timely Communication",
      subHeading: "Provides timely notifications and offers based on real-time location data, driving immediate action.",
      icon: <FaClock />,
    },
    {
      heading: "Improved Customer Experience",
      subHeading: "Enhances user experience by delivering contextually relevant information and promotions based on their location.",
      icon: <FaSmile />,
    },
    {
      heading: "Optimized Campaign Performance",
      subHeading: "Offers insights and analytics to refine and optimize location-based marketing strategies, leading to better results.",
      icon: <FaChartBar />,
    },
    {
      heading: "Increased Foot Traffic",
      subHeading: "Drives physical visits to stores or events by leveraging geo-location data for targeted promotions.",
      icon: <FaWalking />,
    },
    {
      heading: "Flexibility and Customization",
      subHeading: "Provides customizable rules and conditions for geo-location targeting, allowing for tailored marketing approaches.",
      icon: <FaCogs />,
    },
  ]
}

  

export const cards = {
  features: [
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Geo-Targeting Solutions",
      title: "Geo-Targeting",
      learn: "Learn More",
      url: "/geo-targeting",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Precise targeting of campaigns based on users' geographic locations. This feature includes current location targeting, geofencing, and location-based segmentation for targeted messaging.
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
              topHeading: "Enhances Relevance",
              description:
                "Enhances relevance and personalization of marketing messages, leading to higher engagement and conversion rates.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Current Location Targeting",
              description:
                "Sends messages or offers to users based on their real-time geographic location, such as when they are near a store or specific area.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Geo-Targeting Solutions",
      title: "Geofencing",
      learn: "Learn More",
      url: "/geofencing",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Setting up virtual boundaries to trigger marketing actions when users enter or exit specific areas. This enhances user engagement by delivering timely and relevant messages.
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
              topHeading: "Increases Effectiveness",
              description:
                "Increases the effectiveness of location-based promotions and notifications.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Geofence Creation",
              description:
                "Defines geographic areas around specific locations using GPS coordinates or address data.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Promotions Solutions",
      title: "Location-Based Offers & Promotions",
      learn: "Learn More",
      url: "/location-based-offers",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Deliver targeted offers and promotions based on users' locations. Provides relevant offers aligned with users' geographic preferences and local events.
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
              topHeading: "Drives Immediate Action",
              description:
                "Drives immediate action by providing users with relevant offers that align with their location.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Localized Promotions",
              description:
                "Sends special offers, discounts, or promotions relevant to users based on their current or preferred locations.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Analytics Solutions",
      title: "Location Analytics & Reporting",
      learn: "Learn More",
      url: "/location-analytics",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Analyzing and reporting on the performance of geo-location campaigns to provide insights into their effectiveness and optimize future strategies.
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
              topHeading: "Provides Insights",
              description:
                "Provides insights into the effectiveness of geo-location strategies and campaigns.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Geo-Performance Metrics",
              description:
                "Tracks metrics such as engagement rates, conversion rates, and response rates for geo-location-based campaigns.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Proximity Marketing Solutions",
      title: "Proximity Marketing",
      learn: "Learn More",
      url: "/proximity-marketing",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Marketing to users based on their proximity to specific locations. Utilizes beacons and proximity alerts to trigger location-based actions and messages.
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
              topHeading: "Enhances Customer Experience",
              description:
                "Delivers timely and relevant information as users approach specific locations.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Proximity Alerts",
              description:
                "Sends notifications, offers, or advertisements to users when they are within a certain distance of a location.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Customization Solutions",
      title: "Custom Geo-Location Rules",
      learn: "Learn More",
      url: "/custom-geo-rules",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Creating and managing custom geo-location rules for targeted marketing, allowing for flexible targeting based on precise location criteria.
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
                "Provides flexibility in targeting and engaging users based on precise location criteria.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Rule Creation",
              description:
                "Defines specific rules for triggering messages or actions based on users' location data.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Data Integration Solutions",
      title: "Location Data Integration",
      learn: "Learn More",
      url: "/location-data-integration",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Integrating location data with existing CRM, marketing platforms, and other systems for enhanced targeting and customer insights.
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
              topHeading: "Improves Data Accuracy",
              description:
                "Improves data accuracy and enriches customer profiles with location data.",
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
                "Supports seamless integration of location data with existing CRM and marketing platforms.",
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
      title: "Retail Industry",
      icon: <FaStore />,
      sub_heading: "In-Store Promotions and Customer Engagement",
      topHeading: "In-Store Promotions and Customer Engagement",
      scenario: "A retail chain wants to increase foot traffic to its stores and enhance in-store customer engagement through location-based marketing.",
      implementations: [
        {
          title: "Geofencing",
          description: "Create virtual boundaries around retail stores to trigger promotional notifications when customers enter these areas. For example, customers who enter the store's geofenced zone receive a welcome message with a discount code for their purchase.",
        },
        {
          title: "Proximity Marketing",
          description: "Utilize beacons to send real-time offers and product recommendations to customers’ mobile devices when they are near specific store sections or product displays.",
        },
        {
          title: "Location-Based Offers",
          description: "Send targeted promotions and exclusive offers based on the customer’s current location or their proximity to a particular store.",
        },
        {
          title: "Analytics & Reporting",
          description: "Track the effectiveness of in-store promotions by analyzing metrics such as redemption rates, foot traffic, and customer engagement within geofenced areas.",
        },
      ],
      benefits: [
        {
          item: "Drives immediate foot traffic to stores by providing timely and relevant promotions.",
        },
        {
          item: "Enhances customer experience with personalized offers based on their location within the store.",
        },
        {
          item: "Improves measurement of campaign effectiveness through detailed location-based analytics.",
        },
      ],
    },
    {
      title: "Events and Entertainment Industry",
      icon: <FaMusic />,
      sub_heading: "Event Engagement and On-Site Promotions",
      topHeading: "Event Engagement and On-Site Promotions",
      scenario: "An event organizer wants to boost engagement and enhance the experience for attendees at a large conference or festival.",
      implementations: [
        {
          title: "Geofencing",
          description: "Set up geofences around key event areas such as registration booths, exhibitor stalls, and main stages. Send event updates, schedules, and special offers to attendees as they move through these zones.",
        },
        {
          title: "Proximity Marketing",
          description: "Use beacons to provide real-time updates and exclusive offers to attendees based on their location within the event venue, such as discounts on merchandise or food.",
        },
        {
          title: "Location-Based Surveys",
          description: "Send surveys or feedback requests to attendees based on their location at the event, such as immediately after they visit a particular booth or session.",
        },
        {
          title: "Analytics & Reporting",
          description: "Analyze attendee movement patterns, engagement with event content, and responses to location-based offers to optimize future events.",
        },
      ],
      benefits: [
        {
          item: "Enhances attendee experience with timely and relevant information based on their location.",
        },
        {
          item: "Increases engagement with event content and offers through targeted notifications.",
        },
        {
          item: "Provides valuable insights into attendee behavior and preferences for future event planning.",
        },
      ],
    },
    {
      title: "Hospitality Industry",
      icon: <FaHotel />,
      sub_heading: "Guest Experience and Local Promotions",
      topHeading: "Guest Experience and Local Promotions",
      scenario: "A hotel chain wants to improve guest experience and promote local attractions and services.",
      implementations: [
        {
          title: "Geofencing",
          description: "Create geofences around hotel properties to send welcome messages and special offers to guests upon arrival. Include information about on-site amenities and local attractions.",
        },
        {
          title: "Proximity Marketing",
          description: "Utilize beacons within the hotel to provide guests with real-time notifications about on-site services, such as spa deals, dining options, or upcoming events.",
        },
        {
          title: "Location-Based Recommendations",
          description: "Send personalized recommendations for local attractions, restaurants, and activities based on the guest’s location and interests.",
        },
        {
          title: "Analytics & Reporting",
          description: "Monitor guest interactions with location-based offers, analyze feedback, and track the effectiveness of local promotions.",
        },
      ],
      benefits: [
        {
          item: "Enhances guest experience with personalized and timely information based on their location within the hotel.",
        },
        {
          item: "Drives additional revenue through targeted promotions and local recommendations.",
        },
        {
          item: "Improves guest satisfaction by providing relevant information and offers.",
        },
      ],
    },
    {
      title: "Automotive Industry",
      icon: <FaCar />,
      sub_heading: "Dealership Promotions and Test Drive Management",
      topHeading: "Dealership Promotions and Test Drive Management",
      scenario: "An automotive dealership network wants to increase test drives and drive sales through location-based marketing.",
      implementations: [
        {
          title: "Geofencing",
          description: "Set up geofences around dealership locations to trigger promotional messages and offers for vehicle test drives when potential customers enter these areas.",
        },
        {
          title: "Proximity Marketing",
          description: "Use beacons to send real-time notifications about ongoing promotions, new vehicle arrivals, and special events to customers who are near the dealership.",
        },
        {
          title: "Location-Based Incentives",
          description: "Offer exclusive test drive incentives or discounts based on the customer’s proximity to the dealership or their previous visits.",
        },
        {
          title: "Analytics & Reporting",
          description: "Analyze the effectiveness of location-based promotions by tracking test drive appointments, customer visits, and conversion rates.",
        },
      ],
      benefits: [
        {
          item: "Increases test drive appointments and dealership visits with targeted promotions.",
        },
        {
          item: "Enhances customer engagement with real-time offers and information based on their location.",
        },
        {
          item: "Provides insights into customer behavior and the effectiveness of promotional strategies.",
        },
      ],
    },
    {
      title: "Quick Service Restaurants (QSR)",
      icon: <FaHamburger />,
      sub_heading: "Drive-Thru Promotions and Customer Loyalty",
      topHeading: "Drive-Thru Promotions and Customer Loyalty",
      scenario: "A fast-food chain wants to boost drive-thru traffic and reward loyal customers through location-based marketing.",
      implementations: [
        {
          title: "Geofencing",
          description: "Create geofences around drive-thru locations to send special promotions and loyalty rewards to customers as they approach the restaurant.",
        },
        {
          title: "Proximity Marketing",
          description: "Use beacons to send notifications about daily specials or limited-time offers to customers waiting in their cars in the drive-thru line.",
        },
        {
          title: "Location-Based Loyalty Rewards",
          description: "Offer rewards or discounts to customers who frequently visit specific locations or use the drive-thru service.",
        },
        {
          title: "Analytics & Reporting",
          description: "Track drive-thru visits, redemption rates of location-based offers, and customer engagement with loyalty programs.",
        },
      ],
      benefits: [
        {
          item: "Increases drive-thru traffic and sales through targeted promotions and loyalty rewards.",
        },
        {
          item: "Enhances customer satisfaction with personalized offers and rewards based on location.",
        },
        {
          item: "Provides valuable data on customer visits and engagement for optimizing marketing strategies.",
        },
      ],
    },
  ],
};


