import React, { useEffect, useState } from "react";
import Sidebar from "components/SideNavbar";
import MainPage from "pages/MainPage";
import DetailPage from "pages/DetaiPage";
import LoginPage from "pages/LoginPage";
import RegistrationPage from "pages/RegistrationPge";
import TitleManager from "pages/TitleManager";
import Pricings from "pages/Pricings";
import PricingTable from "pages/PricingTable";
import ContactForm from "pages/ContactForm";
import SalesContacts from "pages/SalesContacts";
import Dashboard from "pages/Dashboard";
import Detailxpage from "pages/Detailxpage";
import Detail1page from "pages/Detail1Page";
import UssdPage from "pages/UssdPage";
import DeviceCampaignPage from "pages/DeviceCampaignPage";
import FormPage from "pages/FormPage";
import GEOLocationPage from "pages/GEOLocationPage";
import PollingPage from "pages/PollingPage";
import AutomationPage from "pages/AutomationPage";
import LeadGenerationPage from "pages/LeadGenerationPage";
import CampaignPage from "pages/CampaignPage";
import LoyaltyPage from "pages/LoyaltyPage";
import MeetingPage from "pages/MeetingPage";
import ResourcesPage from "pages/ResourcePage";
import DemoPage from "pages/DemoPage";
import Contacts from "pages/Customer/Contacts";
import ContactList from "pages/Customer/ContactList";
import { Remove_User } from "./Redux/actions";
import { useIdleTimer } from "react-idle-timer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import Config from "./Config";
import moment from "moment";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import SenderIdManagement from "pages/SenderIdManagement";
import NewContentGenerator from "pages/NewContentGenerator";
import NotFoundModel from "components/NotFoundModel";
import ImportContactCard from "pages/Customer/ImportContactCard";
import ImportContactUploadPage from "pages/Customer/ImportContactUploadPage";
import ImportContactPastePage from "pages/Customer/ImportContactPastePage";
import SenderId from "pages/Customer/SenderId";
import AdminSenderId from "pages/Admin/SenderId";
import Messaging from "pages/Customer/WhatsappTemplate";
import TemplateForm from "pages/Customer/WhatsappTemplateForm";
import ViewTemplate from "pages/Customer/WhatsappViewTemplate";
import MessagingCampign from "pages/Customer/CampaignMessagingCreation";
import SMSTemplate from "pages/Customer/SMSTemplate";
import SMSTemplateForm from "pages/Customer/SMSTemplateForm";
import SMSViewTemplate from "pages/Customer/SMSViewTemplate";
import SMSCampaigns from "pages/SMSCampaigns";
import Pricing from "components/MainPage/Pricing";
import SMSCampaign from "pages/Customer/SMSCampaign";
import EditSMSTemplateForm from "pages/Customer/EditSMSTemplateForm";
import EditSMSCamaign from "pages/Customer/EditSMSCampaign";
import SMSCampaignReport from "pages/Customer/SMSCampaignReport";
import VoiceCampaignReport from "pages/Customer/VoiceCampaignReport";
import EditVoiceCamaign from "pages/Customer/EditVoiceCampaign";
import VoiceCampaign from "pages/Customer/VoiceCampaign";
import CampaignVoiceCreation from "pages/Customer/CampaignVoiceCreation";
import AddConnection from "pages/Admin/AddConnection";
import WhatsappCampaign from "pages/Customer/WhatsappCampaign";
import CampaignWhatsappCreation from "pages/Customer/CampaignWhatsappCreation";
import EditWhatsappCamaign from "pages/Customer/EditWhatsappCampaign";
import WhatsappCampaignReport from "pages/Customer/WhatsappCampaignReport";
import FbPost from "pages/Customer/FbPost";
import InstaPost from "pages/Customer/InstaPost";
import CalenderFbPost from "pages/Customer/CalenderFbPost";
import CalendarInstaPost from "pages/Customer/CalendarInstaPost";
import Plan from "pages/Admin/Plan";
import PlanFeature from "pages/Admin/PlanFeature";
import BlacklistKeyword from "pages/Admin/BlacklistKeyword";
import TelegramTemplate from "pages/Customer/TelegramTemplate";
import TelegramTemplateForm from "pages/Customer/TelegramTemplateForm";
import TelegramViewTemplate from "pages/Customer/TelegramViewTemplate";
import TelegramCampaign from "pages/Customer/TelegramCampaign";
import CampaignTelegramCreation from "pages/Customer/CampaignTelegramCreation";
import EditTelegramCamaign from "pages/Customer/EditTelegramCampaign";
import TelegramCampaignReport from "pages/Customer/TelegramCampaignReport";
import EmailSenderId from "pages/Customer/EmailSenderId";
import EmailTemplate from "pages/Customer/EmailTemplate";
import EmailTemplateSamples from "pages/Customer/EmailTemplateSamples";
import EmailTemplateForm from "pages/Customer/EmailTemplateForm";
import Builder from "components/EmailTemplateBuilder/Builder";
import EditBuilder from "components/EditEmailTemplate/EditBuilder";
import EditTemplateName from "components/EditEmailTemplate/EditTemplateName";
import EmailCampaign from "pages/Customer/EmailCampaign";
import EmailCampaignCreation from "pages/Customer/EmailCampaignCreation";
import EditCampaign from "components/EmailCampaign/EditCampaign";
import EmailCampaignReport from "pages/Customer/EmailCampaignReport";
import AdminEmailTemplateSamples from "pages/Admin/AdminEmailTemplateSamples";
import TemplateSamplesForm from "components/AdminEmailSamplesBuilder/TemplateSamplesForm";
import AdminBuilder from "components/AdminEmailSamplesBuilder/AdminBuilder";
import UssdSurvey from "pages/Customer/UssdSurvey";
import UssdSurveyCreation from "pages/Customer/UssdSurveyCreation";
import UssdSurveyResponses from "pages/Customer/UssdSurveyResponses";
import USSDBuilder from "components/UssdSurveyBuilder/Builder";
import MultiChannelMarketing from "pages/MultiChannelMarketing";
import LoyaltyManagement from "pages/LoyaltyManagement";
import DeviceCampaignManagement from "pages/DeviceCampaignManagement";
import SocialMediaMarketing from "pages/SocialMediaMarketing";
import ReportAndAnalytics from "pages/ReportAndAnalytics";
import SalesMarketing from "pages/SalesMarketing";
import ReligionPage from "pages/Solutions/ReligionPage";
import AgriculturePage from "pages/Solutions/AgriculturePage";
import HealthPage from "pages/Solutions/HealthPage";
import EducationPage from "pages/Solutions/EducationPage";
import EnergyPage from "pages/Solutions/EnergyPage";
import BankingPage from "pages/Solutions/BankingPage";
import WholesaleRetailPage from "pages/Solutions/WholesaleRetailPage";
import InsurancePage from "pages/Solutions/InsurancePage";
import AdvertisingPage from "pages/Solutions/AdvertisingPage";
import HospitalityPage from "pages/Solutions/HospitalityPage";
import ShareablePreview from "USSD/components/Mobile/ShareablePreview";
import SurveyList from "pages/Admin/SurveyList";
import AccountSettings from "pages/Customer/AccountSettings";
import Profile from "pages/Admin/Profile";
import AdminUsers from "pages/Admin/AdminUsers";
import ClientUsers from "pages/Admin/ClientUsers";
import PlansTable from "pages/PlansTable";
import Plans from "pages/Customer/Plans";
import PlansCheckout from "pages/Customer/PlansCheckout";
import PaymentVerification from "pages/Customer/PaymentVerification";
import EmailCreditTopUp from "pages/Customer/EmailCreditTopUp";
import SmsCreditTopUp from "pages/Customer/SmsCreditTopUp";
import VoiceCreditTopUp from "pages/Customer/VoiceCreditTopUp";
import Payments from "pages/Admin/Payments";
import UserPayments from "pages/Customer/UserPayments";

