import { signerWithMetamask } from 'generic/signerWithMetamask'
import { useState } from 'react'
import { UserData } from '@waves/signer'
import { publicKey } from '@waves/ts-lib-crypto'
import Login from './Login'
import Order from './Order'
import SignOrder from './SignOrder'
import ExchangeTx from './ExchangeTx'
import Image from 'next/image'



const Page = () => {

  const userSeed = '63911bfd-c1cb-48f9-921c-beb1fc90e6cd'
  const matcherSeed = 'bdd408162b4d4f6e8b5a49c791b37002'
  const timestamp = Date.now()
  const expiration = timestamp + 60 * 60 * 24 * 1000

  const userState = useState<UserData | undefined>(undefined)

  const orderState = useState({
    version: 4,
    orderType: 'buy',
    assetPair: {
      amountAsset: null,
      priceAsset: '49y6xCWJJdNhCG88oPktziUuqiTGmd4d62AYGZ84ecTR'
    },
    matcherPublicKey: publicKey(matcherSeed),
    senderPublicKey: publicKey(userSeed),
    matcherFeeAssetId: '49y6xCWJJdNhCG88oPktziUuqiTGmd4d62AYGZ84ecTR',
    amount: 1000000,
    price: 5267200,
    matcherFee: 100000,
    priceMode: 'assetDecimals',
    timestamp,
    expiration,
    proofs: [],
    id: '',
  })

  const signatureState = useState<string | undefined>(undefined)
  const exchangeTxState = useState<any>(undefined)

  const chainId = 'R'
  const { signer, provider } = signerWithMetamask({
    nodeUrl: 'https://stage.node.vires.finance',
  })

  return (
    
    <div className='vstack'>
      <h2>Step 0, make sure metamask network with chainId 82, and node (https://stage.node.vires.finance/eth) is selected</h2>
      <Image src='/metamask.png' width={400} height={400} layout='fixed' alt='not really' />
      <h2>Step 1</h2>
      <Login state={userState} signer={signer} />
      <h2>Step 2, check user order params</h2>
      <Order state={orderState} />
      <h2>Step 3</h2>
      <SignOrder state={signatureState} order={orderState[0]} provider={provider} />
      <h2>Step 4</h2>
      <ExchangeTx state={exchangeTxState} chainId={chainId} signer={signer} matcherSeed={matcherSeed} orderSignatureHex={signatureState[0]} userOrder={orderState[0]} />
    </div >
  )
}

export default Page