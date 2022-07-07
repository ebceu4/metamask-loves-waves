import { Signer } from '@waves/signer'
import { ProviderMetamask } from '@waves/provider-metamask'

type signerWithMetamaskParams = {
  nodeUrl: string
}

export const signerWithMetamask = ({ nodeUrl }: signerWithMetamaskParams) => {

  const signer = new Signer({
    NODE_URL: nodeUrl,
  })
  
  const provider = new ProviderMetamask({
    wavesConfig: {
      nodeUrl: nodeUrl,
    }
  })

  signer.setProvider(provider)

  return { signer, provider }
}
