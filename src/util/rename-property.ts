export function renameProperty(obj: any, oldKey: string, newKey: string) {
  const value = obj[oldKey];

  delete obj[oldKey];
  obj[newKey] = value;

  return obj;
}