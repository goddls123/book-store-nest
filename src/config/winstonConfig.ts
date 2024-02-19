import * as Transport from 'winston-transport';
import * as winstonDaily from 'winston-daily-rotate-file';
import * as winston from 'winston';
import ynv from './envConfig';
import CustomLogger from 'src/common/logger';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { WinstonModule } from 'nest-winston';

const LOG_COLORS = ['🟩', '🟧', '🟦', '🟪', '🟥', '🟨'];

const customLogging = (label: string) => {
  const colorize = winston.format.colorize();
  const tmpplateFunction = (d) => {
    const title = colorize.colorize('verbose', 'bookStore');
    const timeStamp = colorize.colorize('silly', d.timestamp);
    const level = colorize.colorize(d.level, d.level);
    const message = colorize.colorize(d.level, d.message);

    const context = label
      ? colorize.colorize('warn', `[${label}]`)
      : d.context
        ? colorize.colorize('warn', `[${d.context}]`)
        : '';
    return `[${title}] ${level} ${timeStamp} ${context} ${message}`;
  };
  const format = 'YYYY-MM-DD HH:mm::ss';
  return winston.format.combine(
    winston.format.timestamp({ format }),
    winston.format.prettyPrint({ colorize: true }),
    winston.format.printf(tmpplateFunction),
  );
};
const winstonFile: Transport = new winstonDaily({
  format: winston.format.printf((d) => {
    const graphqlUrl = `${ynv.server.host}:${ynv.server.port}/graphql`;

    d['timestamp'] = new Date().toISOString();
    let ty = '📃';
    const strMsg = d.message.toString();
    const strContext = d['context'];
    if (strMsg?.startsWith(`${graphqlUrl}?query`)) ty = '🌏';
    if (strMsg?.startsWith(`query: `)) ty = '📘';
    if (strMsg?.startsWith(`🔵 GRAPHQL 🔵`)) ty = '🌞';
    if (strMsg?.startsWith(`🔴 GRAPHQL 🔴`)) ty = '🌜';
    if (strContext === 'InstanceLoader') ty = '👨‍🔧';
    d = { ic: CustomLogger.color || '⬜', ty, ...d } as any;
    return JSON.stringify(d);
  }),
  level: 'silly',
  datePattern: 'YYYY-MM-DD',
  dirname: 'logs',
  filename: `%DATE%.log`,
  maxFiles: 30, //30일치 로그파일 저장
});

const winstonConsole = (label?: string): Transport =>
  new winston.transports.Console({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
    format:
      process.env.NODE_ENV === 'production'
        ? winston.format.timestamp()
        : customLogging(label),
  });
const winstonConfig: NestApplicationContextOptions = {
  logger: WinstonModule.createLogger({
    transports: [winstonConsole(), winstonFile],
  }),
};

export { winstonConfig };
