import jwt from "jsonwebtoken";
import md5 from "md5";

import AccountRepository from "../../infrastructrure/database/account";
import Token from "./token.interface";

class AuthenticationService {
    async authenticate(email: string, password: string) {
        console.log(`class=AuthenticationService m=authenticate stage=init email=${email}`);
        try {
            const account = await AccountRepository.findOneBy(email);

            if (!account) throw new Error("Account not found");

            if (!account.active) throw new Error("Account inactive");

            if (account.passwordHash !== md5(password)) throw new Error("Wrong password");

            const token = jwt.sign({
                uuid: account.uuid,
                username: account.username,
                email: account.email,
                role: account.role
            } satisfies Token, process.env.JWT_KEY || "secret");

            console.log(`class=AuthenticationService m=authenticate stage=end token=${token}`);
            return token;
        } catch (error) {
            console.log(`class=AuthenticationService m=authenticate stage=init error=${error}`);
            throw new Error("Error on authenticate");
        }
    }
}

export default new AuthenticationService();