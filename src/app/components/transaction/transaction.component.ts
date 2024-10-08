import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../../model/transaction'
import { FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { HttpClient } from '@angular/common/http';
import { MatDatepickerModule} from '@angular/material/datepicker'
import { RelativeTimePipe } from '../../pipes/relative-time.pipe'
import { MarkdownToHtmlPipe } from '../../pipes/markdown-to-html.pipe'
import { MatDividerModule} from '@angular/material/divider'
//import { remark } from 'remark';
//import { } from 'remark-emoji';
import { AngularEmojisModule } from 'angular-emojis';
import { MatIconModule} from '@angular/material/icon'
import { UpperCaseFirstPipe } from '../../pipes/upper-case-first.pipe'

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    RelativeTimePipe,
    MarkdownToHtmlPipe,
    MatDividerModule,
    MatIconModule,
    UpperCaseFirstPipe
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

  @Input() transaction: Transaction = new Transaction()
  @Output() refresh = new EventEmitter<string>();
  //individual:Transaction={'id':'0','n01':888,'s01':'blank','s02':'blank'}
  blank:Transaction=new Transaction()
  transactionform?: any
  baseurl: string = 'http://localhost:4200/api/'
  //baseurl: string = 'http://localhost:8080/'
  error:boolean=false
  working:boolean=false
  someTimestamp:any=Date.now()
  fullrecord?:Transaction
  lastupdate:any={}
  markdownText:string='# Heading level 1'
  doc = 'Emojis in this text will be replaced: :dog::+1:';
  processor:any
  file:any
  md:boolean=false
  isShow = false;

  constructor(private formsbuilder: FormBuilder,private http: HttpClient ) { }

  ngOnInit(): void {
    console.log('transaction.component.ngOnInit:',this.transaction.id)
    this.get(this.transaction.id)
    
    this.transactionform = this.formsbuilder.group(new Transaction())
    
  }

  update(form:any){
    console.log('Running update on transaction.component')
    this.http.put<any>(this.baseurl + '?file=' + form.value.id, JSON.stringify(form.value))
    .subscribe((data) => {
      console.log('transaction.component.UPDATE return:',data)
      this.refresh.emit('value')
      return data
      
    })
  }
  get(id:any){
    console.log('Running update on transaction.component')
    

    this.http.get<any>(this.baseurl + '?file='+id+'&action=cv')
      .subscribe({
        next: (result: any) => {
         
          
          
          console.log('get from the backend:',result.lastupdate)
         
          
          this.transactionform = this.formsbuilder.group(result)
          
         
          
          
          
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

  updatemd(){
    if (this.md)
        this.md=false
    else
     this.md=true
  }

 

  toggleDisplay() {
    this.isShow = !this.isShow;
  }



}
