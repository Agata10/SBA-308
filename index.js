// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  ///1. change course_id to mismatch the CourseInfo.id to test try catch
  course_id: 451,
  group_weight: 25,
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
      ///2. change to be not due yet, year 2032 for example to see it will be skipped
      ///3. change points_possible to 0 to test try catch
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
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
    // change assigment_id for the one that is dffrent from AssigmentGroup.assigments.id
    // to test try catch
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
  let isValid = true;
  try {
    if (ag.course_id === course.id) {
      return true;
    } else {
      throw new Error(
        "Oh no! AssigmentGroup's course_id property does not match course id value!"
      );
    }
  } catch (err) {
    console.log(`${err}\nExpected ${course.id} but got ${ag.course_id}`);
    isValid = false;
  }
  return isValid;
};

//check if LearnerSubmissions assigment_id matches one from AssigmentGroup.assigments[i].id
const checkLearnerSubmissionsAssigmentId = (ag, submissions) => {
  let isValid = true;
  try {
    const arrOfAssigmentsIDs = ag.assignments.map((a) => a.id);
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
    isValid = false;
  }
  return isValid;
};

const validateSubmissionsData = (submissions) => {
  let isValid = true;
  submissions.forEach((s, index) => {
    try {
      if (
        typeof s.submission.score === "string" ||
        typeof s.learner_id === "string" ||
        typeof s.assignment_id === "string"
      ) {
        throw new Error(
          `LearnerSubmissions data at index ${index} is a string, expected number`
        );
      } else if (typeof s.submission.submitted_at === "number") {
        throw new Error(
          `LearnerSubmissions data at index ${index}  is number, expected string`
        );
      }
    } catch (err) {
      isValid = false;
      console.log(`${err}`);
    }
  });
  return isValid;
};

const validateAssigmentGroupData = (ag) => {
  let isValid = true;
  ag.assignments.forEach((a, index) => {
    try {
      if (typeof a.id === "string" || typeof a.points_possible === "string") {
        throw new Error(
          `AssigmentGroup data at index ${index} is a string, expected number`
        );
      } else if (typeof a.due_at === "number") {
        throw new Error(
          `AssigmentGroup data at index ${index} is number, expected string`
        );
      }
    } catch (err) {
      isValid = false;
      console.log(`${err}`);
    }
  });
  return isValid;
};

//calculate average and round to 3 decimal places
const calcAvg = (score, maxPoints) => {
  return Math.round((score / maxPoints) * 1000) / 1000;
};

// check is subbmision date excided the due date
//or
// check if assigment passed the due_date, if yes, do not include in the result
const checkIfDateHasPassed = (dateA, dateB) => {
  if (new Date(dateA) < new Date(dateB)) {
    return true;
  } else {
    return false;
  }
};

//check if submitted late, if yes take 10% of score
const calcScore = (assigment, s) => {
  let score = s.submission.score;
  const isSubmittedLate = checkIfDateHasPassed(
    assigment.due_at,
    s.submission.submitted_at
  );
  if (isSubmittedLate) {
    score *= 0.9;
  }
  return score;
};

function getLearnerData(course, ag, submissions) {
  if (
    !validateSubmissionsData(submissions) ||
    !validateAssigmentGroupData(ag) ||
    !checkAssigmentGroupCourseId(course, ag) ||
    !checkLearnerSubmissionsAssigmentId(ag, submissions)
  ) {
    return "Fix the data";
  }

  const result = [];
  let sumOFMaxPoints = 0;
  let errorZero = false;

  submissions.forEach((s) => {
    const learner = {};
    const assigment = ag.assignments.find((a) => {
      return a.id === s.assignment_id;
    });
    const score = calcScore(assigment, s);
    const isDueDatePassedToday = checkIfDateHasPassed(
      assigment.due_at,
      new Date().toDateString()
    );
    let maxPoints = assigment.points_possible;

    try {
      if (maxPoints <= 0) {
        maxPoints = score;
        throw new Error("ZERO: ");
      }
    } catch (err) {
      //errZero is making sure the err prints only one in loop
      if (!errorZero) {
        console.log(
          `${err} Fix points_possible in AssigmentGroup at ${assigment.id} id, can't be less or equal to zero`
        );
        console.log("Assumed possible_points = score so learner got 100%\n");
        errorZero = true;
      }
    }

    if (isDueDatePassedToday) {
      //find() returns value of first element it founds that meet below condition
      //check if the user exists with that id in result array
      const existingLearner = result.find((r) => r.id === s.learner_id);
      sumOFMaxPoints += maxPoints;

      if (existingLearner) {
        existingLearner.avg += score;
        existingLearner.avg = calcAvg(existingLearner.avg, sumOFMaxPoints);
        existingLearner[`${s.assignment_id}`] = calcAvg(score, maxPoints);
        sumOFMaxPoints = 0;
      } else {
        learner.id = s.learner_id;
        learner.avg = score;
        learner[`${s.assignment_id}`] = calcAvg(score, maxPoints);
        result.push(learner);
      }
    }
  });
  return result;

  // const r = [
  //   {
  //     id: 125,
  //     avg: 0.985, // (47 + 150) / (50 + 150)
  //     1: 0.94, // 47 / 50
  //     2: 1.0, // 150 / 150
  //   },
  //   {
  //     id: 132,
  //     avg: 0.82, // (39 + 125) / (50 + 150)
  //     1: 0.78, // 39 / 50
  //     2: 0.833, // late: (140 - 15) / 150 /// -14 becasue 10% , it's mistake in calculation provided
  //   },
  // ];

  // return r;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
