import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { LabMembersmodel } from '../MODELS/Lab-Frontend-Models/labMembermodel.model';
import { Labsmodel } from '../MODELS/Lab-Frontend-Models/labsmodel.model';
import { StudLabDataAndStatsmodel } from '../MODELS/Student-Frontend-Models/StudLabDataAndStatsmodel.model';
import { Usersmodel } from '../MODELS/Usersmodel.model';
import { LabsService } from '../Services/labs.service';
import { StudentLabDataService } from '../Services/student-lab-data.service';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class STUDENTComponent implements OnInit {

  constructor(private labsService: LabsService,private studentLabDataService:StudentLabDataService,  private usersService: UsersService) { }

  ngOnInit(): void {
    this.LabID = localStorage.getItem("LabID");
    this.showSpinner = false;
    // this.AllLabsRecieved = this.labsService.RecieveAllLabsFromDB();
    let usernameObj: { Username: string } = { Username: this.localStorageUsername };
    this.TheStudent = this.usersService.FetchThisUser(usernameObj);
    setTimeout(() => {
      let obj:{UniversityNameOfLab:string} = {UniversityNameOfLab:this.TheStudent[0].UniversityNameOfUser};
      this.AllLabsOfThisStudetzUniversity = this.labsService.getAllLabsOfThisUniversity(obj);
      console.log("All Labs Of This Studetz University @@@ ",this.AllLabsOfThisStudetzUniversity);
    }, 1500);
    setTimeout(() => {
      this.extractLabsOfThisStudent();
    }, 2000);
  }

  LabID:string = '';
  AllLabsOfThisStudetzUniversity: Labsmodel[] = [];
  // AllLabsRecieved: Labsmodel[] = [];
  TheStudent: Usersmodel[] = [];
  // CompleteLabMembersCollection: LabMembersmodel[] = [];
  MessageForModal: string;
  showSpinner: boolean = false;
  LabsOfThisStudent: Labsmodel[] = [];






  extractLabsOfThisStudent() {

    let objUsername: { Username: string };
    let arrayOf_LabJoinCodesOfJoinedLabs: string[] = this.TheStudent[0].LabJoinCodesOfJoinedLabs;
    if (arrayOf_LabJoinCodesOfJoinedLabs.length != 0) {
      for (let i = 0; i < this.AllLabsOfThisStudetzUniversity.length; i++) {    ////not all labs, but just labs of this stud
        //student's university's labs only
        for (let j = 0; j < arrayOf_LabJoinCodesOfJoinedLabs.length; j++) {
          if (this.AllLabsOfThisStudetzUniversity[i]._id == arrayOf_LabJoinCodesOfJoinedLabs[j]) {
            this.LabsOfThisStudent.push(this.AllLabsOfThisStudetzUniversity[i]);
            // objUsername = { Username: this.AllLabsRecieved[i].LabInstructor };
            // let LabInstructor: Usersmodel[] =[];
            // LabInstructor = this.usersService.FetchThisUser(objUsername);
            // while(LabInstructor.length == 0){
            //   console.log("Waiting...");
            // }
            // this.InstructorszFNsAndLNs.push(LabInstructor[0].FirstNameOfUser+' '+ LabInstructor[0].LastNameOfUser);
          }
        }
      }
    }
  }

  onVisitLabButtonClicked(labId: string, modalButtonReferrence: HTMLButtonElement) {
    this.showSpinner = true;
    let StudentLabDataAndStatistics: StudLabDataAndStatsmodel[] = [];
    StudentLabDataAndStatistics = this.studentLabDataService
    .getCurrentStatsOfThisStudent({StudentzUsername:this.localStorageUsername, LabJoinCode:labId});
    setTimeout(()=>{
      this.showSpinner = false;
      if(StudentLabDataAndStatistics[0].StudentzLabAccessStatus == "Expelled"){
        this.displayThisMessageInModal("You Were Expelled from this lab!",modalButtonReferrence);
      }else{

        localStorage.setItem("LabID", labId);
        window.location.href = "/STUDENT/Lab";

      }

    },2500);


  }


  displayThisMessageInModal(Message: string, modalButtonReferrence: HTMLButtonElement) {
    this.MessageForModal = Message;
    modalButtonReferrence.click();
  }


  onJoinLabButtonClicked(enteredJoinCode: string, modalButtonReferrence: HTMLButtonElement) {

    if (enteredJoinCode.length < 10) {
      this.displayThisMessageInModal('Code length must be greater than 10.', modalButtonReferrence);
      return;
    }

    //do not change till here

    let checkIf_enteredJoinCode_BelongsToAnAlreadyJoinedLab = false;
    for (let k = 0; k < this.TheStudent[0].LabJoinCodesOfJoinedLabs.length; k++) {
      if (this.TheStudent[0].LabJoinCodesOfJoinedLabs[k] == enteredJoinCode) {
        checkIf_enteredJoinCode_BelongsToAnAlreadyJoinedLab = true;
        this.displayThisMessageInModal('You have already joined this lab.', modalButtonReferrence);
        console.log('00333  <==>');
        return;
      }
    }

    let checkIf_enteredJoinCode_MatchesWithAnyLab = false;
    console.log('001  enteredJoinCode ==>', enteredJoinCode);
    for (let i = 0; i < this.AllLabsOfThisStudetzUniversity.length; i++) {
      console.log('002 this.AllLabsRecieved[i]._id ==>', this.AllLabsOfThisStudetzUniversity[i]._id);
      if (this.AllLabsOfThisStudetzUniversity[i]._id == enteredJoinCode) {
        console.log('003 inside if (this.AllLabsRecieved[i]._id == enteredJoinCode) { ');
        checkIf_enteredJoinCode_MatchesWithAnyLab = true;
        // return;
      }
    }









    let checkIf_enteredJoinCode_IsEnteredAgain = false;
    var arrayOf_LabJoinCodesOfAppliedLabs: string[] = [];
    console.log('003.1 this.TheStudent[0].LabJoinCodesOfAppliedLabs.length ==>', this.TheStudent[0].LabJoinCodesOfAppliedLabs.length);
    console.log('003.2 this.TheStudent[0].LabJoinCodesOfJoinedLabs.length ==>', this.TheStudent[0].LabJoinCodesOfJoinedLabs.length);
    for (let p = 0; p < this.TheStudent[0].LabJoinCodesOfAppliedLabs.length; p++) {
      console.log('<===================> ');
      console.log(p + 1);
      console.log('<===================> ');
      arrayOf_LabJoinCodesOfAppliedLabs.push(this.TheStudent[0].LabJoinCodesOfAppliedLabs[p]);
    }


    // if (checkIf_enteredJoinCode_BelongsToAnAlreadyJoinedLab) {
    //   this.displayThisMessageInModal('You already have joined this lab.', modalButtonReferrence);
    //   return;
    // }


    arrayOf_LabJoinCodesOfAppliedLabs = [...this.TheStudent[0].LabJoinCodesOfAppliedLabs];
    console.log('004 this.TheStudent[0]', this.TheStudent[0]);
    console.log('004.1 this.TheStudent[0].LabJoinCodesOfAppliedLabs', this.TheStudent[0].LabJoinCodesOfAppliedLabs);
    console.log('005 enteredJoinCode ==>', enteredJoinCode);
    console.log('005.1 arrayOf_LabJoinCodesOfAppliedLabs ==>', arrayOf_LabJoinCodesOfAppliedLabs);
    console.log('005.1.1 arrayOf_LabJoinCodesOfAppliedLabs.length ==>', arrayOf_LabJoinCodesOfAppliedLabs.length);
    for (let j = 0; j < arrayOf_LabJoinCodesOfAppliedLabs.length; j++) {
      console.log('005.2 <========== ========>');
      console.log('006 arrayOf_LabJoinCodesOfAppliedLabs[j] ==>', arrayOf_LabJoinCodesOfAppliedLabs[j]);
      if (arrayOf_LabJoinCodesOfAppliedLabs[j] == enteredJoinCode) {
        checkIf_enteredJoinCode_IsEnteredAgain = true;
        console.log('007 arrayOf_LabJoinCodesOfAppliedLabs[i] == enteredJoinCode ==>  ==>  TRUE');
        // return;
      }
    }


    if (checkIf_enteredJoinCode_MatchesWithAnyLab) {
      console.log('008 inside if (checkIf_enteredJoinCode_MatchesWithAnyLab) {');
      if (checkIf_enteredJoinCode_IsEnteredAgain) {
        console.log('009 inside if if (checkIf_enteredJoinCode_IsEnteredAgain) {');
        this.displayThisMessageInModal('You already have applied to join for this lab.', modalButtonReferrence);
      } else {
        this.TheStudent[0].LabJoinCodesOfAppliedLabs.push(enteredJoinCode);
        console.log('this.TheStudent[0] before updateing', this.TheStudent[0]);
        this.usersService.updateThisUser(this.TheStudent[0], this.TheStudent[0]._id);
        this.displayThisMessageInModal('Applied for access to the lab. You will be granted access once your request ges accepted.', modalButtonReferrence);
        // setTimeout(()=>{window.location.reload()},4000);
      }
    } else {
      this.displayThisMessageInModal('Entered Join Code does not match with any lab.', modalButtonReferrence);
    }

  }


















  //=================================================previous  code

  localStorageUsername = localStorage.getItem("UsersUsername");

  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

}
