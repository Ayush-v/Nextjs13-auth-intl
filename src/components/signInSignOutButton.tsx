"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

function SignInSignOutButton({ session }: { session: Session | null }) {
  return (
    <div>
      {session ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  );
}

export default SignInSignOutButton;
