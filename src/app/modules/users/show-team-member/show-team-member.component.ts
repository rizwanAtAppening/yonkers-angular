import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-team-member',
  templateUrl: './show-team-member.component.html',
  styleUrls: ['./show-team-member.component.css']
})
export class ShowTeamMemberComponent implements OnInit {
  public staffMemberList = []
  constructor(
    private router:Router,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.getStaffMember()
  }

  getStaffMember() {
    
    this.userService.getStaff().subscribe(data => {
      this.staffMemberList = data.response;
    })
  }

  activeInactiveStaffMember(id,status) {
    
    const data ={
      id:id,
      status:status
    }
    this.userService.activeInactiveStaff(data).subscribe(data => {
      this.getStaffMember()
    })
  }

  navigateByUrl(id){
    this.router.navigate(['/dashboard/add-team-member'],{queryParams:{id:id}})
  }

}
