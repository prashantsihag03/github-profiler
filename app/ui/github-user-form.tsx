"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GithubUserForm() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(`/users/${username}`);
  };

  return (
    <form
      className="w-3/6 flex flex-row justify-center items-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="p-6 bg-white bg-opacity-5 text-center rounded-sm grey-200 z-50 w-5/6"
        placeholder="Enter Github Username and press enter"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        required
      />
    </form>
  );
}
