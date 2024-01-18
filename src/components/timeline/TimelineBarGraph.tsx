import React from "react";
import { Bar } from "react-chartjs-2";

interface Task {
  title: string;
  startDate: string;
  endDate: string;
  members: string[];
}

interface GanttChartProps {
  tasks: Task[];
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks }) => {
  // Transform tasks data into Chart.js dataset format
  const chartData = {
    labels: tasks.map((task) => task.title),
    datasets: [
      {
        data: tasks.map((task) => ({
          x: new Date(task.startDate),
          y: tasks.indexOf(task),
          xEnd: new Date(task.endDate),
        })),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options for Gantt chart
  const chartOptions = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        time: {
          unit: "day",
        },
      },
      y: {
        type: "category",
        position: "left",
      },
    },
  };

  return (
    <div>
      <h2>Gantt Chart</h2>
      <Bar data={chartData} options={chartOptions as any} />
    </div>
  );
};

export default GanttChart;
