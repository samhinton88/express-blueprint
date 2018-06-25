import parseProps from '../../parse/parse_props';

export default function checkUnusedRefs(output, input, config) {
  console.log('inside checkUnusedRefs')
  let unusedRefsErrors = [];

  const { namespace } = config;

  if (!namespace) {
    return {
      ...output,
      unusedRefsErrors
    }
  }


  const detectedProps = input.slice(3);
  const resourceNames = namespace.resources.map((r) => r.resourceName)

  if (detectedProps.length !== 0) {

    unusedRefsErrors = detectedProps.map((dp) => {
      const prop = parseProps({},dp);
      console.log('prop in checkUnusedRefs', prop)

      if (prop.ref) {
        if (!resourceNames.includes(prop.ref)) {
          return { error: 'unused ref', message: `prop: "${prop.propName}" references a resource (${prop.ref}) which does not exist`}
        }
      }
    })
  }

  return {
    ...output,
    unusedRefsErrors
  }
}
