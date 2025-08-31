"use client"
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Nav() {
    return (
        <header className="border-b">
            <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
                <Link href={"/"} className="font-semibold">Waterlily Survey</Link>
                <nav className="flex items-center gap-4">
                    <Link href={"/survey"} className="hover:underline">Start Survey</Link>
                    <Link href={"/responses"} className="hover:underline">My Responses</Link>
                    <SignedOut>
                        <SignInButton mode="modal" />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </nav>
            </div>
        </header>
    )
}