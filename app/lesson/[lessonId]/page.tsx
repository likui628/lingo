import {getLesson, getUserProgress} from "@/lib/queries";
import {Quiz} from "@/app/lesson/quiz";
import {redirect} from "next/navigation";

type Props = {
  params: {
    lessonId: string;
  };
}

const LessonPage = async ({params}: Props) => {
  const [userProgress, lesson] = await Promise.all([
    getUserProgress(),
    getLesson(params.lessonId)
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