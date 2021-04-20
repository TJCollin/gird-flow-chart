import React, { useState } from "react";
import "./App.scss";
import { Layout, InputNumber, Input, Button, Form } from "antd";
import "antd/dist/antd.css";
import { GridFlowChart, FlowNode, Grid, Line } from "grid-flow-chart-react";
import "grid-flow-chart-react/dist/index.css";
import FlowNodeComponent from "./FlowNode/FlowNode";
const { Sider, Content } = Layout;

function App() {
  const [nodes, setNodes] = useState<FlowNode[]>([
    {
      id: 1,
      col: 0,
      row: 0,
      text: "流程一",
    },

    {
      id: 2,
      col: 0,
      row: 1,
      text: "流程二",
    },
    {
      id: 3,
      col: 1,
      row: 0,
      text: "流程三",
    },
    {
      id: 4,
      col: 1,
      row: 1,
      text: "流程四",
    },
    {
      id: 5,
      col: 1,
      row: 2,
      text: "流程五",
    },
    {
      id: 6,
      col: 2,
      row: 0,
      text: "流程六",
    },
    {
      id: 7,
      col: 2,
      row: 1,
      text: "流程七",
    },
    {
      id: 8,
      col: 2,
      row: 2,
      text: "流程八",
    },

    {
      id: 13,
      col: 3,
      row: 0,
      text: "流程九",
    },
    {
      id: 14,
      col: 3,
      row: 1,
      text: "流程十",
    },
    {
      id: 15,
      col: 3,
      row: 2,
      text: "流程十一",
    },
    {
      id: 16,
      col: 3,
      row: 3,
      text: "流程十二",
    },
    {
      id: 17,
      col: 3,
      row: 4,
      text: "流程十三",
    },
    {
      id: 18,
      col: 4,
      row: 0,
      text: "流程十四",
    },
    {
      id: 19,
      col: 4,
      row: 1,
      text: "流程十五",
    },
    {
      id: 20,
      col: 4,
      row: 2,
      text: "流程十六",
    },
    {
      id: 21,
      col: 5,
      row: 0,
      text: "流程十七",
    },
    {
      id: 22,
      col: 5,
      row: 1,
      text: "流程十八",
    },
    {
      id: 23,
      col: 5,
      row: 2,
      text: "流程十九",
    },
    {
      id: 24,
      col: 5,
      row: 3,
      text: "流程二十",
    },
    {
      id: 25,
      col: 6,
      row: 0,
      text: "流程二十一",
    },
    {
      id: 26,
      col: 6,
      row: 1,
      text: "流程二十二",
    },
  ]);
  const [lines, setLines] = useState<Line[]>([
    {
      source: 1,
      target: 2,
    },
    {
      source: 2,
      target: 3,
    },
    {
      source: 3,
      target: 4,
    },
    {
      source: 4,
      target: 5,
    },
    {
      source: 5,
      target: 6,
    },
    {
      source: 6,
      target: 7,
    },
    {
      source: 7,
      target: 8,
    },
    {
      source: 8,
      target: 13,
    },
    {
      source: 13,
      target: 14,
    },
    {
      source: 14,
      target: 15,
    },
    {
      source: 15,
      target: 16,
    },
    {
      source: 16,
      target: 18,
    },
    {
      source: 17,
      target: 18,
    },
    {
      source: 8,
      target: 15,
    },
    {
      source: 18,
      target: 19,
    },
    {
      source: 19,
      target: 20,
    },
    {
      source: 20,
      target: 21,
    },
    {
      source: 21,
      target: 22,
    },
    {
      source: 21,
      target: 23,
    },
    {
      source: 21,
      target: 24,
    },
    {
      source: 21,
      target: 25,
    },
    {
      source: 24,
      target: 25,
    },
    {
      source: 22,
      target: 25,
    },
    {
      source: 23,
      target: 25,
    },
    {
      source: 25,
      target: 26,
    },
  ]);

  const [grid, setGrid] = useState<Grid>({
    row: [1, 2],
    col: [1, 2, 3, 4, 5, 7],
  });

  const margin = {
    x: 20,
    y: 30,
  };
  const texts = [
    {
      colStart: 0,
      colEnd: 1,
      content: "阶段一",
    },
    {
      colStart: 1,
      colEnd: 2,
      content: "阶段二",
    },
    {
      colStart: 2,
      colEnd: 3,
      content: "阶段三",
    },
    {
      colStart: 3,
      colEnd: 4,
      content: "阶段四",
    },
    {
      colStart: 4,
      colEnd: 5,
      content: "阶段五",
    },
    {
      colStart: 5,
      colEnd: 7,
      content: "阶段六",
    },
  ];
  const rects = [
    {
      startCol: 0,
      endCol: 0.95,
      startRow: 0,
      endRow: 2,
    },
    {
      startCol: 1,
      endCol: 1.95,
      startRow: 0,
      endRow: 3,
    },
  ];
  const lineStroke = {
    width: 2,
    color: "#1976D2",
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    setNodes([...nodes, { ...values }]);
  };
  const onLineFinish = (values: any) => {
    console.log("Success:", values);
    setLines([...lines, { ...values }]);
  };
  const onGridFinish = (values: any) => {
    console.log("Success:", values);
    const row =
      grid.row && grid.row instanceof Array
        ? [...grid.row, values.row]
        : [...values.row];
    const col =
      grid.col && grid.col instanceof Array
        ? [...grid.col, values.row]
        : [...values.row];
    setGrid({ row: row, col: col });
  };

  return (
    <Layout>
      <Content>
        <div className="App">
          <div className="flow-demo">
            <GridFlowChart
              nodeHeight={60}
              nodeWidth={110}
              rowHeight={95}
              colWidth={150}
              nodes={nodes}
              lines={lines}
              margin={margin}
              grid={grid}
              rects={rects}
              texts={texts}
              dis={15}
              defaultLineStroke={lineStroke}
              render={(node) => (
                <FlowNodeComponent node={node}></FlowNodeComponent>
              )}
            ></GridFlowChart>
          </div>
        </div>
      </Content>
      <Sider
        style={{ background: "#f0f2f5", padding: "20px" }}
        width="300"
        theme="light"
      >
        <div className="section">
          <p>new node：</p>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="id"
              name="id"
              rules={[{ required: true, message: "Please input ID" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="text"
              name="text"
              rules={[{ required: true, message: "Please input text" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="col"
              name="col"
              rules={[{ required: true, message: "Please input row" }]}
            >
              <InputNumber type="number" />
            </Form.Item>

            <Form.Item
              label="row"
              name="row"
              rules={[{ required: true, message: "Please input column" }]}
            >
              <InputNumber type="number" />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="section">
          <p>new line：</p>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onLineFinish}
          >
            <Form.Item
              label="source"
              name="source"
              rules={[{ required: true, message: "Please input row" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="target"
              name="target"
              rules={[{ required: true, message: "Please input column" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="section">
          <p>new grid：</p>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onGridFinish}
          >
            <Form.Item label="col" name="col">
              <InputNumber type="number" />
            </Form.Item>

            <Form.Item label="row" name="row">
              <InputNumber type="number" />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Sider>
    </Layout>
  );
}

export default App;
