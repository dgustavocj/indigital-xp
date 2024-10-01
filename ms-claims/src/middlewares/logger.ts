import { Context, Next } from "koa";
import logger from "koa-logger";


export const transporterLogger = (str: any, args: any) => {
    console.log(str);
}

