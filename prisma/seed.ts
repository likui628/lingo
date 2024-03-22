import {$Enums, PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

let courses = [
  {title: 'Spanish', imageSrc: '/es.svg'},
  {title: 'Italian', imageSrc: '/it.svg'},
  {title: 'French', imageSrc: '/fr.svg'},
  {title: 'Croatian', imageSrc: '/hr.svg'},
]

let units = [
  {
    title: "Unit 1",
    description: "Learn the basics of Spanish",
    order: 1,
  }
]

let lessons = [
  {
    order: 1,
    title: "Nouns",
  },
  {
    order: 2,
    title: "Verbs",
  },
  {
    order: 3,
    title: "Verbs",
  },
  {
    order: 4,
    title: "Verbs",
  },
  {
    order: 5,
    title: "Verbs",
  },
]

// lesson 1
let challenge1 = [
  {
    type: "SELECT" as $Enums.ChallengeType,
    order: 1,
    question: 'Which one of these is the "the man"?',
  },
  {
    type: "ASSIST" as $Enums.ChallengeType,
    order: 2,
    question: '"the man"',
  },
  {
    type: "SELECT" as $Enums.ChallengeType,
    order: 3,
    question: 'Which one of these is the "the robot"?',
  },
]

// lesson 2
let challenge2 = [
  {
    type: "SELECT" as $Enums.ChallengeType,
    order: 1,
    question: 'Which one of these is the "the man"?',
  },
  {
    type: "ASSIST" as $Enums.ChallengeType,
    order: 2,
    question: '"the man"',
  },
  {
    type: "SELECT" as $Enums.ChallengeType,
    order: 3,
    question: 'Which one of these is the "the robot"?',
  },
]

// lesson1 challenge 1
let challengeOptions1 = [
  {
    imageSrc: "/man.svg",
    correct: true,
    text: "el hombre",
    audioSrc: "/es_man.mp3",
  },
  {
    imageSrc: "/woman.svg",
    correct: false,
    text: "la mujer",
    audioSrc: "/es_woman.mp3",
  },
  {
    imageSrc: "/robot.svg",
    correct: false,
    text: "el robot",
    audioSrc: "/es_robot.mp3",
  },
]

// lesson1 challenge2
let challengeOptions2 = [
  {
    correct: true,
    text: "el hombre",
    audioSrc: "/es_man.mp3",
  },
  {
    correct: false,
    text: "la mujer",
    audioSrc: "/es_woman.mp3",
  },
  {
    correct: false,
    text: "el robot",
    audioSrc: "/es_robot.mp3",
  },
]

// lesson1 challenge3
let challengeOptions3 = [
  {
    imageSrc: "/man.svg",
    correct: false,
    text: "el hombre",
    audioSrc: "/es_man.mp3",
  },
  {
    imageSrc: "/woman.svg",
    correct: false,
    text: "la mujer",
    audioSrc: "/es_woman.mp3",
  },
  {
    imageSrc: "/robot.svg",
    correct: true,
    text: "el robot",
    audioSrc: "/es_robot.mp3",
  },
]

async function main() {
  console.log(`Delete old values ...`)
  await prisma.challengeOption.deleteMany({})
  await prisma.challenge.deleteMany({})
  await prisma.lesson.deleteMany({})
  await prisma.unit.deleteMany({})
  await prisma.course.deleteMany({})

  console.log(`Start seeding ...`)

  await Promise.all(
    courses.map(async course => {
      await prisma.course.create({
        data: course
      })
    })
  )

  const spanishCourse = await prisma.course.findFirst({
    where: {
      title: 'Spanish'
    }
  })

  await prisma.unit.createMany({
    data: units.map(unit => ({
      ...unit,
      courseId: spanishCourse!.id,
    }))
  })

  const unit = await prisma.unit.findFirst({
    where: {
      title: 'Unit 1',
    }
  })

  await prisma.lesson.createMany({
    data: lessons.map(lesson => ({...lesson, unitId: unit!.id}))
  })

  const lesson1 = await prisma.lesson.findFirst({
      where: {
        title: 'Nouns',
        order: 1
      }
    }
  )

  await prisma.challenge.createMany({
    data: challenge1.map(challenge => ({
      ...challenge,
      lessonId: lesson1!.id
    }))
  })

  const challenge1InLesson1 = await prisma.challenge.findFirst({
    where: {
      lessonId: lesson1!.id,
      order: 1
    }
  })

  await prisma.challengeOption.createMany({
    data: challengeOptions1.map(option => ({...option, challengeId: challenge1InLesson1!.id}))
  })

  const challenge2InLesson1 = await prisma.challenge.findFirst({
    where: {
      lessonId: lesson1!.id,
      order: 2
    }
  })

  await prisma.challengeOption.createMany({
    data: challengeOptions2.map(option => ({...option, challengeId: challenge2InLesson1!.id}))
  })

  const challenge3InLesson1 = await prisma.challenge.findFirst({
    where: {
      lessonId: lesson1!.id,
      order: 3
    }
  })

  await prisma.challengeOption.createMany({
    data: challengeOptions3.map(option => ({...option, challengeId: challenge3InLesson1!.id}))
  })

  const lesson2 = await prisma.lesson.findFirst({
      where: {
        title: 'Verbs',
        order: 2
      }
    }
  )

  await prisma.challenge.createMany({
    data: challenge2.map(challenge => ({
      ...challenge,
      lessonId: lesson2!.id
    }))
  })

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
