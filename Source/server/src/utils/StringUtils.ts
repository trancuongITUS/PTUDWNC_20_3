export default class StringUtil {

    public static isNull(str: string): boolean {
        return null === str;
    }

    public static isUndefined(str: string) {
        return undefined === str;
    }

    public static isNullOrUndefined(str: string): boolean {
        return this.isNull(str) || this.isUndefined(str);
    }

    public static isEmpty(str: string): boolean {
        return this.isNullOrUndefined(str) || '' === str;
    }
}