'use strict'
import placeResourcesTopDown from './place_resources_top_down';

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
  // position canvas resources

  const { blueprints, activeBlueprintId } = this.props;

  if (!blueprints || !activeBlueprintId) { return }

  const {resources} = blueprints.find((bp) => bp._id === activeBlueprintId)

  const initialResourceGeometry = placeResourcesTopDown(resources);

  if (!initialResourceGeometry) { return }
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



