import { ProviderMetamask } from '@waves/provider-metamask/dist/Provider'
import { base16Decode, base58Encode } from '@waves/ts-lib-crypto'
import { Dispatch, useMemo } from 'react'

type Props<T> = {
  order: any
  provider: ProviderMetamask
  state: [T, Dispatch<T>]
}

const SignOrder = ({ order, provider, state: [state, setState] }: Props<string | undefined>) => {

  const base58 = useMemo(() => base58Encode(base16Decode(state?.slice(2) || '')), [state])

  return (

    <div className='vstack border'>

      <button onClick={async () => {
        //eip712_signature
        const sign = await provider.signOrder(order)
        setState(sign)

      }}>Sign order with metamask</button>

      <div>
        <pre>
          {state && `Hex: ${state}`}
        </pre>
        <pre>
          {base58 && `Base58: ${base58}`}
        </pre>
      </div>
    </div>
  )
}

export default SignOrder