import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import serializer from 'jest-glamor-react'
import Arrow from '../Arrow';

expect.addSnapshotSerializer(serializer);

describe('Arrow', () => {
  function renderArrow(arrowType, position, arrow) {
    test(`should render ${arrowType} Arrow with position ${position} and arrow ${arrow}`, () => {
      const props = {
        position,
        arrow,
        fg: arrowType === 'fg',
        bg: arrowType === 'bg'
      };
      const tree = mount(<Arrow {...props} />);
      expect(toJson(tree)).toMatchSnapshot();
    });
  };
  test('should render fg Arrow with default props', () => {
    const tree = mount(<Arrow fg />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  renderArrow('fg','top','left');
  renderArrow('fg','top','center');
  renderArrow('fg','top','right');

  renderArrow('fg','bottom','left');
  renderArrow('fg','bottom','center');
  renderArrow('fg','bottom','right');

  renderArrow('fg','left','top');
  renderArrow('fg','left','center');
  renderArrow('fg','left','bottom');

  renderArrow('fg','right','top');
  renderArrow('fg','right','center');
  renderArrow('fg','right','bottom');

  test('should render bg Arrow with default props', () => {
    const tree = mount(<Arrow bg />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  renderArrow('bg','top','left');
  renderArrow('bg','top','center');
  renderArrow('bg','top','right');

  renderArrow('bg','bottom','left');
  renderArrow('bg','bottom','center');
  renderArrow('bg','bottom','right');

  renderArrow('bg','left','top');
  renderArrow('bg','left','center');
  renderArrow('bg','left','bottom');

  renderArrow('bg','right','top');
  renderArrow('bg','right','center');
  renderArrow('bg','right','bottom');

});
