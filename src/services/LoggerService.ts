import type { ILoggerService } from "../interfaces/logger/ILoggerService.ts";
import Logger, { ILogger } from "../entities/logger/Logger.ts";
import LoggerRepository from "../repository/LoggerRepository.ts";
import mongoose from "mongoose";

let repository = LoggerRepository
class LoggerService implements ILoggerService {
  public async Insert(logger: ILogger): Promise<void>{
    await repository.create(logger);
  }
  public async getById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return false
    let result = await repository.getById(id)
    return result
  }
}

export default LoggerService;