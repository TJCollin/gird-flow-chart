import React from "react";
import { FlowNode } from "../GridFlowChart/types";
export type FlowNodeProps = Partial<FlowNode>;

const FlowNodeComponent: React.FC<FlowNodeProps> = (props) => {
  return props.text ? <div className="my-card">{props.text}</div> : <></>;
};

export default FlowNodeComponent;
