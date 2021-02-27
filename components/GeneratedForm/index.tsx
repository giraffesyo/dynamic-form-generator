import { DateTime } from 'luxon'
import FormField from '../FormField'
import getHexColorValue from '../../lib/getHexColorValue'

type TJSONValue =
  | string
  | number
  | boolean
  | null
  | IDecodedJSON
  | IDecodedJSON[]
  | (() => any)

interface IDecodedJSON {
  [key: string]: TJSONValue
}
// convert strings to dates ( used by JSON.parse() )
const JSONReviver = (key: string, value: TJSONValue) => {
  if (typeof value !== 'string') return value

  const ISODateTime = DateTime.fromISO(value)
  const SQLDateTime = DateTime.fromSQL(value)
  const AmericanDateTime = DateTime.fromFormat(value, 'MM/dd/yyyy')
  // Store false or the date time if its a valid date
  const validDateTime =
    (ISODateTime.isValid && ISODateTime) ||
    (SQLDateTime.isValid && SQLDateTime) ||
    (AmericanDateTime.isValid && AmericanDateTime)
  return validDateTime || value
}

interface IGeneratedFormProps {
  json: string
}

const GeneratedForm: React.FC<IGeneratedFormProps> = ({ json }) => {
  const decoded: IDecodedJSON = JSON.parse(json, JSONReviver)
  const FormElements = Object.entries(decoded).map(([key, value]) => {
    const reactKey = 'input_' + key
    if (typeof value === 'boolean') {
      return (
        <FormField key={reactKey} name={key}>
          <input type='checkbox' value={key} defaultChecked={value}></input>
        </FormField>
      )
    } else if (typeof value === 'number') {
      return (
        <FormField key={reactKey} name={key}>
          <input type='number' defaultValue={value} />
        </FormField>
      )
    } else if (typeof value === 'string') {
      if (value.length > 500) {
        return (
          <FormField key={reactKey} name={key}>
            <textarea defaultValue={value} />
          </FormField>
        )
      } else if (key.toLowerCase() === 'color') {
        let colorValue = getHexColorValue(value)
        return (
          <FormField key={reactKey} name={key}>
            <input type='color' defaultValue={colorValue || value}></input>
          </FormField>
        )
      } else {
        return (
          <FormField key={reactKey} name={key}>
            <input defaultValue={value} />
          </FormField>
        )
      }
    } else if (DateTime.isDateTime(value)) {
      console.log('hi')
      return (
        <FormField key={reactKey} name={key}>
          <input type='date' defaultValue={value.toISODate()} />
        </FormField>
      )
    } else {
      console.error(`key  ${key} was unhandled with value: ${value}`)
    }
  })
  return <form>{FormElements}</form>
}

export default GeneratedForm
