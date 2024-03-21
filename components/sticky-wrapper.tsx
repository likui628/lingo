import React from "react";

type Props = {
  children: React.ReactNode;
}
export const StickyWrapper = ({children}: Props) => {
  return (
    <div className="hidden lg:block w-[368px]">
      <div className="flex flex-col gap-y-4 sticky top-6">
        {children}
      </div>
    </div>
  )
}