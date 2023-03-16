import { addDigit, addOperator, calculate } from './../action/calc.action';
import { Action } from '@ngrx/store';
import { createAction } from '@ngrx/store';
// import { increment,decrement } from './../action/counter.action';
import { state } from '@angular/animations';
import {CalcState } from './../state/calc.state';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { count, Observable } from 'rxjs';
import * as CalcAction from "../action/calc.action"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  calc$ = new Observable<CalcState>
  constructor(private store:Store<{calc:CalcState}>){
    this.calc$ = this.store.select('calc');
  }
  addDigit(digit:string){
    this.store.dispatch(CalcAction.addDigit({digit:digit}));
  }
  addOperator(operator:string){
    this.store.dispatch(CalcAction.addOperator({operator:operator}));
  }
  calculate(){
    this.store.dispatch(CalcAction.calculate());
  }
  reset (){
    this.store.dispatch(CalcAction.reset());
  }
  title = 'asset';
}
