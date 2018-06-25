export default function checkSyntax(output, input, config) {
  let syntaxErrors = [];
  if (input.length < 2) {
    return {
      ...output,
      syntaxErrors
    }
  }

  const { reservedWords, reservedWords: {rawVerbs, verbs} } = config;



  // input starts with a valid verb
  syntaxErrors = input.map((token, i, arr) => {
    console.log('in syntax erros map with token', token, 'index', i, 'array', arr)


    if (!rawVerbs.includes(token) && i === 0) {
      return {
        error: 'bad command',
        message: `${token} is not a valid command`,
        blocking: true
      }
    }

    if (rawVerbs.includes(token) && i !== 0) {
      return {
        error: 'command not at start',
        message: `${token} command should be at the start of command line`,
        blocking: true
      }
    }

    if (
      verbs[arr[0]]
      && arr.length > 1
      && i === 1
      && !verbs[arr[0]].expectsUserNamedResource
      && !verbs[arr[0]].validNouns.includes(token)

    ) {
      console.log('into invalid noun block')
        return {
          error: 'invalid noun',
          message: `you cannot combine command ${arr[0]} with ${token}`,
          blocking: true
        }
    }
  })
  .filter((m) => m !== undefined)


  console.log('GOTTHROUGHSYNTAX')

  return {
    ...output,
    syntaxErrors
  }
}


// { error: 'name', message: 'a message'}
