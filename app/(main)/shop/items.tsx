"use client"

import Image from "next/image";
import {Button} from "@/components/ui/button";
import {POINTS_TO_REFILL} from "@/lib/constants";
import {useTransition} from "react";
import {toast} from "sonner";
import {refillHearts} from "@/actions/user-progress";

type Props = {
  hearts: number;
  points: number;
}
export const Items = ({hearts, points}: Props) => {
  const disabled = hearts === 5 || points < POINTS_TO_REFILL
  const [isPending, startTransition] = useTransition()
  const onRefillHearts = () => {
    if (disabled) return
    startTransition(() => {
      refillHearts()
        .catch(() => toast.error("Something went wrong"))
    })
  }

  return (
    <div className="w-full">
      <div
        className="flex items-center w-full p-4 gap-x-4 border-t-2"
      >
        <Image
          src="/heart.svg"
          alt="heart"
          width={60}
          height={60}
        />
        <span className="font-bold text-xl flex-1">
          Refill hearts
        </span>
        <Button
          onClick={onRefillHearts}
          disabled={disabled || isPending}
        >
          {hearts === 5
            ? "full"
            : (
              <div className="flex items-center">
                <Image
                  src="/points.svg"
                  alt="Points"
                  height={20}
                  width={20}
                />
                <p>
                  {POINTS_TO_REFILL}
                </p>
              </div>
            )
          }
        </Button>
      </div>
      <div
        className="flex items-center w-full p-4 gap-x-4 border-t-2"
      >
        <Image
          src="/unlimited.svg"
          alt="unlimited"
          width={60}
          height={60}
        />
        <span className="font-bold text-xl flex-1">
          Unlimited hearts
        </span>
        <Button disabled={true}>Upgrade</Button>
      </div>
    </div>
  )
}