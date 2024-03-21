import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";

export const UserProgress = () => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href="/courses">
        <Button variant="ghost">
          <Image src="/es.svg" width={32} height={32} alt="Courses" className="mr-2 rounded-md"/>
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" size="sm">
          <Image src="/points.svg" width={28} height={28} alt="Points" className="mr-2"/>
          <span className="text-red-400">100</span>
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" size="sm">
          <Image src="/heart.svg" width={22} height={22} alt="Hearts" className="mr-2"/>
          <span className="text-red-600">90</span>
        </Button>
      </Link>
    </div>
  )
}