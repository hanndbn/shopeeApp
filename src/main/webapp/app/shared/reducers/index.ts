import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';

import common, { CommonState } from 'app/shared/common/common.reducer';
import login, { LoginState } from 'app/modules/login/login.reducer';
import inputCommon, { InputCommonState } from 'app/modules/inputCommon/inputCommon.reducer';
import nhapDiem, { NhapDiemState } from 'app/modules/nhapdiem/nhapdiem.reducer';
import managerClass, { ManagerClassState } from 'app/modules/managerClass/managerClass.reducer';
import userInfo, { UserInfoState } from 'app/modules/userInfo/userInfo.reducer';
import infoModal, { InfoModalState } from 'app/shared/InfoModal/infoModal.reducer';

/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly common: CommonState;
  readonly inputCommon: InputCommonState;
  readonly infoModal: InfoModalState;

  readonly login: LoginState;

  // giao vien
  readonly nhapDiem: NhapDiemState;
  readonly managerClass: ManagerClassState;

  readonly userInfo: UserInfoState;

  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  common,
  inputCommon,
  infoModal,
  login,

  nhapDiem,
  managerClass,

  userInfo,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
