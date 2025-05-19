import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
)

type Props = {
  chartData: {
    labels: string[]
    datasets: any[]
  }
}

export function ChartUI({ chartData }: Props) {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const },
      title: { display: true, text: "Top History" },
    },
    scales: {
      y: { reverse: true, beginAtZero: false },
    },
  }

  return <Line data={chartData} options={options} />
}
