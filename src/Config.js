// const mainDomain = "http://62.129.139.148/campaign-manager/backend/public/index.php/";
// const mainDomain = "https://cms.panukaenterprise.com/backend/public/";
// const mainDomain = "https://campaign.txtghana.com/backend/";
const mainDomain = "https://adsevo.net/backend/";
const momoDomain = "https://api.sevotransact.com";
const GetAccessToken = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  // console.log(user.token);
  if (user) return user.token;

  return null;
};

const GetUserId = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  if (user) return user.userId;

  return null;
};

const Config = {
  AxiosConfig: {
    headers: {
      token: `${GetAccessToken()}`,
      id: GetUserId(),
    },
  },

  UserType: {
    SuperAdminUser: 1,
    CommercialAdminUser: 2,
    FinanceAdminUser: 3,
    ClientUser: 5,
  },

  CampaignStatus: {
    Pending: 1,
    Running: 2,
    Sent: 3,
    isSchedule: 1,
  },

  Permissions:{
    SMS:"SMS",
    VOICE:"VOICE",
    SOCIAL:"SOCIAL",
    USSD:"USSD",
    EMAIL:"EMAIL",
  },

  CampaignType: {
    Sms: 1,
    Voice: 3,
    Whatsapp: 2,
    Telegram: 5,
    Email: 4,
  },
  ReportType: {
    Campaign: 1,
    SocialMedia: 2,
  },
  SocialMediaType: {
    Facebook: 1,
    Instagram: 2,
  },
  Plans:{
    Free:1,
    Bronze:2,
    Silver:3,
    Gold:4
  },
  TemplateStatusText: {
    SMSActive: "SMS approved. This template can be used.",
    SMSInactive: "This template is inactive so it cant be used.",
    WhatsappPending:
      "Whatsapp user initiated is pending. Wait for the approval of this template to use it.",
    WhatsappActive: "WhatsApp approved. This template can be used.",
    WhatsappInactive: "This template is inactive so it cant be used.",
    WhatsappRejected:
      "Whatsapp user initiated is rejected. So this template cant be used.",
    TelegramPending:
      "Telegram user initiated is pending. Wait for the approval of this template to use it.",
    TelegramActive: "Telegram approved. This template can be used.",
    TelegramInactive: "This template is inactive so it cant be used.",
    TelegramRejected:
      "Telegram user initiated is rejected. So this template cant be used.",
  },

  Modules: {
    AdminDashboard: "ADDB",
    UserDashboard: "USDB",
    AdminSenderId: "ADSI",
    UserSenderId: "USSI",
    AdminCallerId: "ADCI",
    UserCallerId: "USCI",
    AdminEmailSenderId: "ADESI",
    UserEmailSenderId: "USESI",
    Payments: "PAY",
    ManagePlan: "MPL",
    AdminCampaign: "ADC",
    UserCampaign: "USC",
    Contacts: "CON",
    Invoices: "INV",
    AdminReports: "ADRP",
    UserReports: "USRP",
    Templates: "SMST",
    API: "APIK",
    NewsLetter: "NWLE",
    NewsLetterBulk: "NWLEB",

    SMPPConnection: "SMPP",
    Plans: "PLN",
    UserList: "USL",
    ClientUserList: "CUSL",
    TemplateSenderId: "TSI",
  },

  domain: mainDomain,
  apiUrl: mainDomain + "api",
  SenderIdLength: 11,
  sessionExpiredTime: 15, // in minutes
  idleTime: 15, // in mins
  // };

  Network: {
    MTN: 1,
    VODAFONE: 2,
    AT: 3,
  },
  MOMO: {
    collection: momoDomain + "/api/mtn/momo/collection",
    getstatus: momoDomain + "/api/mtn/momo/collection/status",
  },
  VODAFONE: {
    collection: momoDomain + "/api/vodafone/momo/payment/c2b",
    getstatus: momoDomain + "/api/vodafone/momo/payment",
  },

  AT: {
    collection: momoDomain + "/api/at/momo/payment/collection",
    getstatus: momoDomain + "/api/at/momo/payment/collection",
  },
  networkMtn: {
    mtn: true,
  },
  networkVodafone: {
    vodafone: true,
  },
  networkAt: {
    at: true,
  },
  paymentStatus: {
    pending: 1,
    success: 2,
    failed: 3,
  },
  mno: {
    MTN:1,
    TELECEL:2,
    AT:3
  },
  planDuration:{
    monthly:1,
    yearly:2
  },
  checkPaymentStatusLimit: 8,
  checkPaymentStatusTimeInterval: 6000,
  MTN_MOMO_Client_ID:
    "uK+rpJWUlJSYiomSgXyLvbGxz9TK1qTb2tzG08XFqrW5dKnCw7FkZQ==",
  MTN_MOMO_SECRET: "1Y2tvLWyuJusl4itgaeZ",
  API_DOCUMENTATION_LINK: "https://txtconnectapis.docs.apiary.io/#",

  VODA_CLIENT_ID: "6f549c63c2353d34dd7e3639c9951a6d4990d27f",
  VODA_CLIENT_SECRET: "ce861411c34d4a72314e11c2807558b8a0df1b9b",
};

export const PaginationLimit = 10;

export default Config;
