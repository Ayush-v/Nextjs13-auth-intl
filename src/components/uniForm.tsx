"use client";

import { addNewUni } from "@/app/_actions/University";
import { Session } from "next-auth";
import { useTransition } from "react";

export default function UniForm({ session }: { session: Session | null }) {
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      await addNewUni(
        {
          name: "working 2",
          label: "UNI",
          subTitle: "working now",
          image:
            "https://ep-node.s3.ap-south-1.amazonaws.com/uploads/40d42f5a-9826-44d1-aee8-2c0fd22511b0-test.jpeg",
        },
        //@ts-ignore
        session.user?.token
      );
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <button>Submit</button>
    </form>
  );
}
