import cx from 'classnames'
import styles from './formfield.module.css'
interface IFormField {
  name: string
  classNames?: string
}

const SplitCamelCase = (str: string) => str.replace(/([a-z](?=[A-Z]))/g, '$1 ')

const FormField: React.FC<IFormField> = ({ name, children, classNames }) => {
  return (
    <div className={cx(classNames, styles.wrapper)}>
      <label className={styles.label}>{SplitCamelCase(name)}</label>
      {children}
    </div>
  )
}

export default FormField
