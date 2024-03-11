"use client";

import { Card, CardBody } from "@nextui-org/react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale);

export interface LangData {
  [key: string]: number;
}

export default function Charts({ langData }: { langData: LangData }) {
  const langChartData: ChartData<"doughnut", number[], unknown> = {
    labels: Object.keys(langData),
    datasets: [
      {
        label: "Language",
        data: Object.values(langData),
        borderWidth: 1,
        borderColor: [
          "#0891ed",
          "#eb0b3c",
          "#0de9e9",
          "#ff8000",
          "#7530ff",
          "#ffb300",
          "#ffffff",
        ],
        backgroundColor: [
          "#0891ed",
          "#eb0b3c",
          "#0de9e9",
          "#ff8000",
          "#7530ff",
          "#ffb300",
          "#ffffff",
        ],
      },
    ],
  };

  return (
    <Card className="flex-1 max-h-[600px] min-w-[300px] h-auto w-auto m-2 ">
      <CardBody className="flex-col items-center justify-center">
        <p className="w-full text-center">LANGUAGES:</p>
        <Doughnut
          data={langChartData}
          options={{
            color: "white",
            borderColor: "gray",
            layout: {
              padding: 10,
            },
            plugins: {
              legend: {
                display: true,
                align: "center",
              },
              colors: {
                forceOverride: true,
              },
            },
          }}
        />
      </CardBody>
    </Card>
  );
}
