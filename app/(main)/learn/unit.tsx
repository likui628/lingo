import {UnitBanner} from "./unit-banner";
import {LessonButton} from "./lesson-button";

export const Unit = () => {
  return (
    <>
      <UnitBanner title="Unit 1" description="Learn the basics of Spanish"/>
      <div className="flex items-center flex-col relative">
        <LessonButton/>
        <LessonButton/>
        <LessonButton/>
        <LessonButton/>
        <LessonButton/>
      </div>
    </>
  )
}