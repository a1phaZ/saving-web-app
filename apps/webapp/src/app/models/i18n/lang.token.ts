import { InjectionToken } from "@angular/core";

export const DEFAULT_LANG = new InjectionToken<string>('defaultLang', {
    factory: () => 'en'
});
