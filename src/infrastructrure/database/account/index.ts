import {
    setDoc,
    doc,
    where,
    query,
    collection,
    getDocs,
    getDoc
} from "firebase/firestore";

import { v4 as uuid } from 'uuid';
import md5 from "md5";

import FirebaseConfig from "../../configurations/firebase.config";

import AccountRepositoryBase, { Account, Role } from "../../../domain/definitions/account.interface";

class AccountRepository implements AccountRepositoryBase {
    
    private TABLE_NAME = "accounts";

    async save(email: string, password: string, username: string): Promise<string> {
        let id = uuid();

        const accountFilter = query(collection(FirebaseConfig.Database(), this.TABLE_NAME),
            where("email", "==", email));

        const accounts = await getDocs(accountFilter);

        if (accounts.docs.length) {
            const accountData = accounts.docs[0].data();

            if (accountData.active)
                throw new Error("You cannot create an account with this email");

            id = accounts.docs[0].id;
        }

        await setDoc(doc(FirebaseConfig.Database(), this.TABLE_NAME, id), {
            username,
            email,
            password: md5(password),
            active: true,
            role: Role.USER
        }, { merge: true });

        return id;
    }

    async deleteBy(id: string): Promise<void> {
        await setDoc(doc(FirebaseConfig.Database(), this.TABLE_NAME, id),
            { active: false },
            { merge: true });
    }

    async findBy(id: string): Promise<Account | null> {
        const account = await getDoc(doc(FirebaseConfig.Database(), this.TABLE_NAME, id));

        if (account.exists()) {
            const accountData = account.data();
            return {
                uuid: account.id,
                active: accountData.active,
                username: accountData.username,
                email: accountData.email,
                passwordHash: accountData.password,
                role: accountData.role
            } satisfies Account;
        }

        return null;
    }

    async findOneBy(email: string): Promise<Account | null> {
        const accountFilter = query(collection(FirebaseConfig.Database(), this.TABLE_NAME),
            where("email", "==", email));

        const account = await getDocs(accountFilter);

        if (account.docs.length) {
            const accountData = account.docs[0].data();

            return {
                uuid: account.docs[0].id,
                active: accountData.active,
                username: accountData.username,
                email: accountData.email,
                passwordHash: accountData.password,
                role: accountData.role
            } satisfies Account;
        }

        return null;
    }

    async resetPassword(id: string, newPassword: string): Promise<void> {   
        await setDoc(doc(FirebaseConfig.Database(), this.TABLE_NAME, id), {
            password: md5(newPassword)
        }, { merge: true });
    }

    async updateUsernameById(id: string, username: string): Promise<void> {
        await setDoc(doc(FirebaseConfig.Database(), this.TABLE_NAME, id), {
            username
        }, { merge: true });
    }

    async updateRole(id: string, role: string): Promise<void> {
        await setDoc(doc(FirebaseConfig.Database(), this.TABLE_NAME, id), {
            role
        }, { merge: true });
    }

    async updateFavoriteSound(id: string, role: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default new AccountRepository();