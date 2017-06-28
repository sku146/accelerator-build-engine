import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackMerge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import utils from './utils';
import helpers from './helpers';
import constants from './constants';

export default {
  webpackMerge,
  HtmlWebpackPlugin,
  webpack,
  ExtractTextPlugin,
  ...utils,
  ...helpers,
  ...constants,
};
