import {Header} from "./header";
import {Footer} from "./footer";
import {Card} from "@/app/lesson/card";

type Props = {
  initialPercentage: number;
  initialHearts: number;
}

export const Quiz = (
  {
    initialPercentage,
    initialHearts
  }: Props) => {
  return (
    <>
      <Header
        hearts={initialHearts}
        percentage={initialPercentage}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="w-full lg:w-[600px] min-[350px] flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              Select the correct meaning
            </h1>
            <div>
              <div className="px-5 lg:px-0 grid gap-2 grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                <Card/>
                <Card/>
                <Card/>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer></Footer>
    </>
  );
}