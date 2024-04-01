import Image from "next/image"
import {cn} from "@/lib/utils";

type Props = {
  variant: 'points' | 'hearts'
  value: number
}
export const ResultCard = ({variant, value}: Props) => {
  const imageSrc = variant === "hearts" ? "/heart.svg" : "/points.svg";

  return (
    <div className={cn("rounded-xl border-2 w-full",
      variant === "points" && "bg-orange-400 border-orange-400",
      variant === "hearts" && "bg-rose-500 border-rose-500"
    )}>
      <div className="p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs">
        {variant === "hearts" ? "Hearts Left" : "Total XP"}
      </div>
      <div className="flex items-center justify-center gap-x-2 bg-white w-full rounded-xl border-white p-6 text-lg">
        <Image
          src={imageSrc}
          width={30}
          height={30}
          alt="Icon"
        />
        <span
          className={cn(
            variant === "hearts" && "text-rose-500",
            variant === "points" && "text-orange-500")}
        >
          {value}
        </span>
      </div>

    </div>
  )
}