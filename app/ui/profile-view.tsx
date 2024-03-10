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
    <div className="flex max-w-[1600px] m-auto">
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[300px] w-auto m-2"
        shadow="sm"
      >
        <CardBody className="w-full">
          <div className="flex-col flex-wrap justify-center items-center w-full">
            <div className="relative w-full">
              <Image
                alt="Album cover"
                className="object-cover"
                height={200}
                shadow="md"
                src={data.avatar_url}
                width="100%"
              />
            </div>

            <div className="flex-1 m-2 tracking-wide">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-0">
                  <p className="text-small text-foreground/50 mt-2">
                    @{data.login}
                  </p>
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
                  <p className="text-small text-foreground/80 flex items-center">
                    <MdEmail className="mr-1" /> {data.email}
                  </p>
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
                </div>
                {/* <Link href={data.html_url} target="_blank"> */}
                {/* <Button
                    isIconOnly
                    className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                    radius="full"
                    variant="light"
                    // onPress={() => setLiked((v) => !v)}
                  > */}
                {/* Github */}
                {/* <HeartIcon
                    className={liked ? "[&>path]:stroke-transparent" : ""}
                    fill={liked ? "currentColor" : "none"}
                  /> */}
                {/* </Button> */}
                {/* </Link> */}
              </div>

              <div className="flex flex-col mt-3 gap-1">
                {/* <Slider
                  aria-label="Music progress"
                  classNames={{
                    track: "bg-default-500/30",
                    thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                  }}
                  color="foreground"
                  defaultValue={33}
                  size="sm"
                /> */}
                <div className="flex-column justify-between items-center">
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
              {/* 
              <div className="flex w-full items-center justify-center">
                <Link href={data.blog ? data.blog : undefined} target="_blank">
                  <Button
                    // isIconOnly
                    className="w-auto h-auto data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                  >
                    site
                    <PauseCircleIcon size={54} />
                  </Button>
                </Link>
              </div> */}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
