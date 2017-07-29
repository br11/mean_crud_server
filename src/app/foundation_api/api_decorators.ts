export module api {

  export function Path(path: string, modelName?: string) {
    return (target: Object) => {
      if (!modelName) {
        RoutesRegister.register(path, path, path);
      } else {
        RoutesRegister.register(modelName, modelName, path);
      }
    }
  }
}

export class RoutesRegister {
  public static registry: Array<{ className: string, modelName: string, path?: string }> = new Array<{ className: string, modelName: string, path?: string }>();

  public static register(className: string, modelName: string, path?: string): void {
    RoutesRegister.registry.push({ className, modelName, path });
  }

  public static getPath(modelName): Object {
    let schemaDef: Object = null;

    RoutesRegister.registry.forEach(element => {
      if (element.modelName == modelName) {
        schemaDef = element.path;
      }
    });

    return schemaDef;
  }

}