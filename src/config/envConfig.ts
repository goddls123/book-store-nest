import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = `.env.${process.env.NODE_ENV}.yml`;

const nodeEnv: any = yaml.load(
  readFileSync(join(process.cwd(), 'env', YAML_CONFIG_FILENAME), 'utf8'),
) as Record<string, any>;

const envConfig = yaml.load(
  readFileSync(join(process.cwd(), 'env', '.env.yml'), 'utf8'),
) as Record<string, any>;

const ynv = Object.assign(nodeEnv, envConfig);
export default ynv;
