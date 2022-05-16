export * from './elements';
import { Pot } from '@money-splitter/splitter';
export * from './app-root';
import '@polymer/paper-ripple';

import { Services } from './services';

Services.storage.storageSet.currentTheme = 1;
console.log(Services.storage.storage);

console.log({p: Pot.name});