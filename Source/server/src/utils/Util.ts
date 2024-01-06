export default class Util {

    public static isNull(obj: any): boolean {
        return null === obj;
    }

    public static isUndefined(obj: any) {
        return undefined === obj;
    }

    public static isNullOrUndefined(obj: any): boolean {
        return this.isNull(obj) || this.isUndefined(obj);
    }

    public static generateRandomString(length: number): string {
        const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
            result += CHARACTERS.charAt(randomIndex);
        }
        return result;
    }
}