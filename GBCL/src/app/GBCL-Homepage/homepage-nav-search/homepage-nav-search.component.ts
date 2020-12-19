import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usersmodel } from 'src/app/MODELS/usersmodel.model';

import { HomepageService } from '../homepage.service';

@Component({
  selector: 'app-homepage-nav-search',
  templateUrl: './homepage-nav-search.component.html',
  styleUrls: ['./homepage-nav-search.component.css'],
})
export class HomepageNavSearchComponent implements OnInit {
  constructor(public homepageService: HomepageService) {}

  ngOnInit(): void {
    // this.usersInfoListFromDB = this.homepageService.getUsersInfoFromDB();
    // this.FetchedUsers = this.homepageService.FecthUsers();
    this.UsersRecievedFromDB = this.homepageService.RecieveUsersFromDB();
    console.log(this.UsersRecievedFromDB);
  }

  UsersRecievedFromDB: Usersmodel[] = [];

  //  FetchedUsers: Usersmodel[] = [] ;

  user: Usersmodel = {
    FirstNameOfUser: null,
    HECIDofUniversity: null,
    LastNameOfUser: null,
    Password: '',
    RegistrationNumberOfUser: null,
    TitleOfUniversity: null,
    UniversityNameOfUser: null,
    UserType: null,
    _id: null,
    Username: '',
  };

  usersInfoListFromDB: any = {}; //downloaded list of all users

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

  //assigns value of inputs when they change from earlier after focus outs but here The Event being handled is onChange()
  assignInputs(form: NgForm) {
    //both inputs to local variables

    this.user.Username = form.value.UsersEnteredUsername;
    this.user.Password = form.value.UsersEnteredPassword;

    // console.log('AFTER ASSIGNING:');
    // console.log(this.user);
  }

  loginUser(form: NgForm) {
    if (form.value.UsersEnteredUsername == 'Admin') {
      this.homepageService.loginAdmin(form.value.UsersEnteredPassword);
      return;
    }

    // checkErrors and if no error then proceed the LOGIN
    if (this.checkNDisplayErrors()) {
      alert('Errors in the Sigin process.\nThe error-full FORM:');
      // console.log(form);
      return;
    } else {
      //if signin fields have valid inputs than this block will execute.

      var userFetchedMatch: Usersmodel = null;
      var EnteredUN: string = form.value.UsersEnteredUsername;
      EnteredUN.toLowerCase();
      for (let i = 0; i < Object.keys(this.UsersRecievedFromDB).length; i++) {
        var fetchedUN: string = this.UsersRecievedFromDB[i].Username;
        fetchedUN.toLowerCase();
        if (fetchedUN == EnteredUN) {  //checks if Username matches?
          if (
            this.UsersRecievedFromDB[i].Password ==
            form.value.UsersEnteredPassword //checks if Password matches?
          ) {
            //if both matched, then according to usertype, visit their location.
            if (this.UsersRecievedFromDB[i].UserType == 'student')
              window.location.href = '/STUDENT';
            if (this.UsersRecievedFromDB[i].UserType == 'teacher')
              window.location.href = '/TEACHER';
            if (this.UsersRecievedFromDB[i].UserType == 'university')
              window.location.href = '/UNIVERSITY';

              console.log("THIS MESSAGE SHALL NEVEr BE DISPLAYED");
            return;
          } else {
            alert('Enter correct Password');
            return;
          }
        }
      }
      alert('This Username is not registered in GBCL');
      return;
    }
  }

  //each time focusouts of both inputs, it checks for the errors
  checkNDisplayErrors(): Boolean {
    this.user.Username.length < 3
      ? (this.Errors.invalidUsername.status = true)
      : (this.Errors.invalidUsername.status = false);
    this.user.Password.length < 8
      ? (this.Errors.invalidPassword.status = true)
      : (this.Errors.invalidPassword.status = false);
    this.notAUser()
      ? (this.Errors.notAUser.status = true)
      : (this.Errors.notAUser.status = false);
    // console.log('password from db: ' + this.usersInfoListFromDB.Password);
    // console.log('user PRINTED INSIDE checkNDisplayErrors(): \n' + this.user);

    if (
      this.Errors.invalidPassword.status ||
      this.Errors.invalidUsername.status
      // || this.Errors.notAUser
    )
      return true;
    else return false;
  }

  notAUser(): Boolean {
    var isAUser: Boolean = false;
    if (this.usersInfoListFromDB != null) {
      for (var i = 0; i < Object.keys(this.usersInfoListFromDB).length; i++) {
        if (this.user.Username == this.usersInfoListFromDB[i].Username) {
          isAUser = true;
          return isAUser;
        }
      }
      return isAUser; //returned isUser = false, because no match was found in the list.
    } else return false;
  }
}
