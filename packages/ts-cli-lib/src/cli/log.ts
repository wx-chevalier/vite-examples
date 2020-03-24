import * as chalk from 'chalk';
import * as emoji from 'node-emoji';

export const log = console.log; // eslint-disable-line no-console
export const logError = (s: string) => log(emoji.emojify(chalk.bold.red(s)));
export const logInfo = (s: string) => log(emoji.emojify(chalk.bold(s)));
export const logDetail = (s: string) => log(emoji.emojify(chalk.dim(s)));
