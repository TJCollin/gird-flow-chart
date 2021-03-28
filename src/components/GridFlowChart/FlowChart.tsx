import React, { ReactNode, useEffect, useRef } from "react";

import { StrokeData, Svg, SVG } from "@svgdotjs/svg.js";
import {
  FlowNode,
  Line,
  FlowTextType,
  RectArea,
  Grid,
  NodeMargin,
} from "./types";
import { position, drawTexts, drawLines, drawGrid, drawRects } from "./utils";

const defaultLineStrokeData = { width: 1, color: "#000" };
const defaultMargin = { x: 0, y: 0 };
const defaultRectStrokeData = { width: 1, color: "#000", dasharray: "5,5" };
const defaultTextFontData = { color: "#000" };
const defaultGridStrokeData = { dasharray: "5,5", width: 1, color: "#999" };

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

const FlowChart: React.FC<FlowChartProps> = (props) => {
  const {
    nodes,
    lines,
    defaultLineStroke = defaultLineStrokeData,
    colWidth = 150,
    rowHeight = 100,
    nodeWidth = 120,
    nodeHeight = 80,
    margin = defaultMargin,
    grid,
    rects,
    defaultRectStroke = defaultRectStrokeData,
    texts,
    defaultTextFont = defaultTextFontData,
    dis = 10,
    hoverLineColor = "#000",
    defaultGridStroke = defaultGridStrokeData,
    children,
  } = props;

  const renderNodes = () => {
    return nodes.map((node: FlowNode) => {
      const childrenComponents = React.Children.map<ReactNode, ReactNode>(
        children,
        (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...node });
          }
        }
      );
      return (
        <div
          className="flow-node"
          style={position(
            node,
            margin,
            colWidth,
            rowHeight,
            nodeWidth,
            nodeHeight
          )}
          key={node.id}
        >
          {childrenComponents}
        </div>
      );
    });
  };
  const wrapper = useRef<HTMLDivElement>(null);
  const draw = useRef<Svg>(SVG());
  useEffect(() => {
    draw.current.addTo(wrapper.current as HTMLDivElement).size("100%", "100%");
  }, []);

  useEffect(() => {
    const current = draw.current;
    // 保存每一列的节点
    const cols: unknown[][] = [];
    // 保存每一行的节点
    const rows: unknown[][] = [];
    // 箭头大小
    const arrowSize = 5;

    // 收集每一行节点数，节点按列排序
    const tempNodes = [...nodes];
    tempNodes.sort((a, b) => a.col - b.col);
    tempNodes.forEach(({ id, row }) => {
      if (typeof rows[row] === "undefined") {
        rows[row] = [];
      }
      rows[row].push(id);
    });

    // 收集每一列的节点数，节点间按行排列
    tempNodes.sort((a, b) => a.col - b.col);
    tempNodes.forEach(({ id, col }) => {
      if (typeof cols[col] === "undefined") {
        cols[col] = [];
      }
      cols[col].push(id);
    });

    drawLines(
      current,
      lines,
      arrowSize,
      hoverLineColor,
      defaultLineStroke,
      nodes,
      dis,
      cols,
      rows,
      colWidth,
      rowHeight,
      nodeHeight,
      nodeWidth,
      margin
    );
    if (grid) {
      drawGrid(
        current,
        wrapper.current?.offsetWidth || 0,
        wrapper.current?.offsetHeight || 0,
        grid,
        colWidth,
        rowHeight,
        defaultGridStroke
      );
    }
    drawTexts(
      current,
      texts || [],
      defaultTextFont,
      defaultGridStroke,
      rowHeight,
      colWidth
    );
    drawRects(
      draw.current,
      rects || [],
      wrapper.current?.offsetWidth || 0,
      wrapper.current?.offsetHeight || 0,
      colWidth,
      rowHeight,
      defaultRectStroke
    );
    return () => {
      current.clear();
    };
  }, [
    lines,
    grid,
    draw,
    rects,
    defaultGridStroke,
    defaultLineStroke,
    colWidth,
    rowHeight,
    hoverLineColor,
    defaultRectStroke,
    defaultTextFont,
    texts,
    nodeWidth,
    nodeHeight,
    dis,
    margin,
    nodes,
  ]);

  return (
    <div className="wrapper" ref={wrapper}>
      {renderNodes()}
    </div>
  );
};

export default FlowChart;
