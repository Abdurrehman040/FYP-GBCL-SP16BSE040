import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Labsmodel } from '../MODELS/Lab-Frontend-Models/labsmodel.model';

import { StudentzUsernameAndLabJoinCodemodel } from '../MODELS/Student-Frontend-Models/StudentzUsernameAndLabJoinCodemodel.model';
import { LabNumbersModel } from '../MODELS/Lab-Frontend-Models/LabNumbersmodel.model';


@Injectable({
  providedIn: 'root'
})
export class LabsService {
  constructor(private http: HttpClient) { }






  updateThisLabNumberOfThisLab(LabNumberToUpdate: LabNumbersModel) {
    this.http.put("http://localhost:3000/api/Labs/updateThisLabNumberOfThisLab", LabNumberToUpdate)
      .subscribe(ResposeData => {
        console.log(ResposeData);
      });
  }




  fetchLabNumbersOfThisLab(LabID: string): LabNumbersModel[] {
    const obj: StudentzUsernameAndLabJoinCodemodel = { LabJoinCode: LabID, StudentzUsername: null };
    let fetchedLabNumbers: LabNumbersModel[] = [];
    this.http.post<{ message: string, FetchedLabNumbers: LabNumbersModel[] }>("http://localhost:3000/api/Labs/fetchLabNumbersOfThisLab", obj)
      .subscribe(responseData => {
        console.log(responseData);
        for (let i = 0; i < Object.keys(responseData.FetchedLabNumbers).length; i++) {
          fetchedLabNumbers.push(responseData.FetchedLabNumbers[i]);
        }
      });
    return fetchedLabNumbers;
  }

  createNewLabNumber(LabID: string, LabNumber: number) {
    const labNumber: LabNumbersModel = { LabJoinCode: LabID, LabNumber: LabNumber, LabTaskIds: [], _id: '' };
    this.http.post("http://localhost:3000/api/Labs/createNewLabNumber", labNumber)
      .subscribe(resposedData => {
        console.log(resposedData);
      });
  }



  ResetAllChallenegezAttemptedByArraysOfALLLstudzOfThisLab(StudentzUsernameAndLabID: StudentzUsernameAndLabJoinCodemodel) {
    this.http.put("http://localhost:3000/api/Labs/ResetAllChallenegezAttemptedByArraysOfALLLstudzOfThisLab/", StudentzUsernameAndLabID).subscribe(
      response => {
        console.log(response);
      });
  }
  ResetAllLabTaskzAttemptedByArraysOfALLLstudzOfThisLab(StudentzUsernameAndLabID: StudentzUsernameAndLabJoinCodemodel) {
    this.http.put("http://localhost:3000/api/Labs/ResetAllLabTaskzAttemptedByArraysOfALLLstudzOfThisLab/", StudentzUsernameAndLabID).subscribe(
      response => {
        console.log(response);
      });
  }






  getAllLabs(): Labsmodel[] {
    let allLabs: Labsmodel[] = [];
    this.http.get<{ message: string; allLabs: Labsmodel[] }>('http://localhost:3000/api/Labs/getAllLabs')
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.allLabs).length; i++) {
          allLabs.push(responseData.allLabs[i]);
        }
      });
    return allLabs;
  }


  getAllLabsOfThisUniversity(obj: { UniversityNameOfLab: string }): Labsmodel[] {
    let allLabsOfThisUniversity: Labsmodel[] = [];
    this.http.post<{ message: string; allLabsOfThisUniversity: Labsmodel[] }>('http://localhost:3000/api/Labs/getAllLabsOfThisUniversity', obj)
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.allLabsOfThisUniversity).length; i++) {
          allLabsOfThisUniversity.push(responseData.allLabsOfThisUniversity[i]);
        }
      });
    return allLabsOfThisUniversity;
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


  ChangeUniversityNameOfLabOfThisUnizLabs(oldUniversityNameOfLab:string,newUniversityNameOfLab: string) {
    let UpdatedLab: Labsmodel = { LabClass: '', LabInstructor: '', LabInstructorFN: '', LabInstructorLN: '', LabProgram: '', LabTitle: '', UniversityNameOfLab: newUniversityNameOfLab, _id: '' };

    this.http.put("http://localhost:3000/api/Labs/ChangeUniversityNameOfLabOfThisUnizLabs/"+oldUniversityNameOfLab, UpdatedLab).subscribe(
      response => {
        console.log(response);
      }
    );
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
