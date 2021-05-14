import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Usersmodel } from 'src/app/MODELS/usersmodel.model';
import { LoginService } from '../login.service';




@Component({
  selector: 'app-homepage-nav-search',
  templateUrl: './homepage-nav-search.component.html',
  styleUrls: ['./homepage-nav-search.component.css'],
})
export class HomepageNavSearchComponent implements OnInit {
  constructor(public loginService: LoginService) { }


  ngOnInit(): void {
    this.setAllErrorsToFalse();
  }


  showSpinner: boolean = false;
  // spinnerbtn:HTMLButtonElement



  // onClickToggleSpinner(){
  //   this.showSpinner = !this.showSpinner;
  // }

  // setSpinnerVisible(opt:boolean){
  //   this.showSpinner = opt;
  // }


  onKeyUpUsernameInput(UsernameInput: String) {
    if (UsernameInput.length < 5) {
      this.Errors.invalidUsername.status = true;
    } else {
      this.Errors.invalidUsername.status = false;
    }
    this.Errors.notAUser.status = false;
  }

  onKeyUpPasswordInput(PasswordInput: String) {
    if (PasswordInput.length < 8) {
      this.Errors.invalidPassword.status = true;
    } else {
      this.Errors.invalidPassword.status = false;
    }
  }

  Errors = {
    //below errors are for fields in common.
    invalidUsername: {
      status: true,
      message: 'Username should be atleast 5 characters).',
    },
    invalidPassword: {
      status: true,
      message: 'Password should be atleast 8 characters).',
    },
    notAUser: {
      status: true,
      message: 'this username does not belong to anybody.',
    },
    incorrectPassword: {
      status: true,
      message: 'password incorrect',
    },
  };


  setAllErrorsToFalse() {  //keeper
    this.Errors.incorrectPassword.status = false;
    this.Errors.invalidPassword.status = false;
    this.Errors.invalidUsername.status = false;
    this.Errors.notAUser.status = false;
  }



  loginUser(form: NgForm) {

    // var re = '"' + universitysEnteredUN + '"';
    //       var usnm: string = JSON.stringify(
    //         this.usersInfoListFromDB[i].Username
    //       );

    // if(form.value.UsersEnteredUsername.toLowerCase() == "admin"){

    // if(form.value.UsersEnteredPassword.toLowerCase() == "qwerty123"){

    // }
    // }

    var EnteredUN =  form.value.UsersEnteredUsername.toLowerCase();


    // console.log(EnteredUN);
    // console.log(typeof (form.value.UsersEnteredUsername));
    var userToBeSearched: Usersmodel = {
      FirstNameOfUser: null,
      HECIDofUniversity: null,
      LastNameOfUser: null,
      Password: form.value.UsersEnteredPassword,
      RegistrationNumberOfUser: null,
      TitleOfUniversity: null,
      UniversityNameOfUser: null,
      UserType: '-1',
      Username: EnteredUN,
      UserzAccessStatus: null,
      _id: null,
    };


    if (this.checkErrors(userToBeSearched)) {
      alert("Sign in fields are invalid!");
    }
    else {


      var TheMatchedUser: any[];



      this.showSpinner = true;
      setTimeout(() => {
        TheMatchedUser = this.loginService.FecthTheMatchingUserForLogin(
          userToBeSearched);


      }, 4500);

      setTimeout(() => {

        if (TheMatchedUser[0].UserType == '-1') {
          this.Errors.notAUser.status = true;
          this.showSpinner = false;
        } else {

          if (userToBeSearched.Password === TheMatchedUser[0].Password) {

            localStorage.setItem("UsersUsername",TheMatchedUser[0].Username);
            localStorage.setItem("UsersUsertype",TheMatchedUser[0].UserType);

            this.Errors.incorrectPassword.status = false;
            if (TheMatchedUser[0].UserType == 'student')
              window.location.href = '/STUDENT';
            if (TheMatchedUser[0].UserType == 'teacher')
              window.location.href = '/TEACHER';
            if (TheMatchedUser[0].UserType == 'university')
              window.location.href = '/UNIVERSITY';
            if (TheMatchedUser[0].UserType == 'admin')
              window.location.href = '/ADMIN';
          } else {
            this.Errors.incorrectPassword.status = true;
            this.showSpinner = false;
          }



        }
      }, 5000);

    }

    // this.showSpinner = false;
    // this.setSpinnerVisible(false);

  }


