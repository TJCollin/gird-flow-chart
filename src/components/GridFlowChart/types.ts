import { FillData, StrokeData } from "@svgdotjs/svg.js";

export interface FlowNode {
  id: string | number;
  col: number;
  row: number;
  [prop: string]: any;
}
export interface LineSymbol {
  title?: string;
}
export interface Line {
  source: number | string;
  target: number | string;
  symbols?: LineSymbol[];
  color?: string;
}
export interface NodeMargin {
  x: number;
  y: number;
}

// 'a' means all
export type LineType = "a" | Array<number>;
export interface Grid {
  row?: LineType;
  col?: LineType;
}

export interface RectArea {
  startCol: number;
  startRow: number;
  endCol: number;
  endRow: number;
  stroke?: StrokeData;
  fill?: FillData;
}

export type alignType = "start" | "middle" | "end";

export interface FlowTextType {
  rowStart?: number;
  rowEnd?: number;
  colStart?: number;
  colEnd?: number;
  rotate?: boolean;
  rowAlign?: alignType;
  colAlign?: alignType;
  content: string;
  font?: Record<string, any>;
}

export type Direction = "top" | "left" | "bottom" | "right";

export interface FlowChartProps {
  /**节点 */
  nodes: FlowNode[];
  /**连接线 */
  lines: Line[];
  /**连接线悬浮颜色 */
  hoverLineColor?: string;
  /**连接线默认样式 */
  defaultLineStroke?: StrokeData;
  /**列宽 */
  colWidth?: number;
  /**行高 */
  rowHeight?: number;
  /**节点宽度 */
  nodeWidth?: number;
  /**节点高度 */
  nodeHeight?: number;
  /**节点距离网格线左方(x)和上方(y)的距离 */
  margin?: NodeMargin;
  /**网格线 */
  grid?: Grid;
  /**网格线默认样式 */
  defaultGridStroke?: StrokeData;
  /**矩形框 */
  rects?: RectArea[];
  /**矩形框默认样式 */
  defaultRectStroke?: StrokeData;
  /**文字 */
  texts?: FlowTextType[];
  /**默认文字样式 */
  defaultTextFont?: Object;
  /**转折点离节点的距离 */
  dis?: number;
}
