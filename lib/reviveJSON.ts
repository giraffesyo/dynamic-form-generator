import { DateTime } from 'luxon'
import type { TJSONValue } from '../typings'

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

export default JSONReviver
