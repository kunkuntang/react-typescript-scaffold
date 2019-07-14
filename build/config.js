const argv = require('yargs-parser')(process.argv.slice(4));
const APP_ENV = argv.env || 'dev';
const bundleAnalyz = argv.analyz

process.env.APP_ENV = APP_ENV

const STATICDOMAIN = APP_ENV === 'prod' ? 'http://huawei.lenkuntang.cn/test-react-typescript/dist/' : ''

module.exports = {
  assetsPublicPath: APP_ENV === 'dev' ? '/' : `${STATICDOMAIN}/`,
  assetsSubDirectory: 'static',
  APP_ENV,
  extractCss: APP_ENV !== 'dev',
  bundleAnalyzerReport: bundleAnalyz ? true: false,
}