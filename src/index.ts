import express, { Request, Response, NextFunction } from 'express';
import { Message } from 'discord.js';
import cors from 'cors';
import "dotenv/config";

import { CREATE_MESSAGE, READY } from './domain/constants';

import DiscordClient from './infrastructrure/bot/discord/client';

import Token from './domain/authentication/token.interface';

import routes from './application/routes';
import BotTextRouter from './domain/quote/bot-quote.router';
import ErrorMiddleware from './application/middlewares/error.middleware';

declare global {
    namespace Express {
      interface Request {
        token?: Token;
      }
    }
  }
  

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(ErrorMiddleware);

DiscordClient.Client.once(READY, () => {
    console.log(`Bot logged as ${DiscordClient.Client.user?.tag}`);
});

DiscordClient.Client.on(CREATE_MESSAGE, (message: Message) => {
    if (message.author.bot) return;
    BotTextRouter.route(message);
});

app.listen(port, () => {
    console.log(`Furuksong API listening at port ${port}`);
});
