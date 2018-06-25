export default function place_resources_top_down(resources) {
  if (resources.length === 0) { return }

  const output = []

  resources.forEach((r) => {
    r.totalNestedReferencedCount = 0;
    r.referencedBy = [];
    r.distanceFromTop = 0;
  })

  populateReferencedBy(resources);

  // register cummulative referee counts on each resource
  resources.forEach((r) => {
    const accumulator = getReffedByCount(r)

    r.totalNestedReferencedCount = accumulator;

  });

  resources
    .filter((r) => {
      if (!r.refs) {return }
      return r.refs.length === 0
    })
    .forEach((topLevelResource) => assignDepths(topLevelResource));


  // highly referenced resources placed higher and more centrally
  const rows = resources
    .map((r) => r.distanceFromTop)
    .filter((val, i, arr) => arr.indexOf(val) === i)
    .sort((a, b) => a > b)
    .map((strata) => {

      return resources.filter((r) => r.distanceFromTop === strata)
    })


  rows.forEach((row, rowIndex, rowArray) => {

    row.forEach((resource, resourceIndex) => {

      const { totalNestedReferencedCount, resourceName, props } = resource;

      output.push(
        {
          cx: (1000 / (row.length + 1)) * (resourceIndex + 1),
          cy: (rowIndex + 1) * 100,
          r: 25 + resource.totalNestedReferencedCount * 5,
          resourceName,
          props
        }
      )

    })
  })
  return output;
}


function populateReferencedBy(resources) {

  resources.forEach((r, _i, arr) => {
    // is resource present in any other resource's refs array
    const { resourceName } = r;

    arr
      .filter((res) => {
        if (!res.refs) { return }
        return res.refs.map((ref) => ref.refName).includes(resourceName)
      })
      .forEach((referee) => {
        r.referencedBy.push(referee)
      })
  });
}


function getReffedByCount(resource, accumulator = 0, distanceFromTop = 0) {

  if (!resource.referencedBy) { return }

  if (!resource.referencedBy.length) {
    // end point
    return accumulator
  };


  // look at each referee to get nested count
  resource.referencedBy.forEach((referee) => {
    // calculate recursively and reset accumulator

    accumulator += getReffedByCount(referee, 0, distanceFromTop)

  })

  // add the number of referees to overall count
  accumulator += resource.referencedBy.length;



  return accumulator
}

function assignDepths(resource, depth = 0 ) {
  const { referencedBy } = resource;

  if(!resource || !referencedBy) { return }

  resource.distanceFromTop = depth;

  // end point
  referencedBy.forEach((referee) => assignDepths(referee, depth + 1))
  return
}
