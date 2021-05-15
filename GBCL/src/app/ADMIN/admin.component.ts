import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../Services/users.service';
import { UniversityModel } from '../MODELS/universitymodel.model';
import { Usersmodel } from '../MODELS/usersmodel.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.AllUsersRecievedFromDB = this.usersService.RecieveAllUsersFromDB();
    setTimeout(
      () => {
      this.extractJOINRequestsFromUniversitiesData();
    }, 700);
  }

  AllUsersRecievedFromDB: Usersmodel[] = [];
  JOINRequestsUniversitiesData: Usersmodel[] = [];


  extractJOINRequestsFromUniversitiesData() {
    for (var i = 0; i < this.AllUsersRecievedFromDB.length; i++) {
      if (this.AllUsersRecievedFromDB[i].UserType == 'university'
        &&
        this.AllUsersRecievedFromDB[i].UserzAccessStatus == 'Pending'
      ) {
        this.JOINRequestsUniversitiesData.push(this.AllUsersRecievedFromDB[i]);
      }
    }

  }

  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

}
