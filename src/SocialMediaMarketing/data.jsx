
import { IoBriefcaseSharp } from "react-icons/io5";

import { FaGlobe, FaHotel, FaIndustry, FaPiggyBank, FaShieldAlt, FaStethoscope, FaStore} from "react-icons/fa";
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
      subtitle: "Social Media Campaign Management",
      title: "Facebook Campaign Management",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Design and launch marketing campaigns specifically tailored for Facebook, create ads, boost posts, and manage Facebook Pages and Groups. Track campaign performance with Facebook Insights integration.
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
              topHeading: "Leverages Audience Targeting",
              description:
                "Utilizes Facebook's extensive audience targeting options to increase brand visibility and engagement.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Ad Creation and Management",
              description:
                "Create ads, boost posts, and manage Facebook Pages and Groups with insights integration.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Social Media Campaign Management",
      title: "Instagram Campaign Management",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Manage and optimize Instagram campaigns including posts, stories, and ads, leveraging Instagram’s visual-focused features to engage users with high-quality content.
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
              topHeading: "Enhances Brand Image",
              description:
                "Engages with younger demographics and influencers through visually compelling content.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Visual Content Management",
              description:
                "Utilize Instagram’s features to manage and optimize campaigns including posts, stories, and ads.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Social Media Campaign Management",
      title: "Twitter Campaign Management",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Create and manage Twitter ads and promoted tweets, schedule tweets, and track hashtag performance with real-time analytics.
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
              topHeading: "Real-Time Engagement",
              description:
                "Facilitates interactions through hashtags and trending topics with real-time analytics.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Ads and Hashtag Performance",
              description:
                "Manage Twitter ads, schedule tweets, and analyze engagement with Twitter Analytics.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Social Media Campaign Management",
      title: "YouTube Campaign Management",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Manage video ad campaigns and YouTube channel content, schedule uploads, and track performance metrics through YouTube Analytics.
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
              topHeading: "Engages with Video Content",
              description:
                "Drives brand awareness and user engagement through rich media content and video ads.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Video Management",
              description:
                "Manage video ads, schedule uploads, and analyze video performance using YouTube Analytics.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Social Media Campaign Management",
      title: "TikTok Campaign Management",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Create and manage TikTok ads and challenges, schedule content, and leverage TikTok’s viral content capabilities for increased reach.
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
              topHeading: "Viral Content Engagement",
              description:
                "Engages with a younger, trend-focused audience through short-form video content.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Viral Content Management",
              description:
                "Create TikTok ads, schedule content, and track performance metrics leveraging TikTok's unique capabilities.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Social Media Tools",
      title: "Campaign Post & Reels Scheduling",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Schedule and automate the posting of content, including images, videos, and reels, ensuring consistent and timely delivery across platforms.
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
                "Maximizes audience reach by posting at optimal times and reduces manual effort with automation.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Automated Scheduling",
              description:
                "Automate the scheduling of posts for optimal engagement across platforms.",
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
            Use AI tools to generate and optimize content for social media, automate content creation based on audience insights and trends.
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
              topHeading: "Enhanced Creativity",
              description:
                "Speeds up content creation and ensures data-driven, engaging content.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "AI-Powered Content",
              description:
                "Generates content ideas, headlines, and visuals using AI based on audience insights.",
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
            Preview how content will appear on different social media platforms before publishing, ensuring visual appeal and correct formatting.
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
              topHeading: "Improved Content Quality",
              description:
                "Ensures content is visually appealing and correctly formatted, reducing errors.",
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
                "Preview content for different platforms and adjust formatting, visuals, and layout as needed.",
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
            Create and manage standard templates for social media posts, ads, and reels, aligning with brand guidelines and campaign goals.
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
              topHeading: "Consistent Branding",
              description:
                "Maintains consistent branding across all social media channels with predefined templates.",
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
                "Create, save, and apply templates for various types of content to maintain brand consistency.",
            },
          ],
        },
      ],
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=zcE14WpxIHI",
      subtitle: "Social Media Performance",
      title: "Analytics Dashboard for All Platforms",
      learn: "Signup Free",
      url: "/register",
      overview: {
        icon: <GrOverview />,
        title: "Overview",
        description: (
          <>
            Monitor and analyze social media performance across all platforms with a unified dashboard, providing insights into engagement, reach, and conversion metrics.
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
              topHeading: "Comprehensive Insights",
              description:
                "Provides a holistic view of performance across all platforms to optimize social media strategies.",
            },
          ],
        },
        {
          emoji: Images.settings,
          title: "Functionality",
          description: [
            {
              topHeading: "Unified Analytics",
              description:
                "Analyze engagement, reach, and conversions from one dashboard.",
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
        "Increased brand visibility, engagement from various audience segments, and improved awareness of product sustainability through multi-channel campaigns and AI-driven content.",
      topHeading: "Product Launch & Brand Awareness Campaign",
      scenario:
        "A manufacturing company is launching a new line of eco-friendly products and wants to raise awareness among consumers and distributors across multiple countries.",
      implementations: [
        {
          title: "Facebook & Instagram Campaigns",
          description:
            "Create visually appealing ads and posts showcasing the new products' features, benefits, and environmental impact, targeting users interested in sustainability and green products.",
        },
        {
          title: "YouTube Video Campaign",
          description:
            "Post short explainer videos to educate customers about the manufacturing process and demonstrate product usage.",
        },
        {
          title: "TikTok Challenge",
          description:
            "Initiate a viral TikTok challenge to engage younger audiences by asking users to post short clips showing how they use the product in creative ways.",
        },
        {
          title: "AI Integration for Content",
          description:
            "Generate personalized messaging based on different audience segments, ensuring content resonates across platforms.",
        },
      ],
      benefits: [
        {
          item: "Increased brand visibility through targeted campaigns.",
        },
        {
          item: "Higher engagement from various audience segments.",
        },
        {
          item: "Improved awareness of product sustainability.",
        },
      ],
    },
    {
      title: "Banking Industry",
      icon: <FaPiggyBank />,
      sub_heading:
        "Enhanced customer trust and engagement through educational content and personalized financial advice, leading to increased interest in financial products.",
      topHeading: "Financial Education Campaign",
      scenario:
        "A bank wants to promote financial literacy to its customers through an educational campaign across its social media platforms.",
      implementations: [
        {
          title: "Facebook Campaign Management",
          description:
            "Create educational posts and ads offering tips on saving, investing, and budgeting, targeting users based on their financial behavior.",
        },
        {
          title: "Instagram Reels",
          description:
            "Post engaging visual content, such as short animated infographics, to make complex financial concepts easy to understand.",
        },
        {
          title: "YouTube Campaign",
          description:
            "Publish a series of videos on topics like 'How to Save for Retirement' or 'Understanding Mortgages' and promote them across YouTube.",
        },
        {
          title: "Social Media Feedback Management",
          description:
            "Track feedback from customers who have questions about financial products and respond with personalized advice.",
        },
      ],
      benefits: [
        {
          item: "Enhanced customer trust through educational content.",
        },
        {
          item: "Increased engagement with personalized financial advice.",
        },
        {
          item: "Higher interest in financial products.",
        },
      ],
    },
    {
      title: "Insurance Industry",
      icon: <FaShieldAlt />,
      sub_heading:
        "Improved customer satisfaction and faster claims processing through targeted educational content and AI-driven personalization.",
      topHeading: "Claims Awareness & Customer Engagement Campaign",
      scenario:
        "An insurance company is rolling out a new claims process and needs to inform and educate customers about how to file claims quickly and efficiently using its online portal.",
      implementations: [
        {
          title: "Twitter Campaign Management",
          description:
            "Tweet step-by-step instructions for filing claims and use promoted tweets to reach a broader audience.",
        },
        {
          title: "Facebook & Instagram Campaigns",
          description:
            "Feature customer testimonials and real-life case studies of the new claims process's ease and effectiveness.",
        },
        {
          title: "AI Content Creation",
          description:
            "Generate personalized content targeting different customer profiles (e.g., homeowners, renters, car owners) to ensure relevant information.",
        },
      ],
      benefits: [
        {
          item: "Improved customer satisfaction through better education.",
        },
        {
          item: "Reduced inquiries to customer support.",
        },
        {
          item: "Faster claims processing through enhanced awareness.",
        },
      ],
    },
    {
      title: "Retail & Wholesale Industry",
      icon: <FaStore />,
      sub_heading:
        "Increased sales and higher engagement rates through targeted seasonal promotions and AI-generated content.",
      topHeading: "Seasonal Sales & Promotions",
      scenario:
        "A retail chain is running seasonal promotions for the holiday season and wants to drive both online and in-store traffic through targeted social media campaigns.",
      implementations: [
        {
          title: "Instagram & TikTok Campaign Management",
          description:
            "Create visually attractive posts, reels, and TikTok videos showcasing discounted items, limited-time offers, and holiday gift ideas.",
        },
        {
          title: "Facebook Ad Campaigns",
          description:
            "Target ads based on users' shopping behavior, interests, and demographics to encourage visits to local stores or online shopping.",
        },
        {
          title: "AI Integration for Content",
          description:
            "Generate festive and timely content to reflect current trends and engage audiences effectively.",
        },
        {
          title: "Campaign Post Scheduling",
          description:
            "Schedule posts in advance to ensure consistent promotion throughout the holiday season.",
        },
      ],
      benefits: [
        {
          item: "Increased sales through well-timed promotions.",
        },
        {
          item: "Higher engagement rates from targeted messaging.",
        },
        {
          item: "Improved foot traffic with effective seasonal campaigns.",
        },
      ],
    },
    {
      title: "Hospitality Industry",
      icon: <FaHotel />,
      sub_heading:
        "Increased bookings and improved brand image through high-quality visuals, AI-driven content, and effective feedback management.",
      topHeading: "Promotional Campaign for Hotel Packages",
      scenario:
        "A luxury hotel chain wants to promote its special packages for a new destination through social media, targeting tourists and business travelers.",
      implementations: [
        {
          title: "Instagram Campaigns",
          description:
            "Create high-quality visuals of rooms, services, and attractions, shared through Instagram stories and posts.",
        },
        {
          title: "Facebook Campaign Management",
          description:
            "Run ad campaigns promoting discounted rates and exclusive packages, targeting frequent travelers and corporate clients.",
        },
        {
          title: "AI-Driven Content Creation",
          description:
            "Generate personalized content for different customer segments (luxury travelers, families, business travelers).",
        },
        {
          title: "Social Media Feedback Management",
          description:
            "Collect feedback from customers who have stayed at the new location and use it to improve service and future promotions.",
        },
      ],
      benefits: [
        {
          item: "Increased bookings through targeted promotions.",
        },
        {
          item: "Improved brand image with high-quality visuals.",
        },
        {
          item: "Higher engagement from travelers interested in luxury stays.",
        },
      ],
    },
    {
      title: "Tourism Industry",
      icon: <FaGlobe />,
      sub_heading:
        "Increased interest in travel destinations and improved package sales through engaging video content, viral campaigns, and personalized marketing.",
      topHeading: "Destination Promotion & Travel Package Sales",
      scenario:
        "A tourism board aims to promote travel to a specific destination post-pandemic, encouraging tourists to visit and take advantage of special travel deals.",
      implementations: [
        {
          title: "YouTube & Instagram Campaigns",
          description:
            "Launch video content highlighting key attractions, local experiences, and travel packages available.",
        },
        {
          title: "TikTok Viral Campaign",
          description:
            "Initiate a travel-themed TikTok challenge, asking users to share their favorite travel moments or what they’re most excited to see.",
        },
        {
          title: "Contact List Management",
          description:
            "Send personalized deals to past travelers encouraging them to visit again.",
        },
        {
          title: "AI Integration for Content Creation",
          description:
            "Generate content tailored to different types of tourists (e.g., adventure travelers, families, eco-tourists).",
        },
      ],
      benefits: [
        {
          item: "Increased interest in the destination.",
        },
        {
          item: "Improved travel package sales.",
        },
        {
          item: "Enhanced traveler engagement through personalized marketing.",
        },
      ],
    },
    {
      title: "Advertising Industry",
      icon: <FaBullhorn />,
      sub_heading:
        "Increased client satisfaction and improved ad performance through streamlined campaign management, consistent branding, and AI-driven creative content.",
      topHeading: "Multi-Platform Ad Campaign for Clients",
      scenario:
        "An advertising agency needs to run social media campaigns for multiple clients across various platforms, ensuring each client’s brand voice is consistent.",
      implementations: [
        {
          title: "Campaign Post Scheduling",
          description:
            "Schedule content across multiple platforms to ensure each client's campaign is launched at the right time for maximum visibility.",
        },
        {
          title: "Standard Template Creation & Designs",
          description:
            "Create and use brand-aligned templates for posts and ads to ensure consistency across platforms.",
        },
        {
          title: "Social Media Feedback Management",
          description:
            "Track customer feedback for each client’s campaigns and engage with the audience to maintain brand reputation.",
        },
        {
          title: "AI Integration",
          description:
            "Produce creative and effective ad copy tailored to each client’s brand tone and messaging.",
        },
      ],
      benefits: [
        {
          item: "Increased client satisfaction through effective campaign management.",
        },
        {
          item: "Improved ad performance with consistent branding.",
        },
        {
          item: "Streamlined management across multiple brands.",
        },
      ],
    },
    {
      title: "Health Care Industry",
      icon: <FaStethoscope />,
      sub_heading:
        "Increased awareness of healthcare services, improved patient engagement, and more educated patients taking preventive measures through targeted campaigns and AI-driven content.",
      topHeading: "Patient Awareness & Health Education",
      scenario:
        "A healthcare provider wants to raise awareness about preventive healthcare measures and promote wellness services through social media.",
      implementations: [
        {
          title: "Facebook & Twitter Campaigns",
          description:
            "Create posts and ads offering tips on healthy living, preventive care, and services like vaccinations, targeting different demographics.",
        },
        {
          title: "YouTube Campaign Management",
          description:
            "Publish videos on topics like healthy habits, symptom checkers, and doctor consultations.",
        },
        {
          title: "AI Content Creation",
          description:
            "Generate personalized content for different patient groups (e.g., seniors, families, pregnant women) to ensure relevant messaging.",
        },
        {
          title: "Social Media Feedback Management",
          description:
            "Collect and analyze patient feedback to improve service offerings and enhance patient experience.",
        },
      ],
      benefits: [
        {
          item: "Increased awareness of healthcare services.",
        },
        {
          item: "Improved patient engagement through relevant content.",
        },
        {
          item: "More educated patients taking preventive measures.",
        },
      ],
    },
  ],
};


