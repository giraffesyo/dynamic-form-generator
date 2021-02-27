interface IFormField {
  name: string
}

const SplitCamelCase = (str: string) => str.replace(/([a-z](?=[A-Z]))/g, '$1 ')

const FormField: React.FC<IFormField> = ({ name, children }) => {
  return (
    <>
      <label className='capitalize'>{SplitCamelCase(name)}</label>
      {children}
    </>
  )
}

export default FormField
