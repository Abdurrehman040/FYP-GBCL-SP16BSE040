import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UNIVERSITYComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }




  localStorageUsername = localStorage.getItem("UsersUsername");

  onLogout(){
    localStorage.clear();
    window.location.href="/";
  }

}
