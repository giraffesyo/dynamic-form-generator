export type TJSONValue =
  | string
  | number
  | boolean
  | null
  | IDecodedJSON
  | IDecodedJSON[]

export interface IDecodedJSON {
  [key: string]: TJSONValue
}
