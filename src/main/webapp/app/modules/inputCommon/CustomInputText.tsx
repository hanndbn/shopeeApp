import './inputCommon.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router-dom';
import cn from 'classnames';
import { CONSTANTS, FORM_DEFINE } from 'app/config/constants';
import * as inputCommonAction from 'app/modules/inputCommon/inputCommon.reducer';

// import { getCategory } from "app/shared/reducers/category";

export interface ICustomInputTextProp extends StateProps, DispatchProps {
  formType: any;
  fieldName: any;
  setInputValue: Function;
  validateInputValue: Function;
}

export class CustomInputText extends React.Component<ICustomInputTextProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { formType, fieldName, inputValue, invalidFields } = this.props;
    if (!formType || !fieldName || !FORM_DEFINE[ formType ] || !FORM_DEFINE[ formType ].find(v => v.fieldName === fieldName)) return null;
    const formDefine = FORM_DEFINE[ formType ].find(v => v.fieldName === fieldName);
    const {
      id = null,
      name = null,
      type = CONSTANTS.FORM_TYPE.TEXT,
      className = '',
      placeholder = null,
      maxLength = null,
      validatePatternInput = ''
    } = formDefine;
    const value = inputValue[ formType ] && inputValue[ formType ][ fieldName ] ? inputValue[ formType ][ fieldName ] : '';
    const errorMessage = invalidFields[ formType ] && invalidFields[ formType ][ fieldName ] ? invalidFields[ formType ][ fieldName ] : '';
    return (
      <div className="custom-input-text-container">
        <input className={cn(`form-control ${className}`, { 'is-invalid-input': !!errorMessage })}
               type={type}
               id={id}
               name={name}
               placeholder={placeholder}
               maxLength={maxLength}
               value={value}
               onChange={e => {
                 if (e.target.value
                   && (validatePatternInput && !new RegExp(validatePatternInput).test(e.target.value))) {
                   return;
                 }
                 this.props.setInputValue(formType, fieldName, e.target.value);
               }}
               onBlur={e => this.props.validateInputValue(formType, e.target.value, formDefine)}
        />
        {
          errorMessage &&
          <div className="error-msg-wrapper">
            {errorMessage}
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ inputCommon }: IRootState) => ({
  inputValue: inputCommon.inputValue,
  invalidFields: inputCommon.invalidFields
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setInputValue: (formType, field, value) => {
    dispatch(inputCommonAction.setInputValue(formType, field, value));
  },
  validateInputValue: (formType, fieldValue, fieldDefine) => {
    dispatch(inputCommonAction.validateInputValue(formType, fieldValue, fieldDefine));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomInputText));
