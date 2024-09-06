import { Component, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../../model/transaction'
import { TransactionComponent } from "../transaction/transaction.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule, TransactionComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {


  jsonarray: Array<Transaction> = []

  working: boolean = false
  error: boolean = false;
  baseurl: string = 'http://localhost:4200/api/'
  @Output() count: number = 0

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.getall()
  }

  getall() {
    console.log('getall()')
    this.error = false
    
    this.jsonarray = []

    this.http.get<any>(this.baseurl + '?file=index.dat&action=all')
      .subscribe({
        next: (result: any) => {
         
          let array = []
          for (const item of result) {
            array.push(JSON.parse(item))
          }
          
          
          for (const item of array) {
            this.jsonarray.push(item)
          }
          console.log('SUCCESS from get all:',array)
          
        },
        error: (err: any) => {
          console.error('ERROR from:',this.baseurl)
          this.error = true
          this.working = false
        },
        complete: () => {
          this.working = false
        }
      });
  }

}
