import glamorous from 'glamorous';
import { getContainerPosition, checkWindowPositionForContainer, isOffScreen } from '../utils';

export default glamorous.div(props => {
  const { transition, visible, setIsOffScreen, style, transitionTime,...restProps } = props;
  const { targetElm, position, containerSize } = restProps;
  if (!targetElm) return { display: 'none' };
  const baseStyle = {
    position: 'absolute',
    padding: '5px',
    background: '#fff',
    boxShadow: '0 0 8px rgba(0,0,0,.3)',
    borderRadius: '3px',
    transition: `${transition} ${transitionTime} ease-in-out, visibility ${transitionTime} ease-in-out`,
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