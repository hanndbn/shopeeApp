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
  isReadOnly: any;
  setInputValue: Function;
  validateInputValue: Function;
}

export class CustomInputText extends React.Component<ICustomInputTextProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { formType, fieldName, inputValue, invalidFields } = this.props;
    if (!formType || !fieldName || !FORM_DEFINE[ formType ] || !FORM_DEFINE[ formType ].fields.find(v => v.fieldName === fieldName)) return null;
    const formDefine = FORM_DEFINE[ formType ].fields.find(v => v.fieldName === fieldName);
    const {
      classWrapper = '',
      label = '',
      labelClass = '',
      inputType = CONSTANTS.FORM_TYPE.TEXT,
      inputName = null,
      inputClass = '',
      inputReadOnly = false,
      inputPlaceHolder = null,
      inputMaxLength = null,
      typingPattern = '',
      required = false
    } = formDefine;
    const value = inputValue[ formType ] && inputValue[ formType ].hasOwnProperty(fieldName) ? inputValue[ formType ][ fieldName ] : '';
    const errorMessage = invalidFields[ formType ] && invalidFields[ formType ].hasOwnProperty(fieldName) ? invalidFields[ formType ][ fieldName ] : '';
    const isReadOnly = this.props.isReadOnly || inputReadOnly;
    return (
      <div className={classWrapper}>
        <div className="row no-gutters">
          {
            label && <div className={`custom-input-text-label ${required ? 'label-require' : ''} ${labelClass}`}>{label}</div>
          }
          <div className={`custom-input-text-container ${inputClass}`}>
            <input className={cn(`form-control`, {
              'is-invalid-input': !!errorMessage,
              'readonly': isReadOnly
            })}
                   type={inputType}
                   name={inputName}
                   placeholder={inputPlaceHolder}
                   maxLength={inputMaxLength}
                   value={value}
                   readOnly={isReadOnly}
                   onChange={e => {
                     if (e.target.value
                       && (typingPattern && !new RegExp(typingPattern).test(e.target.value))) {
                       return;
                     }
                     this.props.setInputValue(formType, fieldName, e.target.value);
                   }}
                   onBlur={e => !isReadOnly && this.props.validateInputValue(formType, e.target.value, formDefine)}
            />
            {
              errorMessage &&
              <div className="error-msg-wrapper">
                {errorMessage}
              </div>
            }
          </div>
        </div>
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
