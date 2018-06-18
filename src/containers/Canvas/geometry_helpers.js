export const advanceFrame = function () {
  const { timer, resourcePositions } = this.state;


  const newPositions = resourcePositions.map((res, i) => {
    const { cx, cy, r } = res;

    const newPosition = {
      ...res,
      cy: cy - (Math.sin(timer) / 2)
    }


    return newPosition

  })

  const resourceMap = {};

  newPositions.forEach((np) => {
    resourceMap[np.resourceName] = np;
  })

  this.setState({ resourcePositions: newPositions, resourceMap })
}

export const getInitialGeometry = function () {
  const { blueprints, activeBlueprintId } = this.props;

  if (!blueprints || !activeBlueprintId) { return }

  const {resources} = blueprints.find((bp) => bp._id === activeBlueprintId)

  console.log(resources)

  const initialResourceGeometry =  resources.map((res, i) => {
    const sizeMultiplier = res.props ? res.props.length : 1
    const { resourceName, props} = res;

    const randomYDisplacement = Math.random() * (150 - 0) + 0;

    return {
      cx: (1000 / (resources.length + 1))  * (i + 1),
      cy: 250 + randomYDisplacement,
      r: sizeMultiplier + 20,
      resourceName,
      props

    }
  })

  const resourceMap = {};

  initialResourceGeometry.forEach((r) => {
    resourceMap[r.resourceName] = r;
  })

  this.setState({resourcePositions: initialResourceGeometry, resourceMap})
}

export const mapRelations = function () {
  const { blueprints, activeBlueprintId } = this.props;

  if (!blueprints || !activeBlueprintId) { return }

  const { resources } = blueprints.find((bp) => bp._id === activeBlueprintId)

  const relations = [];

  resources.forEach((res) => {
    if (res.refs) {
      res.refs.forEach((ref) => relations.push(
        [res.resourceName, ref.refName]
      ))
    }
  })

  this.setState({relations})
}



