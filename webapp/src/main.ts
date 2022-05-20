export * from './elements';
import { Pot } from '@money-splitter/splitter';
export * from './app-root';
import '@polymer/paper-ripple';
import { Services } from './services';

Services.init();

console.log({ p: Pot.name });