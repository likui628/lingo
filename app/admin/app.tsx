"use client"

import {Admin, Resource} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import {CourseList} from "./course/course-list";
import {UnitList} from "./unit/unit-list";
import {LessonList} from "./lesson/lesson-list";
import {ChallengeList} from "./challenge/challenge-list";
import {ChallengeOptionList} from "./challenge-option/challenge-option-list";
import {CourseEdit} from "./course/course-edit";
import {CourseCreate} from "./course/course-create";

const dataProvider = simpleRestProvider("/api")

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        list={CourseList}
        edit={CourseEdit}
        create={CourseCreate}
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