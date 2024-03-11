import Charts, { LangData } from "@/app/ui/charts";
import ProfileView from "@/app/ui/profile-view";
import RepoList from "@/app/ui/repo-list";
import { Metadata } from "next";
import { Octokit } from "octokit";

export const metadata: Metadata = {
  title: "Profile View",
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

  return (
    <main className="dark text-foreground bg-background h-dvh p-8 flex-col justify-around overflow-hidden">
      <div className="flex max-w-[1600px] flex-wrap m-auto">
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
        <Charts langData={languageCount} title="Languages: " />
      </div>
      <RepoList data={repoData} />
    </main>
  );
}
