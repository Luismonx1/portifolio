# Portfólio · Luís Gustavo

Portfólio pessoal voltado à carreira de analista de dados. React, TypeScript, TailwindCSS e Vite, com exportação estática para GitHub Pages.

## Desenvolvimento

Use Node.js 22.12+ e pnpm 11.19.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Acesse o endereço mostrado no terminal, incluindo `/portifolio/`.

```sh
pnpm build
pnpm preview
```

O build valida os tipos e gera o site em `dist/`.

## Editar conteúdo

`src/data/portfolio.ts` concentra os contatos, o caminho do currículo, os projetos de dados e os acadêmicos.

Para adicionar um projeto, acrescente um objeto a `dataProjects` com `id` único, título, descrição, categoria, ferramentas, perguntas, link do repositório e conclusões verificadas. `featured: true` acrescenta o selo de destaque. O componente reutilizável em `src/App.tsx` renderiza os novos projetos automaticamente.

Os campos opcionais `source`, `scope` e `charts` permitem registrar a fonte, o recorte da análise e quantos gráficos você quiser. Cada gráfico recebe `src` (URL da imagem), `url` (link para abrir o original), `label`, `title` e `alt`. O seletor é criado automaticamente. Sem gráficos, o cartão usa toda a largura. A marca vermelha da Netflix só aparece no projeto `netflix`.

Para adicionar projetos acadêmicos, edite `academicProjects`. Preencha `url` para mostrar o link individual. Os cartões atuais apresentam o Projeto de Grafos e o SISU Simplificado, com descrições baseadas nos respectivos repositórios.

## Currículo PDF

O download está ativo e utiliza `public/Currículo.pdf`. Esta é uma versão temporária fornecida pelo autor.

Para atualizar:

1. Substitua `public/Currículo.pdf` pelo novo PDF, mantendo exatamente o nome (incluindo acento e maiúscula).
2. Rode `pnpm build` novamente.
3. Envie a alteração ao GitHub e execute o workflow de publicação quando quiser atualizar o site hospedado.

Não é necessário alterar o código. Substituir apenas o arquivo original na Área de Trabalho não atualiza a cópia do projeto. O caminho do download respeita a base do GitHub Pages.

## Publicar no GitHub Pages

O site está preparado para `https://luismonx1.github.io/portifolio/`, mas a configuração local não ativa a hospedagem por si só.

1. Envie o código para a branch `main` do repositório `Luismonx1/portifolio`.
2. No GitHub, abra **Settings → Pages → Build and deployment** e selecione **GitHub Actions** como Source.
3. Em **Actions**, execute manualmente o workflow **Publicar portfólio no GitHub Pages**.

Pushes em `main` validam o build e geram o artefato. A publicação ocorre somente por execução manual do workflow, permitindo revisar a prévia antes de disponibilizar o site.

O repositório foi criado como privado. A disponibilidade do Pages para repositórios privados depende do plano da conta. Se a conta não oferecer esse recurso, será necessário escolher entre tornar o repositório público ou usar um plano compatível. A configuração não muda sua visibilidade automaticamente.

Se renomear o repositório, ajuste `base` em `vite.config.ts`.

Referência da configuração: https://vite.dev/guide/static-deploy#github-pages

## Conteúdo e fontes

- Projeto Netflix: https://github.com/Luismonx1/netflix-data-analysis
- Dataset: https://www.kaggle.com/datasets/shivamb/netflix-shows
- Os gráficos originais são carregados do repositório Netflix e têm alternativa de acesso caso a imagem não carregue.
- As conclusões são atribuídas à análise original e não descrevem o catálogo atual. A comparação temporal utiliza datas de adição ao catálogo, não anos de lançamento.
- Google Fonts fornece Manrope e DM Sans; há fontes locais de fallback.

## Acessibilidade e responsividade

Menu móvel, navegação por âncoras, link para pular ao conteúdo, foco visível, botões com estado anunciado, alternativas para imagens e respeito à preferência por movimento reduzido. Layouts específicos para celular, tablet e desktop.
