import { checkWindowPositionForContainer, getContainerPosition, isOffScreen } from './index';

describe('utils', () => {
  test('checkWindowPositionForContainer should return correct containerPosition when container\'s left is off screen', () => {
    const position = 'top';
    const containerPosition = {
      left: -1,
    };
    const positionMargin = 7;
    const result = checkWindowPositionForContainer({ position, containerPosition, positionMargin });
    expect(result).toMatchSnapshot();
  });

  test('checkWindowPositionForContainer should return correct containerPosition when container\'s right is off screen', () => {
    const position = 'top';
    const containerPosition = {
      left: 1,
    };
    const positionMargin = 7;
    const containerSize = {
      width: 500,
    };
    window.innerWidth = 300;
    const result = checkWindowPositionForContainer({ position, containerPosition, containerSize, positionMargin });
    expect(result).toMatchSnapshot();
  });

  test('checkWindowPositionForContainer should return correct containerPosition when container is on screen ', () => {
    const position = 'top';
    const containerPosition = {
      left: 1,
    };
    const positionMargin = 7;
    const containerSize = {
      width: 200,
    };
    window.innerWidth = 300;
    const result = checkWindowPositionForContainer({ position, containerPosition, containerSize, positionMargin });
    expect(result).toMatchSnapshot();
  });

  test('checkWindowPositionForContainer should return correct containerPosition ', () => {
    const position = 'top';
    const arrow = 'left';
    const targetElm = {
      offsetWidth: 100,
      getBoundingClientRect: jest.fn().mockImplementation(() => ({
        top: 10,
        left: 50
      }))
    };
    const positionMargin = 7;
    const containerSize = {
      width: 200,
      height: 200
    };
    window.scrollY = 0;
    window.scrollX = 0;
    const result = getContainerPosition({ position, arrow, targetElm, containerSize, positionMargin });
    expect(result).toMatchSnapshot();
  });

  test('isOffScreen should return true when container\'s right is off screen ', () => {
    const position = 'right';
    const containerPosition = {
      left: 200
    };
    const containerSize = {
      width: 200,
      height: 200
    };
    window.innerWidth = 300;

    const result = isOffScreen(position, containerPosition, containerSize);
    expect(result).toMatchSnapshot();
  });

  test('isOffScreen should return true when container\'s left is off screen ', () => {
    const position = 'left';
    const containerPosition = {
      left: -10
    };
    const containerSize = {
      width: 200,
      height: 200
    };
    window.innerWidth = 300;

    const result = isOffScreen(position, containerPosition, containerSize);
    expect(result).toMatchSnapshot();
  });

  test('isOffScreen should return false when container is on screen ', () => {
    const position = 'right';
    const containerPosition = {
      left: 10
    };
    const containerSize = {
      width: 200,
      height: 200
    };
    window.innerWidth = 300;

    const result = isOffScreen(position, containerPosition, containerSize);
    expect(result).toMatchSnapshot();
  });
});