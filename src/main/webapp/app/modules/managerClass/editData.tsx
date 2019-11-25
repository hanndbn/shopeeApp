import './managerClass.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router';
import { FORM_DEFINE } from 'app/config/constants';
import CustomInput from 'app/modules/inputCommon/CustomInput';
import * as managerClassAction from 'app/modules/managerClass/managerClass.reducer';

// import { getCategory } from "app/shared/reducers/category";

export interface IEditDataProp extends StateProps, DispatchProps {
  initDetailScreen: Function;
  submitData: Function;
  history: any;
  location: any;
  match: any;
}

export class EditData extends React.Component<IEditDataProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.initDetailScreen();
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<IEditDataProp>, prevState: Readonly<{}>): any | null {
    if (prevProps.match.params.activeId !== this.props.match.params.activeId) {
      this.props.initDetailScreen();
    }
    return null;
  }

  componentDidUpdate(prevProps: Readonly<IEditDataProp>, prevState: Readonly<{}>, snapshot?: any): void {
  }

  render() {
    // const { managerClassData, loading } = this.props;

    return (
      <div className="edit-container w-100">
        <div className="row no-gutters">
          <div className="col-12 text-center edit-title">
            THÔNG TIN LỚP HỌC
          </div>
          {FORM_DEFINE.FORM_MANAGER_CLASS.fields.map((v, idx) => {
              const data = {
                fieldType: v.fieldType,
                formType: FORM_DEFINE.FORM_MANAGER_CLASS.id,
                fieldName: v.fieldName
              };
              if (v.fieldName === 'teacherManage') {
                const selectData = [];
                const teacherManagerData = this.props.referData[ 'teacherManager' ] ? this.props.referData[ 'teacherManager' ] : [];
                teacherManagerData.map(k => {
                  selectData.push({
                    label: k.nameTeacher,
                    value: k.teacherId
                  });
                });
                data[ 'selectData' ] = selectData;
              }
              return (
                <CustomInput key={idx} {...data}/>
              );
            }
          )}
          <div className="col-12 text-center mt-4">
            <div className="edit-action-wrapper">
              <button className="btn edit-action-btn edit-action-cancel"
                      onClick={() => this.props.history.goBack()}
              >Hủy
              </button>
              <button className="btn edit-action-btn edit-action-submit"
                      onClick={() => this.props.submitData()}
              >Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ managerClass }: IRootState) => ({
  managerClassData: managerClass.managerClassData,
  loading: managerClass.loading,
  referData: managerClass.referData
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initDetailScreen: async () => {
    await dispatch(managerClassAction.getReferData());
    const activeId = ownProps.match.params.activeId;
    await dispatch(managerClassAction.requestManagerClassDetailData(activeId));
  },
  submitData: () => {
    dispatch(managerClassAction.submitData(history));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EditData));
