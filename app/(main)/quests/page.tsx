import {StickyWrapper} from "@/components/sticky-wrapper";
import {UserProgress} from "@/components/user-progress";
import {Promo} from "@/components/promo";
import {FeedWrapper} from "@/components/fead-wrapper";
import {getUserProgress} from "@/lib/queries";
import {redirect} from "next/navigation";
import Image from "next/image";
import {Separator} from "@/components/ui/separator";
import {quests} from "@/lib/constants";
import {Progress} from "@/components/ui/progress";

const QuestsPage = async () => {
  const [
    userProgress,
  ] = await Promise.all([
    getUserProgress(),
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
        <Promo/>
      </StickyWrapper>

      <FeedWrapper>
        <div className="w-full flex flex-col justify-center items-center space-y-6 mb-6">
          <Image
            src="/quests.svg"
            width={90}
            height={90}
            alt="quests"
          />
          <h1
            className="text-neutral-700 font-bold text-2xl"
          >
            Quests
          </h1>
          <span
            className="text-muted-foreground text-center text-lg"
          >
            Complete quests by earning points.
          </span>
        </div>
        <ul className="w-full">
          {quests.map((quest) => {
            const progress = (userProgress.points / quest.value) * 100;

            return (
              <div
                className="flex items-center w-full p-4 gap-x-4 border-t-2"
                key={quest.title}
              >
                <Image
                  src="/points.svg"
                  alt="Points"
                  width={60}
                  height={60}
                />
                <div className="flex flex-col gap-y-2 w-full">
                  <p className="text-neutral-700 text-xl font-bold">
                    {quest.title}
                  </p>
                  <Progress value={progress} className="h-3"/>
                </div>
              </div>
            )
          })}
        </ul>
      </FeedWrapper>
    </div>
  );
}

export default QuestsPage;