import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy{
data="Tràn Quóc Numberone";
  constructor(
  ) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {

  }

}
