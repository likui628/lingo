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
import {Items} from "./items";

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
        <Items
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </FeedWrapper>
    </div>
  );
}

export default ShopPage;