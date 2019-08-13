import './home.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { setHeaderBackground } from 'app/shared/common/common.reducer';
import { withRouter } from 'react-router';
import { ELEMENT_TYPE, TITLE_HELMET } from 'app/config/constants';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import Slider from 'react-slick';
// import x2js from 'x2js';
const DOMParser = require('xmldom').DOMParser;
// const jsdom = require("jsdom");
// import { getCategory } from "app/shared/reducers/category";

const NextArrow = props => (
  <div onClick={props.onClick} className="arrow-carousel animation-delay next-arrow-carousel">
    <i className="next-arrow-icon"/>
  </div>
);

const PrevArrow = props => (
  <div onClick={props.onClick} className="arrow-carousel animation-delay prev-arrow-carousel">
    <i className="prev-arrow-icon"/>
  </div>
);

const Settings = {
  dots: true,
  infinite: true,
  speed: 1500,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  pauseOnFocus: true,
  lazyLoad: 'ondemand',
  cssEase: 'linear',
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  nextArrow: <NextArrow/>,
  prevArrow: <PrevArrow/>,
  responsive: [
    {
      breakpoint: 320,
      settings: {
        dots: true,
        arrows: true
      }
    },
    {
      breakpoint: 992,
      settings: {
        dots: true,
        arrows: true
      }
    }
  ]
};

export interface IHomeProp extends StateProps, DispatchProps {
  initScreen: Function;
  location: any;
}

