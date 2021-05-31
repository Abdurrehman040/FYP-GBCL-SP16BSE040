import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Labsmodel } from '../MODELS/Lab-Frontend-Models/labsmodel.model';
import { LabTasksmodel } from '../MODELS/Lab-Frontend-Models/labTasksmodel.model';
import { LabChallengesmodel } from '../MODELS/Lab-Frontend-Models/labchallengesmodel.model';
import { StudentAttemptedLabTaskmodel } from '../MODELS/Student-Frontend-Models/StudentAttemptedLabTaskmodel.model';
import { StudentAttemptedLabChallengemodel } from '../MODELS/Student-Frontend-Models/StudentAttemptedLabChallengesmodel.model';


@Injectable({
  providedIn: 'root'
})
export class LabsService {
  constructor(private http: HttpClient) { }



  getAllLabsOfThisUniversity(obj:{UniversityNameOfLab:string}): Labsmodel[] {
  let allLabsOfThisUniversity: Labsmodel[] = [];
  this.http.post<{ message: string; allLabsOfThisUniversity: Labsmodel[] }>('http://localhost:3000/api/Labs/getAllLabsOfThisUniversity', obj)
  .subscribe((responseData)=>{
    for (let i = 0; i < Object.keys(responseData.allLabsOfThisUniversity).length; i++) {
      allLabsOfThisUniversity.push(responseData.allLabsOfThisUniversity[i]);
    }
  });
  return allLabsOfThisUniversity;
  }


  createLabChallenge(labChallenge: LabChallengesmodel) {
    this.http
    .post('http://localhost:3000/api/Labs/CreateLabChallenge', labChallenge)
      .subscribe((responseData) => {
        console.log(responseData);
      });

  }


