import {Quiz} from "./quiz";
import {getLesson, getUserProgress} from "@/lib/queries";
import {redirect} from "next/navigation";

const LessonPage = async () => {
  const [
    userProgress,
    lesson,
  ] = await Promise.all([
    getUserProgress(),
    getLesson()
  ])
  if (!userProgress || !lesson) {
    redirect("/learn");
  }

  const percentage = lesson.challenges
    .filter(challenge => challenge.completed).length / lesson.challenges.length * 100

  return (
    <Quiz
      lessonId={lesson.id}
      initialHearts={userProgress.hearts}
      initialPercentage={percentage}
      initialChallenges={lesson.challenges}
    />
  );
}

export default LessonPage;