import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Usersmodel } from '../../MODELS/usersmodel.model';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})


export class SignupFormComponent implements OnInit {
  constructor(public usersService: UsersService) { }

  ngOnInit() {
    // this.setALLErrorsToFalse();
    this.setAllErrorsToFalse();
    this.user.UniversityNameOfUser = 'NotListedHere';
    this.UniversitiesListFromDB = this.usersService.getUniversitiesListFromDB();
    this.UsersRecievedFromDBForSignup = this.usersService.RecieveAllUsersFromDB();
    // this.usersInfoListFromDB = this.usersService.RecieveUsersFromDBForSignup();
    console.log("this.UsersRecievedFromDBForSignup FROM ngOnInit()");
    console.log(this.UsersRecievedFromDBForSignup);
    setTimeout(() => {
      this.loadUnisListFromDatabase();
    }, 2000);
  }


  /**universitiesListFromDB = [
      { uniName: 'COMSATS University Islamabad' },
      { uniName: 'IIUI Islamabad' },
      { uniName: 'Islamic University Islamabad' },
      { uniName: 'IBA Karachi' },
      { uniName: 'UET Lahore' },
      { uniName: 'FAST NUCES Islamabad' },
    ]; */

  private UsersRecievedFromDBForSignup: Usersmodel[] = [];
  // private listOfUniversities: {uniName: String}[] = []
  UniversitiesListFromDB = [];

  // FOLLOWING FN UPDATES Uni LIST FROM DB
  // fnUpdListUnis(){
  loadUnisListFromDatabase() {

    for (var i = 0; i < this.UsersRecievedFromDBForSignup.length; i++) {


      if (
        this.UsersRecievedFromDBForSignup[i].TitleOfUniversity != null &&
        this.UsersRecievedFromDBForSignup[i].UserType == 'university' &&
        this.UsersRecievedFromDBForSignup[i].UserzAccessStatus == 'Allowed'
      ) {

        const arr: { uniName: String } = { uniName: this.UsersRecievedFromDBForSignup[i].TitleOfUniversity };
        this.UniversitiesListFromDB.push(arr);
      }
    }
  }


  // A create User Fn to create the User.

  onSignUpClicked(form: NgForm) {
    //assigns remaining inputs to user
    this.assignRemainingInputs(form, this.user.UserType);

    //returns true if errors found.
    if (this.checknErrors(form, this.user.UserType)) {
      //following variable enables/disables Error div below the Signup Button
      this.Errors.formHasErrors.status = true;
      //following variable enables/disables Success div below the Signup Button
      this.Errors.formSubmittedSuccessfuly.status = false;
      return;
    } else {
      this.usersService.createUser(this.user); //<--- this method should update user to DB

      this.Errors.formHasErrors.status = false;
      this.Errors.formSubmittedSuccessfuly.status = true;
      setTimeout(() => { form.resetForm() }, 200);
    }
  }









  SignupForm: NgForm;
  anyUniversitySelected: Boolean = false;

  myFn(form: NgForm) {
    this.SignupForm = form;
  }
  // UniS:HTMLSelectElement = null;

  // usersInfoListFromDB:Usersmodel[] = [];


  // console.log(this.UniversitiesListFromDB);

  user: Usersmodel = {
    _id: null,
    // attribs of UserType = Student/Teacher
    FirstNameOfUser: '',
    LastNameOfUser: '',
    UniversityNameOfUser: 'NotListedHere',
    RegistrationNumberOfUser: '',
    // attribs of UserType = University
    TitleOfUniversity: '',
    HECIDofUniversity: '',
    //common attribs
    UserType: '',
    UserzAccessStatus: 'Pending',
    Username: '',
    Password: '',
  };

  Errors = {
    uniTitleNotUnique: {
      status: true,
      message: 'This title is taken, Type a different one.',
    },
    //below errors are for fields in common.
    invalidUsername: {
      status: true,
      message: 'Username should be atleast 5 characters).',
    },
    invalidPassword: {
      status: true,
      message: 'Password should be atleast 8 characters).',
    },
    usernameNotUnique: {
      status: true,
      message: 'This username has already been taken. kindly enter some other.',
    },
    formHasErrors: {
      status: true,
      message: 'Form not submitted due to errors, kindly resolve them first.',
    },
    formSubmittedSuccessfuly: {
      status: true,
      message:
        'Form submitted to your University successfuly.\nYou can Login now.',
    },
    //below are for fields of non UNIVERSITY users.
    invalidFName: {
      status: true,
      message: 'First Name should be atleast 3 characters).',
    },
    invalidLName: {
      status: true,
      message: 'Last Name should be atleast 3 characters).',
    },
    invalidRegistrationNumber: {
      status: true,
      message: 'Registration Number should be minimum of 4 characters).',
    },
    //below are fields for UNIVERSITY.
    invalidNameOfTheUNIVERSITY: {
      status: true,
      message: "University name can't be less than 2 characters.",
    },
    invalidHECID: {
      status: true,
      message: "You can't enter a HEC ID with less than 3 characters.",
    },
  };

