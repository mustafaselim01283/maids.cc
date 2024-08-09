import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetUserDataService } from '../Services/get-user-data.service';
import { userDetails } from '../interfaces/interfaces';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{

  ngOnInit(): void {
    
    this.activatedRout.paramMap.subscribe((map)=>{
      this.userID=+map.get("id")!

      this.getUserData(this.userID)
    })

    

  }

  loader:boolean=false
  userID!:number
  user!:userDetails

  constructor(private activatedRout:ActivatedRoute, private userService:GetUserDataService){}

  getUserData(id:number){

    this.userService.GetUser(id).subscribe((data)=>{
      this.user=data
      this.loader=true
      
    })
  }

}
