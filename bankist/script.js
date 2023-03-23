'use strict';
const box=document.querySelector('.box')
const totaldisplay=document.querySelector('.totalvalue')
const incomingdisplay = document.querySelector('.in')
const outingdisplay = document.querySelector('.out')
const interestdisplay = document.querySelector('.interest')
const arrowbutton = document.querySelector('.arrowbutton')
const userinput= document.querySelector('.userinput')
const pininput= document.querySelector('.pininput')
const heading = document.querySelector('.heading')
const fullpagehide = document.querySelector('main')
const btntransferto = document.querySelector('.btntransferto')
const transferuserinput = document.querySelector('.transferuserinput')
const transferamountinput = document.querySelector('.transferamountinput')
const btncloseaccount = document.querySelector('.btncloseaccount')
const usercloseinput = document.querySelector('.usercloseinput')
const pincloseinput = document.querySelector('.pincloseinput')
const amountrequestinput = document.querySelector('.amountrequestinput')
const btnrequestto = document.querySelector('.btnrequestto')
const btnsort = document.querySelector('.btnsort')
const todaydate = document.querySelector('.todaydate')
const timeinput = document.querySelector('.timeinput')
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [
      "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
    ],
    currency: "AUD",
    locale: "en-AU",
  };
  const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
      "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
    ],
    currency: "IND",
    locale: "ta-IN",
  };
  const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    movementsDates: [
      "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
    ],
  currency: "PTE",
  locale: "pt-PT",
  };
  const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    movementsDates: [
      "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
  };
  const accounts = [account1, account2, account3, account4];
  accounts.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(' ').map(letter=>letter[0]).join('')
  })
  //displaydates
  const formatdate = function(accdate,sec,locale,object){
    
    const displaydate= new Date(accdate)
    const calcnoofdays = function(date1,date2){
      if(sec != 10){
      return  Number(Math.round(Math.abs((date1-date2)/(1000*60*60*24))))
      }
      else{
        return -10
      }
    }
    let noofdays=calcnoofdays(Date.now(),Number(displaydate))
    if(noofdays === -10){
      return new Intl.DateTimeFormat(locale,object).format(displaydate)
    }
    if(noofdays === 0){
      return `Today`
    }
    if(noofdays === 1){
      return `Yesterday`
    }
    if(noofdays <= 7){
        return `${noofdays} days ago`
    }
    if(noofdays > 7){
    return new Intl.DateTimeFormat(locale).format(displaydate)
    }
  }
 //insertmovements
  const insertmovement =function(arrayvalue,sortcheck){
          box.innerHTML=``;  
          const sorted = (sortcheck) ? arrayvalue.movements.slice().sort((a,b)=>{
          if(a>b) return 1
          if(b>a) return -1}) : arrayvalue.movements
          sorted.forEach(function(mov,i,arr){          
           const type= (mov>0)?'deposit':'withdrawal';
           const html=`
           <div class="m1">
           <div class="d1 ${type}">${i+1} ${type.toUpperCase()}</div>
           <div class="d2">${formatdate(arrayvalue.movementsDates[i],0,arrayvalue.locale)}</div>
           <div class="d3">${movin(mov)}</div>
           </div>`  
           box.insertAdjacentHTML('afterbegin',html)
                 })

         }
