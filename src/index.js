import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const getContainerPosition = ({ position, arrow, targetElm, containerSize, positionMargin }) => {
  const targetElmPosition = targetElm.getBoundingClientRect();
  const scrollY = (window.scrollY !== undefined) ? window.scrollY : window.pageYOffset;
  const scrollX = (window.scrollX !== undefined) ? window.scrollX : window.pageXOffset;
  const top = scrollY + targetElmPosition.top;
  const left = scrollX + targetElmPosition.left;
  const leftWhenPositionLeft = left - containerSize.width - positionMargin;
  const leftWhenPositionRight = left + targetElm.offsetWidth + positionMargin;
  const topWhenPositionLeftOrRightAndArrowTop = (top + (targetElm.offsetHeight / 2)) - positionMargin;
  const topWhenPositionLeftOrRightAndArrowBottom = (top + targetElm.offsetHeight / 2) - containerSize.height + positionMargin;
  const topWhenPositionLeftOrRightAndArrowCenter = (top + targetElm.offsetHeight / 2) - ((containerSize.height) / 2);
  const leftWhenPositionTopAndArrowCenter = left - (containerSize.width / 2) + targetElm.offsetWidth / 2;
  const leftWhenPositionTopAndArrowLeft = left + targetElm.offsetWidth / 2 - positionMargin;
  const leftWhenPositionTopAndArrowRight = left - containerSize.width + targetElm.offsetWidth / 2 + positionMargin;
  const topWhenPositionTopAndArrowCenterOrRightOrLeft = top - containerSize.height - positionMargin;
  const topWhenPositionBottomAndArrowCenterOrRightOrLeft = top + targetElm.offsetHeight + positionMargin;
  const leftWhenPositionBottomAndArrowCenter = left - (containerSize.width / 2) + targetElm.offsetWidth / 2;
  const leftWhenPositionBottomAndArrowLeft = left + targetElm.offsetWidth / 2 - positionMargin;
  const leftWhenPositionBottomAndArrowRight = left - containerSize.width + targetElm.offsetWidth / 2 + positionMargin;

  if (position === 'left') {
    if (arrow === 'top') {
      return {
        top: topWhenPositionLeftOrRightAndArrowTop,
        left: leftWhenPositionLeft,
      };
    }
    if (arrow === 'bottom') {
      return {
        top: topWhenPositionLeftOrRightAndArrowBottom,
        left: leftWhenPositionLeft,
      };
    }
    return {
      top: topWhenPositionLeftOrRightAndArrowCenter,
      left: leftWhenPositionLeft,
    };
  }
  if (position === 'right') {
    if (arrow === 'top') {
      return {
        top: topWhenPositionLeftOrRightAndArrowTop,
        left: leftWhenPositionRight,
      };
    }
    if (arrow === 'bottom') {
      return {
        top: topWhenPositionLeftOrRightAndArrowBottom,
        left: leftWhenPositionRight,
      };
    }
    return {
      top: topWhenPositionLeftOrRightAndArrowCenter,
      left: leftWhenPositionRight,
    };
  }
  if (position === 'top') {
    if (arrow === 'left') {
      return {
        top: topWhenPositionTopAndArrowCenterOrRightOrLeft,
        left: leftWhenPositionTopAndArrowLeft,
      };
    }
    if (arrow === 'right') {
      return {
        top: topWhenPositionTopAndArrowCenterOrRightOrLeft,
        left: leftWhenPositionTopAndArrowRight,
      };
    }
    return {
      top: topWhenPositionTopAndArrowCenterOrRightOrLeft,
      left: leftWhenPositionTopAndArrowCenter,
    };
  }
  if (position === 'bottom') {
    if (arrow === 'left') {
      return {
        top: topWhenPositionBottomAndArrowCenterOrRightOrLeft,
        left: leftWhenPositionBottomAndArrowLeft,
      };
    }
    if (arrow === 'right') {
      return {
        top: topWhenPositionBottomAndArrowCenterOrRightOrLeft,
        left: leftWhenPositionBottomAndArrowRight,
      };
    }
    return {
      top: topWhenPositionBottomAndArrowCenterOrRightOrLeft,
      left: leftWhenPositionBottomAndArrowCenter,
    };
  }
  // default position right arrow center
  return {
    top: topWhenPositionLeftOrRightAndArrowCenter,
    left: leftWhenPositionRight,
  };
};

