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
import {UnitEdit} from "./unit/unit-edit";
import {UnitCreate} from "./unit/unit-create";
import {LessonCreate} from "./lesson/lesson-create";
import {LessonEdit} from "./lesson/lesson-edit";
import {ChallengeCreate} from "./challenge/challenge-create";
import {ChallengeEdit} from "./challenge/challenge-edit";
import {ChallengeOptionCreate} from "./challenge-option/challenge-option-create";
import {ChallengeOptionEdit} from "./challenge-option/challenge-option-edit";

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
        edit={UnitEdit}
        create={UnitCreate}
        recordRepresentation="title"
      />
      <Resource
        name="lessons"
        list={LessonList}
        edit={LessonEdit}
        create={LessonCreate}
        recordRepresentation="title"
      />
      <Resource
        name="challenges"
        list={ChallengeList}
        edit={ChallengeEdit}
        create={ChallengeCreate}
        recordRepresentation="question"
      />
      <Resource
        name="challenge_options"
        list={ChallengeOptionList}
        edit={ChallengeOptionEdit}
        create={ChallengeOptionCreate}
        options={{label: "Challenge Options"}}
      />
    </Admin>
  )
}

export default App