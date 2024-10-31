import type { IFeedback } from "../entities/Feedbacks.ts";

export interface IFeedbackServices{
    InsertFeedback(req: any, res:any): Promise<IFeedback>;
    getById(id:string):Promise<any>;
    getFeedbacksByPostId(id:string):Promise<IFeedback[] | undefined>;
}