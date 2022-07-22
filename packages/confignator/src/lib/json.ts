// deno-lint-ignore-file camelcase

export type JSONPrimitive = string | number | boolean | null
export type JSONValue = JSONPrimitive | JSONObject | JSONArray
export type JSONObject = { [member: string]: JSONValue }
//deno-lint-ignore no-empty-interface
export interface JSONArray extends Array<JSONValue> {}

export function is_json_object(obj: JSONValue): obj is JSONObject {
  return typeof obj === 'object' && !Array.isArray(obj)
}

export function is_json_array(obj: JSONValue): obj is JSONArray {
  return typeof obj === 'object' && Array.isArray(obj)
}
