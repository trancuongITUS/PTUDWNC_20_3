import TClassDao from "~/dao/TClassDao";
import { TClass } from "~/models/TClass";

export default class ClassService {

    public static async getAllUsers(page_size: number, page_index: number): Promise<any> {
        const LIMIT = page_size;
        const OFFSET = (page_index - 1) * page_size;

        return await TClassDao.findAllWithPaging(LIMIT, OFFSET);
    }
}