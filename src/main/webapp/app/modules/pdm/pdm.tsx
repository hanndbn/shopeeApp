import React from 'react';
import './pdm.scss';
import { connect } from 'react-redux';
// import BScroll from '@better-scroll/core';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router';
import cn from 'classnames';

export interface IPdmProps extends StateProps, DispatchProps {
  pdmInfo: any;
  location: any;
}

export class Pdm extends React.Component<IPdmProps, { packSelected: any }> {
  constructor(props) {
    super(props);
    this.state = {
      packSelected: {}
    };
  }

  componentDidMount() {
  }

  render() {
    const { pdmInfo } = this.props;
    let disabled = false;
    pdmInfo && pdmInfo.map(v => {
      if (!this.state.packSelected[ v.rowId ]) {
        disabled = true;
      }
    });
    return (
      <div className="w-100 h-100 pdm-container">
        {
          pdmInfo && pdmInfo.map((v, idx) => {
            const row = v.rowId;
            return (<div className="row d-flex no-gutters" key={idx}>
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
                  >{pack.packName}</div>);
                })
              }
            </div>);
          })
        }
        <div className="w-100">
          <button className="btn btn-common btn-submit" disabled={disabled}>Request</button>
        </div>
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
)(Pdm));
