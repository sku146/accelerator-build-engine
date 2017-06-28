import map from 'lodash/map';
import flattenDeep from 'lodash/flattenDeep';
import {
  getJourneys,
} from './common';
import {
  getBrandConfigs,
} from './branding';
import { ENV } from '../constants';

const getConfigs = (env = ENV.DEV) => {
  const journeys = getJourneys(env);
  return flattenDeep(map(journeys, journey => getBrandConfigs(env, journey)));
};

export default {
  getConfigs,
};
