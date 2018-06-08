import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {
  public salas;
  constructor() { }

  ngOnInit() {
    this.salas = [['empty','empty'],['empty','empty'],['empty','empty'],['empty','empty'],['empty','empty'],['empty','empty']]
  }

}
