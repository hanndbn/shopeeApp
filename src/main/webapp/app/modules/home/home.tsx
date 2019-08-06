import './home.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { setHeaderBackground } from 'app/shared/common/common.reducer';
import { withRouter } from 'react-router';
import { TITLE_HELMET } from 'app/config/constants';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
// import x2js from 'x2js';
const DOMParser = require('xmldom').DOMParser;
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

  decode(node, data) {
    const obj = {};
    if (node != null && node.nodeType === 1) {
      obj[ 'name' ] = node.nodeName;
      obj[ 'child' ] = [];
      // decodeAttributes
      const attrs = node.attributes;
      for (const attr of attrs) {
        if (attr.nodeName !== 'name' && attr.nodeName !== 'child') {
          obj[ attr.nodeName ] = _.isNumber(_.toInteger(attr.value)) ? _.toInteger(attr.value) : attr.value;
        }
      }

      // decodeChildren
      let child = node.firstChild;
      while (child != null) {
        const tmp = child.nextSibling;
        if (child.nodeType === 1) {
          const childObj = this.decode(child, data);
          if (childObj) {
            obj[ 'child' ].push(childObj);
          }
        }
        child = tmp;
      }
      if (node.nodeName === 'mxGraphModel') {
        data.root = _.omit(obj, 'child');
      } else if (node.nodeName === 'mxCell') {
        let element = null;
        data.element.map(v => {
          element = this.searchElement(v, obj[ 'parent' ]);
        });
        if (element) {
          element.child.push(obj);
        } else {
          data.element.push(obj);
        }
      }
      return obj;
    }
    return null;
  }

  searchElement(element, parentId) {
    if (element[ 'id' ] === parentId) {
      return element;
    } else if (element.child && element.child > 0) {
      let result = null;
      element.child.map(child => {
        result = this.searchElement(child, parentId);
      });
      return result;
    }
    return null;
  }

  render() {
    const input = `
    <mxGraphModel dx="965" dy="836" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100">
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>
    <mxCell id="3" value="321" style="rounded=1;whiteSpace=wrap;html=1;glass=1;fillColor=#AC82FF;" parent="1" vertex="1">
      <mxGeometry x="450" y="175" width="190" height="130" as="geometry"/>
    </mxCell>
    <mxCell id="2" value="321" style="rounded=1;whiteSpace=wrap;html=1;glass=1;fillColor=#AC82FF;" parent="1" vertex="1">
      <mxGeometry x="220" y="180" width="120" height="60" as="geometry"/>
    </mxCell>
    <mxCell id="4" value="213" style="rounded=0;whiteSpace=wrap;html=1;glass=1;fillColor=#5EEFFF;" parent="1" vertex="1">
      <mxGeometry x="490" y="190" width="120" height="60" as="geometry"/>
    </mxCell>
  </root>
</mxGraphModel>
    `;
    // const x2js1 = new x2js();
    const doc = new DOMParser().parseFromString(input, 'text/xml');
    const node = doc.documentElement;
    const data = {
      root: {},
      element: []
    };
    const obj = this.decode(node, data);
    // console.log(obj);
    // const data = this.restructuring(obj);
    console.log(data);
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
