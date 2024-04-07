"use client"

import {Admin, Resource} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import {CourseList} from "@/app/admin/course/course-list";
import {UnitList} from "@/app/admin/unit/unit-list";
import {LessonList} from "@/app/admin/lesson/lesson-list";
import {ChallengeList} from "@/app/admin/challenge/challenge-list";
import {ChallengeOptionList} from "@/app/admin/challenge-option/challenge-option-list";

const dataProvider = simpleRestProvider("/api")

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        list={CourseList}
        recordRepresentation="title"
      />
      <Resource
        name="units"
        list={UnitList}
        recordRepresentation="title"
      />
      <Resource
        name="lessons"
        list={LessonList}
        recordRepresentation="title"
      />
      <Resource
        name="challenges"
        list={ChallengeList}
        recordRepresentation="question"
      />
      <Resource
        name="challenge_options"
        list={ChallengeOptionList}
        options={{label: "Challenge Options"}}
      />
    </Admin>
  )
}

export default App