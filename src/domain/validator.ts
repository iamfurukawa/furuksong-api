class Validator {
    isEmpty(str: string | null | undefined): boolean {
        return str === null || str === undefined || str.trim() === '';
    }
}

export default new Validator();