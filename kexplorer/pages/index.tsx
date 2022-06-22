import type { GetStaticProps, NextPage } from 'next'

import { Button } from '@/components/Button'
import { Card } from '@/components/homepage/Card'
import { Section } from '@/components/homepage/Section'
import { Socials } from '@/components/homepage/Socials'
import { Subscribe } from '@/components/homepage/Subscribe'
import { getGithubInfo, GithubInfo } from '@/utils/getGithubInfo'

interface HomeProps {
  kind: GithubInfo
  hvm: GithubInfo
}

const Home: NextPage<HomeProps> = ({ hvm, kind }) => {
  return (
    <div className="flex flex-col">
      <Section className="justify-evenly">
        <img
          className="self-center pt-6 h-28 sm:h-48"
          alt="Kindelia logo"
          src="kindelia_logo.svg"
        />
        <Button className="h-11 self-center">Explore Kindelia</Button>
      </Section>

      <Section className="justify-evenly">
        <Card
          title="0-bug contracts"
          description="..."
          repo={kind}
          languageColor="#CA1E8E"
        />

        <Card
          title="Cheap state and computation"
          description="Games, etc"
          repo={hvm}
          reverse
          languageColor="#7A0410"
        />
      </Section>

      <Section className="justify-around">
        <Subscribe />
        <Socials />
      </Section>
    </div>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const hvm = await getGithubInfo('kindelia', 'hvm')
  const kind = await getGithubInfo('kindelia', 'kind')

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
