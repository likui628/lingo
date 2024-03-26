import {StickyWrapper} from "@/components/sticky-wrapper";
import {UserProgress} from "@/components/user-progress";
import {Header} from "./header";
import {Unit} from "./unit";
import {Promo} from "@/components/promo";
import {Quests} from "@/components/quests";
import {FeedWrapper} from "@/components/fead-wrapper";
import {
  getCourseProgress, getLessonProgress,
  getUnits,
  getUserProgress
} from "@/lib/queries";
import {redirect} from "next/navigation";

const LearnPage = async () => {
  const [
    userProgress,
    courseProgress,
    units,
    lessonPercentage,
  ] = await Promise.all([
    getUserProgress(),
    getCourseProgress(),
    getUnits(),
    getLessonProgress()
  ]);

  if (!userProgress || !userProgress.activeCourse || !courseProgress) {
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
        {
          units.map(unit => (
            <Unit
              key={unit.id}
              title={unit.title}
              description={unit.description}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          ))
        }
      </FeedWrapper>
    </div>
  );
}

export default LearnPage;