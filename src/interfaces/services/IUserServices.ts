import type { IUser } from "../../entities/User.ts";

export interface IUserServices{
    InsertUser(req: any): Promise<IUser>;
    getById(id:string):Promise<any>;
}