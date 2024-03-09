import ProfileView from "@/app/ui/profile-view";
import RepoList from "@/app/ui/repo-list";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
  Slider,
} from "@nextui-org/react";
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
  });

  return (
    <main className="dark text-foreground bg-background h-dvh p-8 flex-col justify-around overflow-hidden">
      <ProfileView data={data} />
      <RepoList data={repoData} />
    </main>
  );
}
