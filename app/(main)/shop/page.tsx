import {StickyWrapper} from "@/components/sticky-wrapper";
import {UserProgress} from "@/components/user-progress";
import {Promo} from "@/components/promo";
import {Quests} from "@/components/quests";
import {FeedWrapper} from "@/components/fead-wrapper";
import {
  getCourseProgress,
  getUserProgress
} from "@/lib/queries";
import {redirect} from "next/navigation";
import Image from "next/image";
import {Button} from "@/components/ui/button";

const ShopPage = async () => {
  const [
    userProgress,
    courseProgress,
  ] = await Promise.all([
    getUserProgress(),
    getCourseProgress(),
  ]);

  if (!userProgress || !userProgress.activeCourse || !courseProgress) {
    redirect("/courses");
  }

  // todo refill hearts
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
            src="/shop.svg"
            width={90}
            height={90}
            alt="shop"
          />
          <h1
            className="text-neutral-700 font-bold text-2xl"
          >
            Shop
          </h1>
          <span
            className="text-muted-foreground text-center text-lg"
          >
            Spend your points on cool stuff.
          </span>
        </div>
        <div className="w-full">
          <div
            className="flex items-center w-full p-4 gap-x-4 border-t-2"
          >
            <Image
              src="/heart.svg"
              alt="heart"
              width={60}
              height={60}
            />
            <span className="font-bold text-xl flex-1">
              Refill hearts
            </span>
            <Button>Full</Button>
          </div>
          <div
            className="flex items-center w-full p-4 gap-x-4 border-t-2"
          >
            <Image
              src="/unlimited.svg"
              alt="unlimited"
              width={60}
              height={60}
            />
            <span className="font-bold text-xl flex-1">
              Unlimited hearts
            </span>
            <Button disabled={true}>Upgrade</Button>
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
}

export default ShopPage;