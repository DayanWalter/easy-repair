export const orders = [
  {
    order_id: 1,
    order_customer_id: 2,
    // Auftragsnummer
    order_verified: false,
    // Status
    order_state: "Technik",
    order_again: true,
    order_old_order_id: "4564",
    // Communication
    order_communication: [
      {
        id: "5kma53ae",
        message: "Ware kann abgeholt werden",
        who: "Wir",
        date: "2024-01-15",
      },
      {
        id: "bhqecj4p",
        message: "Holt heute ab",
        who: "Kunde",
        date: "2024-02-18",
      },
      {
        id: "bhqecjp",
        message: "Holt später ab",
        who: "Kunde",
        date: "2024-02-20",
      },
    ],
    order_account_access: "",
    order_account_access_more: "",
    order_article_device: "",
    order_article_manufaturer: "",
    order_article_accessory: "",
    order_date_start: undefined,
    order_date_done: undefined,
    order_date_taken: undefined,
    order_error_description: "",
    order_diagnose: "",
    order_offer: "",
    order_repair: "",
  },
];
