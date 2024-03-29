import Image from "next/image";

type Props = {
  question: string
}
export const QuestionBubble = ({question}: Props) => {
  return (
    <div className="px-5 lg:px-0 flex items-center mb-6">
      <Image
        src="/mascot.svg"
        alt="mascot"
        width={60}
        height={60}
        className="hidden lg:block"
      />
      <Image
        src="/mascot.svg"
        alt="mascot"
        width={40}
        height={40}
        className="block lg:hidden"
      />
      <div
        className="relative ml-3 flex items-center justify-center border-2 rounded-xl h-[40px] p-1.5 px-3"
      >
        <div
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-0 h-0 border-8 border-y-transparent border-l-transparent"
        />
        {question}
      </div>

    </div>
  )
}