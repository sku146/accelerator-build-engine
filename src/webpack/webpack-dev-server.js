/* eslint no-console: ["error", { allow: ["info", "error"] }] */
import webpack from 'webpack';
import chalk from 'chalk';
import merge from 'webpack-merge';
import WebpackDevServer from 'webpack-dev-server';
import devConfig from './webpack.dev.config';
import { common, webpackServer } from '../configs';

try {
  const port = common.port || 9001;
  const host = common.host || 'localhost';
  const protocol = common.protocol || 'http';
  const properties = merge(webpackServer, {
    stats: {
      colors: true,
      assets: false,
      source: false,
      timings: true,
      hash: false,
      version: false,
      chunkModules: false,
      chunkOrigins: true,
    },
  });
  const devServer = new WebpackDevServer(webpack(devConfig), properties);
  devServer.listen(port, host, (error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.info(chalk.green(`Listening to ${protocol}://${host}:${port}`));
  });
} catch (ex) {
  console.error(chalk.red(`The following error has ocurred: ${ex}`));
}
