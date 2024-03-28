<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original-wordmark.svg" title="Git" **alt="Git" width="40" height="40"/>
</div>

## Telegram Cake Ordering Bot

Welcome to the Telegram Cake Ordering Bot repository! This repository contains the source code for a Telegram bot developed using AppScript and the Telesun library. The bot allows users to order cakes and provides an admin interface for managing orders.

## Bot Description

The Telegram Cake Ordering Bot consists of two separate bots: one for users and one for the admin.

### User Bot(Figo)

The user bot provides the following features:

- View available cake options from the main channel
- Place an order by selecting the desired cake and providing delivery details
- Receive order confirmation and updates
- Contact customer support for assistance

### Admin Bot

The admin bot provides the following features:

- View and manage incoming cake orders
- Mark orders as processed or delivered
- Send notifications to users regarding their orders
- Handle customer support requests

## Getting Started

To set up and run the Telegram Cake Ordering Bot, follow these steps:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/your-username/telegram-cake-ordering-bot.git
   ```

2. Set up your AppScript projects:

   - Create two new projects in Google AppScript, one for the user bot and one for the admin bot.
   - Import the code from the `Figo` and `Admin Figo bot` folders into their respective AppScript projects.
   - Enable the necessary services, such as the "Google Sheets API," for both projects.
   - Configure the appropriate permissions and access tokens for the bots.

3. Configure bot settings:

   - In the `Figo` project, update the token, and group id.
   - In the `Admin Figo bot` project, update the admin token and channel id.

4. Deploy the bots:

   - Deploy the user bot by publishing the `Figo` project as a web app.
   - Deploy the admin bot by publishing the `Admin Figo bot` project as a web app.

5. Set up the database:

   - Create a Google Sheets spreadsheet to store the cake orders data.
   - Set the permissions of the spreadsheet to allow read and write access for both bots.

6. Connect the bots to Telegram:

   - In the Telegram app, create two bots using the BotFather and obtain their respective API tokens.
   - Configure the webhooks for both bots to the appropriate deployment URLs.

7. Start using the bots:
   - Start the user bot by sending a message to the user bot's username on Telegram.
   - Start the admin bot by sending a message to the admin bot's username on Telegram.

## Contributing

If you'd like to contribute to this repository by adding new features, fixing bugs, or improving the code, feel free to fork the repository and submit a pull request. Your contributions are highly appreciated!

Please ensure that your contributions follow the existing code style and include appropriate documentation.

## License

This repository is licensed under the [MIT License](LICENSE). You're free to use, modify, and distribute the code in this repository for personal or commercial purposes.

## Contact

If you have any questions, suggestions, or just want to say hi, feel free to reach out to me:

- Email: fenanyosef@gmail.com
- Twitter: https://www.linkedin.com/in/fenan-yosef-89259428a/

```

```
