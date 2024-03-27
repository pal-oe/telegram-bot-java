/** @param {ctx} ctx */
/** @param {ctx} ctx */
function confirmProduct(ctx) {
    const chat_id = "@memokeriyaa";
    const message = ctx.callbackQuery().message;
    const captionCbk = message.caption;
  
    const data = captionCbk.split('\n\n')[1].split("\n");
    const title = data[0].split(": ")[1];
    const price = data[1].split(": ")[1];
    const category = data[2].split(": ")[1];
    const design = data[3].split(": ")[1];
    const flavor = data[4].split(": ")[1];
    const occasion = data[5].split(": ")[1];
    const size = data[6].split(": ")[1];
    const photo = message.photo[2].file_id;
  
    var cake = {
      cakename: title,
      cakecategory: category,
      cakedesign: design,
      cakeflavor: flavor,
      cakeoccasion: occasion,
      cakesize: size,
      cakeprice: price,
      cakephoto: photo
    };
  
    cakeid = writeCakeToSpreadsheet(cake);
  
    const caption = `✅ <b>New product</b>\n\n` +
      `💡 <b>Title:</b> <code>${title}</code>\n` +
      `💰 <b>Price:</b> <code>${price}</code>\n` +
      `🎂 <b>Category:</b> <code>${category}</code>\n` +
      `🎨 <b>Design:</b> <code>${design}</code>\n` +
      `🍽️ <b>Flavor:</b> <code>${flavor}</code>\n` +
      `🎉 <b>Occasion:</b> <code>${occasion}</code>\n` +
      `📏 <b>Size:</b> <code>${size}</code>`;
  
    ctx.sendPhoto({
      photo,
      chat_id,
      caption,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "💫 Order", url: "https://t.me/CfigoBot?start=order"+cakeid }]
        ]
      }
    });
  
    const approved = `✅ <b>#APPROVED</b>\n\n` +
      `💡 <b>Title:</b> <code>${title}</code>\n` +
      `💰 <b>Price:</b> <code>${price}</code>\n` +
      `🎂 <b>Category:</b> <code>${category}</code>\n` +
      `🎨 <b>Design:</b> <code>${design}</code>\n` +
      `🍽️ <b>Flavor:</b> <code>${flavor}</code>\n` +
      `🎉 <b>Occasion:</b> <code>${occasion}</code>\n` +
      `📏 <b>Size:</b> <code>${size}</code>` +
      `\n\n✅✅✅✅✅<b>POSTED</b>✅✅✅✅✅✅`;
  
    ctx.editMessageCaption({
      chat_id: ctx.chat().id,
      caption: approved,
      message_id: message.message_id,
      parse_mode: "HTML"
    })
  }
  
  
  /** @param {ctx} ctx */
  function getProductName(ctx) {
    ctx.replyWithChatAction("typing")
    ctx.reply("please type product name?")
    ctx.setStage("name_admin")
  }
  
  
  /** @param {ctx} ctx */
  function processProductName(ctx) {
    ctx.replyWithChatAction("typing")
    const productName = ctx.message().text;
    ctx.setTSessionValue("product_name", productName)
  
    ctx.reply("Enter category of the cake (e.g., torta, cocktail, custom)")
    ctx.setStage("category")
  }
  
  
  /** @param {ctx} ctx */
  function processCategory(ctx) {
    ctx.replyWithChatAction("typing");
    const category = ctx.message().text;
    ctx.setTSessionValue("category", category);
    ctx.reply("Design of the cake (e.g., Barbie, guitar, football)");
    ctx.setStage("design");
  }
  
  /** @param {ctx} ctx */
  function processDesign(ctx) {
    ctx.replyWithChatAction("typing");
    const design = ctx.message().text;
    ctx.setTSessionValue("design", design);
    ctx.reply("Flavor of the cake (e.g., chocolate, vanilla, strawberry)");
    ctx.setStage("flavor");
  }
  
  /** @param {ctx} ctx */
  function processFlavor(ctx) {
    ctx.replyWithChatAction("typing");
    const flavor = ctx.message().text;
    ctx.setTSessionValue("flavor", flavor);
    ctx.reply("Occasion of the cake (e.g., birthday, wedding, anniversary)");
    ctx.setStage("occasion");
  }
  
  /** @param {ctx} ctx */
  function processOccasion(ctx) {
    ctx.replyWithChatAction("typing");
    const occasion = ctx.message().text;
    ctx.setTSessionValue("occasion", occasion);
    ctx.reply("Size of the cake (e.g., small, medium, large)");
    ctx.setStage("size");
  }
  
  /** @param {ctx} ctx */
  function processSize(ctx) {
    ctx.replyWithChatAction("typing");
    const size = ctx.message().text;
    ctx.setTSessionValue("size", size);
    ctx.reply("Enter the price of the cake");
    ctx.setStage("price_admin");
  }
  
  /** @param {ctx} ctx */
  function processPrice(ctx) {
    ctx.replyWithChatAction("typing")
    const price = ctx.message().text;
    ctx.setTSessionValue("price", price)
  
    ctx.reply("send pictures of the product?")
    ctx.setStage("pictures")
  }
  
  /** @param {ctx} ctx */
  /** @param {ctx} ctx */
  function processPictures(ctx) {
    ctx.replyWithChatAction("upload_photo");
    if (!ctx.message()) {
      return;
    }
  
    const picture = ctx.message().photo[2].file_id;
    ctx.reply("image is "+ picture);
    ctx.reply(typeof(picture))
  
    const data = ctx.getTSession().data;
    const productName = data.product_name;
    const price = data.price;
    const category = data.category;
    const design = data.design;
    const flavor = data.flavor;
    const occasion = data.occasion;
    const size = data.size;
  
    const caption = `✅ <b>New product</b>\n\n` +
      `💡 <b>Title:</b> <code>${productName}</code>\n` +
      `💰 <b>Price:</b> <code>${price}</code>\n` +
      `🎂 <b>Category:</b> <code>${category}</code>\n` +
      `🎨 <b>Design:</b> <code>${design}</code>\n` +
      `🍽️ <b>Flavor:</b> <code>${flavor}</code>\n` +
      `🎉 <b>Occasion:</b> <code>${occasion}</code>\n` +
      `📏 <b>Size:</b> <code>${size}</code>`;
  
    ctx.replyWithPhoto(picture, {
      caption,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "✅ Confirm", callback_data: "admin_confirm" },
            { text: "❌ Cancel", callback_data: "admin_cancel" }
          ]
        ]
      }
    });
  }