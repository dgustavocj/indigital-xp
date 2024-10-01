import { ErrorException } from "../errors";

export function catchError() {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): any => {
      const originalMethod = descriptor.value;
      const originalMethodName = propertyKey;
      descriptor.value = async function (...args: any[]): Promise<any> {
        try {
            return await originalMethod.apply(this, args);
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorException(error.name, error.message, error.httpStatus);
        }
      }
      return descriptor;
    };
};