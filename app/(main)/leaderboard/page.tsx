import {StickyWrapper} from "@/components/sticky-wrapper";
import {UserProgress} from "@/components/user-progress";
import {Promo} from "@/components/promo";
import {Quests} from "@/components/quests";
import {FeedWrapper} from "@/components/fead-wrapper";
import {
  getCourseProgress,
  getLeaderboard,
  getUserProgress
} from "@/lib/queries";
import {redirect} from "next/navigation";
import Image from "next/image";
import {Separator} from "@/components/ui/separator";
import {Avatar, AvatarImage} from "@/components/ui/avatar";

const LeaderboardPage = async () => {
  const [
    userProgress,
    courseProgress,
    leaderboard,
  ] = await Promise.all([
    getUserProgress(),
    getCourseProgress(),
    getLeaderboard(),
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
        <Quests points={userProgress.points}/>
      </StickyWrapper>

      <FeedWrapper>
        <div className="w-full flex flex-col justify-center items-center space-y-6 mb-6">
          <Image
            src="/leaderboard.svg"
            width={90}
            height={90}
            alt="leaderboard"
          />
          <h1
            className="text-neutral-700 font-bold text-2xl"
          >
            Leaderboard
          </h1>
          <span
            className="text-muted-foreground text-center text-lg"
          >
            See where you stand among other learners in the community.
          </span>
        </div>
        <Separator className="h-[2px] my-2.5"/>
        {
          leaderboard.map((user, index) => {
            return (
              <div
                className="flex items-center justify-center p-2 px-4 rounded-xl hover:bg-gray-200/50"
                key={user.userId}
              >
                <span className="mr-6 font-bold text-neutral-500">{index + 1}</span>
                <Avatar
                  className="h-12 w-12 mr-6"
                >
                  <AvatarImage
                    className="object-cover"
                    src={user.userImageSrc}
                    alt={user.userName}
                  />
                </Avatar>
                <span className="flex-1 font-bold">{user.userName}</span>
                <span className="text-muted-foreground">{user.points} XP</span>
              </div>
            )
          })
        }
      </FeedWrapper>
    </div>
  );
}

export default LeaderboardPage;