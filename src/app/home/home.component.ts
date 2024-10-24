import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../user';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  home!: boolean
  error!: any
  modifiedUsers!: User[];
  users!: User[];
  searchInput = '';
  hasToken!: boolean;

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    // this.service.getAll().subscribe((res: any) => {
    //   if(!res.hasOwnProperty('status')) {
        this.users = [
          {
            id: "123",
            firstName: "Sruthi",
            lastName: "Ramachandran",
            age: 23,
            emailId: "mailtosruthiramachandran@gmail.com",
            password: "Sruthi",
            address: "address line 1",
            pinCode: "641602",
            state: "Tamilnadu"
        }
        
        ]
        this.modifiedUsers = this.users;
        this.home = true;
      // }
    // }, (err: any) => {
    //   this.home = false;
    //   this.error = err.error;
    // }); 
  }

  filterWithSearch() {
    this.modifiedUsers = this.users.filter((user) => {
      user.name = `${user.firstName} ${user.lastName}`;
      user.nameWithoutSpace = `${user.firstName}${user.lastName}`;
      return (user.firstName.toLowerCase().indexOf(this.searchInput.toLowerCase()) === 0 || user.emailId.toLowerCase().indexOf(this.searchInput.toLowerCase()) === 0 || user.lastName.toLowerCase().indexOf(this.searchInput.toLowerCase()) === 0 || user.name.toLowerCase().indexOf(this.searchInput.toLowerCase()) === 0 || user.nameWithoutSpace.toLowerCase().indexOf(this.searchInput.toLowerCase()) === 0 );
  });
  }

  openDialogue(id: string|undefined) {
    // const matRef = this.dialog.open(DeleteComponent, {
    //   width: 'auto',
    //   data: id});
    // matRef.afterClosed().subscribe((res) => {
    //   this.service.getAll().subscribe((res: any) => {
    //     if(!res.hasOwnProperty('status')) {
    //       this.users = <User[]>res;
    //       this.modifiedUsers = this.users;
    //     }
    //   }); 
    // });
   
  }
  editComponent() {
    // this.router.navigate(['edit']);
  }

  display(id: string|undefined) {
  //   console.log(id);
  //   this.dialog.open(DisplayComponent, {
  //     width: 'auto',
  //     data: id
  //   })

  }

}