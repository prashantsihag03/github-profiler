"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export default function ProfileView({ data }: { data: any }) {
  return (
    <Table
      aria-label={`${data.login} Profile Info`}
      className="p-4 overflow-scroll flex-1"
    >
      <TableHeader>
        <TableColumn>Property</TableColumn>
        <TableColumn>value</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="username">
          <TableCell>username: </TableCell>
          <TableCell>{data.login}</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Name:</TableCell>
          <TableCell>{data.name}</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Blog:</TableCell>
          <TableCell>{data.blog}</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>Email:</TableCell>
          <TableCell>{data.email}</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>Followers:</TableCell>
          <TableCell>{data.followers}</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>Following:</TableCell>
          <TableCell>{data.following}</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>Created at:</TableCell>
          <TableCell>{new Date(data.created_at).toUTCString()}</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>Updated at:</TableCell>
          <TableCell>{new Date(data.updated_at).toUTCString()}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
