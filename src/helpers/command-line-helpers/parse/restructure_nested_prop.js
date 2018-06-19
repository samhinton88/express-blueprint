function nestAtLookup(memo={}, candidate) {
  console.log('nestAtLookup with memo', memo, 'candidate', candidate)
  const { scope, propName, props, atDepth } = candidate;

  if (atDepth === 1) {

    memo.propName = propName
    memo.props = props
    return
  } else if (memo.propName === scope[scope.length - 1]) {

    memo.props.push({ propName, props });
    return;

  } else if (scope.includes(memo.propName)) {

    const nestedObj = memo.props.find((p) => scope.includes(p.propName) )

    nestAtLookup(nestedObj, candidate);
  } else {
    return
  }
}

export default function restructureNestedProp(objects, memo = {}) {
  if (objects.length === 0) { return memo }
  const output = {};

  objects
    .sort((a, b) => a.atDepth > b.atDepth)
    .forEach((o) => { nestAtLookup(output, o)})

  return output;

}
