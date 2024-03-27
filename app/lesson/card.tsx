import Image from "next/image";

export const Card = () => {
  return (
    <div className="h-full p-4 cursor-pointer rounded-xl border-2 border-b-4">
      <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
        <Image src="/man.svg" fill alt="hero"/>
      </div>
      <div className="flex items-center justify-between text-neutral-600">
        <span>hello</span>
        <div
          className="text-sm text-neutral-400 flex items-center justify-center border-2 rounded-xl w-5 h-5"
        >
          1
        </div>
      </div>
    </div>
  )
}