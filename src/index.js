import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Arrow from './components/Arrow';
import ArrowContainer from './components/ArrowContainer';
import ToolTipContainer from './components/ToolTipContainer';

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
    const { targetElm, style, positionMargin, visible, transition, transitionTime } = this.props;

    const { style: containerStyle, arrowStyle } = style;
    return (
      <ToolTipContainer
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
        transitionTime={transitionTime}
      >
        {this.props.arrow
          ? <ArrowContainer>
            <Arrow fg arrowStyle={arrowStyle} position={position} arrow={arrow} positionMargin={positionMargin}
                   transitionTime={transitionTime} />
            <Arrow bg arrowStyle={arrowStyle} position={position} arrow={arrow} positionMargin={positionMargin}
                   transitionTime={transitionTime} />
          </ArrowContainer>
          : null}
        {this.props.children}
      </ToolTipContainer>
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
  transitionTime: PropTypes.string,
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
  transitionTime: '.3s'
};
export default ToolTip;
