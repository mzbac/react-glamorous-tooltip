import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const checkWindowPositionForContainer = ({ containerPosition, containerSize, positionMargin, position }) => {
  if (position === 'top' || position === 'bottom') {
    if (containerPosition.left < 0) {
      return { ...containerPosition, left: positionMargin };
    }

    const rightOffset = containerPosition.left + containerSize.width - window.innerWidth;
    if (rightOffset > 0) {
      return { ...containerPosition, left: window.innerWidth - containerSize.width - positionMargin };
    }
  }
  return containerPosition;
};

const getContainerPosition = ({ position, arrow, targetElm, containerSize, positionMargin }) => {
  const targetElmPosition = targetElm.getBoundingClientRect();
  const scrollY = window.scrollY !== undefined ? window.scrollY : window.pageYOffset;
  const scrollX = window.scrollX !== undefined ? window.scrollX : window.pageXOffset;
  const top = scrollY + targetElmPosition.top;
  const left = scrollX + targetElmPosition.left;
  const leftWhenPositionLeft = left - containerSize.width - positionMargin;
  const leftWhenPositionRight = left + targetElm.offsetWidth + positionMargin;
  const topWhenPositionLeftOrRightAndArrowTop = top + targetElm.offsetHeight / 2 - positionMargin;
  const topWhenPositionLeftOrRightAndArrowBottom =
    top + targetElm.offsetHeight / 2 - containerSize.height + positionMargin;
  const topWhenPositionLeftOrRightAndArrowCenter = top + targetElm.offsetHeight / 2 - containerSize.height / 2;
  const leftWhenPositionTopAndArrowCenter = left - containerSize.width / 2 + targetElm.offsetWidth / 2;
  const leftWhenPositionTopAndArrowLeft = left + targetElm.offsetWidth / 2 - positionMargin;
  const leftWhenPositionTopAndArrowRight = left - containerSize.width + targetElm.offsetWidth / 2 + positionMargin;
  const topWhenPositionTopAndArrowCenterOrRightOrLeft = top - containerSize.height - positionMargin;
  const topWhenPositionBottomAndArrowCenterOrRightOrLeft = top + targetElm.offsetHeight + positionMargin;
  const leftWhenPositionBottomAndArrowCenter = left - containerSize.width / 2 + targetElm.offsetWidth / 2;
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
const isOffScreen = (position, containerPosition, containerSize) => {
  let offScreen = false;
  if (position === 'left' && containerPosition.left < 0) {
    offScreen = true;
  }
  if (position === 'right' && window.innerWidth < containerPosition.left + containerSize.width) {
    offScreen = true;
  }
  return offScreen;
};
const ContainerDiv = glamorous.div(props => {
  const { transition, visible, setIsOffScreen, style, ...restProps } = props;
  const { targetElm, position, containerSize } = restProps;
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
  const checkedContainerPosition = checkWindowPositionForContainer({ ...restProps, containerPosition });
  setIsOffScreen(isOffScreen(position, checkedContainerPosition, containerSize));
  return { ...baseStyle, ...checkedContainerPosition };
});

const Arrow = glamorous.span(props => {
  const { fg, bg, position, arrow, arrowStyle } = props;
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
      borderTop: fgTransBorder,
      borderBottom: fgTransBorder,
      top: 'calc(50% - 8px)',
    };
    if (position === 'left') {
      fgStyle = { ...fgStyle, ...fgStyleLeftOrRightBase, right: -10, borderLeft: fgColorBorder };
    }
    if (position === 'right') {
      fgStyle = { ...fgStyle, ...fgStyleLeftOrRightBase, left: -10, borderRight: fgColorBorder };
    }
    if (position === 'left' || position === 'right') {
      if (arrow === 'top') {
        fgStyle.top = 2;
      }
      if (arrow === 'bottom') {
        fgStyle.top = null;
        fgStyle.bottom = 1;
      }
    }

    const fgStyleTopOrBottomBase = {
      left: '50%',
      marginLeft: -8,
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
        fgStyle.right = '0px';
        fgStyle.marginLeft = null;
      }
      if (arrow === 'left') {
        fgStyle.left = null;
        fgStyle.marginLeft = null;
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
      borderTop: bgTransBorder,
      borderBottom: bgTransBorder,
      top: 'calc(50% - 9px)',
    };
    if (position === 'left') {
      bgStyle = { ...bgStyle, ...bgStyleLeftOrRightBase, right: -11, borderLeft: bgColorBorder };
    }
    if (position === 'right') {
      bgStyle = { ...bgStyle, ...bgStyleLeftOrRightBase, left: -11, borderRight: bgColorBorder };
    }
    if (position === 'left' || position === 'right') {
      if (arrow === 'top') {
        bgStyle.top = 1;
      }
      if (arrow === 'bottom') {
        bgStyle.top = null;
        bgStyle.bottom = 0;
      }
    }
    const bgStyleTopOrBottomBase = {
      left: '50%',
      marginLeft: -9,
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
        bgStyle.right = -1;
        bgStyle.marginLeft = null;
      }
      if (arrow === 'left') {
        bgStyle.left = -1;
        bgStyle.marginLeft = null;
      }
    }
    return { ...baseStyle, ...bgStyle };
  }
  return null;
});
const ArrowContainer = glamorous.div({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

class ToolTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: props.position,
      arrow: props.arrow,
    };
    this.setIsOffScreen = this.setIsOffScreen.bind(this);
    this.isOffScreen = false;
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

  componentDidUpdate() {
    if (this.isOffScreen) {
      const { fallbackPosition, fallbackArrow } = this.props;
      // prettier-ignore
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        position: fallbackPosition,
        arrow: fallbackArrow,
      });
    }
  }

  setIsOffScreen(offScreen) {
    this.isOffScreen = offScreen;
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
        innerRef={ref => {
          this.ref = ref;
        }}
        transition={transition}
        targetElm={targetElm}
        position={position}
        arrow={arrow}
        containerSize={this.getContainerSize()}
        positionMargin={positionMargin}
        reposition={this.reposition}
        setIsOffScreen={this.setIsOffScreen}
      >
        {this.props.arrow
          ? <ArrowContainer>
            <Arrow fg arrowStyle={arrowStyle} position={position} arrow={arrow} positionMargin={positionMargin} />
            <Arrow bg arrowStyle={arrowStyle} position={position} arrow={arrow} positionMargin={positionMargin} />
          </ArrowContainer>
          : null}
        {this.props.children}
      </ContainerDiv>
    );
  }
}

ToolTip.propTypes = {
  visible: PropTypes.bool,
  targetElm: PropTypes.object, // eslint-disable-line
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  fallbackPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  arrow: PropTypes.oneOf([null, 'center', 'top', 'right', 'bottom', 'left']),
  fallbackArrow: PropTypes.oneOf([null, 'center', 'top', 'right', 'bottom', 'left']),
  style: PropTypes.object, // eslint-disable-line
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
