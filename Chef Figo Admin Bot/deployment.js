/**
 * Sets up the webhook for the Telegram bot to communicate with this Apps Script project.
 * This function should be run manually after deploying the web app.
 * Ensure the 'doPost' function in your project correctly handles incoming webhook requests and includes parameter 'e'.
 * 
 */
function SettingWebHook() {
    const botToken = 'bot-token'; // Replace <your-bot-token> with your actual bot token
    const webhookUrl = 'webhook: url'; // Replace <your-web-app-url> with the URL of your deployed web app
  
    /** @type {Telesun} */
    const telesun = new Telesun.connectBot(botToken);
    telesun.setWebhook({ url: webhookUrl });
  }
  
  /**
   * Deletes the current webhook, effectively stopping the Telegram bot from sending updates to this Apps Script project.
   * This function is useful for transitioning from production to development mode, where you might prefer polling or manual testing.
   *
   */
  function deletewebHook() {
    const botToken = '931695854:AAEQWLPlmdKEgNYI5IMPytKIUThoFLNPAy8'; // Replace <your-bot-token> with your actual bot token
  
    /** @type {Telesun} */
    new Telesun.connectBot(botToken).deleteWebhook();
  }
  
