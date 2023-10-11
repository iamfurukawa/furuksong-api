import { Message } from "discord.js";

import { BotCommand } from "./bot-message.interface";

import QuoteController from "../../controllers/quote.controller";
import BotTextService from "./bot-text.service";

class BotTextRouter {

    route(message: Message): void {
        const botMessage = BotTextService.toBotMessageFrom(message)

        switch (botMessage.command) {
            case BotCommand.LIST: {
                const answer = QuoteController.index();
                message.reply(answer);
                break;
            }
            case BotCommand.ADD: {
                const answer = QuoteController.create(botMessage.body);
                message.reply(answer);
                break;
            }
            case BotCommand.QUOTE: {
                const answer = QuoteController.quote();
                message.reply(answer!);
                break;
            }
            case BotCommand.REMOVE: {
                const answer = QuoteController.delete(botMessage.body);
                message.reply(answer);
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
