const SriPlugin = require('webpack-subresource-integrity');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

module.exports = function override(config, env) {
  config.output.crossOriginLoading = 'anonymous';
  config.plugins.push(
    new SriPlugin({
      hashFuncNames: ['sha384'],
    }),
  );

  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
      new CspHtmlWebpackPlugin({
        'base-uri': "'none'",
        'default-src': "'none'",
        'script-src': "'self'",
        'style-src': "'unsafe-inline'",
        'img-src': "'self'",
      }, {
        nonceEnabled: {
          'script-src': false,
          'style-src': false,
        },
      }),
    );
  }

  return config;
};
