import express, { Request, Response, NextFunction } from 'express';
import { Message } from 'discord.js';
import cors from 'cors';
import "dotenv/config";

import DiscordClient from './discord/client';

import routes from './routes';
import BotTextRouter from './services/bot-text/bot-text.router';

import { CREATE_MESSAGE, READY } from './shared/constants';

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(routes);
app.use(
    (error: Error, _: Request, response: Response, __: NextFunction) => {
        console.error(error);
        response.status(500).json({ error: error.message });
    }
);

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
