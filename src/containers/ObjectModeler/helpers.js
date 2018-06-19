export const lookupProps = function(object, lookup) {
  // props on nested object are stored in an array at props
  let candidate = object;

  console.log('object lookupin lookupProps helper',object, lookup)


  if (lookup.length === 0) { return object.props }

  for (let i=0; i<lookup.length; i++) {

    if (!candidate.props) {
      return candidate;
    }

    candidate = candidate.props.find((p) => p.propName === lookup[i])
  }

  return candidate.props ? candidate.props : candidate;
}
