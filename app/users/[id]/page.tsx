import Charts, { LangData } from "@/app/ui/charts";
import ProfileView from "@/app/ui/profile-view";
import RepoList from "@/app/ui/repo-list";
import { Card, CardBody, Divider } from "@nextui-org/react";
import { Metadata } from "next";
import Link from "next/link";
import { Octokit } from "octokit";
import { MdEmail } from "react-icons/md";
import { FaLink } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Profile View",
};

const getLastDateOfMonth = (monthNo: number): number => {
  if (monthNo === 7) return 31;
  if (monthNo % 2 === 0) {
    return 30;
  } else {
    return 31;
  }
};

const getPreviousWeekStartDate = (from?: string) => {
  let fromDate: Date | null = null;
  if (from != null) {
    fromDate = new Date(from);
  } else {
    fromDate = new Date();
  }

  let prevWkStartDate = fromDate.getUTCDate();
  let prevWkMonth = fromDate.getUTCMonth();

  if (fromDate.getUTCDate() === 7) {
    // date should be last date of previous month
    prevWkStartDate = getLastDateOfMonth(fromDate.getUTCMonth() + 1);
    prevWkMonth = fromDate.getUTCMonth();
  } else if (fromDate.getUTCDate() < 7) {
    const prevMonthOffset = 7 - fromDate.getUTCDate();
    prevWkStartDate =
      getLastDateOfMonth(fromDate.getUTCMonth() + 1) - prevMonthOffset;
    prevWkMonth = fromDate.getUTCMonth();
  }

  return `${fromDate.getUTCFullYear()}-${prevWkMonth}-${prevWkStartDate}`;
};

