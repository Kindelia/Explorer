import type { GetStaticProps, NextPage } from 'next'
import { Button } from 'ui'
import { Section } from 'ui/homepage'
import {
  get_github_info,
  GithubInfo,
} from 'ui/github/get_github_info'
import { explorer_url } from '@/lib/config'
import { FC } from 'react'
import { Roadmap } from '@/components/Roadmap'
import { Card } from 'ui/homepage/Card2'

interface HomeProps {
  kind: GithubInfo
  hvm: GithubInfo
}

const Feature: FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="text-xl font-semibold">
    <span className="">{title}</span>
    <span className="font-light">
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
              <h2 className="font-normal text-xl leading-loose">
                A global virtual machine powered by blockchain technology whose
                goal is to solve the{' '}
                <span className="underline">{`Zooko's triangle trillema`}</span>
              </h2>
            </div>
            <div className="space-y-3">
              <Feature
                title="Decentralized -> Kindelia:"
                description="A decentralized functional computer."
              />
              <Feature
                title="Efficient -> HVM:"
                description="An optimal, parallel, functional virtual machine."
              />
              <Feature
                title="Secure -> Kind:"
                description="A formal verification programming language."
              />
            </div>

          </div>
          <img src="/images/cta.png" alt="logo" className='dark:invert' />
        </div>
      </Section>
      <Section className="h-66-screen" id="details">
        <div className="uppercase flex flex-shrink self-center px-24 themeDefault2 rounded-t-xl tracking-widest font-bold pt-3">
          Details
        </div>
        <div className="themeDefault2  w-full h-66-screen">
          <div className="mx-auto max-w-full lg:max-w-6xl px-2 sm:px-5 py-10 flex flex-row h-full items-center space-x-28">
            <Card
              title="Cheap state and computation"
              description="By storing the global state as reversible runtime heaps, it can run highly dynamic applications with massively reduced costs, making layer 1 virtual worlds economically viable."
              repo={hvm}
              languageColor="#ffaf82"
            />

            <div className="bg-bg-light dark:bg-bg-dark h-full w-1" />

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
        <div className="uppercase flex flex-shrink self-center px-24 themeDefault rounded-t-xl tracking-widest font-bold pt-3">
          Roadmap
        </div>
        <div className="themeDefault w-full min-h-60-screen pt-20">
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
