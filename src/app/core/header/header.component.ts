import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  statusLog: boolean;

  constructor(private authService: AuthService,) { }

  ngOnInit() {
    this.authService.currentMessage.subscribe(value => {
      if(localStorage.getItem('logStatus')) {
        this.statusLog = true;
      } else {
        this.statusLog = value;
      }
      // this.firstName = localStorage.getItem('firstName');
      // this.lastName = localStorage.getItem('lastName');
    });

  }

}


// import { Component, OnInit, OnChanges, Input} from '@angular/core';
// import { AuthServiceService } from '../auth-service.service';
// import { Router } from "@angular/router";
// import { Store, select } from '@ngrx/store';
// import { AppState } from '../../store/state/app.states'
// import { LogOut } from '../../store/actions/user.actions';


// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css'],
// })
// export class HeaderComponent implements OnInit {

//   statusLog: boolean;
//   firstName: string;
//   lastName: string;

//   constructor(private authService: AuthServiceService,
//               private router: Router,
//               private store: Store<AppState> ) { }

//   ngOnInit() {

//     // // if(localStorage.getItem('logStatus')) {
//     // //   console.log('dddddddddddddddddddd')
//     //   this.firstName = localStorage.getItem('firstName');
//     //   this.lastName = localStorage.getItem('lastName');
//     //   this.statusLog = true;
//     // // };

//     this.authService.currentMessage.subscribe(value => {
//       if(localStorage.getItem('logStatus')) {
//         this.statusLog = true;
//       } else {
//         this.statusLog = value;
//       }
//       this.firstName = localStorage.getItem('firstName');
//       this.lastName = localStorage.getItem('lastName');
//     });
//   }

//   logOut(): void {
//     this.store.dispatch(new LogOut());

//   }
// }
