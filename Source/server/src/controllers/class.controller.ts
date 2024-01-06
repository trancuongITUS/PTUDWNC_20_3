import { Request, Response } from "express";
import ClassService from "~/services/class.service";
import Util from "~/utils/Util";

export default class ClassController {

    async getAllClass(req: Request, res: Response) {
        try {
            const PAGE_SIZE = req.body.page_size;
            const PAGE_INDEX = req.body.page_index;
    
            let resultSet = await ClassService.getAllUsers(PAGE_SIZE, PAGE_INDEX);
            let responseBody: any = {};
            if (Util.isNullOrUndefined(resultSet)
                || 0 === resultSet.count
                || 0 === resultSet.rows.length) {
                responseBody = {
                    message: "Request OK",
                    hasData: false,
                    resultList: [],
                    totalRecords: 0,
                }
            } else {
                responseBody = {
                    message: "Request OK",
                    hasData: true,
                    resultList: resultSet.rows,
                    totalRecords: resultSet.count,
                }
            }

            return res.status(200).json(responseBody);
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }
}