const argv = require('yargs-parser')(process.argv.slice(4));
const APP_ENV = argv.env || 'dev';
const bundleAnalyz = argv.analyz

const STATICDOMAIN = process.env.APP_ENV === 'prod' ? '/' : ''

module.exports = {
  assetsPublicPath: APP_ENV === 'dev' ? '/' : `${STATICDOMAIN}/`,
  assetsSubDirectory: 'static',
  APP_ENV,
  extractCss: APP_ENV !== 'dev',
  bundleAnalyzerReport: bundleAnalyz ? true: false,
}