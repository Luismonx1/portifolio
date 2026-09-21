export const profile = {
  name: 'Luís Gustavo',
  fullName: 'Luis Gustavo de Moura Cena',
  github: 'https://github.com/Luismonx1',
  email: 'luisgustavomoura45@gmail.com',
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

export const academicProjects = [
  { title: 'Projeto de Grafos', category: 'Grafos & algoritmos', description: 'Aplicação prática dos conceitos de grafos em C#, com simulação de estruturas e algoritmos clássicos para a resolução de problemas.', tools: ['C#', 'Grafos', 'Algoritmos'], url: 'https://github.com/Luismonx1/TP-Grafos' },
  { title: 'SISU Simplificado', category: 'Sistema de seleção universitária', description: 'Simulação da classificação de candidatos e distribuição de vagas por notas e opções de curso, com listas de selecionados, fila de espera e geração de arquivos de resultados.', tools: ['C#', 'QuickSort', 'Estruturas de dados'], url: 'https://github.com/Luismonx1/Projeto-Analise-e-Desenvolvimento-de-Sistemas' },
];
