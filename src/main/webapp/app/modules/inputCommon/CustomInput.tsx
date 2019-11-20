import React from 'react';
import { CONSTANTS } from 'app/config/constants';
import CustomInputText from 'app/modules/inputCommon/CustomInputText';
import CustomInputCheckbox from 'app/modules/inputCommon/CustomInputCheckbox';
import CustomSelect from 'app/modules/inputCommon/CustomSelect';

export class CustomInput extends React.Component<{ fieldType: any }> {
  async componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    const { fieldType = CONSTANTS.FORM_TYPE.TEXT } = this.props;
    if (fieldType === CONSTANTS.FORM_TYPE.TEXT) {
      return <CustomInputText {...this.props}/>;
    } else if (fieldType === CONSTANTS.FORM_TYPE.CHECKBOX) {
      return <CustomInputCheckbox {...this.props}/>;
    } else if (fieldType === CONSTANTS.FORM_TYPE.SELECT) {
      return <CustomSelect {...this.props}/>;
    } else {
      return '';
    }
  }
}

export default CustomInput;
