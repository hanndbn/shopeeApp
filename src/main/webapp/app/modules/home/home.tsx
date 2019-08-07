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

export class Home extends React.Component<IHomeProp, { input: any, content: any }> {
  constructor(props) {
    super(props);
    this.state = {
      input: `<mxGraphModel dx="1422" dy="804" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169">
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>
    <mxCell id="6" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" parent="1" source="2" target="3" edge="1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="2" value="" style="rounded=0;whiteSpace=wrap;html=1;container=1;" parent="1" vertex="1">
      <mxGeometry x="110" y="110" width="190" height="350" as="geometry"/>
    </mxCell>
    <mxCell id="4" value="" style="rounded=0;whiteSpace=wrap;html=1;" parent="2" vertex="1">
      <mxGeometry x="35" y="40" width="120" height="60" as="geometry"/>
    </mxCell>
    <mxCell id="11" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" parent="1" source="3" target="7" edge="1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="3" value="" style="rounded=0;whiteSpace=wrap;html=1;container=1;" parent="1" vertex="1">
      <mxGeometry x="370" y="110" width="190" height="350" as="geometry"/>
    </mxCell>
    <mxCell id="5" value="" style="rounded=0;whiteSpace=wrap;html=1;" parent="3" vertex="1">
      <mxGeometry x="35" y="130" width="120" height="60" as="geometry"/>
    </mxCell>
    <mxCell id="7" value="" style="rounded=0;whiteSpace=wrap;html=1;container=1;" parent="1" vertex="1">
      <mxGeometry x="620" y="110" width="190" height="350" as="geometry"/>
    </mxCell>
    <mxCell id="8" value="" style="rounded=0;whiteSpace=wrap;html=1;" parent="7" vertex="1">
      <mxGeometry x="35" y="260" width="120" height="60" as="geometry"/>
    </mxCell>
  </root>
</mxGraphModel>
`, content: `
`
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // this.props.initScreen();
  }

  componentWillUnmount() {
  }

  _handleChangeInput(e) {
    this.setState({ ...this.state, input: e.target.value });
  }

  decode(node, data) {
    let obj = {};
    if (node != null && node.nodeType === 1) {
      obj[ 'name' ] = node.nodeName;
      obj[ 'child' ] = [];
      // decodeAttributes
      const attrs = node.attributes;
      for (const attr of attrs) {
        if (attr.nodeName !== 'name' && attr.nodeName !== 'child') {
          obj[ attr.nodeName ] = attr.value !== '' && Number.isInteger(parseInt(attr.value, 10)) ? parseInt(attr.value, 10) : attr.value;
        }
      }

      // decodeChildren
      let child = node.firstChild;
      while (child != null) {
        const tmp = child.nextSibling;
        if (child.nodeType === 1) {
          const childObj = this.decode(child, data);
          if (childObj) {
            if (childObj[ 'name' ] === 'mxGeometry') {
              obj = {
                ...obj,
                x: childObj[ 'x' ],
                y: childObj[ 'y' ],
                width: childObj[ 'width' ],
                height: childObj[ 'height' ]
              };
            } else {
              obj[ 'child' ].push(childObj);
            }
          }
        }
        child = tmp;
      }
      if (node.nodeName === 'mxGraphModel') {
        data.root = _.omit(obj, 'child');
      } else if (node.nodeName === 'mxCell' && obj[ 'parent' ] != null) {
        if (obj[ 'source' ] && obj[ 'target' ]) {
          const relation = data.relation.find(v => v.source === obj[ 'source' ] && v.target === obj[ 'target' ]);
          if (!relation) {
            data.relation.push({
              source: obj[ 'source' ],
              target: obj[ 'target' ]
            });
          }
        } else if (!obj[ 'source' ] && !obj[ 'target' ]) {
          let element = null;
          data.elements.map(v => {
            element = this.searchElement(v, obj[ 'parent' ]);
          });
          if (element) {
            element.child.push(obj);
          } else {
            data.elements.push(obj);
          }
        }

      }
      return obj;
    }
    return null;
  }

  searchElement(element, parentId) {
    if (element[ 'id' ] === parentId) {
      return element;
    } else if (element.child && element.child.length > 0) {
      let result = null;
      element.child.map(child => {
        result = this.searchElement(child, parentId);
      });
      return result;
    }
    return null;
  }

  parse2html(data) {
    const { root, elements, relation } = data;
    const slides = elements && elements.length > 0 ? elements[ 0 ].child : [];
    return (
      <div className="container">
        <div className="slide-container">
          {slides.map((slide, idx) => {
            return this.slide2html(slide, true, idx);
          })}
        </div>
      </div>
    );
  }

  slide2html(slide, isRoot = false, idx) {
    let style: any = {
      border: '1px solid black',
      width: slide[ 'width' ],
      height: slide[ 'height' ],
      position: 'relative'
    };
    if (!isRoot) {
      style = {
        ...style,
        position: 'absolute',
        left: slide.x,
        top: slide.y
      };
    }
    return (<div className="slide"
                 style={style}
                 key={idx}
    >
      <div className="slide-child">
        {slide.child && slide.child.length > 0 && slide.child.map((child, idxChild) => this.slide2html(child, false, idxChild))}
        {slide.value && <div>{slide.value}</div>}
      </div>
    </div>);
  }

  render() {
    // const x2js1 = new x2js();
    const doc = new DOMParser().parseFromString(this.state.content, 'text/xml');
    let displaySlide = null;
    if (doc) {
      const node = doc.documentElement;
      const data = {
        root: {},
        elements: [],
        relation: []
      };
      const obj = this.decode(node, data);
      // console.log(obj);
      // const data = this.restructuring(obj);
      displaySlide = this.parse2html(data);
      console.log(data);
    }// const dom = new jsdom.JSDOM(input);
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
        <div className="container input-wrapper">
          <div className="row">
            <div className="col-12 text-left">
              <div>
                <div className="">
                  Diagram input:
                </div>
                <textarea className="form-control g-font-size-12"
                          placeholder=""
                          cols={8}
                          rows={8}
                          onChange={e => this._handleChangeInput(e)}
                          value={this.state.input}
                />
              </div>
            </div>
            <div className="col-12 text-left g-margin-top-20">
              <button className="btn btn-danger"
                      onClick={() => this.setState({ ...this.state, content: this.state.input })}
              >Update
              </button>
            </div>
            <div className="col-12">
              <hr/>
            </div>
          </div>
        </div>
        {displaySlide}
      </div>
    );
  }
}

const mapStateToProps = ({ common }: IRootState) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: async () => {
    dispatch(setHeaderBackground('transparent'));
  },
  changeInput: async () => {
    dispatch(setHeaderBackground('transparent'));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));
