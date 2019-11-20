import './inputCommon.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router-dom';
import cn from 'classnames';
import { FORM_DEFINE } from 'app/config/constants';
import * as inputCommonAction from 'app/modules/inputCommon/inputCommon.reducer';
import $ from 'jquery';

// import { getCategory } from "app/shared/reducers/category";

export interface ICustomSelectProp extends StateProps, DispatchProps {
  formType: any;
  fieldName: any;
  selectData: any;
  isReadOnly: any;
  setInputValue: Function;
  validateInputValue: Function;
}

export class CustomSelect extends React.Component<ICustomSelectProp, { displayPopup: any; popupVisited: boolean }> {

  constructor(props) {
    super(props);
    this.state = { displayPopup: false, popupVisited: false };
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setDisplayPopup(displayPopup) {
    this.setState({
      ...this.state,
      displayPopup,
      popupVisited: true
    });
  }

  handleClickOutside(event) {
    const { formType, fieldName, inputValue } = this.props;
    const { displayPopup, popupVisited } = this.state;
    const wrapperRef = formType ? $(`#${formType}-${fieldName}`)[ 0 ] : null;
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      if (popupVisited && displayPopup) {
        const formDefine = FORM_DEFINE[ formType ] ? FORM_DEFINE[ formType ].fields.find(v => v.fieldName === fieldName) : null;
        if (formDefine) {
          const value = inputValue[ formType ] && inputValue[ formType ][ fieldName ] ? inputValue[ formType ][ fieldName ] : '';
          this.props.validateInputValue(formType, value, formDefine);
        }
      }
      this.setState({
        ...this.state,
        displayPopup: false
      });
    }
  }

  render() {
    const { formType, fieldName, inputValue, invalidFields } = this.props;
    if (!formType || !fieldName || !FORM_DEFINE[ formType ] || !FORM_DEFINE[ formType ].fields.find(v => v.fieldName === fieldName)) return null;
    const formDefine = FORM_DEFINE[ formType ].fields.find(v => v.fieldName === fieldName);
    const {
      classWrapper = '',
      label = '',
      labelClass = '',
      defaultLabel = 'Select',
      inputName = null,
      inputClass = ''
    } = formDefine;
    const selectData = this.props.selectData ? this.props.selectData : formDefine.selectData ? formDefine.selectData : [];
    const value = inputValue[ formType ] && inputValue[ formType ][ fieldName ] ? inputValue[ formType ][ fieldName ] : '';
    const selectedItem = selectData.find(v => value && v.value === value);
    const displayLabel = selectedItem ? selectedItem.label : defaultLabel;
    const errorMessage = invalidFields[ formType ] && invalidFields[ formType ][ fieldName ] ? invalidFields[ formType ][ fieldName ] : '';
    return (
      <div className={`${classWrapper} custom-select-container`}>
        <div className="row no-gutters">
          {
            label && <div className={`custom-select-label ${labelClass}`}>{label}</div>
          }
          <div className={inputClass} id={`${formType}-${fieldName}`}>
            <div className="custom-select-field" onClick={() => !this.props.isReadOnly && this.setDisplayPopup(true)}>
              <div className={cn('form-control',
                { 'is-focus': this.state.displayPopup,
                'is-invalid-input': !!errorMessage,
                  'readonly': this.props.isReadOnly
                })}>
                <div>{displayLabel}</div>
              </div>
              <div className="custom-select-icon"/>
            </div>
            {this.state.displayPopup && (
              <div className="custom-select-pop-up">
                {selectData &&
                selectData.map((v, idx) => {
                  const selected = value === v.value;
                  return (
                    <React.Fragment key={idx}>
                      <div className={cn('custom-select-item', { selected })}
                           onClick={() => {
                             this.props.setInputValue(formType, fieldName, v.value);
                             this.props.validateInputValue(formType, fieldName, formDefine);
                             this.setDisplayPopup(false);
                           }}
                      >
                        {v.label}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            )}
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
)(CustomSelect));
