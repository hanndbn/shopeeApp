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
import xmldom from 'xmldom';
import { requestHomeData } from 'app/modules/home/home.reducer';

const DOMParser = xmldom.DOMParser;
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
  match: any;
}

export class Home extends React.Component<IHomeProp, { input: any, content: any }> {
  constructor(props) {
    super(props);
    this.state = {
      input: '', content: `
`
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.initScreen();
  }

  componentWillUnmount() {
  }

  getSnapshotBeforeUpdate(prevProps, prevState): any | null {
    const preAppId = prevProps.match.params.appId ? prevProps.match.params.appId : '';
    const currentAppId = this.props.match.params.appId ? this.props.match.params.appId : '';
    if (preAppId !== currentAppId) {
      this.props.initScreen();
    }
    return null;
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
    let validElement = [];
    relation.map(v => {
      if (slides.find(slide => slide.id === v.source)
        && slides.find(slide => slide.id === v.target)) {
        validElement.push(v.source);
        validElement.push(v.target);
      }
    });
    validElement = _.uniq(validElement);
    const slidesProcessed = [];
    validElement.map(v => {
      const slideProcessed = slides.find(slide => slide.id === v);
      if (slideProcessed) slidesProcessed.push(slideProcessed);
    });
    return (
      <div className="container">
        <div className="slide-container">
          <Slider {...Settings}>
            {slidesProcessed.map((slide, idx) => {
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
        >
          <div dangerouslySetInnerHTML={{ __html: this.decodeHTMLEntities(slide.value) }}/>
        </div>}
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
    const opacityHex = slideStyle[ 'opacity' ] != null ? parseInt(slideStyle[ 'opacity' ], 10) : '';
    style = {
      ...style,
      border: slideStyle[ 'strokeColor' ] === 'none' || slideStyle[ 'elementStyle' ] === ELEMENT_TYPE.IMAGE ?
        '' : `1px solid ${this.getColorWithOpacity('#000000', opacityHex)}`,
      width: slide[ 'width' ],
      height: slide[ 'height' ],
      fontSize: `${slideStyle[ 'fontSize' ]}px`,
      fontFamily: slideStyle[ 'fontFamily' ] ? `${slideStyle[ 'fontFamily' ]}` : '',
      borderRadius: slideStyle[ 'rounded' ] === '1' ? '5px' : '',
      backgroundColor: slideStyle[ 'fillColor' ] ? `${this.getColorWithOpacity(slideStyle[ 'fillColor' ], opacityHex)}` : ''
    };
    // add special style
    if (slideStyle[ 'elementStyle' ] === ELEMENT_TYPE.IMAGE) {
      style = {
        ...style,
        backgroundImage: `url(${slideStyle[ 'image' ]})`
      };
    } else if (slideStyle[ 'elementStyle' ] === ELEMENT_TYPE.BUTTON) {
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
    const opacityHex = slideStyle[ 'opacity' ] != null ? parseInt(slideStyle[ 'opacity' ], 10) : '';
    childStyle = {
      ...childStyle,
      // border: slideStyle['strokeColor'] === 'none' || slideStyle['elementStyle'] === ELEMENT_TYPE.IMAGE ?
      //   '' : `1px solid ${this.getColorWithOpacity('#000000', opacityHex)}`,
      borderRadius: slideStyle[ 'rounded' ] === '1' ? '5px' : '',
      backgroundColor: slideStyle[ 'fillColor' ] ? `${this.getColorWithOpacity(slideStyle[ 'fillColor' ], opacityHex)}` : ''
    };
    return childStyle;
  }

  getValueStyle(slide, slideStyle) {
    let valueStyle: any = {};
    const opacityHex = slideStyle[ 'opacity' ] != null ? parseInt(slideStyle[ 'opacity' ], 10) : '';
    valueStyle = {
      ...valueStyle,
      color: slideStyle[ 'fontColor' ] ? slideStyle[ 'fontColor' ] : '',
      backgroundColor: slideStyle[ 'labelBackgroundColor' ] && slideStyle[ 'labelBackgroundColor' ] !== 'none' ?
        `${this.getColorWithOpacity(slideStyle[ 'labelBackgroundColor' ], opacityHex)}` : ''
      // border: (slideStyle['labelBorderColor'] && slideStyle['labelBorderColor'] !== 'none') ?
      //   `1px solid ${this.getColorWithOpacity(slideStyle['labelBorderColor'], opacityHex)}` : ''
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
    return opacity !== null && opacity !== '' ? `rgb(${r}, ${g}, ${b}, ${opacity / 100}` : `rgb(${r}, ${g}, ${b}`;
  }

  decodeHTMLEntities(str) {
    return str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
  }

  render() {
    const { homeData, requestFailure, errorMessage }: any = this.props;
    const content = homeData.data;
    // const x2js1 = new x2js();
    const doc = new DOMParser().parseFromString(content, 'text/xml');
    let displaySlide = null;
    if (doc) {
      const node = doc.documentElement;
      const data = {
        root: {},
        elements: [],
        relation: []
      };
      this.decode(node, data);
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
    return (
      <div className="">
        <Helmet>
          <title>{`${TITLE_HELMET}`}</title>
        </Helmet>
        <div className="container input-wrapper">
          <div className="row">
            <div className="col-12">
              {requestFailure && <div className="alert alert-danger">{errorMessage}</div>}
              {displaySlide}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ home }: IRootState) => ({
  homeData: home.homeData,
  requestFailure: home.requestFailure,
  errorMessage: home.errorMessage
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: async () => {
    const appId = ownProps.match.params.appId ? ownProps.match.params.appId : '';
    dispatch(requestHomeData(appId));
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
