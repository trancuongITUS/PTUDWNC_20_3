import bcrypt from "bcrypt"

export default class AuthService {

    private static listUser: any[] = [];

    public static async isDuplicateUsername(username: string): Promise<boolean> {
        
        return false;
    }

    public static async isDuplicateEmail(username: string): Promise<boolean> {

        return false;
    }

    public static async register(username: string, password: string, email: string, fullname: string): Promise<boolean> {

        const PASSWORD_HASH = bcrypt.hashSync(password, 10);
        const NEW_USER = {
            username: username,
            pwdHash: PASSWORD_HASH,
            email: email,
            fullname: fullname,
        }

        this.listUser.push(NEW_USER);
        return true;
    }
}