import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tooltip from './index';

describe('Tooltip', () => {
  const originErrorFn = console.error;
  beforeAll(() => {
    console.error = jest.fn().mockImplementation(warning => {
      throw new Error(warning)
    });
  });
  afterAll(() => {
    console.error = originErrorFn;
  });
  test('should render Tooltip', () => {
    class App extends React.Component {
      componentDidMount() {
        this.forceUpdate();
      }

      render() {
        return <div>
          {this.self ? <Tooltip visible targetElm={this.self} position="bottom" arrow="center">
            <div className="card" style={{ width: '20rem' }}>
              <div className="card-body">
                <h4 className="card-title">Tooltip title</h4>
                <p className="card-text">Some quick example text to build on the ToolTip title and make up the bulk of
                  the Tooltip's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </Tooltip> : null}
          <h2 ref={(self) => {
            this.self = self;
          }}>target element</h2>
        </div>;
      }
    }
    const tree = mount(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  test('should enforce a target element', () => {
    expect(() => mount(
      <Tooltip visible position="bottom" arrow="center">
        <div className="card" style={{ width: '20rem' }}>
          <div className="card-body">
            <h4 className="card-title">Tooltip title</h4>
            <p className="card-text">Some quick example text to build on the ToolTip title and make up the bulk of
              the Tooltip's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </Tooltip>
    )).toThrowErrorMatchingSnapshot();
  });

  test('should enforce a single child', () => {
    expect(() => mount(
      <Tooltip visible position="bottom" arrow="center">
        <h4 className="card-title">Tooltip title</h4>
        <p className="card-text">Some quick example text to build on the ToolTip title and make up the bulk of
          the Tooltip's content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </Tooltip>
    )).toThrowErrorMatchingSnapshot();
  });
});