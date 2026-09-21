export const profile = {
  name: 'Luís Gustavo',
  fullName: 'Luis Gustavo de Moura Cena',
  github: 'https://github.com/Luismonx1',
  email: 'luisgustavomoura45@gmail.com',
  whatsapp: 'https://wa.me/5531980129265',
  whatsappLabel: 'WhatsApp',
  linkedin: 'https://www.linkedin.com/in/luisgustavocena/',
  resume: 'Currículo.pdf', // Para atualizar, substitua public/Currículo.pdf mantendo o nome.
};

export type DataProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  questions: string[];
  repository: string;
  findings: string[];
  featured?: boolean;
  source?: { label: string; url: string };
  visualLabel?: string;
  scope?: string;
  charts?: { src: string; url: string; label: string; title: string; alt: string }[];
};

// Para adicionar um projeto, inclua um novo objeto nesta lista.
// Inclua apenas conclusões verificadas no notebook original.
export const dataProjects: DataProject[] = [
  {
    id: 'netflix',
    title: 'O que os dados contam sobre a Netflix?',
    category: 'Análise exploratória de dados',
    description: 'Uma exploração do catálogo da Netflix para investigar a distribuição de títulos, a presença de diferentes países e os diretores que aparecem na plataforma.',
    tools: ['Python', 'pandas', 'Matplotlib'],
    questions: [
      'Quais países têm mais títulos no catálogo?',
      'Quais títulos foram adicionados primeiro e por último por país?',
      'Quais diretores têm mais filmes?',
    ],
    repository: 'https://github.com/Luismonx1/netflix-data-analysis',
    findings: [
      'No recorte de lançamentos entre 2000 e 2020, os Estados Unidos lideram em quantidade de títulos, seguidos pela Índia. Registros sem país informado foram excluídos.',
      'Entre os cinco países mais presentes, as primeiras datas de adição ao catálogo variam. Essa comparação considera a data de adição, não o ano de lançamento.',
      'Rajiv Chilaka lidera o ranking da análise com 22 filmes, seguido por Jan Suter (21) e Raúl Campos (19). Séries e registros sem diretor foram excluídos.',
    ],
    featured: true,
    source: { label: 'Kaggle', url: 'https://www.kaggle.com/datasets/shivamb/netflix-shows' },
    visualLabel: 'NETFLIX',
    scope: 'Resultados do dataset analisado; não representam o catálogo atual da Netflix.',
    charts: [
      { src: 'https://raw.githubusercontent.com/Luismonx1/netflix-data-analysis/main/images/top10-paises-shows.png', url: 'https://github.com/Luismonx1/netflix-data-analysis/blob/main/images/top10-paises-shows.png', label: 'Países', title: 'Distribuição de títulos por país', alt: 'Gráfico original da análise: dez países com mais títulos no recorte de 2000 a 2020.' },
      { src: 'https://raw.githubusercontent.com/Luismonx1/netflix-data-analysis/main/images/datas-antigo-recente-top5.png', url: 'https://github.com/Luismonx1/netflix-data-analysis/blob/main/images/datas-antigo-recente-top5.png', label: 'Datas de adição', title: 'Primeiras e últimas adições ao catálogo', alt: 'Gráfico original: datas de adição mais antigas e recentes entre os cinco países com mais títulos.' },
      { src: 'https://raw.githubusercontent.com/Luismonx1/netflix-data-analysis/main/images/top10-diretores.png', url: 'https://github.com/Luismonx1/netflix-data-analysis/blob/main/images/top10-diretores.png', label: 'Diretores', title: 'Diretores com mais filmes', alt: 'Gráfico original: ranking de diretores, com Rajiv Chilaka em primeiro, com 22 filmes.' },
    ],
  },
];

export type AcademicProject = {
  title: string;
  category: string;
  description: string;
  tools: string[];
  url: string;
  howItWorks: string;
  businessImpact: string;
  steps: string[];
  image?: { src: string; alt: string };
};

export const academicProjects: AcademicProject[] = [
  { title: 'Projeto de Grafos', category: 'Grafos & algoritmos', description: 'Aplicação prática dos conceitos de grafos em C#, com simulação de estruturas e algoritmos clássicos para a resolução de problemas.', tools: ['C#', 'Grafos', 'Algoritmos'], url: 'https://github.com/Luismonx1/TP-Grafos', howItWorks: 'Aplica os conceitos de grafos estudados na graduação por meio da simulação de estruturas e algoritmos clássicos em C#. O foco é representar conexões e exercitar a resolução de problemas com grafos.', businessImpact: 'Grafos podem apoiar a compreensão de redes e relações em problemas de negócio. Este trabalho desenvolve a base técnica para explorar esse tipo de solução; é um exercício acadêmico, sem impacto operacional medido.', steps: ['Representar conexões', 'Explorar algoritmos', 'Resolver problemas'] },
  { title: 'SISU Simplificado', category: 'Sistema de seleção universitária', description: 'Simulação da classificação de candidatos e distribuição de vagas por notas e opções de curso, com listas de selecionados, fila de espera e geração de arquivos de resultados.', tools: ['C#', 'QuickSort', 'Estruturas de dados'], url: 'https://github.com/Luismonx1/Projeto-Analise-e-Desenvolvimento-de-Sistemas', howItWorks: 'Lê cursos e candidatos de um arquivo, calcula as médias e ordena as notas com QuickSort. Distribui as vagas conforme a primeira e a segunda opção de curso, organiza a fila de espera e gera um arquivo com selecionados e notas de corte.', businessImpact: 'Em um contexto educacional, automatizar a classificação pode reduzir o trabalho manual e tornar os critérios de seleção mais consistentes. O projeto simula esse processo para fins acadêmicos; não há ganhos de tempo ou resultados de uso real mensurados.', steps: ['Ler candidatos e cursos', 'Classificar e distribuir vagas', 'Gerar resultados'] },
];

