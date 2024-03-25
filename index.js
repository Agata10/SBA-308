// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25, ///the percentage weight of the entaire assigment group
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      //3rd is not inclued cause the assigment is not due yet, not in average and not in the keyed dictonary of scores
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

// DATA VALIDATION FUNCTIONS
// Check is AssigmentGroup course_id property matches CourseInfo id value
const checkAssigmentGroupCourseId = (course, ag) => {
  try {
    if (ag.course_id === course.id) {
      return true;
    } else {
      throw new Error(
        "Oh no! AssigmentGroup's course_id property does not match course id value!"
      );
    }
  } catch (err) {
    console.log(`${err}\nPlease enter correct data.\n`);
  }
};

//check if LearnerSubmissions assigment_id matches one from AssigmentGroup.assigments[i].id
const checkLearnerSubmissionsAssigmentId = (ag, submissions) => {
  try {
    const arrOfAssigmentsIDs = [];
    ag.assignments.forEach((assigment) => {
      ///take id of each assigment and store all of them in array
      arrOfAssigmentsIDs.push(assigment.id);
    });
    //for each learner submission
    submissions.forEach((s) => {
      for (let i = 0; i < arrOfAssigmentsIDs.length; i++) {
        //check if assigment_id matches onces from AssigmentGroup assigments ids
        if (s.assignment_id === arrOfAssigmentsIDs[i]) {
          return true;
        } else if (s.assignment_id !== arrOfAssigmentsIDs[i]) {
          if (i === arrOfAssigmentsIDs.length - 1) {
            throw new Error(
              `Ups! Learner with id: ${s.learner_id}, subission assigment of id: ${s.assignment_id} not found!`
            );
          }
          continue;
        }
      }
    });
  } catch (err) {
    console.log(
      `${err}\nPlease make sure LearnerSubmissions has assigment_id matching one from AssigmentGroup assigments ids`
    );
  }
};

function getLearnerData(course, ag, submissions) {
  checkAssigmentGroupCourseId(course, ag);
  checkLearnerSubmissionsAssigmentId(ag, submissions);
  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0, // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833, // late: (140 - 15) / 150
    },
  ];

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
