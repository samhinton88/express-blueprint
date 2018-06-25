export default function checkNamespace(output, input, config) {
  console.log('in checkNamespace')
  let nameSpaceErrors = [];

  const { namespace } = config;

  if (namespace === undefined) {
    return {
      ...output,
      nameSpaceErrors
    }
  }
  const command = input[0];


  const resourceNames = namespace.resources.map((r) => r.resourceName);

  console.log('resourceNames in checkNamespace', resourceNames)
  console.log('input[1]', input[1])

  // two resources with same name
  if (
    command === 'create'
    && input[1] === 'resource'
    && resourceNames.includes(input[2])
  ) {
    nameSpaceErrors.push({
      message: `${input[1]} already exists, creating a resource of the same name will overwrite it`,
      error: 'namespace clash'
    })
  }

  // verbs which throw error if applied to non-existent nouns
  if (
    ['read', 'delete'].includes(command)
    && !resourceNames.includes(input[1])
  ) {
    nameSpaceErrors.push({
      blocking: true,
      error: 'not found',
      message: `object "${input[1]}" not found, cannot ${command}`
    })
  }



  return {
    ...output,
    nameSpaceErrors
  }

}
