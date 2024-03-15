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
      className="w-full max-w-[800px] min-h-[300px] min-w-[300px] flex flex-wrap flex-row justify-center items-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="p-6 bg-white bg-opacity-5 text-center text-sm md:text-base lg:text-base rounded-sm grey-200 z-50 w-[100%] m-0"
        placeholder="Enter Github Username and hit enter"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        required
      />
    </form>
  );
}