  //each time focusouts of both inputs, it checks for the errors
  checkErrors(user: Usersmodel): Boolean {
    user.Username.length < 5
      ? (this.Errors.invalidUsername.status = true)
      : (this.Errors.invalidUsername.status = false);
    user.Password.length < 8
      ? (this.Errors.invalidPassword.status = true)
      : (this.Errors.invalidPassword.status = false);
    // this.notAUser()
    //   ? (this.Errors.notAUser.status = true)
    //   : (this.Errors.notAUser.status = false);
    // console.log('password from db: ' + this.usersInfoListFromDB.Password);
    // console.log('user PRINTED INSIDE checkNDisplayErrors(): \n' + this.user);


    console.log("this.Errors.invalidPassword.status ||this.Errors.invalidUsername.status = ",
      (this.Errors.invalidPassword.status || this.Errors.invalidUsername.status));
    if (
      this.Errors.invalidPassword.status ||
      this.Errors.invalidUsername.status
      // || this.Errors.notAUser
      // || this.Errors.incorrectPassword
    )
      return true;
    else return false;
  }

  notAUser(): Boolean {  //keeper
    // var isAUser: Boolean = false;
    // if (this.usersInfoListFromDB != null) {
    //   for (var i = 0; i < Object.keys(this.usersInfoListFromDB).length; i++) {
    //     if (this.user.Username == this.usersInfoListFromDB[i].Username) {
    //       isAUser = true;
    //       return isAUser;
    //     }
    //   }
    //   return isAUser; //returned isUser = false, because no match was found in the list.
    // } else return false;
    return false;
  }



  //////=========================================
  ////CORRECT CODE ABOVE THIS POINT
  //////=========================================












  // usder: Usersmodel = {
  //   FirstNameOfUser: null,
  //   HECIDofUniversity: null,
  //   LastNameOfUser: null,
  //   Password: '',
  //   RegistrationNumberOfUser: null,
  //   TitleOfUniversity: null,
  //   UniversityNameOfUser: null,
  //   UserType: null,
  //   _id: null,
  //   Username: '',
  // };

  // usersInfoListFromDB: any = {}; //downloaded list of all users

  //assigns value of inputs when they change from earlier after focus outs but here The Event being handled is onChange()
  // assignInputs(form: NgForm) {
  //   //both inputs to local variables

  //   this.user.Username = form.value.UsersEnteredUsername;
  //   this.user.Password = form.value.UsersEnteredPassword;

  //   // console.log('AFTER ASSIGNING:');
  //   // console.log(this.user);
  // }










  /**
  if (this.checkNDisplayErrors()) {
    alert('Errors in the Sigin process.\nThe error-full FORM:');
    console.log(form);
    return;
  } else
  {
    //if signin fields have valid inputs than this block will execute.
    //this block running means both inputs are entered valid.

    //if username entered is Admin, then only following 4 lines will execute.
    // if (form.value.UsersEnteredUsername == 'Admin') {
      //   this.loginService.loginAdmin(form.value.UsersEnteredPassword);
    //   return;
    // }

    //following code will be executed if username is not entered as Admin.














    //following is returning null
    var TheMatchedUser: Usersmodel = this.loginService.FecthTheMatchingUserForLogin(
      userToBeSearched
    );

    console.log("TheMatchedUser :>>>",TheMatchedUser);
    //if fetched user == null then show error and return
    //else user will be either uni, std or tchr and proceed to their login
    if (TheMatchedUser == null) {
      alert('This username is not registered with GBCL --');
      return;
    } else {
      var EnteredUN: string = form.value.UsersEnteredUsername;
      EnteredUN.toLowerCase();
      var fetchedUN: string = TheMatchedUser.Username;
      fetchedUN.toLowerCase();
      // for (let i = 0; i < Object.keys(this.FetchedTotalUsersForSignin).length; i++) {
      // fetchedUN.toLowerCase();
      if (fetchedUN == EnteredUN) {
        //checked if Username matched?

         //checks if Password matches?
        if (TheMatchedUser.Password == form.value.UsersEnteredPassword)
        {
          //if both matched, then according to usertype, visit their location.
          if (TheMatchedUser.UserType == 'student')
            window.location.href = '/STUDENT';
          if (TheMatchedUser.UserType == 'teacher')
            window.location.href = '/TEACHER';
          if (TheMatchedUser.UserType == 'university')
            window.location.href = '/UNIVERSITY';

          alert('THIS MESSAGE SHALL NEVEr BE DISPLAYED');
          // return;
        } else {
          alert('Enter correct Password');
          return;
        }
      }
      // }
      alert('This Username is not registered in GBCL 22222');
      return;
    }
  }*/




}//end of .ts class






