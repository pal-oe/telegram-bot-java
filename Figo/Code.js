function doPost(e) {
    /** @type telesun */
    const telesun = new Telesun.connectBot('6179436473:AAHrPLLZBSjks3kzs5rvEVcD52UaAellVzE');
  
    telesun
      .temporaryMemory(CacheService)
      .permanentMemory(PropertiesService)
      .contact(getContact)
      .connectToSpreadSheet("1XOBd_yAcQ8v-4QlqkO0KmAC4juQxTdXT8L-BpKOMgnQ")
      .start(start)
      .action("customer_confirm", confirmOrder)
      .action("customer_cancel", cancelOrder)
      .action("admin_declined", decline)
      .action("admin_accepted", accept)
      .stage("customerName", processCustomerName)
      .stage("customerAddress", processCustomerAddress)
      .stage("specialReq", processSpecialRequest)
      .stage("transaction", processTransaction)
      .stage("quantity", processQuantity)
      .stage("submit", submitOrder)
      .use((ctx) => ctx.reply("Go to the main channel to order please!\n\n 🦁 @memokeriyaa 🎂"))
      //.longPolling()
      .handleWebhook(e)
  }
  
  
  /** @param {ctx} ctx */
  function processCustomerName(ctx) {
    var name = ctx.message().text;
    ctx.clearStage()
    ctx.reply("please enter your location")
    ctx.setTSessionValue("customerName", name)
    ctx.setStage("customerAddress")
  }
  
  /** @param {ctx} ctx */
  function getContact(ctx) {
    ctx.clearStage();
    const contact = ctx.message().contact.phone_number;
    ctx.setTSessionValue("customerContact", contact)
    ctx.replyWithChatAction("typing")
    ctx.sendMessage({ text: "✅Contact saved and secured🔒", chat_id: ctx.message().chat.id, reply_markup: { remove_keyboard: true } })
    ctx.reply("📋🖋please enter your full name")
    ctx.setStage("customerName")
  }
  
  
  /**@param {ctx} ctx */
  function processCustomerAddress(ctx) {
    ctx.clearStage();
    ctx.reply("done, Go to the main channel @memokeriyaa to order!");
    var address = ctx.message().text;
    var customerData = {
      name: ctx.getTSessionValue("customerName"),
      username: "@" + ctx.from().username,
      address: address,
      id: ctx.from().id,
      contact: ctx.getTSessionValue("customerContact")
    };
    writeCustomerToSpreadsheet(customerData);
    customerData = {}
    ctx.clearStage()
  }
  
  