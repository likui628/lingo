import {StickyWrapper} from "@/components/sticky-wrapper";
import {UserProgress} from "@/components/user-progress";
import {Header} from "./header";
import {Unit} from "./unit";
import {Promo} from "@/components/promo";
import {Quests} from "@/components/quests";
import {FeedWrapper} from "@/components/fead-wrapper";

const LearnPage = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress/>
        <Promo/>
        <Quests/>
      </StickyWrapper>

      <FeedWrapper>
        <Header title="Spanish"/>
        <Unit/>
      </FeedWrapper>
    </div>
  );
}

export default LearnPage;