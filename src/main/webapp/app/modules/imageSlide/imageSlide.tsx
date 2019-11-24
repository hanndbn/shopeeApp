import React from 'react';
import './imageSlide.scss';
import { connect } from 'react-redux';
import BScroll from '@better-scroll/core';
import cn from 'classnames';
// import MouseWheel from '@better-scroll/mouse-wheel/';
//
// BScroll.use(MouseWheel);

export interface IImageSlideProps extends StateProps, DispatchProps {
  imageSlides: any;
}

export class ImageSlide extends React.Component<IImageSlideProps, { activeId: any }> {
  private bs = null;
  private element: any = React.createRef();
  private imagesRef: any = [];

  constructor(props) {
    super(props);
    this.state = {
      activeId: 0
    };
  }

  componentDidMount() {
    this.bs = new BScroll(this.element.current, {
      scrollY: true,
      click: true,
      probeType: 3 // listening scroll hook
    });
    this._registerHooks(['scroll', 'scrollEnd'], pos => {
      // console.log(this.imagesRef);
      // console.log(this.imagesRef);
      const el = this.imagesRef.find(v => {
        return Math.abs(pos.y) > (v.offsetTop - 5) && Math.abs(pos.y) < (v.offsetTop - 5 + v.offsetHeight);
      });
      if (el) {
        this.setState({
          activeId: el.dataset.idx
        });
      }
    });
  }

  _registerHooks(hookNames, handler) {
    hookNames.forEach(name => {
      this.bs.on(name, handler);
    });
  }

  render() {
    return (
      <div className="w-100 h-100 image-slide-wrapper" ref={this.element}>
        <div className="image-slide-sub-wrapper">
          {
            this.props.imageSlides.map((v, idx) =>
              <React.Fragment key={idx}>
                <div className="image-slide-content-wrapper" data-idx={idx} ref={el => {
                  this.imagesRef[idx] = el;
                  return el;
                }}>
                  {/*<div className="image-slide-content" style={{ backgroundImage: `url(${v})` }}/>*/}
                  <img className="image-slide-content" src={v}/>
                </div>
                <div className="image-slide-hr"/>
              </React.Fragment>
            )
          }
        </div>
        <div className="image-slide-scrollbar-wrapper">
          <div className="image-slide-scrollbar-content">
            {
              this.props.imageSlides.map((v, idx) => <div key={idx} className={cn('image-slide-scrollbar', { active: parseInt(this.state.activeId, 10) === idx })}/>)
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageSlide);
