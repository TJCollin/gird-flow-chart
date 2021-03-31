import React from "react";
import { render, screen } from "@testing-library/react";

import { nodeMiddle, drawLineWithArc } from "./utils";

describe("test nodeMiddle function", () => {
  const node = { col: 1, row: 1, id: 1 };
  const margin = { x: 5, y: 5 };
  test("top", () => {
    const middle = nodeMiddle(node, 0, "top", 50, 50, 30, 30, margin, 5);
    expect(middle).toEqual([70, 55]);
  });
  test("left", () => {
    const middle = nodeMiddle(node, 0, "left", 50, 50, 30, 30, margin, 5);
    expect(middle).toEqual([55, 70]);
  });
  test("bottom", () => {
    const middle = nodeMiddle(node, 0, "bottom", 50, 50, 30, 30, margin, 5);
    expect(middle).toEqual([70, 85]);
  });
  test("right", () => {
    const middle = nodeMiddle(node, 0, "right", 50, 50, 30, 30, margin, 5);
    expect(middle).toEqual([85, 70]);
  });
});

describe("test drawLineWithArc function", () => {
  // 顺时针测试
  const pathPoints = [
    [0, 0],
    [0, 10],
    [20, 10],
    [20, 0],
  ];
  // 逆时针测试
  const pathPoints2 = [
    [0, 0],
    [0, 10],
    [20, 10],
    [20, 20],
  ];
  test("2 points", () => {
    const arc = drawLineWithArc(pathPoints.slice(0, 2));
    expect(arc).toBe("M0 0 L0 10");
  });
  test("clockwise 4 points", () => {
    const arc = drawLineWithArc(pathPoints);
    expect(arc).toBe(`M0 0L0 5A5 5 0 0 0 5 10L15 10A5 5 0 0 0 20 5L20 0`);
  });
  test("counterclockwise 4 points", () => {
    const arc = drawLineWithArc(pathPoints2);
    expect(arc).toBe(`M0 0L0 5A5 5 0 0 0 5 10L15 10A5 5 0 0 1 20 15L20 20`);
  });
});
