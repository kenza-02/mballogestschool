import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppInjector } from './app/service/injector';


platformBrowserDynamic().bootstrapModule(AppModule)
  .then((moduleRef:any)=>{AppInjector.setInjector(moduleRef.injector);})
  .catch(err => console.error(err));
