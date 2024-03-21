import Image from 'next/image'
import {Button} from "@/components/ui/button";
import Link from "next/link";

export const Promo = () => {
  return (
    <div className="border-2 rounded-lg p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Image
            src="/unlimited.svg"
            alt="Pro"
            height={26}
            width={26}
          />
          <h3 className="font-bold text-lg">Upgrade to Pro</h3>
        </div>
        <div className="text-neutral-500">
          Get unlimited hearts and more!
        </div>
      </div>
      <Button variant="super" className="w-full" size="lg" asChild>
        <Link href="/shop">upgrade today</Link>
      </Button>
    </div>
  )
}