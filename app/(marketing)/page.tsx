import {Button} from "@/components/ui/button";
import Image from "next/image";
import {ClerkLoaded, ClerkLoading, SignedIn, SignedOut} from "@clerk/nextjs";
import {Loader} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[420px] lg:h-[420px] mb-8 lg:mb-0 p-4">
        <Image src="/hero.svg" alt="hero" fill/>
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1
          className="text-xl lg:text-2xl font-bold lg:font-extrabold text-wrap text-neutral-600 max-w-[400px] text-center">
          The free, fun, and effective way to learn a language!
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <Button variant="secondary" className="w-full">Get Started</Button>
              <Button variant="primaryOutline" className="w-full">I Already Have An Account</Button>
            </SignedOut>
            <SignedIn>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="/learn">
                  Continue Learning
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
