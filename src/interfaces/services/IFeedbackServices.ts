import { IFeedback } from "../../entities/Feedbacks.ts";

export interface IFeedbackServices{
    InsertFeedback(req: any, res:any): Promise<IFeedback>;
    getById(id:string):Promise<IFeedback | null | false>;
    getFeedbacksByPostId(id:string):Promise<IFeedback[] | null | false>;
    getFeedbacksWithFilterByPostId(id:string):Promise<IFeedback[] | null | false>;
}