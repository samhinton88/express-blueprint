import linter from './linter';


test('checks for syntax errors', () => {

  const candidate = linter('user create');

  expect(candidate.syntaxErrors).not.toBeUndefined();
  expect(candidate.syntaxErrors.verbErrors)
    .toEqual(
      [
        { error: 'bad command', message: 'user is not a valid command' },
        { error: 'command not at start', message: 'create command should be at the start of command line'}
      ])
})
