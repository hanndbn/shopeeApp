import './home.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { setHeaderBackground } from 'app/shared/common/common.reducer';
import { withRouter } from 'react-router';
import { TITLE_HELMET } from 'app/config/constants';
import { Helmet } from 'react-helmet';
// import x2js from 'x2js';
var DOMParser = require('xmldom').DOMParser;
// const jsdom = require("jsdom");
// import { getCategory } from "app/shared/reducers/category";

export interface IHomeProp extends StateProps, DispatchProps {
  initScreen: Function;
  location: any;
}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.initScreen();
  }

  componentWillUnmount() {
  }

  render() {
    const input = `
    <mxGraphModel dx="1422" dy="836" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="2" value="23424" style="rounded=1;whiteSpace=wrap;html=1;fontSize=15;fillColor=#A680B8;glass=1;" vertex="1" parent="1">
          <mxGeometry x="110" y="140" width="120" height="60" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
    `;
    // const x2js1 = new x2js();
    const doc = new DOMParser().parseFromString(input, 'text/xml');
    console.log(doc);
    // const dom = new jsdom.JSDOM(input);
    // console.log(dom);

    // const parser = new htmlparser.Parser({}, { decodeEntities: true });
    // parser.write(input);
    // parser.end();
    // const output = parser.toXml(input);
    // const { JSDOM } = jsdom;
    // const output = new JSDOM().window.DOMParser.parseFromString(input, 'text/xml');
    // const output = xml2json('<e name="value">text</e>');
    const {} = this.props;
    return (
      <div className="">
        <Helmet>
          <title>{`${TITLE_HELMET}`}</title>
        </Helmet>
        {/*{JSON.stringify(output)}*/}
      </div>
    );
  }
}

const mapStateToProps = ({ common }: IRootState) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: async () => {
    dispatch(setHeaderBackground('transparent'));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));
