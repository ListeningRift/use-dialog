'use strict'

module.exports = {
  types: [
    { value: 'feat', name: 'feat:     A new feature' },
    { value: 'fix', name: 'fix:      A bug fix' },
    { value: 'style', name: 'style:    Markup, white-space, formatting, missing semi-colons...' },
    { value: 'merge', name: 'merge:    Merge conflict' },
    { value: 'refactor', name: 'refactor: A code change that neither fixes a bug or adds a feature' },
    { value: 'perf', name: 'perf:     A code change that improves performance' },
    { value: 'patch', name: 'patch:    A patch commit' },
    { value: 'test', name: 'test:     Adding missing tests' },
    { value: 'docs', name: 'docs:     Documentation only changes' },
    { value: 'chore', name: 'chore:    Build process or auxiliary tool changes' },
    { value: 'init', name: 'init:     Initial project' },
    { value: 'revert', name: 'revert:   Revert to a commit' },
    { value: 'release', name: 'release:  Create a release commit' }
  ],
  // override the messages, defaults are as follows
  messages: {
    type: 'Select the type of change that you\'re committing:',
    customScope: 'Select the scope this component affects:',
    subject: 'Write a short, imperative mood description of the change:\n',
    body: 'Provide a longer description of the change:\n ',
    breaking: 'List any breaking changes:\n',
    footer: 'Issues this commit closes, e.g #123:',
    confirmCommit: 'The packages that this commit has affected(y/n/e/h)\n'
  },
  allowCustomScopes: true,
  skipQuestions: ['scope', 'body', 'footer'],
  subjectLimit: 100
}
