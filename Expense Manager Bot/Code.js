function doPost(e) {
    /** @type telesun */
    const telesun = new Telesun.connectBot(PropertiesService.getScriptProperties().getProperty("bot-token"));
  
    telesun
      .temporaryMemory(CacheService)
      .start(handleStart)
      .action("budgetsMenu", sendBudgetsMenu)
      .action("backToHome", renderHome)
      .action("viewBudget", viewBudgets)
      .action("weeklyReport", weeklyReport)
      .action("monthlyReport", monthlyReport)
      .action("addBudget", addBudget)
      .action("deleteListAndBack", deleteListAndBack)
      .action(/deleteBudget/, deleteBudget)
      .action(/category/, processMoney)
      .stage("toHome", renderHome)
      .stage("processAmount", processAmount)
      .stage("processMoney", processMoney)
      .use(welcomeDeveloper)
      .longPolling()
      //.handleWebhook(e)
  }
  
  /** @param {ctx} ctx */
  function handleStart(ctx) {
    try {
      console.log(ctx.message().message_id,)
      ctx.clearStage()
      ctx.setMessageReaction({
        chat_id: ctx.from().id,
        message_id: ctx.message().message_id,
        reaction: [{type:"emoji", emoji:"❤"}]
      })
      ctx.reply("You started the bot \n\n/start\n/menu")
    }
    catch (err) {
      console.log(err)
    }
  }
  
  /** @param {ctx} ctx */
  function renderHome(ctx) {
    try {
      ctx.clearStage()
      ctx.replyWithChatAction("typing");
      const res = ctx.editMessageText(
        {
          text: "<b>----------------------------------------------\n\n" +
            "\t Budget Manager \n\n" +
            "----------------------------------------------</b>" +
            "\n<code>Automate your daily income \nand expense tracking</code>",
          parse_mode: "HTML",
          message_id: ctx.callbackQuery().message.message_id,
          chat_id: ctx.from().id,
          reply_markup: {
            inline_keyboard: [
              [{ text: `💸 Budgets`, callback_data: "budgetsMenu" }],
              [{ text: `📈 Weekly Report`, callback_data: "weeklyReport" }],
              [{ text: "📊 Monthly Report", callback_data: "monthlyReport" }]
            ],
            remove_keyboard: true,
          }
  
        }
      )
    } catch (err) {
  
    }
  }
  
  /** @param {ctx} ctx */
  function welcomeDeveloper(ctx) {
    try {
      ctx.replyWithChatAction("typing");
      if (ctx.message().text == "/menu") {
        const res = ctx.sendMessage(
          {
            text: "<b>----------------------------------------------\n\n" +
              "\t Budget Manager \n\n" +
              "----------------------------------------------</b>" +
              "\n<code>Automate your daily income \nand expense tracking</code>",
            parse_mode: "HTML",
            chat_id: ctx.from().id,
            reply_markup: {
              inline_keyboard: [
                [{ text: `💸 Budgets`, callback_data: "budgetsMenu" }],
                [{ text: `📈 Weekly Report`, callback_data: "weeklyReport" }],
                [{ text: "📊 Monthly Report", callback_data: "monthlyReport" }]
              ],
              remove_keyboard: true,
            }
  
          }
        )
        // console.log(res)
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  /** @param {ctx} ctx */
  function sendBudgetsMenu(ctx) {
    try {
      ctx.replyWithChatAction("typing");
      ctx.editMessageText({
        chat_id: ctx.from().id,
        message_id: ctx.callbackQuery().message.message_id,
        text: "<b>----------------------------------------------\n\n" +
          "\t 📋 Budget Menu \n\n" +
          "----------------------------------------------</b>" +
          "\n<code>Automate your daily income \nand expense tracking</code>",
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: `📁 View Current Budgets`, callback_data: "viewBudget" }],
            [{ text: `🔖 Add new Budget plan`, callback_data: "addBudget" }],
            [{ text: "🔙", callback_data: "backToHome" }]
          ]
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  /** @param {ctx} ctx */
  function weeklyReport(ctx) {
    try {
      ctx.replyWithChatAction("typing");
      ctx.reply("weekly report")
    } catch (err) {
      console.log(err)
    }
  }
  
  /** @param {ctx} ctx */
  function monthlyReport(ctx) {
    try {
      ctx.replyWithChatAction("typing");
      ctx.reply("Monthly report report")
    } catch (err) {
      console.log(err)
    }
  }