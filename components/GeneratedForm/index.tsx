import { DateTime } from 'luxon'
import { FormEvent, useCallback } from 'react'
import getHexColorValue from '../../lib/getHexColorValue'
import type { IDecodedJSON } from '../../typings'
import FormField from '../FormField'
import Input from '../Input'
interface IGeneratedFormProps {
  decodedJSON: IDecodedJSON
  updateState: (newState: IDecodedJSON) => void
}

const GeneratedForm: React.FC<IGeneratedFormProps> = ({
  decodedJSON,
  updateState,
}) => {
  const save = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      let newState: IDecodedJSON = {}
      for (let i = 0; i < e.currentTarget.elements.length; i++) {
        const current = e.currentTarget.elements[i]
        const name = current.getAttribute('name')
        // ignore submit and reset buttons
        if (name) {
          if (current.hasOwnProperty('value')) {
            newState[name] = (current as any).value
          }
        }
      }

      updateState(newState)
    },
    [updateState]
  )

  const FormElements = Object.entries(decodedJSON).map(([key, value]) => {
    const reactKey = 'input_' + key
    if (typeof value === 'boolean') {
      return (
        <FormField key={reactKey} name={key}>
          <Input
            name={key}
            type='checkbox'
            value={key}
            defaultChecked={value}
          />
        </FormField>
      )
    } else if (typeof value === 'number') {
      return (
        <FormField key={reactKey} name={key}>
          <Input name={key} type='number' defaultValue={value} />
        </FormField>
      )
    } else if (typeof value === 'string') {
      if (value.length > 500) {
        return (
          <FormField key={reactKey} name={key}>
            <Input name={key} type='textarea' defaultValue={value} />
          </FormField>
        )
      } else if (key.toLowerCase() === 'color') {
        let colorValue = getHexColorValue(value)
        return (
          <FormField key={reactKey} name={key}>
            <Input name={key} type='color' defaultValue={colorValue || value} />
          </FormField>
        )
      } else {
        return (
          <FormField key={reactKey} name={key}>
            <Input name={key} defaultValue={value} />
          </FormField>
        )
      }
    } else if (DateTime.isDateTime(value)) {
      return (
        <FormField key={reactKey} name={key}>
          <Input name={key} type='date' defaultValue={value.toISODate()} />
        </FormField>
      )
    } else {
      console.error(`key  ${key} was unhandled with value: ${value}`)
    }
  })
  return (
    <form
      onSubmit={save}
      className='flex flex-row flex-wrap justify-between py-4 px-5 my-4 bg-gray-200'
    >
      {FormElements}
      <div>
        <button
          type='submit'
          className='p-2 mx-2 bg-gray-700 rounded-md text-white'
        >
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
