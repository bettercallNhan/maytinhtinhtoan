import { CalcState } from './../state/calc.state';
import { createReducer,on } from "@ngrx/store";
import * as Calculation from "../action/calc.action"
// import { increment,decrement,reset } from "src/action/counter.action";
const initialState : CalcState = {
  display : '0',
  current : '',
  previous : '',
  operator : '',
};

export const calReducer = createReducer(
  initialState,
  on(Calculation.addDigit,(state,{digit})=>{
    let temp = state.current + digit;

    return{...state,current:temp,display:temp}
  }),
  on (Calculation.addOperator,(state,{operator})=>{
    let temp = calculate(state.previous,state.operator,state.current);
    return {...state,previous:temp,display:temp,operator:operator,current :''}
  }),
  on (Calculation.calculate,(state)=>{
    let temp = calculate(state.previous,state.operator,state.current);
    return {...state,previous:temp,display:temp,cureent:"",operator:""}
  }),
  on (Calculation.reset,(state)=>{
    return {display:"0",current:"",previous:"",operator:""}
  }),
)



function calculate(previous:string,operator:string,current:string){
  if(!previous)
    return current;
  else if (!current)
    return previous;
  let result:number = 0 ;
  switch (operator) {
    case '+':
      result = parseFloat(previous) + parseFloat(current);
      break;
    case '-':
      result = parseFloat(previous) - parseFloat(current);
      break;
    case 'x':
      result = parseFloat(previous) * parseFloat(current);
      break;
    case ':':
      result = parseFloat(previous) / parseFloat(current);
      break;
    default:
      break;
  }
  let finalResult = result.toString().slice(0,9);
  if (finalResult == "NaN"){
    console.log("NaN");
    return "Syntax Error";
  }
  else if (finalResult == 'Infinity'){
    return "Math Error";
  }
  else{
    return finalResult;
  }
}
// export const _counterReducer = createReducer(initialState,
//   on(increment,state=> state+1),
//   on(decrement,state=> state-1),
//   on(reset,state => 0),
//   );

// export function counterReducer(state: any, action: any){
//   return _counterReducer(state,action);
// }