export default function App() {
  const user = useSelector((state) => state.UserReducer.user);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [planModal, setPlanModal] = useState(false);

  const isSessionExpired = () => {
    if (user) {
      const expireAt = user?.expireAt;
      const currentTime = moment().valueOf();
      const isExpired = moment(currentTime).isAfter(expireAt);
      if (isExpired) {
        window.location.href = "/";
        dispatch(Remove_User());
      }
    }
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle: () => isSessionExpired(),
    timeout: 1000 * 60 * Config.idleTime,
  });

  useEffect(() => isSessionExpired(), []);

  if (!user && !CheckPreviewRoute()) {
    return (
      <>
        <TitleManager />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />

        <Routes>
          {/* <Route path="/preview/:encoded_id" element={<ShareablePreview />} /> */}
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/sms-campaign" element={<SMSCampaigns />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/sales-contact" element={<SalesContacts />} />
          <Route path="/pricing-table" element={<PricingTable />} />
          <Route path="/detail-pages" element={<DetailPage />} />
          <Route path="/automation-pages" element={<AutomationPage />} />
          <Route path="/lead-generation" element={<LeadGenerationPage />} />
          <Route path="/campaign-pages" element={<CampaignPage />} />
          <Route path="/loyalty-campaign" element={<LoyaltyPage />} />
          <Route path="/meeting-page" element={<MeetingPage />} />
          <Route path="/resources-page" element={<ResourcesPage />} />
          <Route path="/content-generator" element={<NewContentGenerator />} />

          {/* FEATURES */}
          <Route
            path="/multi-channel-marketing"
            element={<MultiChannelMarketing />}
          />
          <Route path="/loyalty-management" element={<LoyaltyManagement />} />
          <Route
            path="/device-management"
            element={<DeviceCampaignManagement />}
          />
          <Route
            path="/social-media-marketing"
            element={<SocialMediaMarketing />}
          />
          <Route
            path="/report-and-analytics"
            element={<ReportAndAnalytics />}
          />
          <Route path="/sales-and-marketing" element={<SalesMarketing />} />
          <Route path="/geo-location" element={<GEOLocationPage />} />
          <Route path="/meeting-and-appointment" element={<MeetingPage />} />
          <Route path="/polling-and-surveys" element={<PollingPage />} />
          {/* END OF FEATURES */}

          {/* SOLUTIONS */}
          <Route path="/religious-institutions" element={<ReligionPage />} />
          <Route path="/food-and-agriculture" element={<AgriculturePage />} />
          <Route path="/health-industry" element={<HealthPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/oil-and-gas" element={<EnergyPage />} />
          <Route path="/banking-and-finance" element={<BankingPage />} />
          <Route
            path="/wholesale-and-retail"
            element={<WholesaleRetailPage />}
          />
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/advertising" element={<AdvertisingPage />} />
          <Route
            path="/hospitality-and-tourism"
            element={<HospitalityPage />}
          />
          {/* END OF SOLUTIONS */}

          <Route path="*" index element={<MainPage />} />
        </Routes>
      </>
    );
  } else if (user && !CheckPreviewRoute()) {
    const PR = user?.permissions?.split(",") || [];
    return (
      <>
        <div className="flow-root">
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
          />
          {/* <Sidebar /> */}
          {/* {location.pathname !== "/messaging-price" && <Sidebar />} */}
          {location.pathname !== "/form" &&
            location.pathname !== "/messaging-price" &&
            location.pathname !== "/email-price" && <Sidebar PR={PR} />}
          <div className="overflow-y-auto flex-1 ml-56">
            <Routes>
              {user?.type == Config.UserType.ClientUser && (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/form" element={<FormPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/demo" element={<DemoPage />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/cms/contact/:id" element={<ContactList />} />
                  <Route path="/plans-table" element={<PlansTable />} />
                  <Route path="/plans" element={<Plans />} />
                  <Route path="/plan-checkout" element={<PlansCheckout/> } />
                  <Route path="/payment/verification" element={<PaymentVerification />} />
                  <Route path="/transactions" element={<UserPayments />} />
                  <Route
                    path="/account-settings"
                    element={<AccountSettings />}
                  />
                  <Route path="/email/top-up" element={<EmailCreditTopUp/> } />
                  <Route path="/sms/top-up" element={<SmsCreditTopUp/> } />
                  <Route path="/voice/top-up" element={<VoiceCreditTopUp/> } />

                  <Route
                    path="/cms/sender-id-management"
                    element={<SenderIdManagement />}
                  />
                  <Route
                    path="/import-contact/:id"
                    element={<ImportContactCard />}
                  />
                  <Route
                    path="/upload/:id"
                    element={<ImportContactUploadPage />}
                  />
                  <Route
                    path="/copy-paste/:id"
                    element={<ImportContactPastePage />}
                  />
                  <Route path="/contact-list/:id" element={<ContactList />} />
                  <Route path="/sender-id" element={<SenderId />} />
                  <Route path="/sender-id/email" element={<EmailSenderId />} />
                  <Route path="/whatsapp-template" element={<Messaging />} />
                  <Route
                    path="/whatsapp-template-setup"
                    element={<TemplateForm />}
                  />
                  <Route
                    path="/whatsapp-view-template/:id"
                    element={<ViewTemplate />}
                  />
                  <Route
                    path="/telegram-template"
                    element={<TelegramTemplate />}
                  />
                  <Route
                    path="/telegram-template-setup"
                    element={<TelegramTemplateForm />}
                  />
                  <Route
                    path="/Telegram-view-template/:id"
                    element={<TelegramViewTemplate />}
                  />
                  <Route path="/sms-template" element={<SMSTemplate />} />

                  {/* EMAIL TEMPLATE CREATION ROUTES */}
                  <Route path="/email-template" element={<EmailTemplate />} />
                  <Route
                    path="/email-template/create"
                    element={<EmailTemplateForm />}
                  />
                  <Route path="/build/email-template" element={<Builder />} />
                  <Route
                    path="/samples/email-template/:templateId?"
                    element={<EmailTemplateSamples />}
                  />

                  <Route
                    path="/email-template/edit/:templateId"
                    element={<EditTemplateName />}
                  />
                  <Route
                    path="/edit/email-template/build/:templateId"
                    element={<EditBuilder />}
                  />
                  {/* END OF EMAIL TEMPLATE CREATION ROUTES */}

                  {/* USSD CAMPAIGN ROUTES */}
                  <Route path="/ussd-survey" element={<UssdSurvey />} />
                  <Route
                    path="/ussd-survey-setup"
                    element={<UssdSurveyCreation />}
                  />
                  <Route
                    path="/ussd-survey-responses/:ussdId"
                    element={<UssdSurveyResponses />}
                  />
                  {/* <Route path="/ussd-survey-preview" element={<ShareablePreview />} /> */}
                  {/* <Route exact path="/ussd-survey-builder" element={<USSDBuilder/>} /> */}
                  {/* USSD CAMPAIGN ROUTES */}

                  <Route
                    path="/sms-template-setup"
                    element={<SMSTemplateForm />}
                  />
                  <Route
                    path="/sms-template-edit/:id"
                    element={<EditSMSTemplateForm />}
                  />
                  <Route
                    path="/sms-view-template/:id"
                    element={<SMSViewTemplate />}
                  />

                  <Route
                    path="/campaign/create/sms"
                    element={<MessagingCampign />}
                  />
                  <Route path="/campaign/sms" element={<SMSCampaign />} />
                  <Route
                    path="/campaign/sms/edit/:id"
                    element={<EditSMSCamaign />}
                  />
                  <Route
                    path="/campaign/sms/report/:id"
                    element={<SMSCampaignReport />}
                  />

                  <Route path="/email-campaign" element={<EmailCampaign />} />
                  <Route
                    path="/email/campaign/create"
                    element={<EmailCampaignCreation />}
                  />
                  <Route
                    path="/email/campaign/edit/:id"
                    element={<EditCampaign />}
                  />
                  <Route
                    path="/campaign/email/report/:id"
                    element={<EmailCampaignReport />}
                  />

                  <Route
                    path="/campaign/create/voice"
                    element={<CampaignVoiceCreation />}
                  />
                  <Route path="/campaign/voice" element={<VoiceCampaign />} />
                  <Route
                    path="/campaign/voice/edit/:id"
                    element={<EditVoiceCamaign />}
                  />
                  <Route
                    path="/campaign/voice/report/:id"
                    element={<VoiceCampaignReport />}
                  />
                  <Route
                    path="/campaign/whatsapp"
                    element={<WhatsappCampaign />}
                  />
                  <Route
                    path="/campaign/create/whatsapp"
                    element={<CampaignWhatsappCreation />}
                  />
                  <Route
                    path="/campaign/whatsapp/edit/:id"
                    element={<EditWhatsappCamaign />}
                  />
                  <Route
                    path="/campaign/whatsapp/report/:id"
                    element={<WhatsappCampaignReport />}
                  />
                  <Route
                    path="/campaign/telegram"
                    element={<TelegramCampaign />}
                  />
                  <Route
                    path="/campaign/create/telegram"
                    element={<CampaignTelegramCreation />}
                  />
                  <Route
                    path="/campaign/telegram/edit/:id"
                    element={<EditTelegramCamaign />}
                  />
                  <Route
                    path="/campaign/telegram/report/:id"
                    element={<TelegramCampaignReport />}
                  />
                  <Route path="/fb/post" element={<FbPost />} />
                  <Route path="/instagram/post" element={<InstaPost />} />
                  <Route path="/calender/post" element={<CalenderFbPost />} />
                  <Route
                    path="/calendar/instapost"
                    element={<CalendarInstaPost />}
                  />

                  <Route path="*" element={<NotFoundModel />} />
                </>
              )}
              {(user?.type === Config.UserType.SuperAdminUser ||
                user?.type === Config.UserType.FinanceAdminUser ||
                user?.type === Config.UserType.CommercialAdminUser) && (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/sender-id" element={<AdminSenderId />} />

                  <Route path="/survey-list" element={<SurveyList />} />

                  <Route path='/admin-profile' element={<Profile />} />

                  <Route path="/admin-users" element={<AdminUsers />} />
                  
                  <Route path="/client-users" element = {<ClientUsers/>} />

                  <Route path="/admin-payments" element={<Payments />} />

                  {/* CREATING EMAIL TEMPLATE SAMPLES */}
                  <Route
                    path="/email/template/samples"
                    element={<AdminEmailTemplateSamples />}
                  />
                  <Route
                    path="/email/sample/create/:templateId?"
                    element={<TemplateSamplesForm />}
                  />
                  <Route
                    path="email/sample/build/:templateId?"
                    element={<AdminBuilder />}
                  />

                  <Route path="/messaging-template" element={<Messaging />} />
                  <Route path="/view-template/:id" element={<ViewTemplate />} />
                  <Route
                    path="/telegram-template"
                    element={<TelegramTemplate />}
                  />
                  <Route
                    path="/telegram-template-setup"
                    element={<TelegramTemplateForm />}
                  />
                  <Route
                    path="/Telegram-view-template/:id"
                    element={<TelegramViewTemplate />}
                  />
                  <Route path="/whatsapp-template" element={<Messaging />} />
                  <Route
                    path="/whatsapp-template-setup"
                    element={<TemplateForm />}
                  />
                  <Route
                    path="/whatsapp-view-template/:id"
                    element={<ViewTemplate />}
                  />

                  <Route path="/sms-template" element={<SMSTemplate />} />
                  <Route
                    path="/sms-template-setup"
                    element={<SMSTemplateForm />}
                  />
                  <Route
                    path="/sms-view-template/:id"
                    element={<SMSViewTemplate />}
                  />
                  <Route path="/campaign/sms" element={<SMSCampaign />} />
                  <Route
                    path="/campaign/sms/report/:id"
                    element={<SMSCampaignReport />}
                  />
                  <Route path="/add/connection" element={<AddConnection />} />
                  <Route path="/campaign/voice" element={<VoiceCampaign />} />
                  <Route
                    path="/campaign/voice/report/:id"
                    element={<VoiceCampaignReport />}
                  />
                  <Route
                    path="/campaign/whatsapp"
                    element={<WhatsappCampaign />}
                  />
                  <Route
                    path="/campaign/whatsapp/report/:id"
                    element={<WhatsappCampaignReport />}
                  />
                  <Route path="/plan/list" element={<Plan />} />
                  <Route path="/plan/features" element={<PlanFeature />} />
                  <Route
                    path="/blacklist/keywords"
                    element={<BlacklistKeyword />}
                  />
                  <Route
                    path="/campaign/telegram"
                    element={<TelegramCampaign />}
                  />

                  <Route
                    path="/campaign/telegram/report/:id"
                    element={<TelegramCampaignReport />}
                  />
                  <Route path="/fb/post" element={<FbPost />} />
                  <Route path="/instagram/post" element={<InstaPost />} />
                  <Route path="/calender/post" element={<CalenderFbPost />} />
                  <Route
                    path="/calendar/instapost"
                    element={<CalendarInstaPost />}
                  />
                  <Route path="*" element={<NotFoundModel />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </>
    );
  } else if (CheckPreviewRoute() && (!user || user)) {
    return (
      <Routes>
        <Route path="/preview/:encoded_id" element={<ShareablePreview />} />
      </Routes>
    );
  }
}

const CheckPreviewRoute = () => {
  const location = useLocation();

  console.log("location", location);
  const pathnameParts = location.pathname.split("/");
  const path = pathnameParts[1];
  const isPreview = false;
  if (path === "preview") {
    return true;
  }

  console.log("isPreview:", isPreview);

  return isPreview;
};
