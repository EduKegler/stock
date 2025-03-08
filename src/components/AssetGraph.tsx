import { memo, useMemo } from "react";
import { LinePath } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
import { extent } from "@visx/vendor/d3-array";
import { Group } from "@visx/group";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { GridRows, GridColumns } from "@visx/grid";

interface ChartDataPoint {
  date: string;
  price: number;
}

interface AssetGraphProps {
  chartData: ChartDataPoint[];
}

function AssetGraph({ chartData }: AssetGraphProps) {
  const width = 700;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 40, left: 60 };

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = useMemo(
    () =>
      scaleLinear({
        range: [0, xMax],
        domain: [0, chartData.length - 1],
      }),
    [xMax, chartData]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        domain: extent(chartData, (d) => d.price) as [number, number],
        nice: true,
      }),
    [yMax, chartData]
  );

  return (
    <div className="h-[400px] overflow-x-scroll">
      <svg width={width} height={height} role="figure">
        <Group left={margin.left} top={margin.top}>
          <GridRows
            scale={yScale}
            width={xMax}
            strokeDasharray="3,3"
            stroke="#e0e0e0"
          />
          <GridColumns
            scale={xScale}
            height={yMax}
            strokeDasharray="3,3"
            stroke="#e0e0e0"
          />
          <AxisBottom
            top={yMax}
            scale={xScale}
            tickFormat={(i) => chartData[i as number]?.date}
          />
          <AxisLeft scale={yScale} />
          <LinePath
            data={chartData}
            x={(_, i) => xScale(i)}
            y={(d) => yScale(d.price)}
            stroke="#1BC461"
            strokeWidth={2}
          />
        </Group>
      </svg>
    </div>
  );
}

export default memo(AssetGraph);
