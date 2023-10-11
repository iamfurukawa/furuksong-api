import { Message } from "discord.js";
import getRandomPhrase from "../../shared/phrases";
import BotMessage, { BotCommand } from "./bot-message.interface";

class BotText {

    private phrases: Array<string> = [];

    toBotMessageFrom(message: Message): BotMessage {
        const args = message.content.split(' ');
        const command = args.shift() || BotCommand.UNKNOWN;
        const body = args.join(' ');

        return { command, body };
    }

    retrieveAll(): string {
        if (this.phrases.length === 0)
            return `Tem nenhuma frase não ${getRandomPhrase()}`;

        const formattedList: Array<string> = [];
        formattedList.push(`Ta na mão ${getRandomPhrase()}\n`);

        this.phrases.forEach((value, index) => {
            formattedList.push(`${index + 1} - ${value}\n`);
        });
        
        return formattedList.join('');
    }

    quote(): string {
        if (this.phrases.length === 0)
            return `Tem nenhuma frase não ${getRandomPhrase()}`;

        return `${this.phrases[Math.floor(Math.random() * this.phrases.length)]}`;
    }

    save(phrase: string): string {
        try {
            this.phrases.push(phrase);
            return `Anotado ${getRandomPhrase()}!`;
        } catch (e) {
            return `Não deu pra adicionar não ${getRandomPhrase()}!`;
        }
    }

    delete(index: number): string {
        try {
            this.phrases.splice(index - 1, 1);
            return `Removido ${getRandomPhrase()}!`;
        } catch (e) {
            return `Não deu pra remover não ${getRandomPhrase()}!`;
        }
    }

}

export default new BotText();