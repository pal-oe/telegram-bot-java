/** @param {ctx} ctx */
function addBudget(ctx) {
    try {
      ctx.replyWithChatAction("typing");
      data = getCategories();
  
      ctx.editMessageText({
        text: `Select catagory Name`,
        reply_markup: {
          inline_keyboard: [
            [{ text: `🍔 ${data[1][1]}`, callback_data: `category ${data[1][1]}` }],//food
            [{ text: `🛒 ${data[2][1]}`, callback_data: `category ${data[2][1]}` }],//shopping
            [{ text: `🗑 ${data[3][1]}`, callback_data: `category ${data[3][1]}` }],//Utilities
            [{ text: `📑 ${data[4][1]}`, callback_data: `category ${data[4][1]}` }],//Other
            [{ text: "🔙", callback_data: "backToHome" }]
          ]
        },
        message_id: ctx.callbackQuery().message.message_id,
        chat_id: ctx.from().id
      })
    } catch (err) {
      console.log(err)
    }
  }
  
  /** @param {ctx} ctx */
  function processMoney(ctx) {
    try {
      ctx.replyWithChatAction("typing");
      ctx.clearStage()
      const res = ctx.editMessageText({
        text: `<code>${ctx.callbackQuery().data.split(" ")[1]}</code>\n\n` +
          `<b>💵 Please Enter amount:</b>`+
          `<i>\nnumbers only</i>`,
        chat_id: ctx.from().id,
        parse_mode: "HTML",
        message_id: ctx.callbackQuery().message.message_id,
        reply_markup: {
          inline_keyboard: [
            [{ text: "🔙", callback_data: "backToHome" }]
          ]
        }
      })
      ctx.setTSessionValue("message_id", res.result.message_id)
      ctx.setTSessionValue("category", ctx.callbackQuery().data.split(" ")[1]);
      ctx.setStage("processAmount");
  
    } catch (err) {
      console.log(err)
    }
  }
  
  /** @param {ctx} ctx */
  function processAmount(ctx) {
    try {
      ctx.replyWithChatAction("typing");
      if (isNaN(ctx.message().text)){
        ctx.setStage("ProcessMoney")
      }
      ctx.clearStage()
      var messageID = ctx.getTSessionValue("message_id");
      let userMessageID = ctx.message().message_id;
      let data = {
        category: ctx.getTSessionValue("category"),
        totalAmount: ctx.message().text,
        chat_id: ctx.from().id,
      }
  
      writeBudgetToTable(data)
  
      ctx.deleteMessage({
        message_id:userMessageID,
        chat_id: ctx.from().id,
        })
      
      ctx.editMessageText({
        message_id: messageID,
        chat_id: ctx.from().id,
        text:`<b>✅ Budget Added return to Home</b>`,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{text: "🏠", callback_data: "backToHome"}]
          ]
        }
        })
      
  
      ctx.setStage("toHome")
  
    } catch (err) {
      console.log(err)
    }
  }