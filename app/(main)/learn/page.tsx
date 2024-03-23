import {StickyWrapper} from "@/components/sticky-wrapper";
import {UserProgress} from "@/components/user-progress";
import {Header} from "./header";
import {Unit} from "./unit";
import {Promo} from "@/components/promo";
import {Quests} from "@/components/quests";
import {FeedWrapper} from "@/components/fead-wrapper";
import {getUserProgress} from "@/lib/queries";
import {redirect} from "next/navigation";

const LearnPage = async () => {
  const [
    userProgress
  ] = await Promise.all([
    getUserProgress()
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
        <Quests/>
      </StickyWrapper>

      <FeedWrapper>
        <Header title={userProgress.activeCourse.title}/>
        <Unit/>
      </FeedWrapper>
    </div>
  );
}

export default LearnPage;