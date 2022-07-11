import { order, exchange } from '@waves/waves-transactions'
import { base58Encode, publicKey } from '@waves/ts-lib-crypto'
import { Dispatch, useEffect, useMemo, useState } from 'react'
import JsonText from './JsonText'
import { Signer } from '@waves/signer'
import { txToProtoBytes } from '@waves/waves-transactions/dist/proto-serialize'


type Props<T> = {
  userOrder: any
  orderSignatureHex?: string
  state: [T, Dispatch<T>]
  matcherSeed: string
  signer: Signer
  chainId: string
}

const ExchangeTx = ({ signer, chainId, userOrder, matcherSeed, orderSignatureHex, state: [state, setState] }: Props<any>) => {




  const createExchangeTx = () => {
    if (!orderSignatureHex)
      return undefined

    const timestamp = Date.now()
    const expiration = timestamp + 60 * 60 * 24 * 1000

    const matcherOrder = order({
      version: 3,
      assetPair: {
        amountAsset: null,
        priceAsset: 'CdrG4fjrAQxrdYpExQyGi3cLgJcmoxc4qGVktXeYe2sj', //stage_usdn
      },
      timestamp,
      expiration,
      proofs: [],
      orderType: 'sell',
      amount: 1000000,
      price: 5267200,
      matcherFee: 100000,
      matcherPublicKey: publicKey(matcherSeed),
      senderPublicKey: publicKey(matcherSeed),
      matcherFeeAssetId: null,
    }, matcherSeed)

    const exchangePrams = {
      type: 7,
      version: 3,
      proofs: [],
      order1: {
        ...userOrder,
        // proofs: [
        //   userOrderSignature,
        // ],
        eip712Signature: orderSignatureHex,
      },
      order2: matcherOrder,
      amount: 1000000,
      price: 526720000,
      buyMatcherFee: 100000,
      sellMatcherFee: 100000,
      chainId: chainId.charCodeAt(0),
      fee: 300000,
      timestamp: Date.now(),
      priceMode: 'fixedDecimals',
    }

    const tx = exchange(exchangePrams as any, matcherSeed)
    setState(tx)

  }

  useEffect(createExchangeTx, [orderSignatureHex])

  const bytes = useMemo(() => {
    if (state?.senderPublicKey == undefined)
      return []
    return txToProtoBytes(state)
  }, [state])

  const [broadcastResult, setBroadcastResult] = useState<string>('')

  return (

    <div className='vstack border'>
      <button onClick={createExchangeTx}>Regenerate exchange TX</button>
      <JsonText state={[state, setState]} />
      <h2>Bytes</h2>
      <h3>Hex</h3>
      <textarea className='bytes' value={Buffer.from(bytes).toString('hex')} />
      <h3>Base58</h3>
      <textarea className='bytes' value={base58Encode(bytes)} />
      <button onClick={async () => {
        const result = await signer.broadcast(state).catch(x => x).then(x => JSON.stringify(x, undefined, 2))
        setBroadcastResult(result)
      }}>Broadcast</button>
      <pre>{broadcastResult}</pre>
    </div>
  )
}

export default ExchangeTx