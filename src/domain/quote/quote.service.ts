import { Message } from "discord.js";
import QuoteRepository from "../../infrastructrure/database/quote";
import getRandomPhrase from "./phrases";
import BotMessage, { BotCommand } from "./bot-message.interface";
import { Quote } from "../definitions/quote.interface";

class BotText {

    toBotMessageFrom(message: Message): BotMessage {
        const args = message.content.split(' ');
        const command = args.shift() || BotCommand.UNKNOWN;
        const body = args.join(' ');

        return { command, body };
    }

    async retrieveAll(): Promise<string> {
        const quotes = await QuoteRepository.retrieveAll();

        if (quotes.length === 0)
            return `Tem nenhuma frase não ${getRandomPhrase()}`;

        const formattedList: Array<string> = [];
        formattedList.push(`Ta na mão ${getRandomPhrase()}\n`);

        quotes.forEach(quote => {
            formattedList.push(`${quote.uuid} - ${quote.quote}\n`);
        });

        return formattedList.join('');
    }

    async quote(): Promise<string> {
        const quotes = await QuoteRepository.retrieveAll();
        if (quotes.length === 0)
            return `Tem nenhuma frase não ${getRandomPhrase()}`;

        return `${quotes[Math.floor(Math.random() * quotes.length)]}`;
    }

    async save(phrase: string): Promise<string> {
        try {
            await QuoteRepository.save({ quote: phrase } as Quote);
            return `Anotado ${getRandomPhrase()}!`;
        } catch (e) {
            return `Não deu pra adicionar não ${getRandomPhrase()}!`;
        }
    }

    async delete(uuid: string): Promise<string> {
        try {
            await QuoteRepository.deleteBy(uuid);
            return `Removido ${getRandomPhrase()}!`;
        } catch (e) {
            return `Não deu pra remover não ${getRandomPhrase()}!`;
        }
    }

}

export default new BotText();