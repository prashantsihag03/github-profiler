"use client";

import { Card, CardBody, Image } from "@nextui-org/react";
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

export default function ProfileView({ data }: { data: any }) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const selectedMonthName = months[date.getUTCMonth()];
    return `${date.getUTCDate()} ${selectedMonthName} ${date.getUTCFullYear()}`;
  };

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] m-auto"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={200}
              shadow="md"
              src={data.avatar_url}
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <p className="text-small text-foreground/50 mt-2">
                  @{data.login}
                </p>
                <Link href={data.html_url} target="_blank">
                  <h1 className="text-large font-medium">{data.name}</h1>
                </Link>
                {data.bio ? (
                  <p className="text-small text-foreground/80 mb-1">
                    {data.bio}
                  </p>
                ) : null}

                <p className="text-small text-foreground/50 mb-2">
                  member since {formatDate(data.created_at)}
                </p>

                {data.location ? (
                  <p className="text-small text-foreground/80">
                    {data.location}
                  </p>
                ) : null}
                <p className="text-small text-foreground/80">E: {data.email}</p>
                <p className="text-small text-foreground/80">W: {data.blog}</p>
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
              <div className="flex-column justify-between">
                <p className="text-small">Followers: {data.followers}</p>
                <p className="text-small">Followings: {data.following}</p>
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
  );
}
