import { useCallback, useEffect, useState } from 'react'
import GeneratedForm from '../components/GeneratedForm'
import JSONReviver from '../lib/reviveJSON'
import cx from 'classnames'

const HardcodedJSONString = JSON.stringify({
  name: 'default name',
  size: 4,
  dateOfBirth: '11/20/1980',
  color: 'blue',
  male: true,
})

type FormType = Record<string, any>

// const DetermineInputType = (key: string, value: TJ)

const IndexPage = () => {
  const [forms, setForms] = useState<FormType[]>([])

  const [textareaValue, setTextareaValue] = useState(HardcodedJSONString)
  const [validJSON, setValidJSON] = useState<boolean>(false)
  const generateForm = useCallback(() => {
    // validate the json

    try {
      const parsed: FormType = JSON.parse(textareaValue, JSONReviver)
      console.log(parsed)
      setForms([...forms, parsed])
    } catch (e) {
      // TODO: log the json isnt valid
      console.error(e)
    }
  }, [textareaValue, forms])

  useEffect(() => {
    try {
      JSON.parse(textareaValue, JSONReviver)
      setValidJSON(true)
    } catch {
      setValidJSON(false)
    }
  }, [textareaValue])

  const GeneratedForms = forms.map((decodedJson, index) => (
    <div key={`form-${index + 1}`} className='my-2'>
      <h2 className='text-lg font-medium'>Form {index + 1}</h2>
      <GeneratedForm decodedJSON={decodedJson}></GeneratedForm>
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
          className='w-full h-32'
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
      {GeneratedForms}
    </div>
  )
}

export default IndexPage