let totalvalue //balance amount
const displayvalue = function(value){
totalvalue=value.reduce((acc,mov)=>acc+mov,0)
totaldisplay.textContent=`${movin(totalvalue)}`
}
const displaysummary= function(arraytodisplay,inrate){
const incomingamount =arraytodisplay.filter(mov =>  mov>0).reduce((acc,mov)=>acc+mov);
const outingamount =arraytodisplay.filter(mov =>  mov<0).reduce((acc,mov)=>acc+mov,0);
const interestamount =arraytodisplay.filter(mov=>mov>0).map(mov=>(mov*inrate)/100).filter((mov,i,arr)=> mov>=1).reduce((acc,mov)=>acc+mov,0)
incomingdisplay.textContent=`${movin(incomingamount)}`
console.log(movin(incomingamount));
outingdisplay.textContent=`${movin(Math.abs(outingamount))}`
interestdisplay.textContent=interestamount.toFixed(2)
}
const updateUI = function(acc){
  insertmovement(acc)
  displaysummary(acc.movements,acc.interestRate)
  displayvalue(acc.movements)
}
let currentaccount  //currently login account
let current          // currently login account user name
//display the movements
arrowbutton.addEventListener('click',function(e){
 current=userinput.value
 currentaccount=accounts.find(acc=>userinput.value === acc.username)
 let index=currentaccount.owner.indexOf('')
 if(currentaccount?.pin === Number(pininput.value)){
  detailformat ={
   style : 'currency',
  currency : currentaccount.currency,
}
     userinput.value=""
     pininput.value=""
     heading.textContent=`welcome back, ${currentaccount.owner.slice(0,index)}`
     fullpagehide.style.opacity=1
     clearInterval(timer)
     settimer();
     updateUI(currentaccount)
     todaydate.textContent  = formatdate(Date.now(),10,currentaccount.locale,optin)
 }
 
})
//formating the currency
let detailformat; 
const movin = function(mov1){
  console.log(currentaccount.locale);
  return new Intl.NumberFormat(currentaccount.locale,detailformat).format(mov1)
}
//transfer to
btntransferto.addEventListener('click',function(){
  clearInterval(timer)
  settimer()
  const currentaccount=accounts.find(acc=>current === acc.username)
  accounts.forEach(function(acc){
    if(transferuserinput.value===acc.username){
       if(transferamountinput.value > 0 && transferamountinput.value < totalvalue){
        if(currentaccount.username !== transferuserinput.value){
        currentaccount.movements.push(transferamountinput.value*(-1))
        currentaccount.movementsDates.push(new Date(Date.now()).toISOString())
        console.log(currentaccount);
        updateUI(currentaccount)
        }
        else{
          alert('Invalid transfer')
        }
       }
       else{
        alert('Insufficient amount')
       }
       acc.movements.push(Number(transferamountinput.value)) 
    }   
  })
  transferuserinput.value=""
  transferamountinput.value=""
  const condition = accounts.every(mov=>{
    return mov.username == transferuserinput.value })
  if(condition){
    alert('User doesn`t exist')
  }
  
})
// close account
btncloseaccount.addEventListener('click',function(){
    clearInterval(timer)
    settimer()
      if(usercloseinput.value==currentaccount.username  && pincloseinput.value==currentaccount.pin){
          const index = accounts.findIndex(acc => usercloseinput.value == currentaccount.username)
          accounts.splice(index,1)
          fullpagehide.style.opacity=0
          heading.textContent="Log in to get started"
          usercloseinput.value=pincloseinput.value=""
      }else{
        alert('Invalid username or pin')
      }
    usercloseinput.value=""
    pincloseinput.value=""
})
// request loan
btnrequestto.addEventListener('click',function(){
  clearInterval(timer)
  settimer()
  let amount = amountrequestinput.value
  const displaydate = new Date(Date.now())
  if(amount>0 && currentaccount.movements.some(mov=> mov >= amount*0.1)){ 
    setTimeout(()=>{
     currentaccount.movementsDates.push(displaydate)
     currentaccount.movements.push(Number(amount))
     updateUI(currentaccount)},3000)
  }
  else{
    alert('Loan amount is not applicable')
  }
  amountrequestinput.value=""
})
// sort button working function 
let sortbool = false
btnsort.addEventListener('click',function(){ 
  insertmovement(currentaccount,!(sortbool))
  sortbool = !sortbool 
})
//display today's  date
const optin ={
  day : "numeric",
  month : "long",
  year : "numeric",
  hour : "numeric",
  minute : "numeric",
  weekday : "long",
}
//timer
let timer;
const settimer= function(){
let time=120
const tick = function(){
 let min =  String(Math.trunc(time/60))
 let sec =  String(Math.trunc(time%60))
  timeinput.textContent=`${min}`.padStart(2,0)+` : `+`${sec}`.padStart(2,0)
  if(time === 0){
    fullpagehide.style.opacity=0
    currentaccount=null
    current=null
    heading.textContent="Log in to get started"
    usercloseinput.value=pincloseinput.value=""
    clearInterval(timer)
  }
  time--
}
tick()
 timer = setInterval(()=>tick(),1000)
}