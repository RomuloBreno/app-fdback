import type { IFeedback} from "../entities/Feedbacks.ts";
import type {IFeedbackServices} from '../interfaces/services/IFeedbackServices.ts'
import type { ILoggerService } from '../interfaces/logger/ILoggerService.ts';
import FeedbackServices from '../services/FeedbacksService.ts';
import LoggerService from '../services/LoggerService.ts';
import Logger from '../entities/logger/Logger.ts';

let logger: ILoggerService = new LoggerService();
let service: IFeedbackServices = new FeedbackServices();

class FeedbackController{
    async handle(req:any, res:any){
      try {
        var result:IFeedback= await service.InsertFeedback(req, res);
        if(!result){
          return res.status(404).json({status:false, result:  'Comment not created'});
        }
        return res.status(201).json({status:true, result: result});
    
      } catch (error) {
        logger.Insert(Object.assign(new Logger(), {status: "Failed", statusCode: 404, content: error.message , method: "handle FeedbackController"}));
        return res.status(404).json({result: 'Invalid comment data'});
      }
    }

    public async getById(req:any, res:any, id:string){
      let feedbackById = await service.getById(id)//change to get in file service
      if(!feedbackById)
        return res.status(404).json({status:false, result:'Not find'});
      return res.status(200).json({status:true, result:feedbackById});
    }

    public async getFeedbacksByPostId(req:any, res:any, id:string){
      let feedbacksByPostId = await service.getFeedbacksByPostId(id)
      if(!feedbacksByPostId)
        return res.status(404).json({status:false, result:  'Not find Comments'});
      return res.status(200).json({status:true, result: feedbacksByPostId});
    }

}
export default FeedbackController