  //=====================================================================
  //=====================================================================
  //=====================================================================
  //=====================================================================
  //=====================================================================

  // getTheUser()
  // {
  //   this.usersService.getUser();
  // }

  //==================
  //==================
  //==================
  //==================
  //==================

  //following method is called when usertype selection is changed,
  onUsersSelectChange(opt: HTMLSelectElement) {
    this.setALLErrorsToFalse();
    if (opt.value == 'teacher') {
      this.user.UserType = 'teacher';
      this.setAllFieldsToNull();
      // this.setAllErrorsToTrueForUser('non-uni');
      // console.log(this.user.UserType);
      // console.log(this.user);
      // console.log(this.user);
    } else if (opt.value == 'student') {
      this.user.UserType = 'student';
      this.setAllFieldsToNull();
      // this.setAllErrorsToTrueForUser('non-uni');
      // console.log(this.user.UserType);
      // console.log(this.user);
      // console.log(this.user);
    } else if (opt.value == 'university') {
      this.user.UserType = 'university';
      this.setAllFieldsToNull();
      // this.setAllErrorsToTrueForUser('uni');
      // console.log(this.user.UserType);
      // console.log(this.user);
      // console.log(this.user);
    } else {
      alert('something fishy');
    }
  }

  onUniversitiesSelectChange(optUni: HTMLSelectElement) {
    // Not Listed!
    // console.log('optUni.value : ' + optUni.value);
    if (optUni.value === 'Not Listed!' || optUni.value === 'Selectone') {
      this.anyUniversitySelected = false;
      // console.log(optUni.value);
      // this.user.UniversityNameOfUser = optUni.value;
    } else {
      this.anyUniversitySelected = true;
      //  console.log(optUni.value);
    }
    this.user.UniversityNameOfUser = optUni.value;
    // console.log(this.user);

    // this.UniS = optUni;
    // // this.user.UniversityNameOfUser = optUni.value;
    // for(let i = 0; i<this.UniversitiesListFromDB.length; i++){
    //   if(this.UniversitiesListFromDB[i].uniName==optUni.value){
    //     this.user.UniversityNameOfUser =  this.UniversitiesListFromDB[i].uniName;    ///UNIVERITY OF user ASSIGNED.
    //     // alert("Uni: "+optUni.value+" has been set to user object");
    //     console.log(this.user);
    //     return;
    //   }
    // }
    // this.user.UniversityNameOfUser = this.UniversitiesListFromDB.uniID]
    // }
  }

  //================================================================ utility Functions
  //===================================================================================

  checkUniversitysEnteredName() {
    this.SignupForm.value.UniversitysEnteredName.length < 2
      ? (this.Errors.invalidNameOfTheUNIVERSITY.status = true)
      : (this.Errors.invalidNameOfTheUNIVERSITY.status = false);




    var EnteredUniTitle = '';
    if (this.SignupForm.value.UniversitysEnteredName != null) {
      EnteredUniTitle = this.SignupForm.value.UniversitysEnteredName;
      if (this.UsersRecievedFromDBForSignup != null) {
        for (var i = 0; i < Object.keys(this.UsersRecievedFromDBForSignup).length; i++) {
          var quotedEnteredUniTitle = '"' + EnteredUniTitle + '"';
          var IteratedTITLEinForLoop: string = JSON.stringify(
            this.UsersRecievedFromDBForSignup[i].TitleOfUniversity
          );
          // console.log("IteratedUNinForLoop.toLowerCase() ", IteratedUNinForLoop.toLowerCase());
          // console.log("quotedUserEnteredUN.toLowerCase() ", quotedUserEnteredUN.toLowerCase());
          if (IteratedTITLEinForLoop.toLowerCase() == quotedEnteredUniTitle.toLowerCase()) {

            this.Errors.uniTitleNotUnique.status = true;
            console.log('user was matched');
            return true;

          } else {
            this.Errors.uniTitleNotUnique.status = false;
            // return false;
          }
        }
      }
    }
  }

  checkHECIDOfUniversity() {
    this.SignupForm.value.HECIDOfUniversity.length < 3
      ? (this.Errors.invalidHECID.status = true)
      : (this.Errors.invalidHECID.status = false);
  }

