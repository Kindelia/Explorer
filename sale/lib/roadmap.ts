type Task = {
  done?: boolean
  title: string
  description: string
}

export type RoadmapPhase = {
  title: string
  workscope: Task[]
}

export const roadmap: RoadmapPhase[] = [
  {
    title: 'Phase 01 - Anya',
    workscope: [
      {
        title: '[Kind2] Independencia do Compiler do Kind 2',
        description:
          'Possibilita escrever o Compiler do Kind 2 em Kind 2, permitindo melhorar a linguagem usando ela mesma.',
      },
      {
        done: true,
        title: '[Node] API: Function Info',
        description:
          'O fullnode serve API para as informações de uma dada função para que sejam renderizadas no explorador.',
      },
      {
        title: '[Node] API: Interaction (Test and publish)',
        description:
          'O fullnode serve API para permitir a execução de código pelo client para teste e publicação de transações.',
      },
      {
        title: '[Node] Testnet Infra',
        description:
          'Refatorar e melhorar a configuração de infraestrutura dos nós da Testnet e sites e aplicações.',
      },
      {
        title: '[Node] Test: Restoring State from Disk',
        description:
          'Testar e garantir o funcionamento da funcionalidade de restauração de estado do armazenamento da blockchain a partir do disco sem a necessidade de recomputar todos os blocos.',
      },
      {
        title: '[Explorer] Function Page',
        description:
          'Página para mostrar informações de uma função (contrato) incluindo seu código.',
      },
      {
        title: '[Explorer] Interaction: Test and Deploy code',
        description:
          'Página que permite escrever, testar e publicar código na línguagem do Kindelia. (no futuro, também Kind 2).',
      },
      {
        title: '[Explorer] Basic App (Kplace)',
        description:
          'Aplicação gráfica básica a ser incluida no explorer para demonstrar capacidade da rede visualmente.',
      },
    ],
  },
  {
    title: 'Phase 02 - Bojjii',
    workscope: [
      {
        title: '[Kind2] Melhoria da Syntax',
        description: 'Facilitando a escrita de Kind 2 para novos usuários.',
      },
      {
        title: '[Node] Transaction Pool',
        description:
          'Agregação de transações solicitadas em blocos a serem minerados.',
      },
      {
        title: '[Node] Test/Profile Networking',
        description:
          'Testes e medições sobre o comportamento do networking da rede.',
      },
      {
        title: '[Node] Revamp Message Handling',
        description:
          'Melhorar e otimizar o tratamento de mensagens pelo fullnode a fim de diminuir mensagens desnecessárias, melhorar o tempo de processamento de mensagens consequentemente aumentando a resiliência a DOS.',
      },
      {
        title: '[Node] Chain Events',
        description:
          'API de streaming de eventos para permitir melhor observabilidade do fullnode e maior reatividade dos clients.',
      },
      {
        title: '[Explorer] Interaction: Syntax Errors, Highlighting, etc...',
        description:
          'Melhorar página de interação com funcionalidades de syntax highlighting, detecção de erro no frontend entre outras melhorias de usabilidade.',
      },
      {
        title: '[Explorer] Chain Events',
        description:
          'Integração com a API de streaming de eventos para melhorar a reatividade e experiência do usuário.',
      },
      {
        title: '[Explorer] Metamask',
        description:
          'Integração com a carteira Metamask para assinar transações do Kindelia.',
      },
      {
        title: '[Explorer] Minimal Design Polishment',
        description: '',
      },
    ],
  },
  {
    title: 'Phase 03',
    workscope: [
      {
        title: '[Kind2] Sistema de Modulos de primeira classe',
        description:
          'Possibilitando melhor organização do código e manipular módulos como se fossem valores.',
      },
      {
        title: '[Node] Storage State Checksum',
        description:
          'Calcular checksum do estado do armazenamento da blockchain para que seja possível detectar rapidamente divergências na computação do estado de diferentes nós.',
      },
      {
        title: '[Node] IPv6',
        description: 'Suporte a IPv6 no protocolo da rede.',
      },
    ],
  },
  {
    title: 'Phase 04',
    workscope: [
      {
        title: '[Node] Testnet Bug Hunt',
        description:
          'Bug Bounty aberto para procurar principalmente bugs críticos no software do nó e no protocolo.',
      },
      {
        title: '[Node] Data Indexing',
        description: 'Indexar dados da blockchain para permitir buscas.',
      },
    ],
  },
]
