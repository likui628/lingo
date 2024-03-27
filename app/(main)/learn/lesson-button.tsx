"use client"

import Link from "next/link";
import {Check, Crown, Star} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {CircularProgressbarWithChildren} from "react-circular-progressbar";

import 'react-circular-progressbar/dist/styles.css';

type Props = {
  id: string
  index: number
  totalCount: number
  percentage: number
  completed: boolean
  current: boolean
  locked: boolean
}

export const LessonButton = (
  {
    id,
    index,
    totalCount,
    percentage,
    completed,
    locked,
    current,
  }: Props) => {
  const isFirst = index === 0;
  const isLast = index === totalCount - 1;


  const rightPosition = calculateRightPosition(index)

  const href = completed ? `/lesson/${id}` : "/lesson";

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{pointerEvents: locked ? "none" : "auto"}}
    >
      <div
        className="relative mt-6"
        style={{
          marginTop: isFirst && !completed ? '60' : '24',
          right: `${rightPosition}px`
        }}
      >
        {
          current ? (
            <div className="w-[102px] h-[102px] relative">
              <div
                className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl tracking-wide z-10 animate-bounce"
              >
                START
                <div
                  className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2 "
                />
              </div>
              <CircularProgressbarWithChildren
                value={isNaN(percentage) ? 0 : percentage}
                styles={{
                  path: {
                    stroke: "#4ade80",
                  },
                  trail: {
                    stroke: "#e5e7eb",
                  },
                }}
              >
                <CustomButton
                  isCompleted={completed}
                  isLast={isLast}
                  isLocked={locked}
                />
              </CircularProgressbarWithChildren>
            </div>
          ) : (
            <CustomButton
              isCompleted={completed}
              isLast={isLast}
              isLocked={locked}
            />
          )
        }
      </div>
    </Link>
  )
}

const CustomButton = ({isLocked, isCompleted, isLast}: {
  isLocked: boolean,
  isCompleted: boolean,
  isLast: boolean
}) => {
  const Icon = isCompleted ? Check : isLast ? Crown : Star;
  return (
    <Button
      size="rounded"
      variant={isLocked ? 'locked' : 'secondary'}
      className="rounded-full border-b-8 h-[70px] w-[70px]"
    >
      <Icon
        className={
          cn('h-10 w-10',
            isLocked
              ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
              : "fill-primary-foreground text-primary-foreground",
            isCompleted && "fill-none stroke-[4]"
          )}
      />
    </Button>
  )
}

function calculateRightPosition(index: number) {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;
  switch (cycleIndex) {
    case 0:
    case 1:
    case 2:
      indentationLevel = cycleIndex;
      break;
    case 3:
    case 4:
    case 5:
    case 6:
      indentationLevel = 4 - cycleIndex;
      break;
    default:
      indentationLevel = cycleIndex - 8;
      break
  }
  return indentationLevel * 40;
}