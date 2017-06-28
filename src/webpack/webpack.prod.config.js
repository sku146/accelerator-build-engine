import { getConfigs } from '../utils';
import { ENV } from '../constants';

export default [
  ...getConfigs(ENV.PROD),
];
