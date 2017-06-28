import fs from 'fs';
import sysPath from 'path';
import isEmpty from 'lodash/isEmpty';
import assignIn from 'lodash/assignIn';
import forEach from 'lodash/forEach';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import {
  development,
  production,
  packDevConfigs,
  packProdConfigs,
} from '../configs';
import { ENV, CLI_PATH, DEFAULT_VALUE } from '../constants';

const getEnvConfig = (env = ENV.DEV) => ((env === ENV.PROD) ? production : development);

const getEnvWebpack = (env = ENV.DEV) => ((env === ENV.PROD) ? packProdConfigs : packDevConfigs);

const getJourneys = (env = ENV.DEV) => {
  const configs = getEnvConfig(env);
  return configs.journeys || [];
};

const isJourneyActive = (env = ENV.DEV) => {
  const configs = getEnvConfig(env);
  return configs.journeys.length > 1;
};

const getBrands = (env = ENV.DEV) => {
  const configs = getEnvConfig(env);
  return configs.brands || [];
};

const isBrandActive = (env = ENV.DEV) => {
  const configs = getEnvConfig(env);
  return configs.brands.length > 0;
};

const getJourneyConfig = (env = ENV.DEV, journey = '') => {
  const configs = getEnvConfig(env);
  return configs[journey] || {};
};

const updateProperties = (oldProps = {}, newProps = {}) => {
  if (isEmpty(oldProps) && isEmpty(newProps)) {
    return null;
  }
  return assignIn(oldProps, newProps);
};

const isValidPath = (path = '') => {
  if (isEmpty(path)) {
    return false;
  }
  try {
    const stats = fs.lstatSync(path);
    return stats.isDirectory();
  } catch (e) {
    return false;
  }
};

const getFolderFilePath = (env = ENV.DEV, journey = '') => {
  const journeyConfig = getJourneyConfig(env, journey);
  const outputProps = journeyConfig.output || {};
  return outputProps.foldersFilesMap || {};
};

const getOutputPath = (data = {}, path = {}, outputPath = []) => {
  if (isEmpty(data)) {
    return outputPath;
  }
  forEach(data, (prop, key) => {
    if (isPlainObject(prop)) {
      const param = path.name || '';
      getOutputPath(prop, { name: `${param}${key}/` }, outputPath);
    } else if (isString(prop) && key !== 'styles') {
      const param = path.name || '';
      outputPath.push({
        path: `${param}${prop}`,
        ref: key,
      });
    }
  });
  return outputPath;
};

const getStyleOutputPath = (data = {}, path = {}, outputPath = []) => {
  if (isEmpty(data)) {
    return outputPath;
  }
  forEach(data, (prop, key) => {
    if (isPlainObject(prop)) {
      const param = path.name || '';
      getStyleOutputPath(prop, { name: `${param}${key}/` }, outputPath);
    } else if (isString(prop) && key === 'styles') {
      const param = path.name || '';
      outputPath.push({
        path: `${param}${prop}`,
        ref: key,
      });
    }
  });
  return outputPath;
};

const getVersionFilename = (env = ENV.PROD, basePath = '') => {
  if (env === ENV.DEV) {
    return '';
  }
  const rootPath = isEmpty(basePath) ? '' : `${basePath}/`;
  const filePath = `${rootPath}${CLI_PATH.RELEASE_PATH}${DEFAULT_VALUE.VERSION_NAME}`;

  return sysPath.resolve(process.cwd(), filePath);
};

const getJourneyBrandPath = (isActive, journey, brand) => {
  const journeyPath = (isActive && !isEmpty(journey)) ? `${journey}/` : '';
  const brandPath = isEmpty(brand) ? '' : `${brand}`;
  return `${journeyPath}${brandPath}`;
};

const getBaseOutputPath = (env = ENV.DEV, journey = '', brand = '') => {
  const configs = getEnvConfig(env);
  const journeyBrandPath = getJourneyBrandPath(isJourneyActive(env), journey, brand);
  const subpath = isEmpty(journeyBrandPath) ? '' : `/${journeyBrandPath}`;
  const rootPath = sysPath.resolve(process.cwd(), `${configs.output.root}`);
  return `${rootPath}${subpath}`;
};

const getReleaseVersionPath = (env = ENV.PROD) => {
  const configs = getEnvConfig(env);
  const path = (env === ENV.DEV) ? '' : `${CLI_PATH.RELEASE_PATH}`;
  return (env === ENV.PROD && !configs.noHash) ? `${path}[hash]/` : path;
};

export default {
  getEnvConfig,
  getEnvWebpack,
  getJourneyConfig,
  isJourneyActive,
  isBrandActive,
  getJourneys,
  getBrands,
  updateProperties,
  isValidPath,
  getFolderFilePath,
  getStyleOutputPath,
  getOutputPath,
  getReleaseVersionPath,
  getVersionFilename,
  getBaseOutputPath,
  getJourneyBrandPath,
};
