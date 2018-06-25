'use strict'
import checkNamespace from './linter-helpers/check_namespace';
import checkSyntax from './linter-helpers/check_syntax';
import checkTypelessProps from './linter-helpers/check_typeless_props';
import checkUnusedRefs from './linter-helpers/check_unused_refs';


export default function linter(input, config, blueprint) {
  // consider activeBlueprint to be the namespace in which the linter operates
  // config contains mapped reserved words, verbs, styling etc.

  if (!config) {
    config = {
      namespace: blueprint,
      reservedWords: {
        verbs: {
          create: { validNouns: ['resource', 'blueprint']},
          add: { validNouns: ['prop', 'ref', 'controller'] },
          read: { expectsUserNamedResource: true },
          delete: { expectsUserNamedResource: true },

        },
        storeRawVerbs: function() { this.rawVerbs = Object.keys(this.verbs) },
        nouns: {
          resource: {},
          blueprint: {},
          prop: {},
          controller: {},
          ref: {}
        },
        storeRawNouns: function() { this.rawNouns = Object.keys(this.nouns) }
      }
    }
  }

  config.reservedWords.storeRawVerbs();
  config.reservedWords.storeRawNouns();

  const tokens = input.split(' ');

  let output = {};

  // check for syntax errors
  output = checkSyntax(output, tokens, config)
  // check for namespace errors
  output = checkNamespace(output, tokens, config)
  // check for unused refs
  output = checkUnusedRefs(output, tokens, config)
  // check for props without types
  output = checkTypelessProps(output, tokens, config)
  // return warnings / errors

  output.aggregatedErrors = function() {
    const aggregatedErrors = [];
    for (let errorGroup in this) {

      if (typeof this[errorGroup] !== 'function') {
        this[errorGroup].forEach((e) => aggregatedErrors.push(e))
      }
    }
    return aggregatedErrors.filter((e) => e !== undefined);
  }


  return output;
}
