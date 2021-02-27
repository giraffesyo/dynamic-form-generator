import { DateTime } from 'luxon'
import getHexColorValue from '../../lib/getHexColorValue'
import type { IDecodedJSON } from '../../typings'
import FormField from '../FormField'
import Input from '../Input'
interface IGeneratedFormProps {
  decodedJSON: IDecodedJSON
}

const GeneratedForm: React.FC<IGeneratedFormProps> = ({ decodedJSON }) => {
  const FormElements = Object.entries(decodedJSON).map(([key, value]) => {
    const reactKey = 'input_' + key
    if (typeof value === 'boolean') {
      return (
        <FormField key={reactKey} name={key}>
          <Input type='checkbox' value={key} defaultChecked={value} />
        </FormField>
      )
    } else if (typeof value === 'number') {
      return (
        <FormField key={reactKey} name={key}>
          <Input type='number' defaultValue={value} />
        </FormField>
      )
    } else if (typeof value === 'string') {
      if (value.length > 500) {
        return (
          <FormField key={reactKey} name={key}>
            <Input type='textarea' defaultValue={value} />
          </FormField>
        )
      } else if (key.toLowerCase() === 'color') {
        let colorValue = getHexColorValue(value)
        return (
          <FormField key={reactKey} name={key}>
            <Input type='color' defaultValue={colorValue || value} />
          </FormField>
        )
      } else {
        return (
          <FormField key={reactKey} name={key}>
            <Input defaultValue={value} />
          </FormField>
        )
      }
    } else if (DateTime.isDateTime(value)) {
      return (
        <FormField key={reactKey} name={key}>
          <Input type='date' defaultValue={value.toISODate()} />
        </FormField>
      )
    } else {
      console.error(`key  ${key} was unhandled with value: ${value}`)
    }
  })
  return (
    <form className='flex flex-row flex-wrap justify-between py-4 px-5 my-4 bg-gray-200'>
      {FormElements}
      <div>
        <button className='p-2 mx-2 bg-gray-700 rounded-md text-white'>
          Save
        </button>
        <button
          type='reset'
          className='p-2 mx-2 bg-gray-700 rounded-md text-white'
        >
          Reset
        </button>
      </div>
    </form>
  )
}

export default GeneratedForm
