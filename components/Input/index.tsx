import {
  DetailedHTMLProps,
  DOMAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

type InputType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >

interface IInputComponentProps extends InputType {
  classNames?: string
  type?: string
}

const Input: React.FC<IInputComponentProps> = ({
  classNames,
  type,
  ...others
}) => {
  return type === 'textarea' ? (
    <textarea {...others} className={classNames}></textarea>
  ) : (
    <input type={type} {...others} className={classNames}></input>
  )
}

export default Input
