import glamorous from 'glamorous';
export default glamorous.span(props => {
  const { fg, bg, position, arrow, arrowStyle, transitionTime } = props;
  const baseStyle = {
    position: 'absolute',
    content: '""',
    transition: `all ${transitionTime} ease-in-out`,
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