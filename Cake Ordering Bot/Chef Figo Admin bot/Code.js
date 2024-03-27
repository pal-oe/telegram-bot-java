function doPost(e) {
    /** @type telesun */
    const telesun = new Telesun.connectBot('931695854:AAEQWLPlmdKEgNYI5IMPytKIUThoFLNPAy8');
  
    telesun
      .temporaryMemory(CacheService)
      .start(startReg)
      .action("add_cake", addCake)
      //.action(/send/, sendMessageToUser)
      .action("admin_confirm", confirmProduct)
      .action("admin_cancel", cancelProduct)
      .stage("name_admin", processProductName)
      .stage("category", processCategory)
      .stage("design", processDesign)
      .stage("flavor", processFlavor)
      .stage("occasion", processOccasion)
      .stage("size", processSize)
      .stage("price_admin", processPrice)
      .stage("pictures", processPictures)
      .on("inline_query", viewCustomers)
      .handleWebhook(e)
      //.longPolling()
  
    // .connectToSpreadSheet("1XOBd_yAcQ8v-4QlqkO0KmAC4juQxTdXT8L-BpKOMgnQ")
    // .stage(["cakeName", "price", "photo"], processReg)
  }
  
  
  /** @param {ctx} ctx */
  function startReg(ctx) {
    try {
      ctx.clearStage()
      ctx.replyWithChatAction("typing");
      ctx.sendMessage({
        text: "Hello, Admin!", chat_id: ctx.from().id, reply_markup: {
          inline_keyboard: [
            [
              { text: "Add Cake", callback_data: "add_cake" }
            ],
            [{ text: "View Customers", switch_inline_query_current_chat: "customers" }]
          ]
        }
      })
    } catch (err) {
      ctx.reply(err.message);
    }
  }
  
  /** @param {ctx} ctx */
  function addCake(ctx) {
    try {
      // const inputText = ctx.message().text;
      // const regex = /^\/start order(\d+)$/;
      // const matches = inputText.match(regex);
  
      // if (matches) {
      //   const orderText = matches[0];
      //   const cakeID1 = matches[1];
  
      //   console.log(orderText); // Output: "/start order"
      //   console.log(cakeID1); // Output: cakeID
      //   if (ctx.message().text === orderText) {
      //     cakeObject = getCakeFromSpreadsheet(parseInt(cakeID1))
      //     ctx.reply("it is working")
      //     console.log(cakeObject);
      //   }
      // }
      if (String(ctx.from().id) === AdminChatId()) {
        return getProductName(ctx)
      }
      else {
        ctx.reply("You are not admin")
      }
    } catch (err) {
      ctx.reply(err.message);
    }
  }
  
  /** @param {ctx} ctx */
  function viewCustomers(ctx) {
    try {
      // Load customer data from the spreadsheet
      const customerData = getCustomerDataFromSpreadsheet();
  
      // Map customer data to Telesun inline query result format
      const results = customerData.map((customer) => ({
        type: "article",
        id: customer.chatID,
        title: `${customer.name} | Contact: ${customer.contact} | Total Purchase: ${customer.totalOrder}`,
        input_message_content: {
          message_text: `Id: ${customer.id}\nCustomer Name: ${customer.name}\nContact: ${customer.contact}\nAddress: ${customer.address}\nTotal Purchase: ${customer.totalOrder}`,
        },
        //reply_markup: { inline_keyboard: [[{ text: "Send Message", callback_data: `sendMessage_${customer.id}` }]] },
      }));
  
      // Respond to the inline query with the results
      ctx.answerInlineQuery({
        results: results,
        inline_query_id: ctx.update.inline_query.id,
      });
    } catch (err) {
      ctx.reply(err.message)
    }
  }
  
  // /** @param {ctx} ctx */
  // function sendMessageToUser(ctx) {
  //   try {
  //     console.log(ctx.callbackQuery().data);
  //     // const callbackData = ctx.callbackQuery().data;
  //     // const customerId = callbackData.split("_")[1];
  //     // const adminChatId = AdminChatId();
  //     // const adminId = ctx.from().id;
  
  //     // if (String(adminId) !== String(adminChatId)) {
  //     //   ctx.reply("You are not authorized to perform this action.");
  //     //   return;
  //     // }
  
  //     // ctx.sendMessage({
  //     //   text: "Please enter the message you want to send to the customer:",
  //     //   chat_id: adminChatId,
  //     // });
  
  //     // // Stage the conversation for message input
  //     // telesun.stage("messageInput", (ctx) => {
  //     //   const message = ctx.message().text;
  //     //   ctx.sendMessage({
  //     //     text: message,
  //     //     chat_id: customerId,
  //     //   });
  //     // });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }
  
  
  /** @param {ctx} ctx */
  function cancelProduct(ctx) {
    ctx.deleteMessage({
      message_id: ctx.callbackQuery().message.message_id,
      chat_id: ctx.chat().id
    })
  
    ctx.reply("the product is canceled\n\n to start again click /start")
  }
  