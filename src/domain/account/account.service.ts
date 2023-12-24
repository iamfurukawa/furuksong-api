import md5 from "md5";

import AccountRepository from "../../infrastructrure/database/account";
import { parseRole } from "../definitions/account.interface";

class AccountService {

    async register(email: string, password: string, username: string) {
        console.log(`class=AccountService m=register stage=init email=${email}`);
        try {
            await AccountRepository.save(email, password, username);
        } catch (error) {
            console.error(`class=AccountService m=register stage=error error=${error}`);
            throw new Error("Error on registrer user");
        }
        console.log(`class=AccountService m=register stage=end`);
    }

    async inactivateBy(uuid: string) {
        console.log(`class=AccountService m=inactivateBy stage=init uuid=${uuid}`);
        try {
            const account = await AccountRepository.findBy(uuid);
            if(!account) {
                console.error(`Account ${uuid} not found`);
                throw new Error("Account not found");
            }
            
            await AccountRepository.deleteBy(uuid);
        } catch (error) {
            console.error(`class=AccountService m=inactivateBy stage=error error=${error}`);
            throw new Error("Error on unregister user");
        }
        console.log(`class=AccountService m=inactivateBy stage=end`);
    }

    async resetPassword(email: string, oldPassword: string, newPassword: string) {
        console.log(`class=AccountService m=resetPassword stage=init email=${email}`);
        try {
            if (oldPassword === newPassword) throw Error('The new passord cannot be the same as the old one.');

            const account = await AccountRepository.findOneBy(email);

            if (!account) {
                console.log(`class=AccountService m=resetPassword stage=end email=${email} not found`);
                return;
            }

            if (md5(oldPassword) !== account.passwordHash)
                throw new Error('Invalid password');

            await AccountRepository.resetPassword(account.uuid, newPassword);
        } catch (error) {
            console.error(`class=AccountService m=resetPassword stage=error error=${error}`);
            throw new Error("Error on reset password");
        }
        console.log(`class=AccountService m=resetPassword stage=end`);
    }

    async updateUsername(uuid: string, username: string) {
        console.log(`class=AccountService m=updateUsername stage=init uuid=${uuid} username=${username}`);
        try {
            await AccountRepository.updateUsernameById(uuid, username);
        } catch (error) {
            console.log(`class=AccountService m=updateUsername stage=error error=${error}`);
            throw new Error("Error on update username");
        }
        console.log(`class=AccountService m=updateUsername stage=end`);
    }

    async updateRole(uuid: string, role: string) {
        console.log(`class=AccountService m=updateRole stage=init uuid=${uuid} role=${role}`);
        try {
            const account = await AccountRepository.findBy(uuid);
            if(!account) {
                console.error(`Account ${uuid} not found`);
                throw new Error("Account not found");
            }

            await AccountRepository.updateRole(uuid, parseRole(role));
        } catch (error) {
            console.error(`class=AccountService m=updateRole stage=error error=${error}`);
            throw new Error("Error on update role");
        }
        console.log(`class=AccountService m=updateRole stage=end`);
    }

}

export default new AccountService();