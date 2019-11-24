import React from 'react';
import './imageSlide.scss';
import { connect } from 'react-redux';
// import BScroll from '@better-scroll/core';
import cn from 'classnames';
import { IRootState } from 'app/shared/reducers';
import * as imageSlideAction from 'app/modules/imageSlide/imageSlide.reducer';
// import MouseWheel from '@better-scroll/mouse-wheel/';
//
// BScroll.use(MouseWheel);

export interface IImageSlideProps extends StateProps, DispatchProps {
  imageSlides: any;
  setBsElement: any;
  setActiveId: any;
}

export class ImageSlide extends React.Component<IImageSlideProps> {
  // private bs = null;
  private element: any = React.createRef();
  private imagesRef: any = [];

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    // @ts-ignore
    const bs: any = new BScroll(this.element.current, {
      scrollY: true,
      click: true,
      probeType: 3 // listening scroll hook
    });
    await this.props.setBsElement(bs);
    await this._registerHooks(['scroll', 'scrollEnd'], pos => {
      const el = this.imagesRef.find(v => {
        return Math.abs(pos.y) > (v.offsetTop - 5) && Math.abs(pos.y) < (v.offsetTop - 5 + v.offsetHeight);
      });
      if (el && el.dataset.idx !== this.props.activeId) {
        this.props.setActiveId(el.dataset.idx);
      }
    });
  }

  _registerHooks(hookNames, handler) {
    hookNames.forEach(name => {
      // @ts-ignore
      this.props.bs.on(name, handler);
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
              this.props.imageSlides.map((v, idx) => <div key={idx} className={cn('image-slide-scrollbar', { active: parseInt(String(this.props.activeId), 10) === idx })}/>)
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ imageSlide }: IRootState) => ({
  bs: imageSlide.bs,
  activeId: imageSlide.activeId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setBsElement: bsElement => {
    dispatch(imageSlideAction.setBsElemnet(bsElement));
  },
  setActiveId: activeId => {
    dispatch(imageSlideAction.setActiveId(activeId));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageSlide);