export class Home extends React.Component<IHomeProp, { input: any, content: any }> {
  constructor(props) {
    super(props);
    this.state = {
      input: `<mxGraphModel dx="1536" dy="868" grid="1" gridSize="18" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169">
  <root>
    <mxCell id="0" style="spacingBottom=0;verticalAlign=top;"/>
    <mxCell id="1" style="verticalAlign=top;" parent="0"/>
    <mxCell id="10" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;fontSize=12;" parent="1" source="2" target="6" edge="1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="2" value="" style="rounded=0;whiteSpace=wrap;html=1;container=1;" parent="1" vertex="1">
      <mxGeometry x="30" y="90" width="250" height="320" as="geometry"/>
    </mxCell>
    <mxCell id="3" value="Slide 1" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=20;fontColor=#40FF79;" parent="2" vertex="1">
      <mxGeometry x="85" y="20" width="95" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="4" value="" style="shape=image;imageAspect=0;aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;fontSize=20;image=https://media3.scdn.vn/img3/2019/7_1/vPZBhq_simg_de2fe0_500x500_maxb.jpg;" parent="2" vertex="1">
      <mxGeometry x="35" y="60" width="180" height="180" as="geometry"/>
    </mxCell>
    <mxCell id="17" value="Next" style="rounded=1;whiteSpace=wrap;html=1;fontFamily=Verdana;fontSize=16;fontColor=#FF1745;shadow=0;opacity=10;" parent="2" vertex="1">
      <mxGeometry x="125" y="270" width="108" height="30" as="geometry"/>
    </mxCell>
    <mxCell id="15" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;fontSize=12;" parent="1" source="6" target="11" edge="1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="6" value="" style="rounded=0;whiteSpace=wrap;html=1;container=1;" parent="1" vertex="1">
      <mxGeometry x="350" y="90" width="250" height="320" as="geometry"/>
    </mxCell>
    <mxCell id="7" value="Slide 2" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=20;fontColor=#2E4AFF;" parent="6" vertex="1">
      <mxGeometry x="85" y="20" width="95" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="8" value="" style="shape=image;imageAspect=0;aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;fontSize=20;image=https://media3.scdn.vn/img3/2019/7_1/yQz1yI_simg_de2fe0_500x500_maxb.jpg;" parent="6" vertex="1">
      <mxGeometry x="35" y="60" width="180" height="180" as="geometry"/>
    </mxCell>
    <mxCell id="18" value="Next" style="rounded=1;whiteSpace=wrap;html=1;fontFamily=Verdana;fontSize=16;fontColor=#FF1745;strokeColor=none;" parent="6" vertex="1">
      <mxGeometry x="125" y="270" width="108" height="30" as="geometry"/>
    </mxCell>
    <mxCell id="11" value="" style="rounded=0;whiteSpace=wrap;html=1;container=1;" parent="1" vertex="1">
      <mxGeometry x="30" y="500" width="250" height="320" as="geometry"/>
    </mxCell>
    <mxCell id="12" value="Slide 3" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=20;fontColor=#FF1745;" parent="11" vertex="1">
      <mxGeometry x="85" y="20" width="95" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="13" value="" style="shape=image;imageAspect=0;aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;fontSize=20;image=https://media3.scdn.vn/img3/2019/7_1/sulUFJ_simg_de2fe0_500x500_maxb.jpg;" parent="11" vertex="1">
      <mxGeometry x="35" y="60" width="180" height="180" as="geometry"/>
    </mxCell>
    <mxCell id="16" value="Next" style="rounded=1;whiteSpace=wrap;html=1;fontFamily=Verdana;fontSize=16;fontColor=#FF1745;strokeColor=none;" parent="11" vertex="1">
      <mxGeometry x="107" y="274" width="108" height="30" as="geometry"/>
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
      obj['name'] = node.nodeName;
      obj['child'] = [];
      // decodeAttributes
      const attrs = node.attributes;
      for (const attr of attrs) {
        if (attr.nodeName !== 'name' && attr.nodeName !== 'child') {
          obj[attr.nodeName] = attr.value !== '' && Number.isInteger(parseInt(attr.value, 10)) ? parseInt(attr.value, 10) : attr.value;
        }
      }

      // decodeChildren
      let child = node.firstChild;
      while (child != null) {
        const tmp = child.nextSibling;
        if (child.nodeType === 1) {
          const childObj = this.decode(child, data);
          if (childObj) {
            if (childObj['name'] === 'mxGeometry') {
              obj = {
                ...obj,
                x: childObj['x'],
                y: childObj['y'],
                width: childObj['width'],
                height: childObj['height']
              };
            } else {
              obj['child'].push(childObj);
            }
          }
        }
        child = tmp;
      }
      if (node.nodeName === 'mxGraphModel') {
        data.root = _.omit(obj, 'child');
      } else if (node.nodeName === 'mxCell' && obj['parent'] != null) {
        if (obj['source'] && obj['target']) {
          const relation = data.relation.find(v => v.source === obj['source'] && v.target === obj['target']);
          if (!relation) {
            data.relation.push({
              source: obj['source'],
              target: obj['target']
            });
          }
        } else if (!obj['source'] && !obj['target']) {
          let element = null;
          data.elements.map(v => {
            element = this.searchElement(v, obj['parent']);
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
    if (element['id'] === parentId) {
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
    const slides = elements && elements.length > 0 ? elements[0].child : [];
    return (
      <div className="container">
        <div className="slide-container">
          <Slider {...Settings}>
            {slides.map((slide, idx) => {
              const a = slide;
              return (<div key={idx}>
                <div key={idx} className="d-flex flex-wrap align-items-center justify-content-center">
                  {this.slide2html(slide, true, idx)};
                </div>
              </div>);
            })}
          </Slider>

        </div>
      </div>
    );
  }

  slide2html(slide, isRoot = false, idx) {
    const relationShip = this.getRelationShop(slide);
    console.log(relationShip);
    const slideStyle = this.getSlideStyle(slide['style']);
    const style: any = this.getStyle(slide, slideStyle, isRoot);
    const childStyle: any = this.getChildStyle(slide, slideStyle);
    const valueStyle: any = this.getValueStyle(slide, slideStyle);

    return (<div className="slide"
                 style={style}
                 key={idx}
    >
      <div className="slide-child"
           style={childStyle}
      >
        {slide.child && slide.child.length > 0 && slide.child.map((child, idxChild) => this.slide2html(child, false, idxChild))}
        {slide.value && <div
          className="slide-value"
          style={valueStyle}
        >{slide.value}</div>}
      </div>
    </div>);
  }

  getSlideStyle(styleStr) {
    const slideStyle = {};
    styleStr.split(';').map(v => {
      const styleName = v.split('=')[0] ? v.split('=')[0] : null;
      const styleValue = v.split('=')[1] ? v.split('=')[1] : null;
      if (styleName === ELEMENT_TYPE.TEXT) {
        slideStyle['elementStyle'] = ELEMENT_TYPE.TEXT;
      } else if (styleName === ELEMENT_TYPE.IMAGE) {
        slideStyle['elementStyle'] = ELEMENT_TYPE.IMAGE;
      } else if (styleName === 'rounded' && styleValue === '1') {
        slideStyle['elementStyle'] = ELEMENT_TYPE.BUTTON;
      }
      if (styleName !== null && styleValue !== null) {
        slideStyle[styleName] = styleValue;
      }
    });
    return slideStyle;
  }

  getStyle(slide, slideStyle, isRoot) {
    let style: any = {};
    // add common style
    const opacityHex = slideStyle['opacity'] != null ? parseInt(slideStyle['opacity'], 10) : '';
    style = {
      ...style,
      border: slideStyle['strokeColor'] === 'none' || slideStyle['elementStyle'] === ELEMENT_TYPE.IMAGE ?
        '' : `1px solid ${this.getColorWithOpacity('#000000', opacityHex)}`,
      width: slide['width'],
      height: slide['height'],
      fontSize: `${slideStyle['fontSize']}px`,
      fontFamily: slideStyle['fontFamily'] ? `${slideStyle['fontFamily']}` : '',
      borderRadius: slideStyle['rounded'] === '1' ? '5px' : '',
      backgroundColor: slideStyle['fillColor'] ? `${this.getColorWithOpacity(slideStyle['fillColor'], opacityHex)}` : ''
    };
    // add special style
    if (slideStyle['elementStyle'] === ELEMENT_TYPE.IMAGE) {
      style = {
        ...style,
        backgroundImage: `url(${slideStyle['image']})`
      };
    } else if (slideStyle['elementStyle'] === ELEMENT_TYPE.BUTTON) {
      style = {
        ...style,
        cursor: `pointer`
      };
    }

    if (!isRoot) {
      style = {
        ...style,
        position: 'absolute',
        left: slide.x,
        top: slide.y
      };
    }
    return style;
  }

  getChildStyle(slide, slideStyle) {
    let childStyle: any = {};
    const opacityHex = slideStyle['opacity'] != null ? parseInt(slideStyle['opacity'], 10) : '';
    childStyle = {
      ...childStyle,
      // border: slideStyle['strokeColor'] === 'none' || slideStyle['elementStyle'] === ELEMENT_TYPE.IMAGE ?
      //   '' : `1px solid ${this.getColorWithOpacity('#000000', opacityHex)}`,
      borderRadius: slideStyle['rounded'] === '1' ? '5px' : '',
      backgroundColor: slideStyle['fillColor'] ? `${this.getColorWithOpacity(slideStyle['fillColor'], opacityHex)}` : ''
    };
    return childStyle;
  }

  getValueStyle(slide, slideStyle) {
    let valueStyle: any = {};
    const opacityHex = slideStyle['opacity'] != null ? parseInt(slideStyle['opacity'], 10) : '';
    valueStyle = {
      ...valueStyle,
      color: slideStyle['fontColor'] ? slideStyle['fontColor'] : '',
      backgroundColor: slideStyle['labelBackgroundColor'] && slideStyle['labelBackgroundColor'] !== 'none' ?
        `${this.getColorWithOpacity(slideStyle['labelBackgroundColor'], opacityHex)}` : ''
      // border: (slideStyle['labelBorderColor'] && slideStyle['labelBorderColor'] !== 'none') ?
      //   `1px solid ${this.getColorWithOpacity(slideStyle['labelBorderColor'], opacityHex)}` : ''
    };

    // set align
    if (slideStyle['labelPosition'] !== 'center') {
      if (slideStyle['labelPosition'] === 'left') {
        valueStyle = {
          ...valueStyle,
          right: `${slide['width']}px`
        };
      } else if (slideStyle['labelPosition'] === 'right') {
        valueStyle = {
          ...valueStyle,
          left: `${slide['width']}px`
        };
      }
    }

    // set vertical align
    if (slideStyle['verticalLabelPosition'] !== 'middle') {
      if (slideStyle['verticalLabelPosition'] === 'top') {
        valueStyle = {
          ...valueStyle,
          bottom: `${slide['height']}px`
        };
      } else if (slideStyle['labelPosition'] === 'bottom') {
        valueStyle = {
          ...valueStyle,
          top: `${slide['height']}px`
        };
      }
    }
    // set font style
    if (slideStyle['fontStyle']) {
      const fontStyleArray = parseInt(slideStyle['fontStyle'], 10).toString(2).split('');
      valueStyle = {
        ...valueStyle,
        fontWeight: fontStyleArray[0] === '1' ? 'bold' : '',
        fontStyle: fontStyleArray[1] === '1' ? 'italic' : '',
        textDecoration: fontStyleArray[1] === '1' ? 'underline' : ''
      };
    }

    // set padding
    valueStyle = {
      ...valueStyle,
      padding: slideStyle['spacing'] ? `${slideStyle['spacing']}px` : '',
      paddingLeft: slideStyle['spacingLeft'] ? `${slideStyle['spacingLeft']}px` : '',
      paddingRight: slideStyle['spacingRight'] ? `${slideStyle['spacingRight']}px` : '',
      paddingBottom: slideStyle['spacingBottom'] ? `${slideStyle['spacingBottom']}px` : '',
      paddingTop: slideStyle['spacingTop'] ? `${slideStyle['spacingTop']}px` : ''
    };
    return valueStyle;
  }

  getColorWithOpacity(hex, opacity) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return opacity !== null && opacity !== '' ? `rgb(${r}, ${g}, ${b}, ${opacity / 100}` : `rgb(${r}, ${g}, ${b}`;
  }

  getRelationShop(slide) {

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
