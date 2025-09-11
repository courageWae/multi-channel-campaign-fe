// TitleManager.js
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
      case "/home":
        document.title = "Adsevo - Home Page";
        break;
      case "/login":
        document.title = "Adsevo - Login Page";
        break;
      case "/register":
        document.title = "Adsevo - Registration Page";
        break;
      case "/pricing":
        document.title = "Adsevo - Pricing Page";
        break;
      case "/contact":
        document.title = "Adsevo - Contact Page";
        break;
      case "/sales-contact":
        document.title = "Adsevo - Sales Contact Page";
        break;
      case "/pricing-table":
        document.title = "Adsevo - Pricing Table Page";
        break;
      case "/detail-pages":
        document.title = "Adsevo - Detail Page";
        break;
      case "/multi-channel-marketing":
        document.title = "Adsevo - Multi-Channel Marketing Page";
        break;
      case "/social-media-marketing":
        document.title = "Adsevo - Social Media Marketing Page";
        break;
      case "/ussd-menu":
        document.title = "Adsevo - USSD Menu Page";
        break;
      case "/device-campaign":
        document.title = "Adsevo - Device Campaign Page";
        break;
      case "/geo-location":
        document.title = "Adsevo - Geo Location Page";
        break;
      case "/polling-pages":
        document.title = "Adsevo - Polling Pages";
        break;
      case "/automation-pages":
        document.title = "Adsevo - Automation Pages";
        break;
      case "/lead-generation":
        document.title = "Adsevo - Lead Generation Page";
        break;
      case "/campaign-pages":
        document.title = "Adsevo - Campaign Pages";
        break;
      case "/loyalty-campaign":
        document.title = "Adsevo - Loyalty Campaign Page";
        break;
      case "/meeting-page":
        document.title = "Adsevo - Meeting Page";
        break;
      case "/resources-page":
        document.title = "Adsevo - Resources Page";
        break;
      // case "/cms/sender-id-management":
      //   document.title = "Sender ID Management Page";
      //   break;
      // case "/contacts":
      //   document.title = "Contacts Page";
      //   break;
      // case "/cms/contact/:id":
      //   document.title = "Contact Details Page";
      //   break;
      // case "/form":
      //   document.title = "Form Page";
      //   break;
      // case "/dashboard":
      //   document.title = "Dashboard";
      //   break;
      // case "/demo":
      //   document.title = "Demo Page";
      //   break;
      default:
        document.title = "Adsevo";
        break;
    }
  }, [location.pathname]);

  return null;
};

export default TitleManager;
