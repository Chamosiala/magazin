import { Request, Response } from "express";
import { Redis } from "ioredis";

export type MyContext = {
  req: Request & { session: any & { userId?: number } };
  redis: Redis;
  res: Response;
};
