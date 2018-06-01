/* @flow */

export type DOMProps = {};

export type DOMStyles = {|
  width?: number | string,
  height?: number | string,
  top?: number | string,
  bottom?: number | string,
  left?: number | string,
  right?: number | string,
  backgroundColor?: string,
|};

export type YogaStyles = {
  left?: number | string,
  right?: number | string,
  top?: number | string,
  bottom?: number | string,
  width?: number | string,
  height?: number | string,
  padding?: number,
  margin?: number,
  flexDirection?: string,
  justifyContent?: string,
  alignItems?: string,
};

type Styles = $Diff<YogaStyles, DOMStyles>;

export type Props = {
  ...DOMProps,
  style: Styles,
};

export const shadowNodeStyles = [
  'left',
  'right',
  'top',
  'bottom',
  'width',
  'height',
  'padding',
  'margin',
  'flexDirection',
  'justifyContent',
  'alignItems',
];
