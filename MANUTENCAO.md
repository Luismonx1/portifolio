# Manutenção do portfólio

Guia para atualizar conteúdo, conferir alterações e publicar no GitHub Pages.

## Arquivos principais

- `src/data/portfolio.ts`: contatos, currículo, projetos de dados e acadêmicos.
- `src/App.tsx`: componentes e textos das seções.
- `src/index.css`: estilos e regras responsivas.
- `public/`: arquivos disponibilizados no site, incluindo o PDF.
- `vite.config.ts`: configuração do Vite e caminho-base do Pages.
- `.github/workflows/deploy.yml`: construção e publicação.

## Adicionar um projeto de dados

Acrescente um objeto à lista `dataProjects` em `src/data/portfolio.ts`, seguindo o tipo `DataProject`:

```ts
{
  id: 'identificador-unico',
  title: 'Título do projeto',
  category: 'Análise exploratória de dados',
  description: 'Resumo do problema e da abordagem utilizada.',
  tools: ['Python', 'pandas'],
  questions: ['Qual pergunta a análise responde?'],
  repository: 'https://github.com/SEU-USUARIO/SEU-REPOSITORIO',
  findings: ['Uma conclusão verificada na análise.'],
  featured: false,
}
```

O componente renderiza o projeto automaticamente. Use um `id` único e conclusões sustentadas pela análise. `featured: true` exibe o selo de destaque.

Campos opcionais:

- `source`: objeto com `label` e `url` da fonte dos dados.
- `scope`: texto sobre o recorte e os limites da análise.
- `visualLabel`: título acima dos gráficos.
- `charts`: lista de gráficos, cada um com `src` (URL da imagem), `url` (link para o original), `label` (seletor), `title` e `alt` (descrição acessível).

O seletor é gerado automaticamente. Sem gráficos, o cartão ocupa toda a largura. A marca vermelha da Netflix aparece apenas no projeto com `id: 'netflix'`.

## Projetos acadêmicos e contatos

Edite `academicProjects` no mesmo arquivo. Cada projeto segue o tipo `AcademicProject`: `title`, `category`, `description`, `tools`, `url`, `howItWorks` (funcionamento), `businessImpact` (impacto potencial) e `steps` (etapas do fluxo visual). O botão “Ver mais” abre os detalhes automaticamente. Descreva benefícios como potenciais enquanto não houver resultados medidos. Para exibir uma captura real no lugar do fluxo, adicione `image: { src: 'images/projeto.png', alt: 'Descrição da tela' }` e salve o arquivo em `public/images/`. O caminho local respeita a base do Pages; sem imagem ou em caso de falha, o fluxo é exibido.

O objeto `profile` contém e-mail, WhatsApp, LinkedIn, GitHub e o nome do currículo. Para alterar o WhatsApp, atualize `whatsapp` (link `https://wa.me/` seguido do número com código do país e DDD, somente dígitos). O campo `whatsappLabel` define apenas o texto exibido e pode permanecer como `WhatsApp` para não mostrar o número na página. Outros textos de apresentação ficam em `src/App.tsx`.

## Trocar o currículo

1. Substitua `public/Currículo.pdf` pelo novo arquivo, mantendo o nome, o acento e a maiúscula.
2. Confira o download na prévia.
3. Envie a alteração ao GitHub e execute a publicação para atualizar o site hospedado.

O botão usa `resume: 'Currículo.pdf'`; não é necessário alterar o código. Substituir apenas o arquivo original na Área de Trabalho não atualiza a cópia no projeto. O PDF atual é temporário, fornecido pelo autor.

## Conferir alterações localmente

Use Node.js 22.12+ e pnpm 11.19.0. Na pasta do projeto:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Abra o endereço mostrado no terminal, incluindo `/portifolio/`. A página atualiza ao salvar alterações. Encerre com Ctrl+C.

Para validar TypeScript e conferir o site gerado para produção:

```sh
pnpm build
pnpm preview
```

O build gera `dist/`. Não edite essa pasta manualmente nem a envie ao Git; o GitHub Actions a gera novamente.

Antes de publicar, confira a navegação em celular e desktop, os links dos projetos, os gráficos, as conclusões, os contatos e o download do PDF.

## Ativar ou reativar o GitHub Pages

Endereço previsto: https://luismonx1.github.io/portifolio/

Na última verificação, o repositório estava privado e o GitHub solicitava torná-lo público ou contratar um plano compatível para habilitar o Pages. A mudança de visibilidade também expõe o código e o histórico; confirme essa escolha com o proprietário antes de alterá-la.

Depois de resolver a disponibilidade do Pages:

1. Envie a versão desejada para a branch `main`.
2. Abra **Settings → Pages → Build and deployment**.
3. Selecione **GitHub Actions** como Source.
4. Em **Actions**, abra **Publicar portfólio no GitHub Pages** e execute **Run workflow** na branch `main`.
5. Aguarde os jobs `build` e `deploy` concluírem com sucesso.
6. Abra o endereço público e confira o download do currículo.

Pushes em `main` apenas validam e geram o artefato. A publicação exige execução manual do workflow. Esse processo também serve para atualizar o site.

Após a primeira publicação verificada, remova a indicação “publicação pendente” do README.

Referência: [Publicação de um site Vite no GitHub Pages](https://vite.dev/guide/static-deploy#github-pages).

## Se o repositório mudar de nome

1. Ajuste `base` em `vite.config.ts` para `'/NOVO-NOME/'`.
2. Atualize o link do site no README e neste guia.
3. Atualize a URL do remoto `origin` do Git.
4. Confira a configuração de Pages e execute novamente o workflow.

O link do currículo usa `import.meta.env.BASE_URL` e acompanha o `base`. Para domínio próprio ou repositório de usuário `Luismonx1.github.io`, o caminho-base é `/`.

## Dependências externas

Os gráficos vêm do repositório `netflix-data-analysis`. Se os arquivos forem movidos ou renomeados, atualize `charts` em `portfolio.ts`. Há um link alternativo quando a imagem não carrega. Google Fonts fornece as fontes, com fallback local.

## Tema claro e escuro

O botão no cabeçalho alterna os temas. Na primeira visita, a aparência segue a preferência do sistema; depois, a escolha fica salva no navegador na chave portfolio-theme. O script em index.html aplica o tema antes de carregar o React. As cores escuras ficam no bloco data-theme de src/index.css. Os gráficos originais mantêm fundo branco para preservar sua legibilidade.

