import { prompt as ask } from 'inquirer';

import { logInfo } from './log';

export async function askName(): Promise<string> {
  logInfo(':wave:  Hello stranger!');
  const { name } = await ask([
    {
      type: 'input',
      name: 'name',
      message: "What's your name?",
    },
  ]);
  return name;
}
