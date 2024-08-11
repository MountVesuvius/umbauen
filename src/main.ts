import 'reflect-metadata';
import { ClassTransformOptions, instanceToPlain } from 'class-transformer';

/** Simple getter to allow for cleaner symbol getting */
function getMetadataKey(): symbol {
  return Symbol.for('RemappedFieldKey');
}

/** 
 * Acts as a decorator to assign any number of new keys to a class transformer field.
 * @param newKeys any number of strings to be used as the new field keys
 */
export function RemappedFieldKeys(...newKeys: string[]) {
  return function (target: Object, propertyKey: string | symbol) {
    const metadataKey = getMetadataKey();
    Reflect.defineMetadata(metadataKey, newKeys, target, propertyKey);
  };
}

/** 
 * Used to create new plain object with the remapped keys from class.
 * @param obj takes any class object
 * @returns a new plain (literal) object
 */
export function instanceToRemappedPlain(obj: object, options?: ClassTransformOptions): any {
  const plainObject = instanceToPlain(obj, options);
  const transformedObject: any = {};
  const metadataKey = getMetadataKey();

  for (const key in plainObject) {
    if (plainObject.hasOwnProperty(key)) {
      const newKeys = Reflect.getMetadata(metadataKey, obj, key) as string[];
      if (newKeys && newKeys.length > 0) {
        newKeys.forEach(newKey => {
          transformedObject[newKey] = plainObject[key];
        });
      } else {
        transformedObject[key] = plainObject[key];
      }
    }
  }

  return transformedObject;
}
