import {Button} from "@/components/ui/button";
import Link from "next/link";
import {NotebookText} from "lucide-react";

type Props = {
  title: string,
  description: string
}
export const UnitBanner = ({title, description}: Props) => {
  return (
    <div className="text-white bg-green-500 rounded-lg flex items-center justify-between p-4">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="text-lg">{description}</div>
      </div>
      <Link href="/lesson">
        <Button
          variant="secondary"
          size="lg"
          className="hidden lg:flex border-2 border-b-4 active:border-b-2"
        >
          <NotebookText className="mr-2"/>
          Continue
        </Button>
      </Link>
    </div>
  )
}