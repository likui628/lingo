import Link from "next/link";
import {Check, Crown, Star} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

type Props = {
  id: string
  index: number
  totalCount: number
  title: string
}

export const LessonButton = ({id, index, totalCount, title}: Props) => {
  const isFirst = index === 0;
  const isLast = index === totalCount - 1;

  const Icon = isFirst ? Check : isLast ? Crown : Star;

  const isCompleted = true;
  const isLocked = true;


  return (
    <Link href="/lesson">
      <div className="relative mt-6">
        <Button
          size="rouded"
          className="rounded-full border-b-8 h-[70px] w-[70px]"
        >
          <Icon
            className={cn('h-10 w-10', "", "")}
          />
        </Button>
      </div>
    </Link>
  )
}