  checkPasswordOfUniversity() {
    this.SignupForm.value.PasswordOfUniversity.length < 8
      ? (this.Errors.invalidPassword.status = true)
      : (this.Errors.invalidPassword.status = false);
  }
  checkUsernameOfUniversity() {
    this.SignupForm.value.UsernameOfUniversity.length < 5
      ? (this.Errors.invalidUsername.status = true)
      : (this.Errors.invalidUsername.status = false);
    // checks uniqienes
    var universitysEnteredUN = '';
    if (this.SignupForm.value.UsernameOfUniversity != null) {
      universitysEnteredUN = this.SignupForm.value.UsernameOfUniversity;
      if (this.UsersRecievedFromDBForSignup != null) {
        for (var i = 0; i < Object.keys(this.UsersRecievedFromDBForSignup).length; i++) {
          var re = '"' + universitysEnteredUN + '"';
          var usnm: string = JSON.stringify(
            this.UsersRecievedFromDBForSignup[i].Username
          );
          if (usnm.toLowerCase() === re.toLowerCase()) {
            this.Errors.usernameNotUnique.status = true;
            console.log('user was matched');
            // console.log(this.Errors.usernameNotUnique);
            return;
          } else {
            this.Errors.usernameNotUnique.status = false;
            console.log('user was NOT matched');
            // console.log(this.Errors.usernameNotUnique);
          }
        }
      }
    }
  }

  checkRegistrationNumberOfUser() {
    this.SignupForm.value.UsersEnteredRegistrationNumber.length < 4
      ? (this.Errors.invalidRegistrationNumber.status = true)
      : (this.Errors.invalidRegistrationNumber.status = false);
  }

  checkLastNameOfUser() {
    this.SignupForm.value.UsersEnteredLName.length < 3
      ? (this.Errors.invalidLName.status = true)
      : (this.Errors.invalidLName.status = false);
  }

  checkFirstNameOfUser() {
    this.SignupForm.value.UsersEnteredFName.length < 3
      ? (this.Errors.invalidFName.status = true)
      : (this.Errors.invalidFName.status = false);
  }

  checkPasswordOfUser() {
    this.SignupForm.value.UsersEnteredPassword.length < 8
      ? (this.Errors.invalidPassword.status = true)
      : (this.Errors.invalidPassword.status = false);
  }
  checkUsernameOfUser() {
    //
    this.SignupForm.value.UsersEnteredUsername.length < 5
      ? (this.Errors.invalidUsername.status = true)
      : (this.Errors.invalidUsername.status = false);
    // checks uniqieness
    var userEnteredUN = '';
    if (this.SignupForm.value.UsersEnteredUsername != null) {
      userEnteredUN = this.SignupForm.value.UsersEnteredUsername;
      // userEnteredUN = 'bIlalKhursheed';
      console.log("this.usersInfoListFromDB");
      // console.log(this.usersInfoListFromDB);
      if (this.UsersRecievedFromDBForSignup != null) {
        for (var i = 0; i < Object.keys(this.UsersRecievedFromDBForSignup).length; i++) {
          var quotedUserEnteredUN = '"' + userEnteredUN + '"';
          var IteratedUNinForLoop: string = JSON.stringify(
            this.UsersRecievedFromDBForSignup[i].Username
          );
          if (IteratedUNinForLoop.toLowerCase() == quotedUserEnteredUN.toLowerCase()) {
            this.Errors.usernameNotUnique.status = true;
            console.log('user was matched');
            // console.log(this.Errors.usernameNotUnique);
            return;
          } else {
            this.Errors.usernameNotUnique.status = false;
            console.log('user was NOT matched');
            // console.log(this.Errors.usernameNotUnique);
          }
        }
      }
    }
  }

  setAllFieldsToNull() {
    this.user.HECIDofUniversity = null;
    this.user.TitleOfUniversity = null;
    this.user.FirstNameOfUser = null;
    this.user.LastNameOfUser = null;
    this.user.RegistrationNumberOfUser = null;
    this.user.UniversityNameOfUser = null;
    this.user.Username = null;
    this.user.Password = null;
    this.user._id = null;
    // this.user = null;
    // console.log("nulled user below:");
    // console.log(this.user);
  }

