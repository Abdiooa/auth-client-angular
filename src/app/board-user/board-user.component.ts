import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content: string = ''; // Define type and initialize

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe({
      next: (data: any) => {
        console.log(data);
        this.content = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        if (err.error && typeof err.error === 'string') { // Check if err.error is a string
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }
}
