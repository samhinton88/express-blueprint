import parseProps from '../../parse/parse_props';

export default function checkTypelessProps(output, input, config) {
  console.log('in checkTypelessProps')
  let typelessPropsErrors = [];

  const detectedProps = input.slice(3);
  console.log('detectedProps in checkTypelessProps', detectedProps)
  console.log('length of detectedProps', detectedProps.length)
  if (detectedProps.length !== 0) {
    console.log('in if block with', detectedProps)
    console.log('parseProps in checkTypelessProps', parseProps({}, detectedProps[0]))
    typelessPropsErrors = detectedProps.map((dp) => {
      const prop = parseProps({}, dp)
      if (!prop.type) {
        return { erro: 'typeless prop', message: `prop "${prop.propName}" has no type, printed schema will assign its type to null` }
      }
    })

  }

  return {
    ...output,
    typelessPropsErrors
  }
}
