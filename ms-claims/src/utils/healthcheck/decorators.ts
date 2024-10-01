
export function healthCheckerDecorator() {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): any => {
      const originalMethod = descriptor.value;
      const originalMethodName = propertyKey
      descriptor.value = async function (...args: any[]): Promise<any> {
        let healthy: boolean = false
        let errorMessage: string = ''
        try {
            healthy = await originalMethod.apply(this, args)
        } catch (error) {
            if (error instanceof Error) {
                errorMessage = error.message;
            } else {
                errorMessage = String(error);
            }
        }
        
        return { 
            name: originalMethodName,
            heathy: healthy,
            error: errorMessage
        };
      };
      return descriptor
    }
}
  