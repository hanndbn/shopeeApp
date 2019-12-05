import React from 'react';
import './pdm.scss';
import { connect } from 'react-redux';
// import BScroll from '@better-scroll/core';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router';
import cn from 'classnames';
import * as infoModaAction from 'app/InfoModal/infoModal.reducer';
import { FORM_PATTERN, GENERATE_APP_API } from 'app/config/constants';
import axios from 'axios';

export interface IPdmProps extends StateProps, DispatchProps {
  pdmInfo: any;
  cardId: any;
  displayModalPDMSuccess: Function;
  displayModalPDMError: Function;
}

export class Pdm extends React.Component<IPdmProps, { packSelected: any, fullName: any, phoneNumber: any }> {
  constructor(props) {
    super(props);
    this.state = {
      packSelected: {},
      fullName: '',
      phoneNumber: ''
    };
  }

  componentDidMount() {
  }

  handleGenerateApp() {
    const packIds = [];
    this.props.pdmInfo && this.props.pdmInfo.map(v => {
      const packId = this.state.packSelected[ v.rowId ];
      if (packId) {
        packIds.push(packId);
      }
    });
    const data = {
      appId: this.props.appId,
      cardId: this.props.cardId,
      packIds,
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber
    };
    axios.post(GENERATE_APP_API, data)
      .then(response => {
        // handle success
        this.props.displayModalPDMSuccess(response.data.appName);
      })
      .catch(error => {
        // handle error
        this.props.displayModalPDMError();
      });
  }

  render() {
    const { pdmInfo } = this.props;
    let inValidSelected = false;
    pdmInfo && pdmInfo.map(v => {
      if (!this.state.packSelected[ v.rowId ]) {
        inValidSelected = true;
      }
    });
    const disabled = inValidSelected || !this.state.phoneNumber || !this.state.fullName;
    return (
      <div className="w-100 h-100 pdm-container">
        <div className="pdm-wrapper">
          <div className="pdm-title">
            Personalise Custom Design
          </div>
          {
            pdmInfo && pdmInfo.map((v, idx) => {
              const row = v.rowId;
              return (<div className="row d-flex no-gutters" key={idx}>
                <div className="col-12 pdm-subject">{v.rowName}</div>
                {
                  v.packs && v.packs.map((pack, idxPack) => {
                    const packId = pack.packId;
                    return (<div className={cn('pdm-pack', { selected: this.state.packSelected[ row ] === packId })} key={idxPack}
                                 onClick={() => {
                                   const packSelected = {
                                     ...this.state.packSelected,
                                     [ row ]: packId
                                   };
                                   this.setState({ packSelected });
                                 }}
                    >
                      <span className="pdm-pack-check"/>
                      <span>{pack.packName}</span>
                    </div>);
                  })
                }
              </div>);
            })
          }
          <div className="w-100 mb-3">
            <input className="form-control pdm-input" placeholder="Enter full name"
                   value={this.state.fullName}
                   onChange={e => {
                     this.setState({ fullName: e.target.value });
                   }}
            />
          </div>
          <div className="w-100 mb-3">
            <input className="form-control pdm-input" placeholder="Enter phone number"
                   value={this.state.phoneNumber}
                   onChange={e => {
                     if (e.target.value && (!new RegExp(FORM_PATTERN.NUMBER).test(e.target.value))) {
                       return;
                     }
                     this.setState({ phoneNumber: e.target.value });
                   }}
            />
          </div>
          <div className="w-100">
            <button className="btn btn-common btn-submit-pdm w-100" disabled={disabled}
                    onClick={() => this.handleGenerateApp()}
            >Request
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ home }: IRootState) => ({
  appId: home.appId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  displayModalPDMSuccess: appName => {
    dispatch(infoModaAction.displayModalPDMSuccess(appName));
  },
  displayModalPDMError: () => {
    dispatch(infoModaAction.displayModalPDMError());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Pdm));
