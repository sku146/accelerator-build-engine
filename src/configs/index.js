import assignIn from 'lodash/assignIn';
import merge from 'webpack-merge';
import common from '../../__temp__/engine/common.config';
import devConfig from '../../__temp__/engine/development.config';
import prodConfig from '../../__temp__/engine/production.config';
import webpackBase from '../../__temp__/engine/webpack.base.config';
import webpackDev from '../../__temp__/engine/webpack.dev.config';
import webpackServer from '../../__temp__/engine/webpack.dev.server.config';
import webpackProd from '../../__temp__/engine/webpack.prod.config';
import eslintConfig from '../../__temp__/engine/eslint.config';

const development = assignIn({}, common, devConfig);
const production = assignIn({}, common, prodConfig);
const packDevConfigs = merge(webpackBase, webpackDev);
const packProdConfigs = merge(webpackBase, webpackProd);

export default {
  common,
  development,
  production,
  packDevConfigs,
  webpackServer,
  packProdConfigs,
  eslintConfig,
};
