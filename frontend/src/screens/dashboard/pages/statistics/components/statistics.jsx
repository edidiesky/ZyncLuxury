import { BarChartStacked } from "@/screens/dashboard/components/charts/BarChart";

const Statistics = ({
  chartData,
  chartConfig,
  dataKeys,
  selectedAction,
  handleChartFilterChange,
}) => {
  return (
    <div className="flex w-full">
      <BarChartStacked
        onFilterChange={handleChartFilterChange}
        selectedFilter={selectedAction["date-range"]}
        dataKeys={dataKeys}
        chartConfig={chartConfig}
        data={chartData}
        title={"Money flow"}
        description="Displaying total My Tax payment trends over the selected period"
      />
    </div>
  );
};

export default Statistics;
