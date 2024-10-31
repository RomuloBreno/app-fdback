import { ILogger } from "../../entities/logger/Logger";

export interface ILoggerService{
    Insert(logger: ILogger): Promise<void>;
    getById(id:string):Promise<any>;
}