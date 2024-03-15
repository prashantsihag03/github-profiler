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

export default function Charts({
  langData,
  title,
}: {
  langData: LangData;
  title: string;
}) {
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
    <Card className="flex-1 min-w-[400px] bg-background/60 dark:bg-default-100/30 min-h-[400px] flex-wrap h-auto w-auto border-box">
      <CardBody className="flex flex-col justify-center items-center h-[100%] w-[100%]">
        <p className="w-full text-center max-h-[10%] pb-2">{title}</p>
        <div className="w-[100%] h-[80%] flex justify-center items-center">
          <Doughnut
            data={langChartData}
            style={{ boxSizing: "border-box" }}
            width={"100%"}
            height={"80%"}
            options={{
              color: "white",
              borderColor: "gray",
              layout: {
                autoPadding: true,
              },
              plugins: {
                legend: {
                  labels: {
                    padding: 15,
                  },
                  display: true,
                  align: "center",
                  fullSize: true,
                  position: "bottom",
                },
                colors: {
                  forceOverride: true,
                },
              },
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
}
