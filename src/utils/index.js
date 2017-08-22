export const checkWindowPositionForContainer = ({ containerPosition, containerSize, positionMargin, position }) => {
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
export const getContainerPosition = ({ position, arrow, targetElm, containerSize, positionMargin }) => {
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
export const isOffScreen = (position, containerPosition, containerSize) => {
  let offScreen = false;
  if (position === 'left' && containerPosition.left < 0) {
    offScreen = true;
  }
  if (position === 'right' && window.innerWidth < containerPosition.left + containerSize.width) {
    offScreen = true;
  }
  return offScreen;
};