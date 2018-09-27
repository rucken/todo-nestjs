import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthEmptyComponent, OauthGuard, RuI18n as CoreRuI18n, translate } from '@rucken/core';
import { RuI18n as TodoCoreRuI18n } from '@rucken/todo-core';
import { RuI18n as TodoWebRuI18n } from '@rucken/todo-web';
import { RuI18n as WebRuI18n } from '@rucken/web';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale, ruLocale } from 'ngx-bootstrap/locale';
import { AppRoutes } from './app.routes';
import { RuI18n } from './i18n/ru.i18n';

library.add(fas, fab);

defineLocale('ru', ruLocale);
defineLocale('en', enGbLocale);

export const AppLangs = [
  {
    title: translate('Russian'),
    code: 'ru',
    translations: [WebRuI18n, CoreRuI18n, RuI18n, TodoWebRuI18n, TodoCoreRuI18n]
  },
  {
    title: translate('English'),
    code: 'en',
    translations: []
  }
];
export const ApplicationName = translate('Todo');
export const ApplicationDescription = translate(
  'Core with Admin UI for web and native application maked on Angular6+'
);

export function appMetaFactory(translateService: TranslateService): MetaLoader {
  return new MetaStaticLoader({
    callback: (key: string) => translateService.get(key),
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' - ',
    applicationName: ApplicationName,
    defaults: {
      title: ApplicationName,
      description: ApplicationDescription,
      'og:type': 'website',
      'og:locale': 'en_US',
      'og:locale:alternate': 'en_US,ru_RU'
    }
  });
}

export const OauthProviders = ['facebook', 'google-plus'];
export const OauthModalProviders = [
  {
    name: 'facebook',
    icon: ['fab', 'facebook-square'],
    signInTitle: translate('Sign in with Facebook')
  },
  {
    name: 'google-plus',
    icon: ['fab', 'google-plus'],
    signInTitle: translate('Sign in with Google+')
  }
];
export const OauthRoutes = [
  {
    path: 'auth/facebook',
    component: AuthEmptyComponent,
    canActivate: [OauthGuard],
    data: {
      oauth: {
        provider: 'facebook',
        redirectTo: {
          ifSuccess: '/home',
          ifFail: '/home'
        }
      }
    }
  },
  {
    path: 'auth/google-plus',
    component: AuthEmptyComponent,
    canActivate: [OauthGuard],
    data: {
      oauth: {
        provider: 'google-plus',
        redirectTo: {
          ifSuccess: '/home',
          ifFail: '/home'
        }
      }
    }
  }
];
export const AllRoutes = [...OauthRoutes, ...AppRoutes];
