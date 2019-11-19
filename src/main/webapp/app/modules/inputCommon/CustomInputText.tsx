import './inputCommon.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router-dom';
import cn from 'classnames';

// import { getCategory } from "app/shared/reducers/category";

export interface ICustomInputTextProp extends StateProps, DispatchProps {
}

export class CustomInputText extends React.Component<ICustomInputTextProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { inputType, errorMessage } = this.props;
    return (
      <div className="custom-input-text-container">
        <input className={cn('form-control', 'is-invalid-input' : validateInput[ formType ] && validateInput[ formType ][ field_name ])} type={inputType}/>
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

const mapStateToProps = ({}: IRootState) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomInputText));
