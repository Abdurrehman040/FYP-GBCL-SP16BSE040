import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';





// =============================================My imports below
// Angular n other imports
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Homepage imports
import { AboutusComponent } from './gbcl-homepage/aboutus/aboutus.component';
import { SignupFormComponent } from './gbcl-homepage/signup-form/signup-form.component';
import { GBCLHomepageComponent } from './gbcl-homepage/gbcl-homepage.component';
import { HomepageNavSearchComponent } from './gbcl-homepage/homepage-nav-search/homepage-nav-search.component';

// Admin imports
import { AdminComponent } from './admin/admin.component';
import { ManageUniversitiesComponent } from './admin/manage-universities/manage-universities.component';
import { JoinRequestsComponent } from './admin/join-requests/join-requests.component';
// import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

// Student imports
import { STUDENTComponent } from './student/student.component';
import { SlabDashboardComponent } from './student/slab-dashboard/slab-dashboard.component';
import { CpaComponent } from './student/slab-dashboard/cpa/cpa.component';
import { LeaderboardComponent } from './student/slab-dashboard/leaderboard/leaderboard.component';
import { ChallengesComponent } from './student/slab-dashboard/challenges/challenges.component';
import { SsettingsComponent } from './student/ssettings/ssettings.component';
import { RivalsComponent } from './student/slab-dashboard/rivals/rivals.component';

// Teacher imports
import { TEACHERComponent } from './teacher/teacher.component';
import { TlabDashboardComponent } from './teacher/tlab-dashboard/tlab-dashboard.component';

// University imports
import { UNIVERSITYComponent } from './university/university.component';

// Misc imports
import { Error404Component } from './MISC/error404/error404.component';
// import { ManageeChallengesComponent } from './teacher/tlab-dashboard/managee-challenges/managee-challenges.component';
// import { ManageeLabtasksComponent } from './teacher/tlab-dashboard/managee-labtasks/managee-labtasks.component';
import { TeachersettingsComponent } from './TEACHER/tsettings/tsettings.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManageLabtasksComponent } from './teacher/tlab-dashboard/manage-labtasks/manage-labtasks.component';
import { ManageChallengesComponent } from './teacher/tlab-dashboard/manage-challenges/manage-challenges.component';
import { ViewLeaderboardComponent } from './teacher/tlab-dashboard/view-leaderboard/view-leaderboard.component';
import { RouterModule } from '@angular/router';
import { UnimanageJoinrequestsComponent } from './university/unimanage-joinrequests/unimanage-joinrequests.component';
import { GithubcodeforformvalidationComponent } from './misc/concepts/githubcodeforformvalidation/githubcodeforformvalidation.component';
import { TestConceptsComponent } from './misc/concepts/test-concepts/test-concepts.component';
import { UnimanageMembersComponent } from './university/unimanage-members/unimanage-members.component';
import { UnimanageLabsComponent } from './university/unimanage-labs/unimanage-labs.component';
import { ManageStudentsComponent } from './teacher/tlab-dashboard/manage-students/manage-students.component';
import { EvaluateStudentsComponent } from './teacher/tlab-dashboard/evaluate-students/evaluate-students.component';
// import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,

    HomepageNavSearchComponent,
    AboutusComponent,
    SignupFormComponent,
    GBCLHomepageComponent,

    AdminComponent,
    ManageUniversitiesComponent,
    JoinRequestsComponent,

    STUDENTComponent,
    SlabDashboardComponent,
    CpaComponent,
    LeaderboardComponent,
    ChallengesComponent,

    TEACHERComponent,

    UNIVERSITYComponent,

    Error404Component,

    SsettingsComponent,

    RivalsComponent,

    TlabDashboardComponent,

    // ManageeChallengesComponent,
    TeachersettingsComponent,

    ManageLabtasksComponent,

    ManageChallengesComponent,

    ViewLeaderboardComponent,

    UnimanageJoinrequestsComponent,

    GithubcodeforformvalidationComponent,

    TestConceptsComponent,

    UnimanageMembersComponent,

    UnimanageLabsComponent,

    ManageStudentsComponent,

    EvaluateStudentsComponent,

    // AdminDashboardComponent
    // ManageeLabtasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
