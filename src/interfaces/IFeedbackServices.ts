import type { IFeedbacks } from "../entities/Feedbacks.ts";

export interface IFeedbackServices{
    InsertFeedback(req: any, res:any): Promise<IFeedbacks>;
    getById(id:string):Promise<any>;
    getFeedbacksByPostId(id:string):Promise<IFeedbacks[] | undefined>;
}