import { Component } from '@angular/core';

@Component({
  selector: 'app-mymap',
  standalone: true,
  imports: [],
  templateUrl: './mymap.component.html',
  styleUrl: './mymap.component.css'
})
export class MymapComponent {

  myMap = new Map([
    ["firstName", "Angular"],
    ["lastName", "Framework"],
  ]);

}
