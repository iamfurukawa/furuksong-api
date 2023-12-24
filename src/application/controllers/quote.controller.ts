import BotTextService from "../../domain/quote/quote.service";
import Validator from "../../domain/validator";

class QuoteController {

    async index(): Promise<string> {
        return await BotTextService.retrieveAll();
    }

    async quote(): Promise<string> {
        return await BotTextService.quote();
    }

    async create(phrase: string): Promise<string> {
        if (Validator.isEmpty(phrase)) {
            return 'Uso correto: /add [frase]';
        }

        return await BotTextService.save(phrase);
    }

    async delete(uuid: string): Promise<string> {
        if (Validator.isEmpty(uuid)) {
            return 'Uso correto: /remove [indice do item]';
        }

        try {
            return await BotTextService.delete(uuid);
        } catch (e) {
            console.error(e);
            return `Indice informado é invalido: ${uuid}`;
        }
    }

}

export default new QuoteController();