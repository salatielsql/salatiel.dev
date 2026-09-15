export interface ResumeExperience {
  company: string
  role: string
  start: string
  end: string | 'presente'
  bullets: string[]
}

export interface ResumeEducation {
  institution: string
  degree: string
  start: string
  end: string
}

export interface ResumeSkillGroup {
  category: string
  items: string[]
}

export interface Resume {
  headline: string
  summary: string
  experience: ResumeExperience[]
  education: ResumeEducation[]
  skills: ResumeSkillGroup[]
}

// Conteúdo placeholder genérico — não representa fatos reais e verificáveis
// sobre uma pessoa específica.
export const resume: Resume = {
  headline: 'Senior Software Engineer',
  summary:
    'Engenheiro de software com foco em aplicações web, interfaces performáticas e ferramentas para outros times de engenharia.',
  experience: [
    {
      company: 'Empresa Exemplo Ltda.',
      role: 'Senior Software Engineer',
      start: '2023',
      end: 'presente',
      bullets: [
        'Liderou a reescrita de um serviço interno de alto tráfego, reduzindo a latência média em ~30%.',
        'Introduziu práticas de code review e testes automatizados adotadas pelo time inteiro.',
        'Mentorou engenheiros júnior e pleno em arquitetura de frontend.',
      ],
    },
    {
      company: 'Segunda Empresa Exemplo S.A.',
      role: 'Software Engineer',
      start: '2020',
      end: '2023',
      bullets: [
        'Desenvolveu e manteve componentes de um design system usado em múltiplos produtos.',
        'Colaborou com design e produto na definição de fluxos de onboarding.',
      ],
    },
    {
      company: 'Startup Fictícia',
      role: 'Junior Developer',
      start: '2018',
      end: '2020',
      bullets: [
        'Implementou funcionalidades de ponta a ponta em uma aplicação web full-stack.',
        'Participou da migração de um monólito para serviços menores.',
      ],
    },
  ],
  education: [
    {
      institution: 'Universidade Exemplo',
      degree: 'Bacharelado em Ciência da Computação',
      start: '2014',
      end: '2018',
    },
  ],
  skills: [
    {
      category: 'Linguagens',
      items: ['TypeScript', 'JavaScript', 'Python'],
    },
    {
      category: 'Frontend',
      items: ['Astro', 'React', 'CSS'],
    },
    {
      category: 'Backend & Infra',
      items: ['Node.js', 'PostgreSQL', 'Docker'],
    },
  ],
}
