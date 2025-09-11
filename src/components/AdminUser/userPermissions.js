import Config from "../../Config";

const permissionsArr = [
  {
    type: Config.UserType.CommercialAdminUser,
    permissions: [
      {
        name: "User List",
        value: Config.Modules.UserList,
      },
      {
        name: "Client User List",
        value: Config.Modules.ClientUserList,
      },
      {
        name: "Template and Sender Id Requests & Management",
        value: Config.Modules.TemplateSenderId,
      },
      {
        name: "Bulk Messages Details",
        value: Config.Modules.AdminCampaign,
      },
      {
        name: "Plan",
        value: Config.Modules.Plans,
      },
      {
        name: "SMPP Connection",
        value: Config.Modules.SMPPConnection,
      },

      {
        name: "Email Id Requests & Management",
        value: Config.Modules.AdminEmailSenderId,
      },
      {
        name: "Payments",
        value: Config.Modules.Payments,
      },
      {
        name: "Manage Plan",
        value: Config.Modules.ManagePlan,
      },

      {
        name: "Newsletter",
        value: Config.Modules.NewsLetter,
      },
      {
        name: "Invoices Creation",
        value: Config.Modules.Invoices,
      },
      {
        name: "Reports",
        value: Config.Modules.AdminReports,
      },
    ],
  },

  {
    type: Config.UserType.FinanceAdminUser,
    permissions: [
      {
        name: "Payments",
        value: Config.Modules.Payments,
      },
      {
        name: "Client User List",
        value: Config.Modules.ClientUserList,
      },
      {
        name: "Manage Plan",
        value: Config.Modules.ManagePlan,
      },
      {
        name: "Invoices Creation",
        value: Config.Modules.Invoices,
      },
      {
        name: "Reports",
        value: Config.Modules.AdminReports,
      },
    ],
  },

  // {
  //   type: Config.UserType.OperationAdminUser,
  //   permissions: [
  //     {
  //       name: "User List & Creation",
  //       value: Config.Modules.UserList,
  //     },
  //     {
  //       name: "Sender Id Requests & Management",
  //       value: Config.Modules.AdminSenderId,
  //     },

  //     {
  //       name: "Bulk Messages Details",
  //       value: Config.Modules.AdminCampaign,
  //     },

  //     {
  //       name: "Reports",
  //       value: Config.Modules.AdminReports,
  //     },
  //   ],
  // },
];

export default permissionsArr;
