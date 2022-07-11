import type { GetStaticProps, NextPage } from 'next'

import { Button } from 'kindelia'
import { get_github_info, GithubInfo } from 'kindelia/github/get_github_info'
import { Card, Section } from 'kindelia/homepage'
import { Socials } from 'kindelia/Socials'
import { Subscribe } from 'kindelia/subscribe/Subscribe'

interface HomeProps {
  kind: GithubInfo
  hvm: GithubInfo
}

const Home: NextPage<HomeProps> = ({ hvm, kind }) => {
  return (
    <div className="flex flex-col">
      <Section className="justify-evenly">
        <img
          className="self-center pt-6 h-28 sm:h-48 dark:invert"
          alt="Kindelia logo"
          src="kindelia_logo.svg"
        />
        <Button variant="outline" className="h-11 self-center themeHover">
          Explore Kindelia
        </Button>
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

      <Subscribe />
      <Socials />
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
