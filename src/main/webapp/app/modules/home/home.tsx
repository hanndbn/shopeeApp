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
  dots: false,
  infinite: true,
  speed: 1500,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  pauseOnFocus: true,
  lazyLoad: 'ondemand',
  cssEase: 'linear',
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
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
        dots: false,
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
      input: `<mxGraphModel dx="1422" dy="804" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="3300" pageHeight="4681" background="none">
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>
    <mxCell id="15" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;fontFamily=Verdana;fontSize=12;fontColor=#000000;" edge="1" parent="1" source="5" target="11">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="5" value="" style="rounded=0;whiteSpace=wrap;html=1;container=1;fontSize=12;fontStyle=0;shadow=0;comic=0;glass=0;opacity=10;" parent="1" vertex="1">
      <mxGeometry x="210" y="150" width="440" height="470" as="geometry"/>
    </mxCell>
    <mxCell id="6" value="" style="shape=image;imageAspect=1;aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;image=https://salt.tikicdn.com/cache/200x200/ts/product/20/e3/8d/3dd203b906378a2f45f7dd93848a20a4.jpg;labelPosition=right;align=left;imageBackground=#8812FF;" parent="5" vertex="1">
      <mxGeometry x="100" y="110" width="225" height="225" as="geometry"/>
    </mxCell>
    <mxCell id="9" value="Pyramid Project" style="html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=22;fontStyle=7;horizontal=1;textDirection=ltr;labelBackgroundColor=#FF0000;labelBorderColor=none;fontFamily=Verdana;labelPosition=center;verticalLabelPosition=middle;gradientColor=none;fontColor=#66FFFF;gradientDirection=west;perimeterSpacing=3;opacity=90;" parent="5" vertex="1">
      <mxGeometry x="76" y="30" width="309" height="120" as="geometry"/>
    </mxCell>
    <mxCell id="10" value="next" style="rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;strokeColor=#000000;fillColor=none;gradientColor=#38BDFF;fontFamily=Verdana;fontSize=12;fontColor=#000000;align=center;spacingTop=8;spacingBottom=8;spacingLeft=26;spacingRight=3;spacing=9;" parent="5" vertex="1">
      <mxGeometry x="310" y="390" width="110" height="40" as="geometry"/>
    </mxCell>
    <mxCell id="11" value="" style="rounded=0;whiteSpace=wrap;html=1;container=1;fontSize=12;fontStyle=0;shadow=0;comic=0;glass=0;opacity=10;" vertex="1" parent="1">
      <mxGeometry x="810" y="160" width="440" height="470" as="geometry"/>
    </mxCell>
    <mxCell id="13" value="slide 2" style="html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=22;fontStyle=7;horizontal=1;textDirection=ltr;labelBackgroundColor=#FF0000;labelBorderColor=none;fontFamily=Verdana;labelPosition=center;verticalLabelPosition=middle;gradientColor=none;fontColor=#66FFFF;gradientDirection=west;perimeterSpacing=3;opacity=90;" vertex="1" parent="11">
      <mxGeometry x="56" y="10" width="309" height="120" as="geometry"/>
    </mxCell>
    <mxCell id="14" value="next" style="rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;strokeColor=#000000;fillColor=none;gradientColor=#38BDFF;fontFamily=Verdana;fontSize=12;fontColor=#000000;align=center;spacingTop=8;spacingBottom=8;spacingLeft=26;spacingRight=3;spacing=9;" vertex="1" parent="11">
      <mxGeometry x="310" y="390" width="110" height="40" as="geometry"/>
    </mxCell>
    <mxCell id="17" value="" style="shape=image;imageAspect=0;aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;rounded=0;shadow=0;glass=0;comic=0;labelBackgroundColor=none;strokeColor=#000000;fillColor=none;gradientColor=none;fontFamily=Verdana;fontSize=12;fontColor=#000000;align=center;image=https://vn-test-11.slatic.net/p/765ff7ad24dfd55be366416bf82b8134.jpg_340x340q80.jpg;" vertex="1" parent="11">
      <mxGeometry x="120" y="107.5" width="255" height="255" as="geometry"/>
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
          {/*<Slider {...Settings}>*/}
          {/*  {project.list_images &&*/}
          {/*  project.list_images.map((img, idx) => (*/}
          {/*    <div key={idx}>*/}
          {/*      <div key={idx} className="card">*/}
          {/*        <LazyLoad height={200} offset={100} once>*/}
          {/*          <img className="card-img-top" src={img.guid}/>*/}
          {/*        </LazyLoad>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</Slider>*/}
          {slides.map((slide, idx) => {
            const a = slide;
            return this.slide2html(slide, true, idx);
          })}
        </div>
      </div>
    );
  }

  slide2html(slide, isRoot = false, idx) {
    const slideStyle = this.getSlideStyle(slide[ 'style' ]);
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
      const styleName = v.split('=')[ 0 ] ? v.split('=')[ 0 ] : null;
      const styleValue = v.split('=')[ 1 ] ? v.split('=')[ 1 ] : null;
      if (styleName === ELEMENT_TYPE.TEXT) {
        slideStyle[ 'elementStyle' ] = ELEMENT_TYPE.TEXT;
      } else if (styleName === ELEMENT_TYPE.IMAGE) {
        slideStyle[ 'elementStyle' ] = ELEMENT_TYPE.IMAGE;
      } else if (styleName === 'rounded' && styleValue === '1') {
        slideStyle[ 'elementStyle' ] = ELEMENT_TYPE.BUTTON;
      }
      if (styleName !== null && styleValue !== null) {
        slideStyle[ styleName ] = styleValue;
      }
    });
    return slideStyle;
  }

  getStyle(slide, slideStyle, isRoot) {
    let style: any = {};
    // add common style
    const opacityHex = slideStyle[ 'opacity' ] !== null ? parseInt(slideStyle[ 'opacity' ], 10) : '';
    style = {
      ...style,
      border: slideStyle['strokeColor'] === 'none' ?
        '' : `1px solid ${this.getColorWithOpacity('#000000', opacityHex)}`,
      width: slide[ 'width' ],
      height: slide[ 'height' ],
      fontSize: `${slideStyle[ 'fontSize' ]}px`,
      fontFamily: slideStyle[ 'fontFamily' ] ? `${slideStyle[ 'fontFamily' ]}` : '',
      borderRadius: slideStyle[ 'rounded' ] === '1' ? '5px' : '',
      backgroundColor: slideStyle[ 'fillColor' ] ? `${this.getColorWithOpacity(slideStyle[ 'fillColor' ], opacityHex)}` : ''
    };
    // add special style
    if (slideStyle[ 'elementStyle' ] === ELEMENT_TYPE.TEXT) {
      style = {
        ...style,
        border: ''
      };
    } else if (slideStyle[ 'elementStyle' ] === ELEMENT_TYPE.IMAGE) {
      style = {
        ...style,
        backgroundImage: `url(${slideStyle[ 'image' ]})`,
        border: ''
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
    const opacityHex = slideStyle[ 'opacity' ] !== null ? parseInt(slideStyle[ 'opacity' ], 10) : '';
    childStyle = {
      ...childStyle,
      border: !slideStyle['strokeColor'] || slideStyle['strokeColor'] === 'none' ?
        '' : `1px solid ${this.getColorWithOpacity('#000000', opacityHex)}`,
      borderRadius: slideStyle[ 'rounded' ] === '1' ? '5px' : '',
      backgroundColor: slideStyle[ 'fillColor' ] ? `${this.getColorWithOpacity(slideStyle[ 'fillColor' ], opacityHex)}` : ''
    };
    return childStyle;
  }

  getValueStyle(slide, slideStyle) {
    let valueStyle: any = {};
    const opacityHex = slideStyle[ 'opacity' ] !== null ? parseInt(slideStyle[ 'opacity' ], 10) : '';
    valueStyle = {
      ...valueStyle,
      color: slideStyle[ 'fontColor' ] ? slideStyle[ 'fontColor' ] : '',
      backgroundColor: slideStyle[ 'labelBackgroundColor' ] && slideStyle[ 'labelBackgroundColor' ] !== 'none' ?
        `${this.getColorWithOpacity(slideStyle[ 'labelBackgroundColor' ], opacityHex)}` : '',
      border: (slideStyle[ 'labelBorderColor' ] && slideStyle[ 'labelBorderColor' ] !== 'none') ?
        `1px solid ${this.getColorWithOpacity(slideStyle[ 'labelBorderColor' ], opacityHex)}` : ''
    };

    // set align
    if (slideStyle[ 'labelPosition' ] !== 'center') {
      if (slideStyle[ 'labelPosition' ] === 'left') {
        valueStyle = {
          ...valueStyle,
          right: `${slide[ 'width' ]}px`
        };
      } else if (slideStyle[ 'labelPosition' ] === 'right') {
        valueStyle = {
          ...valueStyle,
          left: `${slide[ 'width' ]}px`
        };
      }
    }

    // set vertical align
    if (slideStyle[ 'verticalLabelPosition' ] !== 'middle') {
      if (slideStyle[ 'verticalLabelPosition' ] === 'top') {
        valueStyle = {
          ...valueStyle,
          bottom: `${slide[ 'height' ]}px`
        };
      } else if (slideStyle[ 'labelPosition' ] === 'bottom') {
        valueStyle = {
          ...valueStyle,
          top: `${slide[ 'height' ]}px`
        };
      }
    }
    // set font style
    if (slideStyle[ 'fontStyle' ]) {
      const fontStyleArray = parseInt(slideStyle[ 'fontStyle' ], 10).toString(2).split('');
      valueStyle = {
        ...valueStyle,
        fontWeight: fontStyleArray[ 0 ] === '1' ? 'bold' : '',
        fontStyle: fontStyleArray[ 1 ] === '1' ? 'italic' : '',
        textDecoration: fontStyleArray[ 1 ] === '1' ? 'underline' : ''
      };
    }

    // set padding
    valueStyle = {
      ...valueStyle,
      padding: slideStyle[ 'spacing' ] ? `${slideStyle[ 'spacing' ]}px` : '',
      paddingLeft: slideStyle[ 'spacingLeft' ] ? `${slideStyle[ 'spacingLeft' ]}px` : '',
      paddingRight: slideStyle[ 'spacingRight' ] ? `${slideStyle[ 'spacingRight' ]}px` : '',
      paddingBottom: slideStyle[ 'spacingBottom' ] ? `${slideStyle[ 'spacingBottom' ]}px` : '',
      paddingTop: slideStyle[ 'spacingTop' ] ? `${slideStyle[ 'spacingTop' ]}px` : ''
    };
    return valueStyle;
  }

  getColorWithOpacity(hex, opacity) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return opacity !== null ? `rgb(${r}, ${g}, ${b}, ${opacity / 100}` : `rgb(${r}, ${g}, ${b}`;
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
