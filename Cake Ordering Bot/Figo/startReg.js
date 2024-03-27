/** @param {ctx} ctx */
function start(ctx) {
    try{
    // console.log("update: ", ctx.update)
    ctx.clearStage();
    // ctx.reply("at start")
  
    ctx.replyWithChatAction("typing")
    const inputText = ctx.message().text;
    const regex = /^\/start order(\d+)$/;
    const matches = inputText.match(regex);
    var orderText;
    if (matches) {
      orderText = matches[0];
      cakeID1 = parseInt(matches[1]);
  
      //ctx.reply(orderText); // Output: "/start order"
      //ctx.reply(cakeID1); // Output: cakeID
    }
  
  
    // customer handle from bot
    if (inputText === "/start") {
      ctx.replyWithChatAction("typing");
      if (!isRegistered(ctx.message().chat.id)) {
        var keyboard = {
          keyboard: [
            [{ text: '🔒Tap here to Share Phone Number', request_contact: true }],
          ],
          resize_keyboard: true
        };
        var message = {
          chat_id: ctx.from().id,
          text: '📋🖋Please share your phone number to register.',
          reply_markup: keyboard
        };
  
        ctx.sendMessage(message);
  
      }
      else if (isRegistered(ctx.message().chat.id)) {
        data = getCustomerByID(ctx.message().chat.id)
        ctx.reply("hello, 🦁" + data.name + "\n\n Go to 🦁 @memokeriyaa to start order🎂");
      }
    }//for start order
  
    //order came from channel
    else if (ctx.message().text === orderText) {
      //ctx.reply("order from channel")
      if (!isRegistered(ctx.message().chat.id)) {
        var keyboard = {
          keyboard: [
            [{ text: '🔒Tap here to Share Phone Number', request_contact: true }],
          ],
          resize_keyboard: true
        };
        var message = {
          chat_id: ctx.from().id,
          text: '📋🖋Please share your phone number.',
          reply_markup: keyboard
        };
  
        ctx.sendMessage(message);
  
      }
      else if (isRegistered(ctx.message().chat.id)) {
        //ctx.reply("registered userd founc")
        const cakeObject = getCakeFromSpreadsheet(parseInt(cakeID1));
        ctx.setTSessionValue('cake', cakeObject)
        //ctx.reply(cakeObject);
        const caption = `✅ <b>New product</b>\n\n` +
          `💡 <b>Title:</b> <code>${cakeObject.cakename}</code>\n` +
          `💰 <b>Price:</b> <code>${cakeObject.cakeprice}</code>\n` +
          `🎂 <b>Category:</b> <code>${cakeObject.cakecategory}</code>\n` +
          `🎨 <b>Design:</b> <code>${cakeObject.cakedesign}</code>\n` +
          `🍽️ <b>Flavor:</b> <code>${cakeObject.cakeflavor}</code>\n` +
          `🎉 <b>Occasion:</b> <code>${cakeObject.cakeoccasion}</code>\n` +
          `📏 <b>Size:</b> <code>${cakeObject.cakesize}</code>`;
        var picture = cakeObject.cakephoto;
  
        ctx.replyWithPhoto(picture, {
          caption,
          parse_mode: "HTML",
        });
        ctx.sendMessage({ text: "🧑🏾‍🦱 Enter quantity: (E.g 3): ", chat_id: ctx.message().chat.id })
        ctx.setStage("quantity");
      }
  
    }
    else {
      ctx.reply("🧑🏾‍🦱 Go to the main channel to order please!\n\n 🧑🏾‍🦱 @memokeriyaa 🎂")
    }
    }catch(err){
      ctx.reply(err.message)
    }
  }
  
  
  /** @param {ctx} ctx */
  function processQuantity(ctx) {
    //ctx.reply("processing product quantity");
    ctx.reply("👨🏼‍🍳 what is your special request? \n🍰(E.g, color: red, taste: Caramel, size: 6Kg, design: custom, Guitar):");
    // Check if the input is a number
    const input = ctx.message().text;
    if (!Number.isNaN(Number(input))) {
      const quantity = parseInt(input);
      ctx.setTSessionValue("quantity", quantity);
      //ctx.reply(quantity);
      ctx.setStage("specialReq");
      //processSpecialRequest(ctx);
    } else {
      ctx.reply("🧑🏾‍🦱🚫 Invalid input. Please enter a number for the quantity.");
      ctx.setStage("quantity");
    }
  }
  
  
  /** @param {ctx} ctx */
  function processSpecialRequest(ctx) {
    try {
      ctx.clearStage();
      //ctx.reply("processing Special request");
      // ctx.reply("press any key to continue")
      const data = ctx.getTSession().data;
  
      var quantity = data.quantity;
      quantity = parseInt(quantity);
  
      const cakeObject = data.cake;
      var price = cakeObject.cakeprice;
      price = parseInt(price);
  
      var totalPrice = price * quantity;
      ctx.setTSessionValue("total", totalPrice);
  
      ctx.replyWithHtml( `<b>💵 The total price is:  <code>${totalPrice}Birr</code> </b>`) 
      ctx.reply("\nplease pay by 🏦 CBE or 💵 telebirr.\n\nAfter you paid please enter the transaction number from the confirmation 📩SMS in 3⏱ minutes or less,\n\n💿 Guide how to:-  @memokeriyaa<")
  
      ctx.setTSessionValue("specialReq", ctx.message().text)
      //ctx.reply(ctx.message().text)
  
      ctx.setStage("transaction")
    } catch (error) {
      ctx.reply(error.message)
    }
  }
  
  
  /** @param {ctx} ctx */
  function processTransaction(ctx) {
    try {
      ctx.clearStage();
  
      var transactionNumber = ctx.message().text;
  
      ctx.setTSessionValue("id", ctx.message().chat.id)
      ctx.setTSessionValue("transaction", transactionNumber);
  
  
  
      var transactionNumber = ctx.message().text;
      const data = ctx.getTSession().data;
      var quantity = data.quantity;
      var totalPrice = data.total;
      var specialRequest = data.specialReq;
      const cakeObject = data.cake;
      picture = cakeObject.cakephoto;
  
      const caption = `🔰 <b>Ordering the cake with:</b>\n\n` +
        `🧁 <b>Quantity:</b> <code>${quantity}</code>\n` +
        `💰 <b>Total Price:</b> <code>${totalPrice}</code>\n` +
        `🎂 <b>Special Request:</b> <code>${specialRequest}</code>\n` +
        `✉️ <b>Transaction Number:</b> <code>${transactionNumber}</code>\n`;
  
  
  
      ctx.replyWithPhoto(picture, {
        caption,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              { text: "✅ Submit Order", callback_data: "customer_confirm" },
              { text: "❌ Cancel and Back to Channel", callback_data: "customer_cancel" }
            ]
          ]
        }
      });
      // ctx.setStage("submit");
    } catch (err) {
      ctx.reply(err.message);
    }
  }
  //--------------------------------------------------------
  
  /** @param {ctx} ctx */
  function confirmOrder(ctx) {
    try {
      //ctx.reply("confirm Order try");
      const data = ctx.getTSession().data;
      var quantity = data.quantity;
      var totalPrice = data.total;
      var specialRequest = data.specialReq;
      const cakeObject = data.cake;
      var transactionNumber = ctx.getTSessionValue("transaction");
  
  
      var id = ctx.from().id;
      ctx.setPSessionValue("notificationId", id)
  
      picture = cakeObject.cakephoto;
      //ctx.reply(typeof (picture))
      const caption = `✅ <b>New Order</b>\n\n` +
        `💡 <b>Title:</b> <code>${cakeObject.cakename}</code>\n` +
        `💰 <b>Price:</b> <code>${cakeObject.cakeprice}</code>\n` +
        `🎂 <b>Category:</b> <code>${cakeObject.cakecategory}</code>\n` +
        `🎨 <b>Design:</b> <code>${cakeObject.cakedesign}</code>\n` +
        `🍽️ <b>Flavor:</b> <code>${cakeObject.cakeflavor}</code>\n` +
        `🎉 <b>Occasion:</b> <code>${cakeObject.cakeoccasion}</code>\n` +
        `📏 <b>Size:</b> <code>${cakeObject.cakesize}</code>` +
        `🧁 <b>Quantity:</b> <code>${quantity}</code>\n` +
        `💰 <b>Total Price:</b> <code>${totalPrice}</code>\n` +
        `🎂 <b>Special Request:</b> <code>${specialRequest}</code>\n` +
        `✉️ <b>Transaction Number:</b> <code>${transactionNumber}</code>\n\n`;
  
      ctx.sendPhoto({
        photo: picture,
        chat_id: -4196206085,
        caption,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "✅ Accept", callback_data: "admin_accepted" }],
            [{ text: "❌ Decline", callback_data: "admin_declined" }]
          ]
        }
      });
  
      // const approved = `✅ <b>Your Ordered Has been Accepted</b>\n\n` +
      // `💡 <b>Title:</b> <code>${cakeObject.cakename}</code>\n` +
      // `💰 <b>Price:</b> <code>${cakeObject.cakeprice}</code>\n` +
      // `🎂 <b>Category:</b> <code>${cakeObject.cakecategory}</code>\n` +
      // `🎨 <b>Design:</b> <code>${cakeObject.cakedesign}</code>\n` +
      // `🍽️ <b>Flavor:</b> <code>${cakeObject.cakeflavor}</code>\n` +
      // `🎉 <b>Occasion:</b> <code>${cakeObject.cakeoccasion}</code>\n` +
      // `📏 <b>Size:</b> <code>${cakeObject.cakesize}</code>`+
      // `🧁 <b>Quantity:</b> <code>${quantity}</code>\n` +
      // `💰 <b>Total Price:</b> <code>${totalPrice}</code>\n` +
      // `🎂 <b>Special Request:</b> <code>${specialRequest}</code>\n` +
      // `✉️ <b>Transaction Number:</b> <code>${transactionNumber}</code>\n\n`;
      // ctx.editMessageCaption({
      //   chat_id: ctx.chat().id,
      //   caption: approved,
      //   message_id: message.message_id,
      //   parse_mode: "HTML"
      // })
      var id = ctx.getTSessionValue("id");
      updateTotalOrder(id);
  
      submitOrder(ctx)
      
    } catch (error) {
      ctx.reply("confirm Order catch");
      ctx.reply(error.message)
    }
  }
  
  //--------------------------------------------------------
  function submitOrder(ctx) {
    try {
      ctx.reply("🧑🏾‍🦱🎂✅ Order submitted, \n\n🧑🏾‍🦱please wait for confirmation message!");
      var ordercakeid = ctx.getTSession().data.cake.cakeId;
      var orderquantity = ctx.getTSessionValue("quantity");
      var orderspecialrequest = ctx.getTSessionValue("specialReq");
      var orderPrice = ctx.getTSessionValue("total");
      var ordertransaction = ctx.getTSessionValue("transaction");
  
  
  
      var order = {
        cakeId: ordercakeid,
        quantity: orderquantity,
        special_requests: orderspecialrequest,
        price: orderPrice,
        transaction: ordertransaction
      };
  
      writeOrderToSpreadsheet(order);
  
  
      // Check if the stage is still "transaction" after the timeout
      if (ctx.getStage() === "submit") {
        ctx.reply("❎❕Oops, timeout. Please order again.");
      }
      ctx.clearStage()
    } catch (error) {
      ctx.reply(error.message);
    }
  }
  
  
  /** @param {ctx} ctx */
  function cancelOrder(ctx) {
    ctx.reply("order canceled before submission!\n\nplease visit our channel @memokeriyaa");
  }
  
  /** @param {ctx} ctx */
  function accept(ctx) {
    try {
      var id = ctx.getPSessionValue("notificationId");
      console.log(id);
      ctx.sendMessage({
        text: "💯🔆 Your order has been accepted. \n\n♨️ Your cake you will be ready in 2 days",
        chat_id: id,
      })
  
      ctx.removePSessionValue("notificationId");
      ctx.reply("\n\n🎂✅ Accepted, please start baking the cake")
  
  
    } catch (error) {
      ctx.reply(error.message)
    }
  }
  
  /** @param {ctx} ctx */
  function decline(ctx) {
    ctx.sendMessage({
      text: "Your order has been canceled, PLease try again later",
      chat_id: ctx.callbackQuery().from.id,
    })
  }