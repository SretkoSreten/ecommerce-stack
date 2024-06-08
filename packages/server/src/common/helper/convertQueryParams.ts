export function convertQueryParamsToObject(queryParams) {
  const convertedObject = {};

  for (const key in queryParams) {
    if (Object.hasOwnProperty.call(queryParams, key)) {
      const value = queryParams[key];
      try {
        convertedObject[key] = JSON.parse(value);
      } catch (error) {
        convertedObject[key] = value;
      }
    }
  }

  return convertedObject;
}
