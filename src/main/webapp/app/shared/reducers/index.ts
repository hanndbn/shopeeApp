import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';

import common, { CommonState } from 'app/shared/common/common.reducer';
import login, { LoginState } from 'app/modules/template/login.reducer';
import nhapDiem, { NhapDiemState } from 'app/modules/nhapdiem/nhapdiem.reducer';

/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly common: CommonState;

  readonly login: LoginState;
  readonly nhapDiem: NhapDiemState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  common,

  login,
  nhapDiem,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
