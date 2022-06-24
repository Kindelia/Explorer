import type { GetStaticProps, NextPage } from 'next'

import { Button } from '@kindelia/lib/ui'
import { Card, FAQ, Section } from '@kindelia/lib/ui/homepage'
import {
  get_github_info,
  GithubInfo,
} from '@kindelia/lib/github/get_github_info'
import { explorer_url } from '@/lib/config'
import { FAQs } from '@/lib/faq'

interface HomeProps {
  kind: GithubInfo
  hvm: GithubInfo
}

const Home: NextPage<HomeProps> = ({ kind, hvm }) => {
  return (
    <div className="flex flex-col">
      <Section className="justify-evenly">
        <img
          className="self-center pt-6 h-28 sm:h-48 dark:invert"
          alt="Kindelia logo"
          src="kindelia_logo.svg"
        />
        <h1 className="h-11 self-center text-4xl">Kindelia Name Token</h1>
      </Section>
      <Section className="justify-around py-16 self-center text-center">
        <div className="font-bold text-2xl">What is Kindelia?</div>
        <div>
          <p>{`A peer-to-peer functional computer capable of hosting decentralized
          apps that stay up forever.`}</p>

          <p>{`Essentially, it is a complete redesign of
          Ethereum's idea, built upon type theoretic foundations`}</p>
        </div>
        <a
          href="https://github.com/Kindelia/Kindelia/blob/master/WHITEPAPER.md"
          target="_blank"
          rel="noreferrer"
        >
          <Button>Read the Whitepaper</Button>
        </a>
      </Section>

      <Section className="justify-evenly">
        <Card
          title="Cheap state and computation"
          description="By storing the global state as reversible runtime heaps, it can run highly dynamic applications with massively reduced costs, making layer 1 virtual worlds economically viable."
          repo={hvm}
          languageColor="#7A0410"
        />

        <Card
          title="0-bug contracts"
          description="By leveraging a functional virtual machine, the HVM, Kindelia is able to run formally verified DApps cheaply and efficiently, making it the most secure peer-to-peer computer."
          repo={kind}
          reverse
          languageColor="#CA1E8E"
        />
      </Section>

      <Section className="justify-evenly py-16 self-center text-center">
        <div className="font-bold text-2xl">
          What is the Kindelia Name Token?
        </div>
        <div>
          <p>{`The Kindelia Network has a native namespace system that work like domain names, but for smart contracts.`}</p>
        </div>

        <a href={explorer_url} target="_blank" rel="noreferrer">
          <Button>Explore the Testnet</Button>
        </a>
      </Section>

      <div className="flex flex-col space-y-3 items-center self-center border-1 p-5 rounded-md border-gray-400 font-semibold mb-10">
        <div>
          <div className="w-full border-gray-800 border-2 h-3">
            <div
              className="bg-gray-800 h-2"
              style={{ width: `${(5000 / 65536) * 100}%` }}
            />
          </div>
          <div>5000/65536 TOKENS MINTED</div>
        </div>
        <div>Price: 0.02 ETH</div>
        <div>Current name size: 3 chars</div>
        <Button>MINT</Button>
      </div>

      <Section>
        {FAQs.map((faq) => (
          <FAQ key={faq.question} {...faq} />
        ))}
      </Section>
    </div>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const hvm = await get_github_info('kindelia', 'hvm')
  const kind = await get_github_info('kindelia', 'kind')

  kind.language = 'Kind'

  return {
    props: {
      hvm,
      kind,
    },
    revalidate: 3600,
  }
}

export default Home
