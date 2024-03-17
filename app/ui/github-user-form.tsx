"use client";

import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GithubUserForm() {
  const [username, setUsername] = useState("");
  const [spinner, showSpinner] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    showSpinner(true);
    setDisableInput(true);
    router.push(`/users/${username}`);
  };

  return (
    <>
      {spinner ? (
        <div className="w-full h-full flex flex-row absolute top-0 left-0 z-50 justify-center items-center bg-background/80">
          <Spinner />
        </div>
      ) : null}
      <form
        className="w-full max-w-[800px] min-h-[300px] min-w-[300px] flex flex-wrap flex-row justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          disabled={disableInput}
          className="p-6 bg-white bg-opacity-5 text-center text-base md:text-base lg:text-base rounded-sm grey-200 z-40 w-[100%] m-0"
          placeholder="Enter Github Username and hit enter"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
      </form>
    </>
  );
}
