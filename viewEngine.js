const hbs = require("hbs");
const cond = require("handlebars-cond").cond;
const dateFormat = require("handlebars-dateformat");
const forLoop = (from, to, incr, block) => {
  let accum = '';
  for(let i = from; i < to; i += incr)
    accum += block.fn(i);
  return accum;
};
const substringHepler = (passedString, startstring, endstring) => {
  var theString = passedString.substring(startstring, endstring);
  return new hbs.SafeString(theString)
};
hbs.registerHelper('cond', cond);
hbs.registerHelper('for', forLoop);
hbs.registerHelper('dateFormat', dateFormat);
hbs.registerHelper('substring', substringHepler);

module.exports = hbs;