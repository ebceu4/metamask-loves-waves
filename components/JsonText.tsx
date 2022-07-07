import { Dispatch, useEffect, useMemo, useState } from 'react'

type Props<T> = {
  state: [T, Dispatch<T>]
}

const tryStringify = (state: any) => {
  try {
    return JSON.stringify(state, undefined, 2)
  } catch (error) {
    return ''
  }
}

const validJson = (data: string) => {
  try {
    JSON.parse(data)
    return true
  } catch (error) {
    return false
  }
}

const JsonText = ({ state: [state, setState] }: Props<any>) => {


  const [text, setText] = useState(tryStringify(state))

  useEffect(() => {
    setText(tryStringify(state))
  }, [state])



  return (
    <div className='overlay-root'>
      <pre className='pre'>
        {state && tryStringify(state)}
      </pre>
      <textarea className={`overlay  ${!text || validJson(text) ? '' : 'error'}`} value={text} onChange={(e) => {
        try {
          const json = JSON.parse(e.target.value)
          setState(json)
          setText(e.target.value)
        } catch (error) {
          setText(e.target.value)
        }
      }} />
    </div>
  )
}

export default JsonText