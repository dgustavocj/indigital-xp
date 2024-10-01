export const getEndpoints = (stack: any): any => {
    const paths = stack.map((i: any) => { 
        return {
            name: i.name,
            methods: i.methods,
            path: i.path
        };
    }).reduce(
        (result:any, currentValue:any) => { 
          (result[currentValue['name']] = result[currentValue['name']] || []).push(currentValue);
          return result;
    }, {});

    let endpoints: any = {};
    Object.entries(paths).forEach(([kPath, vPath]) => {
        if (kPath != 'null') {
            const ePath: any = vPath ;
            let methods: any = {};
            Object.entries(ePath).forEach(([kChild, vChild]) => {
                const eChild: any = vChild;
                methods[eChild.path] = (!methods.hasOwnProperty(eChild.path) ? 'methods: ' + eChild.methods.join(' | ') :
                    methods[eChild.path].concat(' | ', eChild.methods.join(' | ')));
            })
            endpoints[kPath] = methods;
        }
    });

    return endpoints;
};