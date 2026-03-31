---
name: release_pr_develop_main
description: help to create a pull request with template
argument-hint: Issue number, URL, or pasted issue details
disable-model-invocation: true
---

# Release PR: develop -> main

Skill para repetir o processo de release abrindo uma PR de `develop` para `main` com descrição padronizada baseada em commits.

## Quando usar

Use esta skill quando você quiser:

- Publicar uma release da `develop` para `main`
- Gerar automaticamente a descrição da PR com base no histórico de commits
- Manter consistência no template de PR de release

## Pré-requisitos

- Repositório com remotos configurados
- Branches `develop` e `main` existentes no `origin`
- Permissão para criar Pull Requests no GitHub
- MCP GitHub habilitado (ou `gh` CLI autenticado)

## Workflow

1. Atualizar referências remotas
2. Verificar se já existe PR aberta `develop -> main`
3. Coletar commits entre `origin/main..origin/develop`
4. Coletar estatísticas e arquivos alterados
5. Montar título e corpo da PR no template padrão
6. Criar PR apontando de `develop` para `main`

## Comandos de coleta (git)

```bash
git fetch origin
git log --no-merges --oneline origin/main..origin/develop
git diff --shortstat origin/main...origin/develop
git diff --name-status origin/main...origin/develop
```

## Template de PR (release)

Use este corpo como base, preenchendo com os dados coletados:

```md
## Summary

Release da branch `develop` para `main`, consolidando as mudanças listadas abaixo.

## Related Issue

- Itens relacionados (se houver): #...

## Type of Change

- [ ] Bug fix (non-breaking change fixing an issue)
- [x] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update
- [x] Refactoring (no functional changes)
- [ ] Performance improvement
- [ ] Test updates

## Changes Made

- ...
- ...
- ...

### Commits incluídos

- `<sha>` <mensagem>
- `<sha>` <mensagem>

### Diff summary

- `<N> files changed, <X> insertions(+), <Y> deletions(-)`

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [x] Manual testing performed

### Test Instructions

1. `npm run dev`
2. Validar principais rotas e fluxos alterados
3. Confirmar ausência de regressões visuais/funcionais

## Checklist

- [x] My code follows the project's style guidelines
- [x] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [x] I have updated the documentation
- [x] My changes generate no new warnings
- [ ] I have added tests proving my fix/feature works
- [ ] All new and existing tests pass
- [ ] Any dependent changes have been merged

## Additional Notes

- Release PR gerada a partir de `develop` para `main`.
```

## Título sugerido

```text
release: merge develop into main (YYYY-MM-DD)
```

## Regras de segurança

- Não criar PR duplicada se já existir uma aberta com a mesma base/head
- Não incluir commits de merge no resumo (`--no-merges`)
- Não inventar issues ou testes não executados

## Resultado esperado

Ao final, deve existir uma PR aberta:

- **base**: `main`
- **head**: `develop`
- **title**: padrão de release com data
- **body**: resumo, commits, diff summary, testes e checklist
