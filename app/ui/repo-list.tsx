"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Link from "next/link";

export default function RepoList({ data }: { data: unknown[] }) {
  return (
    <Table
      aria-label={`Repositories`}
      className="pt-2 overflow-auto flex-1 h-96"
      isHeaderSticky={true}
    >
      <TableHeader>
        <TableColumn>Repo Name</TableColumn>
        <TableColumn>Last pushed at</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((repo: any) => {
          const datePushed = new Date(repo.pushed_at);
          return (
            <TableRow key="username">
              <TableCell>
                <Link
                  href={repo.html_url}
                  className="underline hover:text-blue-500"
                >
                  {repo.name}
                </Link>
              </TableCell>
              <TableCell>{`${datePushed.getUTCDate()}/${datePushed.getUTCMonth()}/${datePushed.getUTCFullYear()}`}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