  createLabTask(labtask: LabTasksmodel) {

    this.http
    .post('http://localhost:3000/api/Labs/CreateLabTask', labtask)
    .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  DeleteThisLabChallenge(ChallengeId: string) {
    this.http.delete("http://localhost:3000/api/Labs/DeleteThisLabChallenge/" + ChallengeId).subscribe(
      response => {
        console.log(response);
      }
      );
    }
    DeletThisLabTask(labTaskId: string) {
      this.http.delete("http://localhost:3000/api/Labs/DeleteThisLabTask/" + labTaskId).subscribe(
        response => {
          console.log(response);
        }
        );

      }


      getAllLabTasksOfThisLabFromDB(objLabID: { LabJoinCode: string }): LabTasksmodel[] {
        let allLabtasksOfthislabFromDB: LabTasksmodel[] = [];
        this.http
        .post<{ message: string; AllLabTasksOfThisLabFromDB: LabTasksmodel[] }>(
          'http://localhost:3000/api/Labs/getAllLabTasksOfThisLabFromDB', objLabID
          )
          .subscribe((responseData) => {
            for (let i = 0; i < Object.keys(responseData.AllLabTasksOfThisLabFromDB).length; i++) {
              allLabtasksOfthislabFromDB.push(responseData.AllLabTasksOfThisLabFromDB[i]);
            }
          });
          return allLabtasksOfthislabFromDB;

        }


        getAllChallengesOfThisLabFromDB(objLabID: { LabJoinCode: string }): LabChallengesmodel[] {
          console.log('objLabID.LabId',objLabID.LabJoinCode);
          let allChallengesOfThisLabFromDB: LabChallengesmodel[] = [];
          this.http
          .post<{ message: string; AllChallengesOfThisLabFromDB: LabChallengesmodel[] }>(
            'http://localhost:3000/api/Labs/getAllChallengesOfThisLabFromDB', objLabID
            )
            .subscribe((responseData) => {
              for (let i = 0; i < Object.keys(responseData.AllChallengesOfThisLabFromDB).length; i++) {
                allChallengesOfThisLabFromDB.push(responseData.AllChallengesOfThisLabFromDB[i]);
              }
            });


            return allChallengesOfThisLabFromDB;

          }





          GetAllLabTasksFromDB(): LabTasksmodel[] {

            let AllLabTasks: LabTasksmodel[] = [];
            this.http
            .get<{ message: string; labTasks: LabTasksmodel[] }>(
              'http://localhost:3000/api/Labs/GetAllLabTasksFromDB'
              )
              .subscribe((responseData) => {
                for (let i = 0; i < Object.keys(responseData.labTasks).length; i++) {
                  AllLabTasks.push(responseData.labTasks[i]);
        }
      });


      return AllLabTasks;

  }

  GetAllLabChallengesFromDB(): LabChallengesmodel[] {

    let AllLabChallenges: LabChallengesmodel[] = [];
    this.http
    .get<{ message: string; labChallenges: LabChallengesmodel[] }>(
        'http://localhost:3000/api/Labs/GetAllLabChallengesFromDB'
        )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.labChallenges).length; i++) {
          AllLabChallenges.push(responseData.labChallenges[i]);
        }
      });


      return AllLabChallenges;

    }



    FetchThisLab(LabID: string): Labsmodel[] {
    var objLabId: { _id: string } = { _id: LabID };
    var Lab: Labsmodel[] = [];
    this.http
      .post<{ message: string; lab: Labsmodel }>(
        'http://localhost:3000/api/Labs/FetchTHISLab', objLabId
      )
      .subscribe((responseData) => {
        Lab.push(responseData.lab);
      });
      return Lab;
    }





    DeleteThisLab(Id: string) {
    this.http.delete("http://localhost:3000/api/Labs/DeleteThisLab/" + Id).subscribe(
      response => {
        console.log(response);
      }
    );
  }



  //  setThisUserAsInstructorOfThisLab(Lab: Labsmodel) {
  //    this.http.put("http://localhost:3000/api/Users/setThisUserAsInstructorOfThisLab/" + Lab.LabInstructor, Lab).subscribe(
  //      response => {
  //        console.log(response);
  //      }
  //    );

  //  }

  updateThisLab(UpdatedLab: Labsmodel) {
    this.http.put("http://localhost:3000/api/Labs/UpdateThisLab/" + UpdatedLab._id, UpdatedLab).subscribe(
      response => {
        console.log(response);
      }
      );
  }

  updateThisLabChallenge(UpdatedLabChallenge: LabChallengesmodel) {
    this.http.put("http://localhost:3000/api/Labs/UpdateThisLabChallenge/" + UpdatedLabChallenge._id, UpdatedLabChallenge).subscribe(
      response => {
        console.log(response);
      });
  }

  updateThisLabTask(UpdatedLabTask: LabTasksmodel) {
    this.http.put("http://localhost:3000/api/Labs/UpdateThisLabTask/" + UpdatedLabTask._id, UpdatedLabTask).subscribe(
      response => {
        console.log(response);
      });
  }



  createLab(Lab: Labsmodel): Labsmodel[] {
    let array: any[] = [];
    let CreatedLab: Labsmodel[] = [];
    // array = [];
    // this.CreatedLab = [];
    this.http
      .post('http://localhost:3000/api/Labs/CreateLab', Lab)
      .subscribe((responseData) => {
        // setTimeout(()=>{
        // for (let i = 0; i < Object.keys(responseData.CreatedLab).length; i++) {
        //   this.CreatedLab.push(responseData.CreatedLab[i]);
        // }
        // console.log("api/Labs/CreateLab [[[responseData]]] => ", responseData);
        // console.log("Object.keys(responseData) => ", Object.keys(responseData));
        // console.log("Object.values(responseData) => ", Object.values(responseData));
        array = Object.values(responseData);
        CreatedLab.push(array[1]);  //at 0: message, at 1:the crated Lab as a result.
        // console.log("<====================> ");
        // console.log("this.CreatedLab.push(this.array[1]) => => this.CreatedLab", this.CreatedLab);
        // console.log("<====================> ");


        // },3500);
      });
    return CreatedLab;
  }
  // getCreatedLab(): Labsmodel[] {
  //   return this.CreatedLab;
  // }





  RecieveAllLabsFromDB() {
    var tempLabs: Labsmodel[] = [];
    this.http
      .get<{ message: string; labs: Labsmodel[] }>(
        'http://localhost:3000/api/Labs/RecieveLabsFromDB'
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.labs).length; i++) {
          tempLabs.push(responseData.labs[i]);
        }
      });
    // console.log('this.AllUsersRecieved FROM SERVICE===>',tempUsers);
    return tempLabs;
  }



}
