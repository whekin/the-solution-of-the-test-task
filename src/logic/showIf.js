/**
 * Show a thing if expression is true
 * @param  {boolean} expression
 * @param  {*} thing
 * @return {*|null}
 */
const showIf = (expression, thing) => {
  if (expression)
    return thing;
  return null;
};

export default showIf;
