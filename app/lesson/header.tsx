import Image from "next/image";
import {X} from "lucide-react";
import {Progress} from "@/components/ui/progress";

type Props = {
  hearts: number,
  percentage: number,
}
export const Header = (
  {
    hearts,
    percentage
  }: Props) => {
  return (
    <div
      className="px-10 lg:pt-[50px] pt-[20px] flex items-center justify-between gap-x-7 max-w-[1140px] mx-auto w-full">
      <X
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
      <Progress value={percentage}/>
      <div className="text-rose-500 flex items-center font-bold">
        <Image
          src="/heart.svg"
          height={28}
          width={28}
          alt="Heart"
          className="mr-2"
        />
        {hearts}
      </div>
    </div>
  )
}