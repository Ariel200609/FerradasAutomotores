/* globals fetch */

let cachedStyleSheets = null

export async function getSharedStyleSheets() {
  if (cachedStyleSheets) {
    return cachedStyleSheets
  }

  try {
    // Fetch both stylesheets
    const [mCssResponse, appCssResponse] = await Promise.all([
      fetch('./vendor/m-.css'),
      fetch('./components/app.css'),
    ])

    const [mCssText, appCssText] = await Promise.all([mCssResponse.text(), appCssResponse.text()])

    // Create CSSStyleSheet objects
    const mSheet = new CSSStyleSheet()
    const appSheet = new CSSStyleSheet()

    await Promise.all([mSheet.replace(mCssText), appSheet.replace(appCssText)])

    cachedStyleSheets = [mSheet, appSheet]
    return cachedStyleSheets
  } catch (error) {
    console.error('Failed to load shared stylesheets:', error)
    return []
  }
}
