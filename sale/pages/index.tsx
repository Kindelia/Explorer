import type { GetStaticProps, NextPage } from 'next'
import { Button } from '@kindelia/lib/ui'
import { Section } from '@kindelia/lib/ui/homepage'
import {
  get_github_info,
  GithubInfo,
} from '@kindelia/lib/github/get_github_info'
import { explorer_url } from '@/lib/config'
import { FC } from 'react'
import { Roadmap } from '@/components/Roadmap'
import { Card } from '@/components/Card'

interface HomeProps {
  kind: GithubInfo
  hvm: GithubInfo
}

const Feature: FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="text-xl font-semibold">
    <span className="text-primary-light">{title}</span>
    <span className="text-secondary-light">
      {` -> `}
      {description}
    </span>
  </div>
)

const Home: NextPage<HomeProps> = ({ kind, hvm }) => {
  return (
    <div className="flex flex-col">
      <Section className="justify-around mx-auto max-w-full lg:max-w-6xl p-2 sm:p-5 h-79-screen">
        <div className="flex flex-row">
          <div className="flex flex-col justify-between pr-10">
            <div className="space-y-2 font-semibold">
              <h1 className="font-bold text-4xl">Welcome to Kindelia</h1>
              <h2 className="text-secondary-light text-xl leading-loose">
                A global virtual machine powered bu blockchain technology whose
                goal is to solve the{' '}
                <span className="underline">{`Zooko's triangle trillema`}</span>
              </h2>
            </div>
            <div className="space-y-3">
              <Feature
                title="Decentralized"
                description="Kindelia: a decentralized functional computer."
              />
              <Feature
                title="Efficient"
                description="HVM: an optimal, parallel, functional virtual machine."
              />
              <Feature
                title="Secure"
                description="Kind: a formal verification programming language."
              />
            </div>

            <div className="space-x-4">
              <a href={explorer_url} target="_blank" rel="noreferrer">
                <Button>Explore</Button>
              </a>
              <a
                href="https://discord.gg/kindelia"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline">Join us</Button>
              </a>
            </div>
          </div>
          <img src="/images/cta.png" alt="logo" />
        </div>
      </Section>
      <Section className="h-66-screen" id="details">
        <div className="uppercase flex flex-shrink self-center px-24 bg-inset-light rounded-t-xl tracking-widest font-bold pt-3">
          Details
        </div>
        <div className="bg-inset-light w-full h-66-screen">
          <div className="mx-auto max-w-full lg:max-w-6xl px-2 sm:px-5 py-10 flex flex-row h-full items-center space-x-28">
            <Card
              title="Cheap state and computation"
              description="By storing the global state as reversible runtime heaps, it can run highly dynamic applications with massively reduced costs, making layer 1 virtual worlds economically viable."
              repo={hvm}
              languageColor="#ffaf82"
            />

            <div className="bg-bg-light h-full w-1" />

            <Card
              title="0-bug contracts"
              description="By leveraging a functional virtual machine, the HVM, Kindelia is able to run formally verified DApps cheaply and efficiently, making it the most secure peer-to-peer computer."
              repo={kind}
              reverse
              languageColor="#ffb5c6"
            />
          </div>
        </div>
      </Section>

      <Section className="-top-8 relative" id="roadmap">
        <div className="uppercase flex flex-shrink self-center px-24 bg-bg-light rounded-t-xl tracking-widest font-bold pt-3">
          Roadmap
        </div>
        <div className="bg-bg-light w-full min-h-60-screen pt-20">
          <div className="mx-auto max-w-full lg:max-w-6xl px-2 sm:px-5 py-10 flex flex-row h-full items-center space-x-20">
            <Roadmap />
          </div>
        </div>
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
