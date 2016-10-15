const vm = require('vm')

const regex = /`/gm

function escape (template) {
  return `\`${template.replace(regex, '\\`')}\``
}

function compile (template, defaultContext) {
  if (typeof template !== 'string') {
    throw new Error('Template must be string')
  }
  const script = new vm.Script(escape(template))
  return (context) => script.runInNewContext(Object.assign({}, defaultContext, context))
}

module.exports = compile
module.exports.default = compile
