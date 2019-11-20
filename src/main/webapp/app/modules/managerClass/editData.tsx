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
  initScreen: Function;
  location: any;
}

export class EditData extends React.Component<IEditDataProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.initScreen();
  }

  render() {
    const { managerClassData, loading } = this.props;
    return (
      <div className="edit-container w-100">
        <div className="row no-gutters">
          {FORM_DEFINE.FORM_MANAGER_CLASS.fields.map((v, idx) =>
            <CustomInput key={idx}
                         {...{
                           fieldType: v.fieldType,
                           formType: FORM_DEFINE.FORM_MANAGER_CLASS.id,
                           fieldName: v.fieldName
                         }}/>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ common, managerClass }: IRootState) => ({
  managerClassData: managerClass.managerClassData,
  loading: managerClass.loading,
  pagination: managerClass.pagination
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
    dispatch(managerClassAction.requestManagerClassDetailData());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EditData));
