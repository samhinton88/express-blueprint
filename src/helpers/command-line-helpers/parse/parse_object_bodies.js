'use strict'
import processConfig from './process_config';

export default function parseObjectBodies(objects) {
  return objects.map((o) => {
    // props deliniated by commas

    const props = o.filteredBody.split(',').map((prop) => {
      const [propName, propConfig] = prop.split(':');

      if (!propName) {
        return
      }

      if (!propConfig) {
        return { propName }
      }


      // options deliniated by semi-colon
      const config = processConfig(propConfig.split(';'), propName);

      return { ...config, propName }
    })
    .filter((p) => p !== undefined)


    return {...o, props }
  })
}
