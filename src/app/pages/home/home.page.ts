import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [RouterOutlet],
})
export class HomePage {}
