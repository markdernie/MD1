import { Component, Input } from '@angular/core';
import { Transaction } from '../../model/transaction'
import { FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatCardModule,MatButtonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

  @Input() transaction: Transaction = new Transaction()
  transactionform?: any
  baseurl: string = 'http://localhost:4200/api/'

  constructor(private formsbuilder: FormBuilder,private http: HttpClient ) { }

  ngOnInit(): void {
    console.log('transaction.component.ngOnInit')
    this.transactionform = this.formsbuilder.group(this.transaction)
  }

  update(form:any){
    console.log('Running update on transaction.component')
    this.http.put<any>(this.baseurl + '?file=' + form.value.id, JSON.stringify(form.value))
    .subscribe((data) => {
      console.log('transaction.component.UPDATE return:',data)
      return data
    })
  }

}
