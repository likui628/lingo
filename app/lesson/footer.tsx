import {CheckCircle} from "lucide-react";
import {Button} from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="lg:-h[140px] h-[100px] border-t-2 bg-green-100 border-t-transparent">
      <div className="h-full px-10 flex items-center justify-between gap-x-7 max-w-[1140px] mx-auto w-full">
        <div className="flex items-center justify-between text-2xl font-bold text-green-500">
          <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4"></CheckCircle>
          Nicely done!
        </div>
        <Button variant="secondary" size="lg" className="ml-auto">Next</Button>
      </div>


    </div>
  )
}