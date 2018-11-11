
/**
 * Change color theme of the app
 * @param {Object} theme
 * @param {string} theme.mainColor
 * @param {string} theme.appBackgroundColor
 * @param {string} theme.appTextColor
 * @param {string} theme.btnColor
 * @param {string} theme.btnColorHover
 * @param {string} theme.btnBackgroundColor
 * @param {string} theme.btnBackgroundColorHover
 * @param {string} theme.btnToggleColor
 * @param {string} theme.btnToggleColorHover
 * @param {string} theme.btnToggleColorActive
 * @param {string} theme.btnToggleBackgroundColor
 * @param {string} theme.btnToggleBackgroundColorHover
 * @param {string} theme.btnToggleBackgroundColorActive
 * @param {string} theme.tableTrEvenBackgroundColor
 * @param {string} theme.easeTransparent
 * @param {string} theme.selectionColor
 * @param {string} theme.selectionBackgroundColor
 */
export const setColorTheme = (app, theme) => {
  app.style.setProperty("--app-color-main", theme.mainColor);
  app.style.setProperty("--app-background-color", theme.appBackgroundColor);
  app.style.setProperty("--app-text-color", theme.appTextColor);
  app.style.setProperty("--btn-color", theme.btnColor);
  app.style.setProperty("--btn-color-hover", theme.btnColorHover);
  app.style.setProperty("--btn-background-color", theme.btnBackgroundColor);
  app.style.setProperty("--btn-background-color-hover", theme.btnBackgroundColorHover);
  app.style.setProperty("--btn-toggle-color", theme.btnToggleColor);
  app.style.setProperty("--btn-toggle-color-hover", theme.btnToggleColorHover);
  app.style.setProperty("--btn-toggle-color-active", theme.btnToggleColorActive);
  app.style.setProperty("--btn-toggle-background-color", theme.btnToggleBackgroundColor);
  app.style.setProperty("--btn-toggle-background-color-hover", theme.btnToggleBackgroundColorHover);
  app.style.setProperty("--btn-toggle-background-color-active", theme.btnToggleBackgroundColorActive);
  app.style.setProperty("--table-tr-even-background-color", theme.tableTrEvenBackgroundColor);
  app.style.setProperty("--ease-transparent", theme.easeTransparent);
  app.style.setProperty("--selection-color", theme.selectionColor);
  app.style.setProperty("--selection-background-color", theme.selectionBackgroundColor);
};
