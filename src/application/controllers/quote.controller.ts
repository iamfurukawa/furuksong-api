import BotTextService from "../../domain/quote/quote.service";
import Validator from "../../domain/validator";

class QuoteController {

    index(): string {
        return BotTextService.retrieveAll();
    }

    quote(): string {
        return BotTextService.quote();
    }

    create(phrase: string): string {
        if (Validator.isEmpty(phrase)) {
            return 'Uso correto: /add [frase]';
        }

        return BotTextService.save(phrase);
    }

    delete(index: string): string {
        if (Validator.isEmpty(index)) {
            return 'Uso correto: /remove [indice do item]';
        }

        try {
            return BotTextService.delete(parseInt(index));
        } catch (e) {
            console.error(e);
            return `Indice informado é invalido: ${index}`;
        }
    }

}

export default new QuoteController();