import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-asynch',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './asynch.component.html',
  styleUrl: './asynch.component.css'
})
export class AsynchComponent {

  example1() {

    console.log('example 1')
    console.log("First");

    setTimeout(() => {
      console.log("Second");
    }, 0);

    console.log("Third");
  }

  // callbacks() {
  //   console.log("Start");

    // function asyncTask(callback) {
    //   setTimeout(() => {
    //     console.log("Async task completed");
    //     callback();
    //   }, 2000);
    // }

  //   asyncTask(() => {
  //     console.log("Task finished");
  //   });

  //   console.log("End");

  // }

  // promises() {
  //   console.log("Start");

  //   function asyncTask(callback) {
  //     setTimeout(() => {
  //       console.log("Async task completed");
  //       callback();
  //     }, 2000);
  //   }

  //   asyncTask(() => {
  //     console.log("Task finished");
  //   });

  //   console.log("End");

  // }

  // await() {
  //   console.log("Start");

  //   async function asyncTask() {
  //     await new Promise((resolve) => {
  //       setTimeout(() => {
  //         console.log("Async task completed");
  //         resolve();
  //       }, 2000);
  //     });

  //     console.log("Task finished");
  //   }

  //   asyncTask();

  //   console.log("End");

  // }

}
