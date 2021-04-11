import React from "react";
import { FlowNode } from "grid-flow-chart-react";

interface FlowNodeComponentProps {
  node: FlowNode;
}

const FlowNodeComponent: React.FC<FlowNodeComponentProps> = (props) => {
  const { node } = props;
  return node.text ? <div className="my-card">{node.text}</div> : <></>;
};

export default FlowNodeComponent;
