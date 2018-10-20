/**
 * Return a thing if expression is true and if false then return elseThing or null
 * @param  {boolean} expression
 * @param  {*} thing
 * @return {*|null}
 */
const showIf = (expression, thing, elseThing = null) => {
  if (expression)
    return thing;
  return elseThing;
};

export default showIf;
