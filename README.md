# SBA-308

Skill based assessment for JavaScript Fundamentals

## Table of Contents

- [About](#about)
- [Technologies](#technologies)
- [Run Locally](#run-locally)
- [Data provided](#data-provided)
- [Functions descriptions](#functions)
- [Result](#result)
- [Lessons](#lessons-learned)

## About

The assigment is one of the task from Software Engineering Bootcamp. It tests working with data (arrays, objects) and practice using loops and array methods.
The task was to get the [result](#result) when provided specific [data](#data-provided) with error handling for wrong data:

1. What if AssigmentInfo has _points_possible_ 0?
2. What if one of properties is string and we we expected number? Or we got number and want string?
3. What if AssigmentGroup._assigments_._id_ does not match the CourseInfo._id_
4. What if Learner has mismaching id of assigment.

For all of the above I used try catch to handle errors.

Two rules that I needed to include:

1. If assigment is not due yet: AssigmentGroup._assigments_._due_at_, do not include it in the average or the result.
2. If learner's submission is late(_submitted_at_ is _due_at_), deduct 10 percent of their score for that assigment.

## Technologies

- JavaScript
- Node.js

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Run with node.js

```bash
  node index.js
```

## Data provided

- **CourseInfo:** is object, with _id_ and _name_
- **AssigmentGroup:** is object, with _id_, _name_, _course-id_ that matches CourseInfo._id_ and _assigments_ array containing **AssigmentInfo** objects with:_id_,_name_,_due_at_ and _points_possible_
- **LearnerSubmisions:** is array of objects with: _learner-id_, _assigment_id_ matching AssigmentInfo._id_, _submission_ object with: _submitted_at_, _score_

## Functions Description

The task was to create function `getLearnerData(course, ag, submissions)` to return the [result](#result).

**Data Validation Functions\***

`javacript`

## Result

The result should be printed in the console like below:

```javascript
[
  { 1: 0.94, 2: 1, id: 125, avg: 0.985 },
  { 1: 0.78, 2: 0.84, id: 132, avg: 0.825 },
];
```

## Lessons Learned
