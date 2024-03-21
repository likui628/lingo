import {StickyWrapper} from "@/components/sticky-wrapper";
import {UserProgress} from "@/components/user-progress";
import {Header} from "./header";
import {Promo} from "@/components/promo";
import {Quests} from "@/components/quests";

const LearnPage = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress/>
        <Promo/>
        <Quests/>
      </StickyWrapper>

      <div className="flex-1 relative top-0 pb-10">
        <Header title="Spanish"/>
        <div className="bg-amber-200  h-[500px]">
          <div>课程title</div>

        </div>
        <div className="bg-amber-200  h-[500px]">
          <div>课程title</div>

        </div>
        <div className="bg-amber-200  h-[500px]">
          <div>课程title</div>

        </div>
        <div className="bg-amber-200  h-[500px]">
          <div>课程title</div>

        </div>
      </div>

    </div>
  );
}

export default LearnPage;