
/** @param {ctx} ctx */
function viewBudgets(ctx) {
  try {
    adjustIds()
    ctx.replyWithChatAction("typing");
    let messagesToBeDeleted = []

    var messageID = ctx.callbackQuery().message.message_id
    //delete the current message and to send the list of budgets
    ctx.deleteMessage({
      chat_id: ctx.from().id,
      message_id: messageID
    })


    let data = getDataByChatId(ctx.from().id)
    console.log(data.length)
    if (data.length != 0) {
      console.log("true length")
      for (var i = 0; i < data.length; i++) {
        let res = ctx.sendMessage({
          text: `<b>Category: </b><code>${data[i][1]}</code>\n` +
            `<b>Total: </b><code>${data[i][3]}</code>\n` +
            `<b>Left: </b><code>${data[i][4]}</code>\n`,
          parse_mode: "HTML",
          chat_id: ctx.from().id,
          reply_markup: {
            inline_keyboard: [
              [{ text: "🪵 Log expense", callback_data: `editBudget ${data[i][0]}` }],
              [{ text: "❌ Delete", callback_data: `deleteBudget ${data[i][0]}` }]
            ],
          }
        })

        messagesToBeDeleted.push(res.result.message_id);

      }

      ctx.setTSessionValue("messagesToBeDeleted", messagesToBeDeleted);

      ctx.sendMessage({
        text: "<b>Main Menu</b>",
        parse_mode: "HTML",
        chat_id: ctx.from().id,
        reply_markup: {
          inline_keyboard: [
            [{ text: "🏠", callback_data: "deleteListAndBack" }]
          ]
        }
      })
    }
    else {
      ctx.sendMessage({
        text: "<code>No Data Added!</code>\n<b>Main Menu</b>",
        parse_mode: "HTML",
        chat_id: ctx.from().id,
        reply_markup: {
          inline_keyboard: [
            [{ text: "🏠", callback_data: "deleteListAndBack" }]
          ]
        }
      })
    }
    console.log(messagesToBeDeleted)
  } catch (err) {
    console.log(err)
  }
}
