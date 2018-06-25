'use strict'
import resourceParse from './resource_parse';

module.exports = function CLI(input, activeBlueprint = {}) {
  let terminalInput =[];

  terminalInput = input.split(' ')

  const [verb, type] = terminalInput.slice(0,2);

  if (!['create', 'add', 'delete', 'cr'].includes(verb)) {
    // to do, render appropriate error
    return
  }



  let output = {};

  switch (true) {
    case verb === 'create' && type === 'resource' :
      output = resourceParse(terminalInput.slice(2), activeBlueprint);

      break

  }


  return output;
}
