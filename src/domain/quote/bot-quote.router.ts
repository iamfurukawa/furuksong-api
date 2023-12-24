import { Message } from "discord.js";

import { BotCommand } from "./bot-message.interface";

import QuoteController from "../../application/controllers/quote.controller";
import BotTextService from "./quote.service";

class BotTextRouter {

    route(message: Message): void {
        const botMessage = BotTextService.toBotMessageFrom(message)

        switch (botMessage.command) {
            case BotCommand.LIST: {
                QuoteController.index()
                    .then(answer => {
                        message.reply(answer);
                    });
                break;
            }
            case BotCommand.ADD: {
                QuoteController.create(botMessage.body)
                    .then(answer => {
                        message.reply(answer);
                    });
                break;
            }
            case BotCommand.QUOTE: {
                QuoteController.quote()
                    .then(answer => {
                        message.reply(answer);
                    });
                break;
            }
            case BotCommand.REMOVE: {
                QuoteController.delete(botMessage.body)
                    .then(answer => {
                        message.reply(answer);
                    });
                break;
            }
            default: {
                console.log("Unknown command");
                break;
            }
        }
    }
}

export default new BotTextRouter();
