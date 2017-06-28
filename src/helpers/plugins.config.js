import webpack from 'webpack';
import VersionTemplatePlugin from './plugins/version-template-plugin';

const common = [];

const development = [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  ...common,
];

const production = [
  ...common,
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    comments: false,
    compress: {
      warnings: false,
    },
  }),
];

export default {
  development,
  production,
  VersionTemplatePlugin,
};
