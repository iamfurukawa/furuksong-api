export default interface AccountRepositoryBase {
    save(email: string, password: string, userId: string): Promise<string>;
    deleteBy(uuid: string): Promise<void>;
    findBy(id: string): Promise<Account | null>;
    findOneBy(email: string): Promise<Account | null>;
    resetPassword(id: string, newPassword: string): Promise<void>;
    updateUsernameById(id: string, username: string): Promise<void>;
    updateRole(id: string, role: string): Promise<void>;
    updateFavoriteSound(id: string, role: string): Promise<void>;
}

export interface Account {
    uuid: string;
    username: string;
    email: string;
    passwordHash: string;
    active: boolean;
    role: Role;
}

export enum Role {
    ADMIN = "666",
    USER = "1"
}

const parseRole = (value: string): Role => {
    if (Object.keys(Role).includes(value as Role))
        return Role[value as keyof typeof Role];
    return Role.USER;
}

export { parseRole }