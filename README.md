# react-glamorous-tooltip

## Installation
```sh
npm install react-glamorous-tooltip
```
## Usage
**Using NPM**

1 . Require react-glamorous-tooltip after installation

```js
import Tooltip from 'react-glamorous-tooltip'
```
2 . Include react-glamorous-tooltip component
```js
<Tooltip visible targetElm={this.self} position="bottom" arrow="center" >

</Tooltip>
```
3 . Using react-glamorous-tooltip component wrap up your tooltip content
```js
<Tooltip visible targetElm={this.self} position="bottom" arrow="center" >
     <p>your Tooltip content</p>
</Tooltip>
```
## Demo

[![Edit ym07mzlxnx](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/ym07mzlxnx)

## Props

| Name | Description | Type | Required |
| --- | --- | :---: | :---: |
| `visible` | Defines if the Tooltip is visible or not. <br> *Default: false.* | Boolean |  |
| `targetElm` | target element which you want tooltip to point to| element | ✅ |
| `position` | where to position your tooltip. | string, PropTypes.oneOf(['top', 'right', 'bottom', 'left']) |  |
| `fallbackPosition` | fallback position of your tooltip when it's offscreen. | string, PropTypes.oneOf(['top', 'right', 'bottom', 'left'])  |  |
| `arrow` |where to position the arrow of your tooltip. | PropTypes.oneOf([null, 'center', 'top', 'right', 'bottom', 'left']) | |
| `fallbackArrow` |fallback arrow position when tooltip is offscreen. | PropTypes.oneOf([null, 'center', 'top', 'right', 'bottom', 'left']) | |
| `style` |styles apply to your tooltip  | object, { style: {}, arrowStyle: {} }  | |
| `positionMargin` |positionMargin apply to your tooltip bewteen target element and tooltip  | number  | |
| `transition` |transition apply to your tooltip  | string, Default: 'all'.    | |
| `children` | child react element | element | ✅ |
