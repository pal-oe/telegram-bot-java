/** @param {ctx} ctx */
function deleteBudget(ctx) {
    try {
      var id = parseInt(ctx.callbackQuery().data.split(" ")[1]);
  
      var messageID = ctx.callbackQuery().message.message_id
      console.log(messageID)
  
      //first we delete the message itself
      ctx.deleteMessage({
        chat_id: ctx.from().id,
        message_id: messageID
      })
  
      //Next we delete from database
      deleteBudgetById(id);
  
  
    } catch (err) {
      console.log(err)
    }
  }
  
  /** @param {ctx} ctx */
  function deleteListAndBack(ctx) {
    try {
      console.log("ulala")
  
      data = ctx.getTSessionValue("messagesToBeDeleted");
      console.log(data.length)
      console.log("data: ", data);
      if (data.length != 0) {
        console.log("data.length != 0")
        const res = ctx.deleteMessages({
          chat_id: ctx.from().id,
          message_ids: data
        })
      }
  
      renderHome(ctx);
    } catch (err) {
  
    }
  }