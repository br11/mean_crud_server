import { Database } from '..';



export module tpa {

  export function Schema(modelName: string, def: Object, db?: string) {
    return (target: Object) => {
      SchemaDefRegister.register(modelName, modelName, def);
    }
  }

}

export class SchemaDefRegister {
  public static registry: Array<{ className: string, modelName: string, def: Object, db?: string }> = new Array<{ className: string, modelName: string, def: Object, db?: string }>();

  public static register(className: string, modelName: string, def: Object, db?: string): void {
    SchemaDefRegister.registry.push({ className, modelName, def, db });
  }

  public static getDef(modelName): Object {
    let schemaDef: Object = null;

    SchemaDefRegister.registry.forEach(element => {
      if (element.modelName == modelName) {
        schemaDef = element.def;
      }
    });

    return schemaDef;
  }

}