  setAllErrorsToFalse(){
    this.Errors.formHasErrors.status = false;
    this.Errors.formSubmittedSuccessfuly.status = false;
    this.Errors.invalidFName.status = false;
    this.Errors.invalidHECID.status = false;
    this.Errors.invalidLName.status = false;
    this.Errors.invalidNameOfTheUNIVERSITY.status = false;
    this.Errors.invalidPassword.status = false;
    this.Errors.invalidRegistrationNumber.status = false;
    this.Errors.invalidUsername.status = false;
    this.Errors.uniTitleNotUnique.status = false;
    this.Errors.usernameNotUnique.status = false;
    }


  setAsllErrorsToTrueForUser(user: string) {
    if (user == 'uni') {
      // this.Errors.UniversityNotSelected.status = false;
      // this.Errors.invalidFName.status = false;
      // this.Errors.invalidLName.status = false;
      this.Errors.invalidHECID.status = true;
      this.Errors.invalidNameOfTheUNIVERSITY.status = true;
      // this.Errors.universityNotListed.status = false;
      // this.Errors.invalidRegistrationNumber.status = false;
    } else if (user == 'non-uni') {
      // this.Errors.UniversityNotSelected.status = true;
      this.Errors.invalidFName.status = true;
      this.Errors.invalidLName.status = true;
      this.Errors.invalidRegistrationNumber.status = true;
    } else {
      alert('see signup-form.compo.ts file in setAllErrorsToTrueForUser()');
    }
    this.Errors.invalidPassword.status = true;
    this.Errors.invalidUsername.status = true;
  }

  //====================================

  assignRemainingInputs(form: NgForm, user: string) {
    if (user == 'teacher' || user == 'student') {
      this.user.FirstNameOfUser = form.value.UsersEnteredFName;
      this.user.LastNameOfUser = form.value.UsersEnteredLName;
      this.user.RegistrationNumberOfUser = form.value.UsersEnteredRegistrationNumber;
      this.user.Username = form.value.UsersEnteredUsername.toLowerCase();
      this.user.Password = form.value.UsersEnteredPassword;
    } else {
      this.user.HECIDofUniversity = form.value.HECIDOfUniversity;
      this.user.TitleOfUniversity = form.value.UniversitysEnteredName;
      this.user.Username = form.value.UsernameOfUniversity.toLowerCase();
      this.user.Password = form.value.PasswordOfUniversity;
    }
  }

  //this fuction only sets active error's statuses to true
  checknErrors(form: NgForm, user: string): Boolean {
    var isUniNotSelected: Boolean = false;
    if (user != 'university') {
      if (this.user.UniversityNameOfUser == '') {
        alert('You have not selected any university.');
        isUniNotSelected = true;
      }

      if (
        this.Errors.invalidFName.status ||
        this.Errors.invalidLName.status ||
        this.Errors.invalidPassword.status ||
        this.Errors.invalidRegistrationNumber.status ||
        this.Errors.invalidUsername.status ||
        this.Errors.usernameNotUnique.status ||
        isUniNotSelected
      )
        return true;
      else return false;
    } else if (user == 'university') {
      // this.user.HECIDofUniversity.length < 3
      //   ? (this.Errors.invalidHECID.status = true)
      //   : (this.Errors.invalidHECID.status = false);
      // this.user.TitleOfUniversity.length < 2
      //   ? (this.Errors.invalidNameOfTheUNIVERSITY.status = true)
      //   : (this.Errors.invalidNameOfTheUNIVERSITY.status = false);
      // this.user.Password.length < 8
      //   ? (this.Errors.invalidPassword.status = true)
      //   : (this.Errors.invalidPassword.status = false);
      // this.user.Username.length < 5
      //   ? (this.Errors.invalidUsername.status = true)
      //   : (this.Errors.invalidUsername.status = false);

      if (
        this.Errors.invalidHECID.status ||
        this.Errors.invalidNameOfTheUNIVERSITY.status ||
        this.Errors.invalidPassword.status ||
        this.Errors.invalidUsername.status ||
        this.Errors.usernameNotUnique.status
      )
        return true;
      else return false;
    }
  }



  //=====================================

  //folowing is called in onInit()
  setALLErrorsToFalse() {
    // this.Errors.UniversityNotSelected.status = false;
    this.Errors.invalidFName.status = false;
    this.Errors.invalidLName.status = false;
    this.Errors.invalidPassword.status = false;
    this.Errors.invalidUsername.status = false;
    this.Errors.invalidRegistrationNumber.status = false;
    this.Errors.invalidHECID.status = false;
    this.Errors.usernameNotUnique.status = false;
    this.Errors.invalidNameOfTheUNIVERSITY.status = false;
    this.Errors.formHasErrors.status = false;
    this.Errors.formSubmittedSuccessfuly.status = false;
    // this.Errors.UniversityNotSelected.status = false;
  }
}
