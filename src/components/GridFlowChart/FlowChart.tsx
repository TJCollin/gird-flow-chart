import React, { ReactNode, useEffect, useRef } from "react";

import { StrokeData, Svg, SVG } from "@svgdotjs/svg.js";
import { FlowNode, FlowChartProps } from "./types";
import { position, drawTexts, drawLines, drawGrid, drawRects } from "./utils";
import { render } from "react-dom";

const defaultLineStrokeData = { width: 1, color: "#000" };
const defaultMargin = { x: 0, y: 0 };
const defaultRectStrokeData = { width: 1, color: "#000", dasharray: "5,5" };
const defaultTextFontData = { color: "#000" };
const defaultGridStrokeData = { dasharray: "5,5", width: 1, color: "#999" };

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
    // children,
    render,
  } = props;

  const renderNodes = () => {
    return nodes.map((node: FlowNode) => {
      // const childrenComponents = React.Children.map<ReactNode, ReactNode>(
      //   children,
      //   (child) => {
      //     if (React.isValidElement(child)) {
      //       return React.cloneElement(child, { ...node });
      //     }
      //   }
      // );
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
          {render(node)}
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
      current,
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
