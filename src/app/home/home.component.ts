import { Component, OnInit } from '@angular/core';
import { GetUserDataService } from '../Services/get-user-data.service';
import { user, userDetails, usersData } from '../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { GetData } from '../user.action';
import { selectUsersByPage } from '../user.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    users: user[] = [];
    currentPage: number = 1;
    totalPages: number=2;

    searchID:number=0
    loader:boolean=false;
    userData!:userDetails | undefined
  
    constructor(private userService: GetUserDataService , private store:Store<AppState>) { }
  
    ngOnInit(){
      this.loadPage(this.currentPage);
    }
  
    loadUsers(page: number) {
      this.userService.getAllUsers(page).subscribe((data) => {
        this.loader=true;
        let users=data.data
        this.store.dispatch(GetData({ users, page }));
        this.users = users; 
      });
    }
  
    loadPage(page: number) {
      
      this.store.select(selectUsersByPage(page)).subscribe((users) => {
        if (users.length) {
          this.users = users; 
          this.loader=true;
        } else {
          this.loadUsers(page); 
        }
      });
    }
  
    loadNextPage() {
      this.currentPage+=1
      this.loadPage(this.currentPage);
    }
  
    loadPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage-=1
        this.loadPage(this.currentPage);
      }
    }
    // loadUsers(page: number) {
    //   this.userService.getAllUsers(page).subscribe(response => {
    //     this.users = response.data;
    //     this.store.dispatch(GetData({users:response.data,page}))
    //     this.totalPages = response.total_pages;
    //   });
    // }
  
    // onPageChange(page: number) {
    //   this.currentPage = page;
    //   this.loadUsers(this.currentPage);
    // }

    searchById(e:Event){

      e.preventDefault()

      this.searchID=+(e.target as HTMLInputElement).value
      if(this.searchID>0){
        this.userService.GetUser(this.searchID).subscribe({
          next:(data)=>{
            this.userData=data
          },
          error:()=>{
            this.userData=undefined
          }
        })
      }else{
        this.userData=undefined
      }
      
    }
}
