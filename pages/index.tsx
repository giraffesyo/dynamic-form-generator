import { useCallback, useEffect, useState } from 'react'
import GeneratedForm from '../components/GeneratedForm'
import JSONReviver from '../lib/reviveJSON'
import cx from 'classnames'
import produce from 'immer'
import { IDecodedJSON } from '../typings'

const HardcodedJSONString = JSON.stringify({
  name: 'default name',
  size: 4,
  dateOfBirth: '11/20/1980',
  color: 'blue',
  male: true,
})

type FormType = Record<string, any>

const IndexPage = () => {
  const [forms, setForms] = useState<IDecodedJSON[]>([])
  const [formStates, setFormStates] = useState<IDecodedJSON[]>([])

  const [textareaValue, setTextareaValue] = useState(HardcodedJSONString)
  const [validJSON, setValidJSON] = useState<boolean>(false)
  const generateForm = useCallback(() => {
    // validate the json

    try {
      const parsed: FormType = JSON.parse(textareaValue, JSONReviver)
      setForms([...forms, parsed])
    } catch (e) {
      console.error(e)
    }
  }, [textareaValue, forms])

  const updateFormState = useCallback(
    (formIndex: number) => (newState: FormType) => {
      const nextState = produce(formStates, (draftState) => {
        draftState[formIndex] = newState
      })
      setFormStates(nextState)
    },
    [formStates]
  )

  useEffect(() => {
    try {
      JSON.parse(textareaValue, JSONReviver)
      setValidJSON(true)
    } catch {
      setValidJSON(false)
    }
  }, [textareaValue])

  const GeneratedForms = forms.map((decodedJson, index) => (
    <div key={`form-${index + 1}`} className='flex flex-row py-4 px-5 my-4'>
      <div className='w-2/3 mr-5 h-full'>
        <h2 className='text-lg font-medium'>Form {index + 1}</h2>
        <GeneratedForm
          updateState={updateFormState(index)}
          decodedJSON={decodedJson}
        ></GeneratedForm>
      </div>
      <div
        className={cx(formStates[index] ?? 'invisible', 'px-5 font-mono w-1/3')}
      >
        <h2 className='mb-4 text-lg font-medium'>Form {index + 1} Values</h2>
        <div className='bg-gray-200 p-2 min-w-full w-64'>
          {JSON.stringify(formStates[index])}
        </div>
      </div>
    </div>
  ))

  return (
    <div className='mx-auto container'>
      <h1 className='text-2xl'>Form generator</h1>
      <p>
        Use the following box to add some json, then click generate to generate
        a form.
      </p>
      <div className='flex flex-row flex-wrap'>
        <textarea
          className='w-full h-32 font-mono'
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.currentTarget.value)}
        ></textarea>
        <div className='ml-auto'>
          <span className={cx('text-red-500 mx-2', validJSON && 'invisible')}>
            Invalid JSON
          </span>
          <button
            onClick={generateForm}
            className={cx(
              'p-2 my-2 bg-gray-700 rounded-md text-white',
              !validJSON && 'opacity-50 cursor-not-allowed'
            )}
          >
            Generate Form
          </button>
        </div>
      </div>
      <div className='w-full flex flex-row flex-wrap'>{GeneratedForms}</div>
    </div>
  )
}

export default IndexPage