const ContainerDiv = glamorous.div((props) => {
    const { transition, visible, reposition, style, ...restProps } = props;
    const { targetElm, position } = restProps;
    if (!targetElm) return { display: 'none' };
    const baseStyle = {
      position: 'absolute',
      padding: '5px',
      background: '#fff',
      boxShadow: '0 0 8px rgba(0,0,0,.3)',
      borderRadius: '3px',
      transition: `${transition} .3s ease-in-out, visibility .3s ease-in-out`,
      opacity: visible ? 1 : 0,
      visibility: visible ? 'visible' : 'hidden',
      zIndex: 50,
      ...style,
    };
    const containerPosition = getContainerPosition(restProps);
    if (position === "left" && containerPosition.left < 0) {
      reposition();
    } else if (
      position === "right" &&
      window.innerWidth < containerPosition.left + targetElm.offsetWidth
    ) {
      reposition();
    }
    return { ...baseStyle, ...containerPosition };
  },
);

const Arrow = glamorous.span((props) => {
    const { fg, bg, position, arrow, arrowStyle, positionMargin } = props;
    const baseStyle = {
      position: 'absolute',
      content: '""',
      transition: 'all .3s ease-in-out',
    };
    let fgStyle = {};
    let bgStyle = {};
    const newArrowStyle = { color: '#fff', borderColor: 'rgba(0,0,0,.4)', ...arrowStyle };
    if (fg) {
      fgStyle.zIndex = 60;
      const fgColorBorder = `10px solid ${newArrowStyle.color}`;
      const fgTransBorder = '8px solid transparent';
      const fgStyleLeftOrRightBase = {
        top: '50%',
        borderTop: fgTransBorder,
        borderBottom: fgTransBorder,
        marginTop: -7,
      };
      if (position === 'left') {
        fgStyle = { ...fgStyle, ...fgStyleLeftOrRightBase, right: -10, borderLeft: fgColorBorder };
      }
      if (position === 'right') {
        fgStyle = { ...fgStyle, ...fgStyleLeftOrRightBase, left: -10, borderRight: fgColorBorder };
      }
      if (position === 'left' || position === 'right') {
        if (arrow === 'top') {
          fgStyle.top = positionMargin;
        }
        if (arrow === 'bottom') {
          fgStyle.top = null;
          fgStyle.bottom = positionMargin - 7;
        }
      }

      const fgStyleTopOrBottomBase = {
        left: '50%',
        marginLeft: -10,
        borderLeft: fgTransBorder,
        borderRight: fgTransBorder,
      };
      if (position === 'top') {
        fgStyle = { ...fgStyle, ...fgStyleTopOrBottomBase, bottom: -10, borderTop: fgColorBorder };
      }
      if (position === 'bottom') {
        fgStyle = { ...fgStyle, ...fgStyleTopOrBottomBase, top: -10, borderBottom: fgColorBorder };
      }
      if (position === 'top' || position === 'bottom') {
        if (arrow === 'right') {
          fgStyle.left = null;
          fgStyle.right = positionMargin + 1;
          fgStyle.marginLeft = 0;
        }
        if (arrow === 'left') {
          fgStyle.left = positionMargin + 1;
          fgStyle.marginLeft = 0;
        }
      }
      return { ...baseStyle, ...fgStyle };
    }
    if (bg) {
      bgStyle.zIndex = 55;
      const bgBorderColor = newArrowStyle.borderColor ? newArrowStyle.borderColor : 'transparent';
      const bgColorBorder = `11px solid ${bgBorderColor}`;
      const bgTransBorder = '9px solid transparent';
      const bgStyleLeftOrRightBase = {
        top: '50%',
        borderTop: bgTransBorder,
        borderBottom: bgTransBorder,
        marginTop: -8,
      };
      if (position === 'left') {
        bgStyle = { ...bgStyle, ...bgStyleLeftOrRightBase, right: -11, borderLeft: bgColorBorder };
      }
      if (position === 'right') {
        bgStyle = { ...bgStyle, ...bgStyleLeftOrRightBase, left: -11, borderRight: bgColorBorder };
      }
      if (position === 'left' || position === 'right') {
        if (arrow === 'top') {
          bgStyle.top = positionMargin;
        }
        if (arrow === 'bottom') {
          bgStyle.top = null;
          bgStyle.bottom = positionMargin - 8;
        }
      }
      const bgStyleTopOrBottomBase = {
        left: '50%',
        marginLeft: -11,
        borderLeft: bgTransBorder,
        borderRight: bgTransBorder,
      };
      if (position === 'top') {
        bgStyle = { ...bgStyle, ...bgStyleTopOrBottomBase, bottom: -11, borderTop: bgColorBorder };
      }
      if (position === 'bottom') {
        bgStyle = { ...bgStyle, ...bgStyleTopOrBottomBase, top: -11, borderBottom: bgColorBorder };
      }
      if (position === 'top' || position === 'bottom') {
        if (arrow === 'right') {
          bgStyle.left = null;
          bgStyle.right = positionMargin;
          bgStyle.marginLeft = 0;
        }
        if (arrow === 'left') {
          bgStyle.left = positionMargin;
          bgStyle.marginLeft = 0;
        }
      }
      return { ...baseStyle, ...bgStyle };
    }
    return null;
  },
);

class ToolTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: props.position,
      arrow: props.arrow,
    };
    this.reposition = this.reposition.bind(this);
  }

  componentDidMount() {
    this.forceUpdate();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      position: nextProps.position,
      arrow: nextProps.arrow,
    });
  }

  reposition() {
    const { fallbackPosition, fallbackArrow } = this.props;
    this.setState({
      position: fallbackPosition,
      arrow: fallbackArrow
    });
  }

  getContainerSize() {
    if (this.ref) {
      return {
        width: this.ref.offsetWidth,
        height: this.ref.offsetHeight,
      };
    }
    return {
      width: 0,
      height: 0,
    };
  }

  render() {
    const { position, arrow } = this.state;
    const { targetElm, style, positionMargin, visible, transition } = this.props;

    const { style: containerStyle, arrowStyle } = style;
    return (
      <ContainerDiv
        style={containerStyle}
        visible={visible}
        innerRef={(ref) => {
          this.ref = ref;
        }}
        transition={transition}
        targetElm={targetElm}
        position={position}
        arrow={arrow}
        containerSize={this.getContainerSize()}
        positionMargin={positionMargin}
        reposition={this.reposition}
      >
        {this.props.arrow ? (
            <div>
              <Arrow
                fg
                arrowStyle={arrowStyle}
                position={position}
                arrow={arrow}
                positionMargin={positionMargin}
              />
              <Arrow
                bg
                arrowStyle={arrowStyle}
                position={position}
                arrow={arrow}
                positionMargin={positionMargin}
              />
            </div>)
          : null
        }
        {this.props.children}
      </ContainerDiv>
    );
  }
}

ToolTip.propTypes = {
  visible: PropTypes.bool,
  targetElm: PropTypes.object,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  fallbackPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  arrow: PropTypes.oneOf([null, 'center', 'top', 'right', 'bottom', 'left']),
  fallbackArrow: PropTypes.oneOf([null, 'center', 'top', 'right', 'bottom', 'left']),
  style: PropTypes.object,
  positionMargin: PropTypes.number,
  transition: PropTypes.string,
  children: PropTypes.element.isRequired,
};
ToolTip.defaultProps = {
  visible: false,
  targetElm: null,
  position: 'right',
  fallbackPosition: 'bottom',
  fallbackArrow: 'center',
  arrow: 'center',
  style: { style: {}, arrowStyle: {} },
  positionMargin: 15,
  transition: 'all',
};
export default ToolTip;