const getLastMonthSameDate = () => {
  const today = new Date();
  let month = today.getUTCMonth();
  if (month === 0) month = 12;

  let date = today.getUTCDate();
  if (date === 30 || date === 31) date = 28;
  return `${today.getUTCFullYear()}-${month}-${date}`;
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_TOKEN,
  });

  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();

  const { data } = await octokit.rest.users.getByUsername({ username: id });

  const { data: repoData } = await octokit.rest.repos.listForUser({
    username: id,
    sort: "pushed",
    per_page: 100,
  });

  const languageCount: LangData = {};

  repoData.forEach((repo, index) => {
    if (repo.language == null) return;
    if (languageCount[repo.language] == null) {
      languageCount[repo.language] = 1;
      return;
    }
    languageCount[repo.language] = languageCount[repo.language] + 1;
  });

  const repoStars: LangData = {};

  repoData.forEach((repo, index) => {
    if (repo.stargazers_count == null) return;
    repoStars[repo.name] = repo.stargazers_count;
  });

  const sortedObj = Object.fromEntries(
    Object.entries(repoStars).sort((a, b) => b[1] - a[1])
  );

  const topFiveRepoStar = Object.keys(sortedObj).slice(0, 5);

  const newObject: LangData = {};
  topFiveRepoStar.forEach((val) => {
    newObject[val] = sortedObj[val];
  });

  const reposLastPushedThisYear = repoData.filter((repo) => {
    const pushedAt = repo.pushed_at;
    const today = new Date();
    if (pushedAt == null) return false;
    const pushedYear = new Date(pushedAt).getUTCFullYear();
    if (today.getUTCFullYear() === pushedYear) return true;
    return false;
  });

  console.log("Repos pushed at this year ?");
  reposLastPushedThisYear.forEach((repo) => {
    console.log(repo.name, " at ", new Date(repo.pushed_at!).getFullYear());
  });

  let totalCommits = 0;
  for (let index = 0; index < reposLastPushedThisYear.length; index++) {
    const repo = reposLastPushedThisYear[index];
    const { data: stats } = await octokit.rest.repos.listCommits({
      owner: id,
      repo: repo.name,
      per_page: 100,
      since: `${new Date().getUTCFullYear()}-1-1`,
    });
    console.log("Total commits in: ", repo.name, " are ", stats.length);
    totalCommits = totalCommits + stats.length;
  }
  console.log(totalCommits);

  return (
    <main className="dark text-foreground bg-background h-dvh p-8 flex-col justify-around overflow-scroll">
      <div className="flex max-w-[1600px] flex-wrap m-auto gap-2">
        <ProfileView
          data={data}
          totalRepos={repoData.length === 100 ? "~100" : `${repoData.length}`}
        />
        <Charts
          langData={languageCount}
          title="No. of repositories by languages: "
        />
        <Charts
          langData={newObject}
          title="Top five repositories by no. of stars: "
        />
      </div>
      <div className="flex max-w-[1600px] w-full flex-wrap m-auto gap-2">
        <Card className="box-border p-0 w-full g-background flex-1 flex-row items-center justify-center h-auto w-auto mt-24 mb-24 ">
          <CardBody className="flex-col w-full bg-background items-center justify-center">
            <p className="w-full text-center text-lg lg:text-3xl m-0 p-0">
              So far this year,{" "}
              <span className="text-blue-500">{data.name?.split(" ")[0]}</span>{" "}
              has made <span className="text-blue-500">{totalCommits}</span>{" "}
              commits across{" "}
              <span className="text-blue-500">
                {reposLastPushedThisYear.length}
              </span>{" "}
              public repositories.
            </p>
          </CardBody>
        </Card>
      </div>
      <p className="w-full max-w-[1600px] text-foreground/80 text-left text-2xl">
        All repositories:
      </p>
      <RepoList data={repoData} />
      <div className="flex max-w-[1600px] w-full flex-wrap m-auto gap-2">
        <Card className="box-border p-0 w-full g-background flex-1 flex-row items-center justify-center h-auto w-auto mt-24 mb-24 ">
          <CardBody className="flex-col w-full bg-background items-center justify-center">
            {data.email ? (
              <p className="w-full text-center text-lg lg:text-2xl m-0 p-0 mb-10 flex flex-wrap justify-center items-center">
                <MdEmail className="mr-1 text-blue-500" />
                <span className="mr-1">
                  Connect with {data.name?.split(" ")[0]} on
                </span>
                <span className="text-blue-500"> {`${data.email}`}</span>
              </p>
            ) : null}
            {data.email ? (
              <p className="w-full text-center text-lg lg:text-2xl m-0 p-0 flex flex-wrap justify-center items-center">
                <FaLink className="mr-1 text-blue-500" />
                <span className="mr-1">
                  Check out {data.name?.split(" ")[0]}&apos;s blogs on
                </span>
                <span className="text-blue-500">{`${data.blog}`}</span>
              </p>
            ) : null}
          </CardBody>
        </Card>
      </div>
      <div className="w-[70%] m-auto flex flex-col justify-center items-center">
        <Divider />
        <p className="w-[85%] text-center text-base lg:text-base m-0 p-0 text-foreground/80 pt-1">
          Built by{" "}
          <span className="text-blue-300">
            <Link href={"https://prashantsihag.com"}>Prashant Sihag</Link>
          </span>{" "}
          with{" "}
          <span className="text-blue-300">
            <Link href="https://nextjs.org/">Next.js</Link>
          </span>
          ,{" "}
          <span className="text-blue-300">
            <Link href="https://tailwindcss.com/">TailwindCSS</Link>
          </span>
          ,{" "}
          <span className="text-blue-300">
            <Link href="https://www.chartjs.org/">Chart.js</Link>
          </span>
          ,{" "}
          <span className="text-blue-300">
            <Link href="https://nextui.org/">NextUI</Link>
          </span>{" "}
          and{" "}
          <span className="text-blue-300">
            <Link href="https://github.com/octokit/octokit.js">Octokit.js</Link>
          </span>
          .
        </p>
      </div>
    </main>
  );
}
