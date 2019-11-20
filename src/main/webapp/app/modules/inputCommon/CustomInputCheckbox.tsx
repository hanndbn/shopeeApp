import './inputCommon.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router-dom';
import { FORM_DEFINE } from 'app/config/constants';
import * as inputCommonAction from 'app/modules/inputCommon/inputCommon.reducer';
import cn from 'classnames';

// import { getCategory } from "app/shared/reducers/category";

export interface ICustomInputCheckbox extends StateProps, DispatchProps {
  formType: any;
  fieldName: any;
  setInputValue: Function;
  validateInputValue: Function;
}

export class CustomInputCheckbox extends React.Component<ICustomInputCheckbox> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { formType, fieldName, inputValue } = this.props;
    if (!formType || !fieldName || !FORM_DEFINE[ formType ] || !FORM_DEFINE[ formType ].fields.find(v => v.fieldName === fieldName)) return null;
    const formDefine = FORM_DEFINE[ formType ].fields.find(v => v.fieldName === fieldName);
    const {
      classWrapper = '',
      label = '',
      labelClass = '',
      isRevertLabel = false,
      inputName = null,
      inputClass = ''
    } = formDefine;
    const value = inputValue[ formType ] && inputValue[ formType ][ fieldName ] ? !!inputValue[ formType ][ fieldName ] : false;
    return (
      <div className={`mb-3 ${classWrapper}`}>
        <div className={cn('row no-gutters', { 'flex-row-reverse': isRevertLabel })}>
          <div className={`${inputClass} custom-input-checkbox`}
               onClick={() => this.props.setInputValue(formType, fieldName, !value)}
          >
            {value && <span className="checkmark"/>}
            <input type="hidden" name={inputName} value={value ? 1 : 0}/>
          </div>
          {label && <div className={`${isRevertLabel ? 'mr-2' : 'ml-2'} ${labelClass}`}>{label}</div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ inputCommon }: IRootState) => ({
  inputValue: inputCommon.inputValue
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setInputValue: (formType, field, value) => {
    dispatch(inputCommonAction.setInputValue(formType, field, value));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomInputCheckbox));
