import {
  FaCar,
  FaChartBar,
  FaChartLine,
  FaClock,
  FaDollarSign,
  FaFileAlt,
  FaHandshake,
  FaIndustry,
  FaLevelUpAlt,
  FaMobileAlt,
  FaMoneyBillWave,
  FaShareAlt,
  FaStar,
  FaTags,
  FaUsers,
} from "react-icons/fa";

import {
  FaPiggyBank,
  FaShieldAlt,
  FaStore,
  FaHotel,
  FaBullhorn,
  FaStethoscope,
  FaGraduationCap,
  FaHeartbeat,
  FaPhoneAlt,
} from "react-icons/fa";
import Images from "../Images";
export const data = {
  benefits: [
    {
      heading: "Improves Customer Retention",
      subHeading:
        "By offering personalized rewards and incentives, businesses can keep customers engaged and reduce churn.",
      icon: <FaUsers />,
    },
    {
      heading: "Enhances Customer Engagement",
      subHeading:
        "Loyalty programs encourage ongoing interaction with the brand, driving repeat purchases and strengthening relationships.",
      icon: <FaHandshake />,
    },
    {
      heading: "Increases Revenue and Lifetime Value",
      subHeading:
        "Through loyalty points, personalized rewards, and tiered programs, businesses can increase the average transaction value and overall lifetime value of their customers.",
      icon: <FaDollarSign />,
    },
    {
      heading: "Boosts Customer Acquisition through Referrals",
      subHeading:
        "Integrating referral programs into loyalty campaigns helps attract new customers through word-of-mouth marketing.",
      icon: <FaBullhorn />,
    },
    {
      heading: "Provides Data-Driven Insights",
      subHeading:
        "Comprehensive analytics and reporting provide valuable insights into customer behavior, enabling businesses to refine loyalty programs for better outcomes.",
      icon: <FaChartBar />,
    },
    {
      heading: "Offers Omni-Channel Flexibility",
      subHeading:
        "The ability to run loyalty campaigns across multiple channels ensures that customers can interact with the program wherever they are most comfortable.",
      icon: <FaMobileAlt />,
    },
  ],
};
export const cards = {
  features: [
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Loyalty Program Creation & Customization",
      title: "Loyalty Program Creation & Customization",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <FaStar />,
        title: "Overview",
        description: (
          <>
            Allows businesses to design custom loyalty programs tailored to
            their specific goals, including point-based systems, tiered
            membership levels, and personalized reward structures.
          </>
        ),
      },
      properties: [
        {
          icon: <FaMoneyBillWave />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Flexibility",
              description:
                "Create loyalty programs that fit specific industry needs (e.g., hospitality, retail, banking).",
            },
            {
              topHeading: "Unique Offerings",
              description:
                "Enhance customer satisfaction with engaging and unique loyalty offerings.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Custom Program Design",
              description:
                "Design programs with customizable point systems, tier levels, and reward structures.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Point-Based Loyalty System",
      title: "Point-Based Loyalty System",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <FaTags />,
        title: "Overview",
        description: (
          <>
            Enables businesses to reward customers with points for actions like
            purchases and referrals, which can be redeemed for various rewards.
          </>
        ),
      },
      properties: [
        {
          icon: <FaStar />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Encourages Repeat Purchases",
              description:
                "Fosters long-term loyalty through a rewarding points system.",
            },
            {
              topHeading: "Increased Brand Affinity",
              description:
                "Makes customers feel valued and incentivized, strengthening brand connection.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Point Accumulation",
              description:
                "Earn points for actions such as purchases, referrals, and surveys.",
            },
            {
              topHeading: "Reward Redemption",
              description:
                "Redeem points for discounts, freebies, or exclusive access.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Tiered Loyalty Levels",
      title: "Tiered Loyalty Levels",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <FaLevelUpAlt />,
        title: "Overview",
        description: (
          <>
            Introduces tier-based levels that offer progressively better rewards
            as customers advance through the program.
          </>
        ),
      },
      properties: [
        {
          icon: <FaStar />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Encourages Frequent Engagement",
              description:
                "Motivates customers to engage more frequently to reach higher tiers.",
            },
            {
              topHeading: "Reward Differentiation",
              description:
                "Provides rewards that are proportional to customer loyalty and engagement.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Tier Progression",
              description:
                "Levels include tiers such as Silver, Gold, and Platinum with escalating rewards.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Loyalty Campaign Segmentation",
      title: "Loyalty Campaign Segmentation",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <FaTags />,
        title: "Overview",
        description: (
          <>
            Segments customers based on behavior and loyalty status to create
            personalized loyalty campaigns.
          </>
        ),
      },
      properties: [
        {
          icon: <FaStar />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Targeted Campaigns",
              description:
                "Enhances campaign relevance and effectiveness through precise customer segmentation.",
            },
            {
              topHeading: "Increased Re-Engagement",
              description:
                "Converts inactive customers into loyal ones with personalized offers.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Customer Segmentation",
              description:
                "Create and manage campaigns based on customer engagement levels and behaviors.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Omni-Channel Reward Delivery",
      title: "Omni-Channel Reward Delivery",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <FaShareAlt />,
        title: "Overview",
        description: (
          <>
            Delivers rewards and points across various channels including SMS,
            email, app notifications, or websites.
          </>
        ),
      },
      properties: [
        {
          icon: <FaStar />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Enhanced Experience",
              description:
                "Offers flexibility in reward redemption channels, improving customer satisfaction.",
            },
            {
              topHeading: "Seamless Multi-Channel Experience",
              description:
                "Ensures a consistent experience across different platforms.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Multi-Channel Integration",
              description:
                "Supports reward delivery and points tracking through SMS, email, app, and web.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Personalized Rewards & Offers",
      title: "Personalized Rewards & Offers",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <FaStar />,
        title: "Overview",
        description: (
          <>
            Tailors rewards to individual customers based on their purchase
            history and preferences.
          </>
        ),
      },
      properties: [
        {
          icon: <FaStar />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Highly Relevant Offers",
              description:
                "Delivers rewards that are more likely to be redeemed, boosting engagement.",
            },
            {
              topHeading: "Increased Effectiveness",
              description:
                "Improves loyalty campaign effectiveness and enhances overall customer satisfaction.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Tailored Reward Systems",
              description:
                "Customizes rewards and offers based on individual customer data and preferences.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Referral Program Integration",
      title: "Referral Program Integration",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <FaShareAlt />,
        title: "Overview",
        description: (
          <>
            Integrates a referral system into loyalty programs, rewarding both
            referrers and new customers.
          </>
        ),
      },
      properties: [
        {
          icon: <FaStar />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Mutually Beneficial System",
              description:
                "Rewards both the referrer and the new customer, enhancing the overall referral process.",
            },
            {
              topHeading: "Increased Trust",
              description:
                "Referrals are often viewed as more credible, leading to higher conversion rates.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Referral Rewards",
              description:
                "Offers points or discounts for bringing in new customers through a referral program.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Real-Time Points Tracking",
      title: "Real-Time Points Tracking",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <FaClock />,
        title: "Overview",
        description: (
          <>
            Provides real-time tracking of loyalty points and rewards statuses
            through an online portal or app.
          </>
        ),
      },
      properties: [
        {
          icon: <FaStar />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Increased Transparency",
              description:
                "Allows customers to see their points accumulate in real time, enhancing trust.",
            },
            {
              topHeading: "Performance Monitoring",
              description:
                "Enables businesses to track and adjust loyalty campaigns quickly based on real-time data.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Live Points Dashboard",
              description:
                "Features a dashboard for monitoring points and rewards status in real time.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Customer Loyalty Insights & Reporting",
      title: "Customer Loyalty Insights & Reporting",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <FaChartLine />,
        title: "Overview",
        description: (
          <>
            Offers comprehensive analytics on customer loyalty, including point
            accumulation, redemption rates, and program performance.
          </>
        ),
      },
      properties: [
        {
          icon: <FaFileAlt />,
          title: "Benefits",
          emoji: Images.benefit,
          description: [
            {
              topHeading: "Deep Insights",
              description:
                "Provides detailed reports to refine and optimize loyalty campaigns based on customer behavior.",
            },
            {
              topHeading: "Enhanced Lifetime Value",
              description:
                "Helps understand patterns and optimize offers to improve customer retention and decision-making.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Comprehensive Analytics",
              description:
                "Generates reports on key metrics such as point accumulation, redemption rates, and overall program performance.",
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
        "Increase repeat orders and strengthen distributor relationships through a tiered loyalty program.",
      topHeading: "B2B Loyalty Program for Distributors and Wholesalers",
      scenario:
        "A manufacturing company wants to increase repeat orders from its distributors and wholesalers by rewarding them for their loyalty.",
      implementations: [
        {
          title: "Tiered Loyalty Program",
          description:
            "Implement a tiered loyalty program with rewards based on order volume and frequency, offering points redeemable for discounts, faster shipping, or exclusive products.",
        },
        {
          title: "Loyalty Campaign Segmentation",
          description:
            "Differentiate high-performing distributors and provide tailored rewards for each tier (e.g., Gold, Silver, Platinum).",
        },
        {
          title: "Real-Time Points Tracking",
          description:
            "Allow distributors to monitor their points and progress in real-time, fostering a sense of accomplishment.",
        },
      ],
      benefits: [
        {
          item: "Increases repeat orders and incentivizes larger purchases.",
        },
        {
          item: "Strengthens long-term relationships with distributors through personalized rewards.",
        },
        {
          item: "Fosters a sense of accomplishment with real-time points tracking.",
        },
      ],
    },
    {
      title: "Banking Industry",
      icon: <FaPiggyBank />,
      sub_heading:
        "Enhance credit card offerings and customer satisfaction with a point-based loyalty system.",
      topHeading: "Credit Card Loyalty and Rewards Program",
      scenario:
        "A bank wants to enhance its credit card offering by introducing a loyalty program that rewards customers for using their cards.",
      implementations: [
        {
          title: "Point-Based Loyalty System",
          description:
            "Customers earn points for every transaction, redeemable for cashback, travel rewards, or gift cards.",
        },
        {
          title: "Personalized Rewards & Offers",
          description:
            "Target specific customer segments with customized offers such as bonus points for travel or dining.",
        },
        {
          title: "Omni-Channel Reward Delivery",
          description:
            "Allow customers to redeem points through the bank’s mobile app, website, or in-store partners.",
        },
      ],
      benefits: [
        {
          item: "Increases credit card usage and transaction volume.",
        },
        {
          item: "Improves customer satisfaction with personalized rewards.",
        },
        {
          item: "Ensures convenient reward redemption through multiple channels.",
        },
      ],
    },
    {
      title: "Insurance Industry",
      icon: <FaShieldAlt />,
      sub_heading:
        "Reduce churn and encourage renewals with a comprehensive loyalty program for policyholders.",
      topHeading: "Customer Loyalty Program for Policy Renewals",
      scenario:
        "An insurance company wants to reduce churn by encouraging policyholders to renew their insurance policies and engage with additional services.",
      implementations: [
        {
          title: "Loyalty Program Creation & Customization",
          description:
            "Design a program that rewards points for renewals and referrals, redeemable for discounts or additional coverage.",
        },
        {
          title: "Referral Program Integration",
          description:
            "Attract new customers through referrals with additional rewards for both referrer and referee.",
        },
        {
          title: "Automated Loyalty Campaigns",
          description:
            "Send timely renewal reminders and bonus offers to loyal customers.",
        },
      ],
      benefits: [
        {
          item: "Increases policy renewal rates and reduces customer churn.",
        },
        {
          item: "Encourages cross-selling of additional insurance products.",
        },
        {
          item: "Provides insights to optimize loyalty offers and track program effectiveness.",
        },
      ],
    },
    {
      title: "Retail & Wholesale Industry",
      icon: <FaStore />,
      sub_heading:
        "Boost customer retention with an omnichannel loyalty program that rewards frequent shoppers.",
      topHeading: "Omnichannel Loyalty Program for Retail Customers",
      scenario:
        "A retail chain wants to increase customer retention and reward frequent shoppers both online and in-store.",
      implementations: [
        {
          title: "Omni-Channel Reward Delivery",
          description:
            "Customers earn points for purchases made online or in-store, redeemable for rewards.",
        },
        {
          title: "Tiered Loyalty Levels",
          description:
            "Encourage shoppers to reach higher tiers (e.g., Bronze, Silver, Gold) with exclusive rewards like early access to sales and personalized discounts.",
        },
        {
          title: "Reward Redemption & Catalog Management",
          description:
            "Allow easy redemption of points for products or discounts, enhancing program participation.",
        },
      ],
      benefits: [
        {
          item: "Boosts repeat purchases online and in-store.",
        },
        {
          item: "Enhances customer experience with a seamless, omnichannel loyalty program.",
        },
        {
          item: "Increases participation through easy and appealing reward redemption.",
        },
      ],
    },
    {
      title: "Hospitality Industry",
      icon: <FaHotel />,
      sub_heading:
        "Improve guest retention with a loyalty program that rewards frequent stays and additional services.",
      topHeading: "Hotel Guest Loyalty Program",
      scenario:
        "A hotel chain wants to improve guest retention by offering a loyalty program that rewards frequent stays and additional services.",
      implementations: [
        {
          title: "Point-Based Loyalty System",
          description:
            "Guests earn points for each stay and additional services, redeemable for free nights, room upgrades, or exclusive experiences.",
        },
        {
          title: "Gamification Features",
          description:
            "Enhance the program with achievement badges and status levels (e.g., Silver, Gold, Platinum) to motivate guests.",
        },
        {
          title: "Loyalty Campaign Segmentation",
          description:
            "Target specific guest segments with tailored offers based on their stay patterns and preferences.",
        },
      ],
      benefits: [
        {
          item: "Increases guest retention and frequency of stays.",
        },
        {
          item: "Drives incremental revenue by encouraging use of additional services.",
        },
        {
          item: "Motivates guests with gamification and personalized offers.",
        },
      ],
    },
    {
      title: "Advertising Industry",
      icon: <FaBullhorn />,
      sub_heading:
        "Build long-term relationships with advertisers and increase ad spend through a tiered loyalty program.",
      topHeading: "Loyalty Program for Advertising Partners",
      scenario:
        "A digital advertising agency wants to build long-term relationships with its advertisers and incentivize them to spend more on campaigns.",
      implementations: [
        {
          title: "Tiered Loyalty Levels",
          description:
            "Advertisers earn points for campaign spend and can unlock benefits like premium ad placement and free creative services.",
        },
        {
          title: "Personalized Rewards & Offers",
          description:
            "Provide unique offers to high-spending advertisers to encourage more budget allocation.",
        },
        {
          title: "Automated Loyalty Campaigns",
          description:
            "Send regular updates on loyalty status and available rewards to keep advertisers engaged.",
        },
      ],
      benefits: [
        {
          item: "Encourages increased ad spend and loyalty.",
        },
        {
          item: "Improves client-agency relationships through personalized rewards.",
        },
        {
          item: "Increases engagement with automated updates on rewards and status.",
        },
      ],
    },
    {
      title: "Automotive Industry",
      icon: <FaCar />,
      sub_heading:
        "Reward vehicle purchases and service visits to boost customer loyalty and retention.",
      topHeading: "Loyalty Program for Car Owners and Service Customers",
      scenario:
        "An automotive company wants to reward loyal customers who purchase vehicles and return for regular servicing.",
      implementations: [
        {
          title: "Loyalty Program Creation & Customization",
          description:
            "Reward points for vehicle purchases and services, redeemable for service discounts, accessories, or upgrades.",
        },
        {
          title: "Personalized Rewards & Offers",
          description:
            "Provide special offers based on vehicle model and service history.",
        },
        {
          title: "Automated Loyalty Campaigns",
          description:
            "Send timely service reminders and reward offers to enhance the customer experience.",
        },
      ],
      benefits: [
        {
          item: "Increases retention for both vehicle sales and after-sales service.",
        },
        {
          item: "Encourages regular servicing and drives after-sales revenue.",
        },
        {
          item: "Enhances the customer experience with timely reminders and offers.",
        },
      ],
    },
    {
      title: "Healthcare Industry",
      icon: <FaStethoscope />,
      sub_heading:
        "Enhance patient retention and engagement with a loyalty program that rewards preventative care and referrals.",
      topHeading: "Loyalty Program for Patients and Subscribers",
      scenario:
        "A healthcare provider wants to improve patient retention and encourage the use of preventative care services.",
      implementations: [
        {
          title: "Point-Based Loyalty System",
          description:
            "Patients earn points for regular check-ups and wellness services, redeemable for discounts or premium services.",
        },
        {
          title: "Referral Program Integration",
          description:
            "Reward patients for referring new clients to the practice.",
        },
        {
          title: "Feedback Collection",
          description:
            "Collect feedback on patient engagement and program effectiveness to optimize offers.",
        },
      ],
      benefits: [
        {
          item: "Encourages engagement in preventative care, improving health outcomes.",
        },
        {
          item: "Increases patient retention with valuable incentives.",
        },
        {
          item: "Optimizes loyalty offers with insights from feedback and program performance.",
        },
      ],
    },
    {
      title: "Education Industry",
      icon: <FaGraduationCap />,
      sub_heading:
        "Enhance course offerings and student satisfaction through feedback and evaluations.",
      topHeading: "Student Feedback and Course Evaluation",
      scenario:
        "An educational institution wants to improve course offerings by gathering student feedback.",
      implementations: [
        {
          title: "End-of-Term Surveys",
          description:
            "Send surveys to students evaluating their learning experience, course material, and instructor performance.",
        },
        {
          title: "Student Polls",
          description:
            "Gather preferences on upcoming courses, extracurricular activities, and campus facilities.",
        },
        {
          title: "Feedback Utilization",
          description:
            "Use feedback to adjust course content, teaching methods, and campus offerings.",
        },
      ],
      benefits: [
        {
          item: "Improves course content and delivery based on student feedback.",
        },
        {
          item: "Boosts student satisfaction and engagement, leading to better academic outcomes.",
        },
        {
          item: "Provides data for institutional improvements and enhances the overall educational experience.",
        },
      ],
    },
    {
      title: "Health & Wellness Industry",
      icon: <FaHeartbeat />,
      sub_heading:
        "Optimize wellness programs and client retention through targeted feedback and program evaluations.",
      topHeading: "Program Evaluation and Feedback",
      scenario:
        "A wellness center or fitness program seeks to improve services by gathering participant feedback.",
      implementations: [
        {
          title: "Post-Program Surveys",
          description:
            "Send surveys after fitness classes or wellness programs asking about trainer quality, program structure, and facilities.",
        },
        {
          title: "Participant Polls",
          description:
            "Poll participants on preferred schedules, class types, and wellness services.",
        },
        {
          title: "Program Optimization",
          description:
            "Use feedback to enhance program delivery and increase membership retention.",
        },
      ],
      benefits: [
        {
          item: "Provides insights for tailoring fitness and wellness programs to client needs.",
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
      sub_heading:
        "Enhance network quality and customer service through targeted feedback and data analysis.",
      topHeading: "Network Quality and Customer Service Feedback",
      scenario:
        "A telecom company wants to gather feedback on network performance and customer service experiences.",
      implementations: [
        {
          title: "Customer Service Surveys",
          description:
            "Send surveys after customer service interactions or network outage resolutions to rate the support received.",
        },
        {
          title: "Network Quality Polls",
          description:
            "Poll customers about network quality, coverage issues, and call drop rates.",
        },
        {
          title: "Data Analysis",
          description:
            "Analyze feedback to improve network infrastructure and optimize customer service training.",
        },
      ],
      benefits: [
        {
          item: "Improves network reliability by identifying problem areas through feedback.",
        },
        {
          item: "Boosts customer satisfaction by addressing concerns related to service and network quality.",
        },
        {
          item: "Reduces churn by actively resolving issues identified in feedback.",
        },
      ],
    },
  ],
};
