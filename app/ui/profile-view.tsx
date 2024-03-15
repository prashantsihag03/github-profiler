"use client";

import { Card, CardBody, Image } from "@nextui-org/react";
import { MdEmail } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import Link from "next/link";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ProfileView({
  data,
  totalRepos,
}: {
  data: any;
  totalRepos: string;
}) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const selectedMonthName = months[date.getUTCMonth()];
    return `${date.getUTCDate()} ${selectedMonthName} ${date.getUTCFullYear()}`;
  };

  return (
    <Card
      isBlurred
      className="flex-1 max-w-[500px] min-w-[300px] m-auto border-none bg-background/60 dark:bg-default-100/30"
      shadow="sm"
    >
      <CardBody className="w-full">
        <div className="flex-col flex-wrap justify-center items-center w-full">
          <div className="relative w-full flex justify-center items-center">
            <Image
              alt="Album cover"
              className="object-cover max-w-[300px]"
              height={200}
              shadow="md"
              src={data.avatar_url}
              width="100%"
            />
          </div>

          <div className="flex-1 tracking-wide w-full m-auto max-w-[300px] flex-col justify-center items-center">
            <div className="flex flex-col w-full justify-between items-center">
              <div className="flex flex-col gap-0 max-w-[400px] w-full items-center">
                <p className="text-small text-foreground/50">@{data.login}</p>
                <Link href={data.html_url} target="_blank">
                  <h1 className="text-large font-medium text-blue-500">
                    {data.name}
                  </h1>
                </Link>
                {data.bio ? (
                  <p className="text-small text-foreground/80 mb-1">
                    {data.bio}
                  </p>
                ) : null}

                <p className="text-small text-foreground/50 mb-2 flex items-center">
                  <FaCalendarAlt className="mr-1" /> member since{" "}
                  {formatDate(data.created_at)}
                </p>

                {data.location ? (
                  <p className="text-small text-foreground/80">
                    {data.location}
                  </p>
                ) : null}
                {data.email ? (
                  <p className="text-small text-foreground/80 flex items-center">
                    <MdEmail className="mr-1" /> {data.email}
                  </p>
                ) : null}
                {data.blog ? (
                  <p className="text-small text-foreground/80 flex items-center">
                    <FaLink className="mr-1" />
                    <Link
                      href={data.blog}
                      target="_blank"
                      className="hover:underline"
                    >
                      {data.blog}
                    </Link>
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <div className="flex-col justify-between items-center">
                <p className="text-small p-2 mb-2 bg-background/60 text-center">
                  <b>Repositories</b>: {totalRepos}
                </p>
                <p className="text-small p-2 mb-2 bg-background/60 text-center">
                  <b>Followers</b>: {data.followers}
                </p>
                <p className="text-small p-2 mb-2 bg-background/60 text-center">
                  <b>Followings</b>: {data.following}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
