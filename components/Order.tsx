import { Dispatch } from 'react'
import JsonText from './JsonText'

type Props<T> = {
  state: [T, Dispatch<T>]
}

const Order = ({ state }: Props<any>) => {
  return (
    <div className='vstack border'>
      User order:
      <JsonText state={state} />
    </div>
  )
}

export default Order