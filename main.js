const dateInputRef = document.querySelector("#date-input");
const showBtn = document.querySelector("#showbtn");
const resultRef = document.querySelector("#result");


showBtn.addEventListener("click" , clickHandler);

function clickHandler() {
   var bdayStr = dateInputRef.value;
  
   if(bdayStr !== ''){
    var listOfDates = bdayStr.split('-');
   
    var date = {
        day: Number(listOfDates[2]),
        month: Number(listOfDates[1]),
        year: Number(listOfDates[0])
    };
    var isPalindrome = checkPalindromeForAllDateFormats(date);
    
    if(isPalindrome){
        resultRef.innerText = ' Yay! your birthday is a palindrome!!'
    }

    else {
        var [ctr , nextDate] = getNextPalindromeDate(date);
        resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days!! ` 
    }
   
    }

}


function reverseStr(str){
    var listOfChars = str.split("");
    var reversedListOfChar = listOfChars.reverse();
    var reversedStr = reversedListOfChar.join("");
    return reversedStr;
}


function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse
     
}

function convertDateToStr(date){

    var dateStr = { day: '', month: '', year:''};
    if(date.day < 10){
        dateStr.day = '0' + date.day;
    }
    else {
        dateStr.day = date.day.toString();
    }
    
    if(date.month < 10){
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
     return dateStr;
}

function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);
    
    var ddmmyyyy = dateStr.day + dateStr.month+dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2); + dateStr.month + dateStr.day;

 return [ddmmyy, mmddyyyy, ddmmyyyy, yyyymmdd, mmddyy, yymmdd];

}
 
function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);

    var flag = false;

    for (var i=0; i < listOfPalindromes.length; i++){
        if(isPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }
    }
     return flag;
}

 function isLeapYear(year){
  if(year % 400 === 0){
    return true;
  }
  if(year % 100 === 0){
    return false;
  }
  if(year % 4 === 0 ){
    return true;
  }
  return false;

 }




function getNextDaate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMoonth = [31, 28, 31, 30, 31,30, 31, 31, 30, 31 ,30 ,31];

    if(month === 2){ //check for ferbruary
        if(isLeapYear(year)){
            if(day>29){
                day = 1;
                month++;
            }
        }
           // check for other months
    }    
     else {
        // check if the day exceeds the max days in month
        if(day > daysInMoonth[month-1]){
            day = 1;
            month++;
        }
     }
 
// increment the year if month is greater than 12 
 if(month > 12){
    month = 1;
    year++;
 }
  
return {
    day: day,
    month: month,
    year: year
  };
}

function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDaate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }

        nextDate = getNextDaate(nextDate);

    }

    return [ctr, nextDate];

 }



//  function getPreviousPalindromeDate(date){
//     var ctr = 0;
//     var previousdate = 
//  }



