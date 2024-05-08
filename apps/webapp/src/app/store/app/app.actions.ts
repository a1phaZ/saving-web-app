import { IAppState } from './app.state';

export class AppInit {
  static readonly type = '[App] Init';
}

export class AppInitSuccess {
  static readonly type = '[App] Init Success';
  constructor(public state: IAppState) {}
}

export class AppInitFail {
  static readonly type = '[App] Init Fail';
  constructor(public error: Error) {}
}
