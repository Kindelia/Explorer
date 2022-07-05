import type { NextApiRequest, NextApiResponse } from 'next'

const domainLetterCount = (tokenId: bigint) => {
  if (tokenId < 16) {
    return 1
  } else if (tokenId < 256) {
    return 2
  } else if (tokenId < 4096) {
    return 3
  } else if (tokenId < 65536) {
    return 4
  } else {
    return
  }
}

const domainFunctionCount = (tokenId: bigint) => {
  if (tokenId < 16) {
    return 1000000
  } else if (tokenId < 256) {
    return 100000
  } else if (tokenId < 4096) {
    return 10000
  } else if (tokenId < 65536) {
    return 1000
  } else {
    return
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const tokenId = req.query.tokenId as unknown as bigint

  const letterCount = domainLetterCount(tokenId)

  if (!letterCount)
    return res.status(500).json({ error: 'Missin Letter Count' })

  const functionCount = domainFunctionCount(tokenId)

  return res.status(200).json({
    description: `This NFT allows you to register a ${letterCount} letter domain on the Kindelia Network.`,
    external_url: `https://kindelia.org/kindd/${tokenId}`,
    image: `https://kindelia.org/kindd-img/${letterCount}.jpg`,
    name: `Kindelia ${letterCount} letter domain`,
    attributes: [
      {
        trait_type: 'Domain Type',
        value: `${letterCount} letter domain`,
      },
      {
        trait_type: 'Domain Capacity',
        value: `${functionCount} functions`,
      },
      {
        trait_type: 'Rarity',
        value: 4 - letterCount,
      },
    ],
  })
}
