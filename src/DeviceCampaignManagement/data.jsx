import { SiAltiumdesigner } from "react-icons/si";
import {
  MdOutlineCampaign,
  MdOutlinePersonalInjury,

} from "react-icons/md";
import { IoBriefcaseSharp } from "react-icons/io5";
import { FaBullhorn, FaHotel, FaIndustry, FaPiggyBank, FaShieldAlt, FaStore } from "react-icons/fa";

import { FaAcquisitionsIncorporated } from "react-icons/fa";
import { GiDeliveryDrone } from "react-icons/gi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GrOverview } from "react-icons/gr";
import Images from "../Images";
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
      subtitle: "Detection & Segmentation",
      title: "Detection and Segmentation",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Identify and segment users based on their devices to deliver tailored content and track cross-device interactions.
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
              topHeading: "Optimized User Experience",
              description:
                "Delivers device-optimized content, enhancing user engagement through tailored messages.",
            },
            {
              topHeading: "Enhanced Engagement",
              description:
                "Improves interactions by delivering messages designed for specific device types.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Device Identification & Segmentation",
              description:
                "Detects device types and segments users accordingly for tailored campaign delivery and tracks user behavior across multiple devices",
            }
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Mobile Optimization",
      title: "Mobile Optimization",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Tailor campaigns specifically for mobile users with responsive layouts and adaptive content.
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
              topHeading: "Increased Engagement",
              description:
                "Delivers mobile-friendly content that's easy to read and interact with on smartphones with responsive designs for user satisfaction",
            }
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Mobile-First Campaigns",
              description:
                "Designs campaigns specifically for mobile with adaptive content and responsive layouts.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Device-Based Personalization",
      title: "Device-Based Personalization",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Personalize content and offers based on the type of device a user is using for a more relevant experience.
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
              topHeading: "Relevant Content Delivery",
              description:
                "Increases engagement by tailoring messages to the specific device being used.",
            },
            {
              topHeading: "Improved Satisfaction",
              description:
                "Enhances user experience with campaigns optimized for each device type, leading to higher conversion rates.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Device-Specific Content",
              description:
                "Customizes marketing messages and content based on device type, with dynamic adjustments for different screens.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Device Performance Tracking",
      title: "Device Performance Tracking",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Monitor and analyze campaign performance across different devices to optimize future efforts.
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
              topHeading: "Informed Decisions",
              description:
                "Provides insights into device-specific performance, allowing for better optimization of future campaigns.",
            },
            {
              topHeading: "Effective Targeting",
              description:
                "Identifies devices driving the most engagement and conversions for more strategic decision-making.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Device Analytics",
              description:
                "Tracks and analyzes campaign performance across various devices, including key metrics like open rates and conversions.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Cross-Device Campaign Synchronization",
      title: "Cross-Device Campaign Synchronization",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Synchronize campaigns across multiple devices to ensure a consistent and seamless user experience.
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
              topHeading: "Seamless Experience",
              description:
                "Ensures consistent messaging and user journey across all devices for a cohesive experience.",
            },
            {
              topHeading: "Increased Loyalty",
              description:
                "Improves customer satisfaction with synchronized campaigns that provide a unified experience.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Cross-Device Messaging",
              description:
                "Maintains consistent messaging across mobile, desktop, and tablet devices, tracking engagement and performance seamlessly.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Device-Based Campaign Testing",
      title: "Device-Based Campaign Testing",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Test and optimize campaigns across different device types to ensure optimal performance and display.
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
              topHeading: "Increased Effectiveness",
              description:
                "Ensures campaigns are optimized for each device type, enhancing overall effectiveness and reducing user experience issues.",
            },
            {
              topHeading: "Enhanced Display",
              description:
                "Tests how content performs and renders across different devices to maintain optimal presentation.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "A/B Testing on Devices",
              description:
                "Runs A/B tests to identify the best-performing campaign versions on various devices, with responsive testing for optimal content display.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Device-Specific User Targeting",
      title: "Device-Specific User Targeting",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Target users based on their device preferences or current device usage for more precise and effective campaigns.
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
              topHeading: "Precise Targeting",
              description:
                "Reaches users on their preferred devices, increasing engagement through more targeted messaging.",
            },
            {
              topHeading: "Effective Timing",
              description:
                "Delivers messages at the optimal time on the right device, enhancing overall campaign effectiveness.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "User Device Preferences",
              description:
                "Identifies and tracks device preferences, creating audiences based on usage patterns for more precise targeting.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Device Compliance & Security",
      title: "Device Compliance and Security",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Ensure compliance with device-based security protocols and data privacy regulations to protect user data.
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
              topHeading: "Data Protection",
              description:
                "Adheres to global privacy regulations and device-specific policies to safeguard user data.",
            },
            {
              topHeading: "User Trust",
              description:
                "Builds trust by ensuring secure and compliant interactions with user data.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Compliance Management",
              description:
                "Manages device data usage and consent collection in accordance with global regulations like GDPR and device app store policies.",
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
      sub_heading: "Targeted Promotions for Industrial Equipment Buyers",
      topHeading: "Targeted Promotions for Industrial Equipment Buyers",
      scenario: "A manufacturer of industrial equipment wants to reach its customer base across multiple devices and deliver personalized product promotions.",
      implementations: [
        {
          title: "Device Detection and Segmentation",
          description: "Segment customers based on the devices they use, such as desktops for B2B buyers and mobile devices for field engineers.",
        },
        {
          title: "Device-Based Personalization",
          description: "Deliver tailored product offers and recommendations for different industrial equipment depending on device type.",
        },
        {
          title: "Cross-Device Synchronization",
          description: "Allow users to start a product inquiry on their desktop and continue seamlessly on their mobile device.",
        },
        {
          title: "Performance Tracking",
          description: "Track campaign performance across devices and analyze which device drives more inquiries or orders.",
        },
      ],
      benefits: [
        {
          item: "Improves engagement by delivering device-specific product recommendations.",
        },
        {
          item: "Increases efficiency by synchronizing inquiries across devices.",
        },
        {
          item: "Provides insights into device usage trends for optimizing future campaigns.",
        },
      ],
    },
    {
      title: "Banking Industry",
      icon: <FaPiggyBank />,
      sub_heading: "Device-Specific Financial Product Offers",
      topHeading: "Device-Specific Financial Product Offers",
      scenario: "A retail bank wants to send personalized loan and credit card offers to customers across mobile banking apps, desktop web portals, and ATMs.",
      implementations: [
        {
          title: "Device-Based Personalization",
          description: "Target mobile app users with personal loan offers and desktop users with mortgage loan information.",
        },
        {
          title: "Cross-Device Campaign Synchronization",
          description: "Allow customers to start an application on their desktop and receive reminders on their mobile app to complete it.",
        },
        {
          title: "Device-Specific Offers",
          description: "Offer mobile users quick-access personal loans and desktop users detailed mortgage loan information.",
        },
        {
          title: "Performance Tracking",
          description: "Analyze which devices drive the most successful conversions and optimize future loan offers accordingly.",
        },
      ],
      benefits: [
        {
          item: "Increases conversions by offering the most relevant financial products based on device.",
        },
        {
          item: "Enhances the customer experience with device-optimized presentations.",
        },
        {
          item: "Provides insights into customer behavior across devices.",
        },
      ],
    },
    {
      title: "Insurance Industry",
      icon: <FaShieldAlt />,
      sub_heading: "Multi-Device Insurance Policy Renewal Campaigns",
      topHeading: "Multi-Device Insurance Policy Renewal Campaigns",
      scenario: "An insurance company wants to run policy renewal campaigns for life and car insurance across mobile apps, desktops, and call centers.",
      implementations: [
        {
          title: "Device Detection and Segmentation",
          description: "Segment users based on their preferred interaction device and deliver personalized renewal reminders.",
        },
        {
          title: "Cross-Device Synchronization",
          description: "Allow customers to start a renewal on mobile and switch to desktop for detailed comparisons.",
        },
        {
          title: "Mobile Optimization",
          description: "Send push notifications for renewal reminders and easy-to-use mobile renewal flows.",
        },
        {
          title: "Device Performance Tracking",
          description: "Track renewal rates across devices to assess which platform drives more completions.",
        },
      ],
      benefits: [
        {
          item: "Improves policy renewal likelihood with a seamless cross-device experience.",
        },
        {
          item: "Enhances customer satisfaction with timely and tailored reminders.",
        },
        {
          item: "Optimizes campaigns by understanding effective devices for renewals.",
        },
      ],
    },
    {
      title: "Retail & Wholesale Industry",
      icon: <FaStore />,
      sub_heading: "Device-Specific E-Commerce Campaigns",
      topHeading: "Device-Specific E-Commerce Campaigns",
      scenario: "A retail chain wants to increase sales by running device-targeted e-commerce campaigns.",
      implementations: [
        {
          title: "Device Segmentation",
          description: "Segment customers based on their shopping device and create tailored offers for each device.",
        },
        {
          title: "Mobile Optimization",
          description: "Send push notifications about flash sales and optimize product pages for mobile screens.",
        },
        {
          title: "Cross-Device Shopping Experience",
          description: "Enable customers to add products to their cart on desktop and complete the purchase on mobile.",
        },
        {
          title: "Device-Specific Offers",
          description: "Offer exclusive discounts for mobile app purchases and bulk discounts for desktop users.",
        },
        {
          title: "Performance Tracking",
          description: "Analyze device contribution to sales and optimize future campaigns.",
        },
      ],
      benefits: [
        {
          item: "Increases conversions with personalized offers based on the user’s device.",
        },
        {
          item: "Improves customer experience with a seamless cross-device shopping journey.",
        },
        {
          item: "Provides insights into device performance for better marketing ROI.",
        },
      ],
    },
    {
      title: "Hospitality Industry",
      icon: <FaHotel />,
      sub_heading: "Device-Responsive Booking and Upsell Campaigns",
      topHeading: "Device-Responsive Booking and Upsell Campaigns",
      scenario: "A hotel chain wants to increase bookings and upsell services via mobile apps, tablets, and desktop websites.",
      implementations: [
        {
          title: "Device-Based Personalization",
          description: "Tailor booking offers based on the device, such as mobile-exclusive deals and desktop upsell packages.",
        },
        {
          title: "Cross-Device Synchronization",
          description: "Allow guests to start a booking on desktop, receive reminders on mobile, and complete via app.",
        },
        {
          title: "Mobile Optimization",
          description: "Send push notifications for real-time upsell opportunities during the guest’s stay.",
        },
        {
          title: "Device Performance Tracking",
          description: "Track booking completion rates across devices and assess offer performance.",
        },
      ],
      benefits: [
        {
          item: "Increases bookings and upsell opportunities with device-optimized offers.",
        },
        {
          item: "Enhances guest experience with personalized, cross-device booking processes.",
        },
        {
          item: "Provides insights into device-specific performance for targeted campaigns.",
        },
      ],
    },
    {
      title: "Advertising Industry",
      icon: <FaBullhorn />,
      sub_heading: "Cross-Device Ad Campaign Management",
      topHeading: "Cross-Device Ad Campaign Management",
      scenario: "A digital advertising agency needs to manage multiple ad campaigns across different devices for optimal reach and engagement.",
      implementations: [
        {
          title: "Device Detection and Segmentation",
          description: "Detect the device type of target audiences and deliver optimized ads accordingly.",
        },
        {
          title: "Cross-Device Synchronization",
          description: "Track users across devices and deliver consistent, tailored ad messaging.",
        },
        {
          title: "A/B Testing",
          description: "Run device-specific A/B tests to determine the best-performing ad formats.",
        },
        {
          title: "Performance Tracking",
          description: "Monitor engagement metrics across devices and optimize future ad placements.",
        },
      ],
      benefits: [
        {
          item: "Maximizes ad performance with device-tailored campaigns.",
        },
        {
          item: "Increases client satisfaction with improved ad delivery and results.",
        },
        {
          item: "Provides data-driven insights into cross-device ad performance.",
        },
      ],
    },
  ],
};

