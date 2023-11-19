export default class Util {

    public static isNull(obj: any): boolean {
        return null === obj;
    }

    public static isUndefined(obj: any) {
        return undefined === obj;
    }

    public static IsNullOrUndefined(obj: any): boolean {
        return this.isNull(obj) || this.isUndefined(obj);
    }
}