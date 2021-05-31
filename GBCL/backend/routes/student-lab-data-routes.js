const express = require("express");

// const Labs = require("../models/lab-backend-models/lab");
// const LabChallenge = require("../models/lab-backend-models/labChallenge");
const StudLabDataAndStats = require("../models/student-backend-models/StudLabDataAndStats");
const StudentAttemptedLabChallenge = require("../models/student-backend-models/StudentAttemptedLabChallenge");
const StudentAttemptedLabTask = require("../models/student-backend-models/StudentAttemptedLabTask");
const StudentActivityHistory = require("../models/student-backend-models/StudentActivityHistory");
const router = express.Router();

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////   StudentAttemptedLabTask routes below
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

router.post("/createThisStudentAttemptedLabTask", (req, res, next) => {
  const studentAttemptedLabTask = new StudentAttemptedLabTask({
    LabJoinCode: req.body.LabJoinCode, //foreign key
    StudentzUsername: req.body.StudentzUsername, //foreign key
    AttemptedLabTask_id: req.body.AttemptedLabTask_id,
    LabTaskQuestion: req.body.LabTaskQuestion,
    LabTaskAnswerCode: req.body.LabTaskAnswerCode,
    LabTaskAnswerOutput: req.body.LabTaskAnswerOutput,
    LabTaskAnswerInput: req.body.LabTaskAnswerInput,
    GainedXPs: req.body.GainedXPs,
    LabTaskAttempted: req.body.LabTaskAttempted,
    LabTaskChecked: req.body.LabTaskChecked,
    LabTaskTitle: req.body.LabTaskTitle,
    LabTaskXPs: req.body.LabTaskXPs,
    LabTaskAnswerByTeacher: req.body.LabTaskAnswerByTeacher,
  });

  studentAttemptedLabTask
    .save()
    .then((result) => {
      res.status(201).json({
        message: "created This Student Attempted Lab Task in db succefully!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  console.log(
    "   ==> {/createThisStudentAttemptedLabChallenge} createThisStudentAttemptedLabChallenge == ",
    studentAttemptedLabTask
  );
});

router.post(
  "/RecieveAllStudentAttemptedLabTasksOfThisLab",
  (req, res, next) => {
    StudentAttemptedLabTask.find({ LabJoinCode: req.body.LabJoinCode }).then(
      (documents) => {
        console.log(
          "RecieveAllStudentAttemptedLabTasksOfThisLab =>@@@@@@" + documents
        );
        res.status(200).json({
          message: "Recieved All Student Attempted Lab Tasks Of This Lab.",
          AllStudentAttemptedLabTasksOfThisLab: documents,
        });
        console.log(
          "   ==> {/RecieveAllStudentAttemptedLabTasksOfThisLab} Recieved All Student Attempted Lab Tasks Of This Lab."
        );
      }
    );
  }
);

router.post(
  "/RecieveAllStudentAttemptedLabTasksOfThisStudent",
  (req, res, next) => {
    StudentAttemptedLabTask.find({
      StudentzUsername: req.body.StudentzUsername,
    }).then((documents) => {
      console.log(
        "RecieveAllStudentAttemptedLabTasksOfThisStudent =>@@@@@@" + documents
      );
      res.status(200).json({
        message: "Recieved All Student Attempted Lab Tasks Of This Student.",
        AllStudentAttemptedLabTasksOfThisStudent: documents,
      });

      console.log(
        "   ==> {/RecieveAllStudentAttemptedLabTasksOfThisLab} Recieved All Student Attempted Lab Tasks Of This Student."
      );
    });
  }
);

router.post(
  "/RecieveAllStudentAttemptedChallengesOfthisStudandThisLab/",
  (req, res, next) => {
    StudentAttemptedLabChallenge.find({
      StudentzUsername: req.body.StudentzUsername,
      LabJoinCode: req.body.LabJoinCode,
    })
      .then((document) => {
        console.log("document::....", document);
        res.status(200).json({
          message: " 001 USER HAS BEEN, RETRIEVED FOR SIGNIN",
          AllStudentAttemptedChallengesOfthisStudandThisLab: document,
        });

        console.log(
          "  {/RecieveAllStudentAttemptedChallengesOfthisStudandThisLab} ==> req.body.StudentzUsername =",
          req.body.StudentzUsername
        );
      })
      .catch((err) => {
        console.log(" 004 theeeen eeerrrororrorr\n", err);
      });
  }
);

router.post(
  "/RecieveAllStudentAttemptedLabTasksOfthisStudandThisLab/",
  (req, res, next) => {
    StudentAttemptedLabTask.find({
      StudentzUsername: req.body.StudentzUsername,
      LabJoinCode: req.body.LabJoinCode,
    })
      .then((document) => {
        console.log("document::....", document);
        res.status(200).json({
          message: " 001 USER HAS BEEN, RETRIEVED FOR SIGNIN",
          AllStudentAttemptedLabTasksOfthisStudandThisLab: document,
        });

        console.log(
          "  {/RecieveAllStudentAttemptedLabTasksOfthisStudandThisLab} ==> req.body.StudentzUsername =",
          req.body.StudentzUsername
        );
      })
      .catch((err) => {
        console.log(" 004 theeeen eeerrrororrorr\n", err);
      });
  }
);

router.get("/RecieveAllStudentAttemptedLabTasks", (req, res, next) => {
  StudentAttemptedLabTask.find().then((documents) => {
    res.status(200).json({
      message: "RecieveAllStudentAttemptedLabTasks recieved from DB",
      AllStudentAttemptedLabTasks: documents,
    });

    console.log(
      "   ==> {/RecieveAllStudentAttemptedLabTasks} All Attempted Lab Tasks were downloaded."
    );
  });
});

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////   StudentAttemptedLabChallenges routes below
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

// updateThisStudentAttemptedLabChallenge
router.put(
  "/updateThisStudentAttemptedLabChallenge/:StudentzUsernameAndLabID",
  (req, res, next) => {
    const updatedAttemptedLabChallenge = new StudentAttemptedLabChallenge({
      _id: req.body._id,
      LabJoinCode: req.body.LabJoinCode, //foreign key
      AttemptedLabChallenge_id: req.body.AttemptedLabChallenge_id,
      StudentzUsername: req.body.StudentzUsername, //foreign key
      LabChallengeQuestionType: req.body.LabChallengeQuestionType,
      LabChallengeQuestion: req.body.LabChallengeQuestion,
      LabChallengeAnswerOptionA: req.body.LabChallengeAnswerOptionA,
      LabChallengeAnswerOptionB: req.body.LabChallengeAnswerOptionB,
      LabChallengeAnswerOptionC: req.body.LabChallengeAnswerOptionC,
      LabChallengeAnswerOptionD: req.body.LabChallengeAnswerOptionD,
      GainedXPs: req.body.GainedXPs,
      ChallengeAttempted: req.body.ChallengeAttempted,
      ChallengeChecked: req.body.ChallengeChecked,
      ChallengeFailedDueToTimeShortage:
        req.body.ChallengeFailedDueToTimeShortage,
      ChallengeCheated: req.body.ChallengeCheated,
    });

    StudentAttemptedLabChallenge.updateOne(
      {
        StudentzUsername: req.body.StudentzUsername,
        LabJoinCode: req.body.LabJoinCode,
      },
      updatedAttemptedLabChallenge
    )
      .then((result) => {
        res.status(200).json({
          message: "updated This Student Attempted Lab Challenge!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Current Stats FAILED TO GET Updated!",
          result: result,
        });
      });
    // console.log('   ==> {/UpdateThisUser/:Id} Username == ',user.Username);
  }
);

router.post("/createThisStudentAttemptedLabChallenge", (req, res, next) => {
  const studentAttemptedLabChallenge = new StudentAttemptedLabChallenge({
    LabJoinCode: req.body.LabJoinCode, //foreign key
    StudentzUsername: req.body.StudentzUsername, //foreign key
    AttemptedLabChallenge_id: req.body.AttemptedLabChallenge_id,
    LabChallengeQuestionType: req.body.LabChallengeQuestionType,
    LabChallengeQuestion: req.body.LabChallengeQuestion,
    LabChallengeAnswerOptionA: req.body.LabChallengeAnswerOptionA,
    LabChallengeAnswerOptionB: req.body.LabChallengeAnswerOptionB,
    LabChallengeAnswerOptionC: req.body.LabChallengeAnswerOptionC,
    LabChallengeAnswerOptionD: req.body.LabChallengeAnswerOptionD,
    GainedXPs: req.body.GainedXPs,

    ChallengeAttempted: req.body.ChallengeAttempted,
    ChallengeChecked: req.body.ChallengeChecked,
    ChallengeFailedDueToTimeShortage: req.body.ChallengeFailedDueToTimeShortage,
    ChallengeCheated: req.body.ChallengeCheated,
  });

  studentAttemptedLabChallenge
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Student Attempted Challenge data stored in db succefully!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  console.log(
    "   ==> {/createThisStudentAttemptedLabChallenge} createThisStudentAttemptedLabChallenge == ",
    studentAttemptedLabChallenge
  );
});

router.delete(
  "/deleteThisStudentAttemptedLabChallenge/:Id",
  (req, res, next) => {
    StudentAttemptedLabChallenge.deleteOne({ _id: req.params.Id }).then(
      (result) => {
        res.status(200).json({
          message: "deleted This Student Attempted Lab Challenge!",
          result: result,
        });
      }
    );
  }
);

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////   StudLabDataAndStats routes below
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

router.post("/createAStudentActivityHistoryDocument", (req, res, next) => {
  const studentActivityHistory = new StudentActivityHistory({
    LabJoinCode: req.body.LabJoinCode, //foreign key
    StudentzUsername: req.body.StudentzUsername, //foreign key
    StudentzFullName:req.body.StudentzFullName,


    Activity: req.body.Activity,
    GainedOrLoosedXPsCount: req.body.GainedOrLoosedXPsCount,
    AttemptedQuestion: req.body.AttemptedQuestion,
    Passed: req.body.Passed,
    Failed: req.body.Failed,
    TimeAndDate: req.body.TimeAndDate,
    wasPromotedOrDemotedToLevel: req.body.wasPromotedOrDemotedToLevel




    // LabJoinCode: req.body.LabJoinCode, //foreign key
    // StudentzUsername: req.body.StudentzUsername, //foreign key
    // wasPromoted: req.body.wasPromoted,
    // wasDemoted: req.body.wasDemoted,
    // wasWarned: req.body.wasWarned,
    // wasAppreciated: req.body.wasAppreciated,
    // wasExpelled: req.body.wasExpelled,

    // LabTaskQuestion: req.body.LabTaskQuestion,
    // LabChallengeQuestionType: req.body.LabChallengeQuestionType,
    // LabChallengeQuestion: req.body.LabChallengeQuestion,
    // GainedOrLoosedXPsCount: req.body.GainedOrLoosedXPsCount,

    // LabTaskOrChallengeAttempted: req.body.LabTaskOrChallengeAttempted,
    // LabTaskOrChallengeChecked: req.body.LabTaskOrChallengeChecked,
    // LabTaskOrChallengeFailedDueToTimeout:
    //   req.body.LabTaskOrChallengeFailedDueToTimeout,
  });

  studentActivityHistory
    .save()
    .then((result) => {
      res.status(201).json({
        message: "create A Student Activity History Document",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  console.log(
    "   ==> {/createAStudentActivityHistoryDocument } req.body.StudentzUsername == ",
    studentActivityHistory
  );
});

router.post("/createFreshStudentLabDataRecord", (req, res, next) => {
  const studLabDataAndStats = new StudLabDataAndStats({
    LabJoinCode: req.body.LabJoinCode, //as a foreign key
    StudentzUsername: req.body.StudentzUsername, //as a foreign key
    StudentzFN: req.body.StudentzFN,
    StudentzLN: req.body.StudentzLN,
    LevelUpdateViewed: req.body.LevelUpdateViewed, // if false, then show a level updated Modal and then update it to false.
    Promoted: req.body.Promoted,
    Demoted: req.body.Demoted,
    RivalStudents: req.body.RivalStudents,
    currentXPs: req.body.currentXPs,
    currentLevel: req.body.currentLevel,
    currentBadge: req.body.currentBadge,
    currentCPPs: req.body.currentCPPs,
    Warned: req.body.Warned,
    Appreciated: req.body.Appreciated,
    StudentzLabAccessStatus: req.body.StudentzLabAccessStatus,
  });

  studLabDataAndStats
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Lab Fresh Data of student created succefully!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  console.log(
    "   ==> {/createFreshStudentLabDataRecord} studLabDataAndStats == ",
    studLabDataAndStats
  );
});

router.delete(
  "/deleteCurrentStatsOfThisStudent/:StudentzUsername",
  (req, res, next) => {
    StudLabDataAndStats.deleteOne({
      StudentzUsername: req.params.StudentzUsername,
    }).then((result) => {
      res.status(200).json({
        message: "User Deleted!",
        result: result,
      });
    });
  }
);

router.put(
  "/updateCurrentStatsOfThisStudent/:StudentzUsernameAndLabID",
  (req, res, next) => {
    const updatedStats = new StudLabDataAndStats({
      _id: req.body._id,
      LabJoinCode: req.body.LabJoinCode, //as a foreign key
      StudentzUsername: req.body.StudentzUsername, //as a foreign key
      StudentzFN: req.body.StudentzFN,
      StudentzLN: req.body.StudentzLN,
      LevelUpdateViewed: req.body.LevelUpdateViewed, // if false, then show a level updated Modal and then update it to false.
      Demoted: req.body.Demoted, // if false, then show a level updated Modal and then update it to false.
      Promoted: req.body.Promoted,
      RivalStudents: req.body.RivalStudents,
      currentXPs: req.body.currentXPs,
      currentLevel: req.body.currentLevel,
      currentBadge: req.body.currentBadge,
      currentCPPs: req.body.currentCPPs,
      Warned: req.body.Warned,
      Appreciated: req.body.Appreciated,
      StudentzLabAccessStatus: req.body.StudentzLabAccessStatus,
    });

    StudLabDataAndStats.updateOne(
      {
        StudentzUsername: req.body.StudentzUsername,
        LabJoinCode: req.body.LabJoinCode,
      },
      updatedStats
    )
      .then((result) => {
        res.status(200).json({
          message: "Current Stats Of This Student Updated!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Current Stats FAILED TO GET Updated!",
          result: result,
        });
      });
    // console.log('   ==> {/UpdateThisUser/:Id} Username == ',user.Username);
  }
);

router.post("/getCurrentStatsOfThisStudent", (req, res, next) => {
  StudLabDataAndStats.findOne({
    StudentzUsername: req.body.StudentzUsername,
    LabJoinCode: req.body.LabJoinCode,
  })
    .then((document) => {
      console.log("Current Stats Downloaded.::....", document);
      res.status(200).json({
        message: "Current Stats Downloaded.",
        currentStatsOfThisStudent: document,
      });

      console.log(
        "   ==> {/getCurrentStatsOfThisStudent} Current Stats Of Student == ",
        req.body.StudentzUsername
      );
      console.log(
        "req.body.StudentzUsername,  @@ =  ",
        req.body.StudentzUsername
      );
      console.log("req.body.LabJoinCode  @@ =  ", req.body.LabJoinCode);
    })
    .catch((err) => {
      res.status(500).json({
        message: "FAILLLELELELED.",
        currentStatsOfThisStudent: document,
      });
      console.log(" 004 theeeen eeerrrororrorr\n", err);
    });
});


router.post("/Fetch7HighAchieversOfThisLab", (req, res, next) => {
  StudLabDataAndStats.find({
    LabJoinCode: req.body.LabJoinCode,
  })
    .sort({ currentXPs: -1 })
    .limit(7)
    .then((document) => {
      console.log("High 7 Achievers below ::....", document);
      res.status(200).json({
        message: "Current Stats Downloaded.",
        Fetched7HighAchievers: document,
      });

      console.log("   ==> {/Fetch7HighAchieversOfThisLab} ");
      console.log("req.body.LabJoinCode  @@ =  ", req.body.LabJoinCode);
    })
    .catch((err) => {
      res.status(500).json({
        message: "FAILLLELELELED.",
        currentStatsOfThisStudent: document,
      });
      console.log(" 004 theeeen eeerrrororrorr\n", err);
    });
});


router.post("/fetchThisRivalzActivitiesHistory", (req, res, next) => {
  StudentActivityHistory.find({
    LabJoinCode: req.body.LabJoinCode,
    StudentzUsername: req.body.StudentzUsername
  })
    .then((document) => {
      console.log("req.body.StudentzUsername ::....", req.body.StudentzUsername);
      console.log("High 7 Achievers below ::....", document);
      console.log("LabJoinCode: req.body.LabJoinCode ::....", req.body.LabJoinCode);
      res.status(200).json({
        message: "Rivals Activities Downloaded.",
        FetchedThisRivalzActivitiesHistory: document,
      });

      // console.log("   ==> {/Fetch7HighAchieversOfThisLab} ");
      // console.log("req.body.LabJoinCode  @@ =  ", req.body.LabJoinCode);
    })
    .catch((err) => {
      res.status(500).json({
        message: "FAILLLELELELED.",
        currentStatsOfThisStudent: document,
      });
      // console.log(" 004 theeeen eeerrrororrorr\n", err);
    });
});

module.exports = router;
