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
    auth: "blah_blah",
  });

  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();

  const { data } = await octokit.rest.users.getByUsername({ username: id });
  const { data: repoData } = await octokit.rest.repos.listForUser({
    username: id,
    sort: "pushed",
  });

  return (
    <main className="dark text-foreground bg-background h-dvh p-8 flex-col justify-around overflow-hidden">
      <h1 className="text-4xl">Github Profile Info:</h1>
      {/* <code>{JSON.stringify(repoData[0].html_url)}</code> */}
      <ProfileView data={data} />
      <RepoList data={repoData} />
    </main>
  );
}