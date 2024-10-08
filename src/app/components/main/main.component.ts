import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatDivider} from '@angular/material/divider'
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../../model/transaction'
import { TransactionComponent } from "../transaction/transaction.component";
import { FormBuilder } from '@angular/forms';
import { MatProgressBar } from '@angular/material/progress-bar'
///import { Transaction  } from '../../model/transaction'

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule, TransactionComponent,MatDivider,MatProgressBar],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {


  //jsonarray: Array<Transaction> = []
  jsonarray: Array<Transaction> = []
  finalarray:Array<Transaction> = []

  working: boolean = false
  error: boolean = false;
  baseurl: string = 'http://localhost:4200/api/'
  @Output() count: number = 0
  

  @Output() Saved = new EventEmitter<void>();


  constructor(private formsbuilder: FormBuilder,private http: HttpClient) { }

  


  ngOnInit(): void {
    this.getall()
  }

  getall() {
    console.log('getall()')
    this.error = false
    this.working = true
    
    this.jsonarray = []
    this.finalarray= []

    this.http.get<any>(this.baseurl + '?file=index.dat&action=all')
      .subscribe({
        next: (result: any) => {
         
          
          //let newarray:Array<Transaction>=[]
          console.log('this.http.get:',result)
         
          for (const item of result) {
            
            //newarray.push(item)
            this.finalarray.push(item)
            //console.log('newarray.push:',item)
          }

          
          
          //console.log('this.finalarray:',this.finalarray)
          
          
          for (const item of this.finalarray) {
            this.jsonarray.push(item)
          }
          
          
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

  createnew(){
    console.log('clicked on create new')
    let newtransaction= new Transaction()
    let newtransactionform = this.formsbuilder.group(newtransaction)
    console.log('new tranaction id',newtransaction.id)
    this.http.put<any>(this.baseurl + '?file=' + newtransactionform.value.id, JSON.stringify(newtransactionform.value))
    .subscribe((data) => {
      console.log('transaction.component.createnew return:',data)
      return data
      this.Saved.emit();
    })

   
  }
  

}
