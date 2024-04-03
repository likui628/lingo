"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {useEffect, useState} from "react";
import {useHeartsModal} from "@/stores/use-hearts-modal";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {useRouter} from "next/navigation";

export const HeartsModal = () => {
  const {isOpen, closeModal} = useHeartsModal()

  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])

  const router = useRouter();
  const onClick = () => {
    closeModal();
    router.push("/store");
  };

  if (!isClient) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src="/mascot_bad.svg"
              width={70}
              height={70}
              alt="mascot_bad"
            />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            You ran out of hearts!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Get Pro for unlimited hearts, or purchase them in the store.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="primary"
              onClick={onClick}
            >
              Get unlimited hearts
            </Button>
            <Button
              variant="primaryOutline"
              className="w-full"
              size="lg"
              onClick={closeModal}
            >
              No thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}