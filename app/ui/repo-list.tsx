"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const findMaxStarRepo = (data: any[]) => {
  let max = 0;
  let maxStarRepo: any[] = [];
  data.forEach((repo) => {
    if (repo.stargazers_count > max) {
      max = repo.stargazers_count;
      maxStarRepo = [repo];
    }
    if (repo.stargazers_count == max) {
      max = repo.stargazers_count;
      maxStarRepo.push(repo);
    }
  });

  return {
    max: max,
    repos: maxStarRepo,
  };
};

export default function RepoList({ data }: { data: unknown[] }) {
  return (
    <Table
      aria-label={`Repositories`}
      className="p-4 overflow-auto flex-1 h-96"
      isHeaderSticky={true}
    >
      <TableHeader>
        <TableColumn>Repo Name</TableColumn>
        <TableColumn>Stars</TableColumn>
        <TableColumn>Last pushed at</TableColumn>
        <TableColumn>Link</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((repo: any) => {
          return (
            <TableRow key="username">
              <TableCell>{repo.name} </TableCell>
              <TableCell>{repo.stargazers_count}</TableCell>
              <TableCell>{new Date(repo.pushed_at).toUTCString()}</TableCell>
              <TableCell>{repo.html_url}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
