import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/public/auth/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  constructor(public _authService: AuthService) {}

  ngOnInit(): void {}
}
