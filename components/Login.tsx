import { Signer, UserData } from '@waves/signer'
import { Dispatch, useState } from 'react'

type Props<T> = {
  signer: Signer
  state: [T, Dispatch<T>]
}

const Login = ({ signer, state: [state, setState] }: Props<UserData | undefined>) => {
  return (
    <div className='vstack border'>
      <button onClick={async () => {
        const loginResult = await signer.login()
        setState(loginResult)
      }}>Login with metamask</button>
      <pre>
        UserData:
        {state && JSON.stringify(state, undefined, 2)}
      </pre>
    </div>
  )
}

export default Login