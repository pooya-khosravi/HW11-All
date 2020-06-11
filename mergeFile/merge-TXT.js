const fs = require("fs");

//------Constructors------
function nameObject(nameID, name) //Create Object Of Name File.
{
    this.userID = nameID;
    this.userName = name; 
}

function numberObject(numberID, number) //Create Object Of Number File.
{
    this.phoneID = numberID;
    this.phoneNumber = number;    
}

/**
 * 1- read name and number file and create object of both them (first name / second number).
 * 2- create Sentence and write in file.
 */
fs.readFile("names.txt", "utf8", function (err1, nameData) //first read name file.
{
    if(err1)
    {
        console.log(err1);
    }
    else
    {
        let nameArr = createObject(nameData, nameObject);
        console.log(nameArr);
        
        fs.readFile("numbers.txt", "utf8", function (err2, numberData) //second read number file.
        {
            if(err2)
            {
                console.log(err2);
            }
            else
            {
                let numberArr = createObject(numberData, numberObject);
                console.log(numberArr);
                
                //----------Ready sentence----------
                let isNumber = "'s phone number is ";
                let areNumber = "'s phone numbers are ";
                let noNumber = " hasn't any number ";

                for(let i=0; i<nameArr.length; i++) // loop for check userID whit phoneID and merge data
                {
                    let isMore = 0;//counter for select Appropriate sentence.
                    let phoneText = "";// for plus numbers if any body has more number
                    for(let j=0; j<numberArr.length; j++)
                    {
                        if(nameArr[i].userID === numberArr[j].phoneID)//if id === id plus phone number.
                        {
                            isMore ++;
                            if(isMore > 1)
                            {
                                phoneText = phoneText+", ";
                            }
                            phoneText = phoneText + numberArr[j].phoneNumber;
                        }
                    }

                    let mySentence = "";// last sentence 
                    if(isMore === 0)// check if for select Appropriate sentence.
                    {
                        mySentence = nameArr[i].userName + noNumber+"\n";
                    }
                    else if(isMore === 1)
                    {
                        mySentence = nameArr[i].userName + isNumber + phoneText+"\n";
                    }
                    else if(isMore > 1)
                    {
                        mySentence = nameArr[i].userName + areNumber + phoneText+"\n";
                    }

                    // append last sentence in merged file.
                    fs.appendFile("mergedFiles.txt", mySentence, function (err3) {
                        
                        if(err3)
                        {
                            console.log(err3);
                        }
                    })
                }
            }
        })
    }
});

/**
 * this method will:
 * - first: create Array of fileContent(this is string).
 * - second: create object of same array.  
 */
function createObject(fileContent, thisConstructor) 
{
    let arr = ( fileContent.split("\r\n") );//Separate from whiteSpace and nextLine  and create array.
    
    for(let i=0; i<arr.length; i++)
    {
        arr[i] = arr[i].split("-");//Separate at any index in array from dash.
        
        arr[i] = new thisConstructor(arr[i][0], arr[i][1]);//create obj of same index.
    }

    return arr;
}