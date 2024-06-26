import {CheckCircle, XCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ChallengeStatus} from "./typing";
import {cn} from "@/lib/utils";

type Props = {
  status: ChallengeStatus
  onCheck: () => void
  disabled?: boolean
  lessonId?: string
}
export const Footer = (
  {
    status,
    onCheck,
    disabled,
    lessonId
  }: Props) => {
  return (
    <div className={cn("lg:-h[140px] h-[100px] border-t-2",
      status === "correct" && "border-transparent bg-green-100",
      status === "wrong" && "border-transparent bg-rose-100"
    )}>
      <div className="h-full px-10 flex items-center justify-between gap-x-7 max-w-[1140px] mx-auto w-full">
        <div
          className={
            cn("flex items-center justify-between text-2xl font-bold",
              status === "correct" && "text-green-500",
              status === "wrong" && "text-rose-500"
            )}
        >
          {
            status === 'correct' && (
              <>
                <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4"/>
                Nicely done!
              </>
            )
          }
          {
            status === 'wrong' &&
            <>
              <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4"/>
              Try again.
            </>
          }
          {
            status === 'completed' && (
              <Button
                size="lg"
                onClick={() => window.location.href = `/lesson/${lessonId}`}
              >
                Practice again
              </Button>
            )
          }
        </div>
        <Button
          disabled={disabled}
          variant={status === 'wrong' ? 'danger' : 'secondary'}
          size="lg"
          className="ml-auto"
          onClick={onCheck}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "wrong" && "Retry"}
          {status === "completed" && "Continue"}
        </Button>
      </div>
    </div>
  )
}