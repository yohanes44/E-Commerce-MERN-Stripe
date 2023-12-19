








// isValid("({{{{}}}))");



// var isValid = function(s) {

//     let params = s;
//     let containers = {
//         "(": ")",
//         "{": "}",
//         "[": "]",
//     }

//     var openers = params.split("").filter( (pa) => {
//         if(containers.hasOwnProperty(pa)){
//             return true;
//         }
//     } )
    
//     // console.log("openers Length == "+ openers.length);

//     var keyStorer = {
//         "(": 0,
//         "{": 0,
//         "[": 0,
//     };

           
//            var counter = 0;
//            // isValid("({{{{}}}))");


//            while(counter <= params.length -1){

               
//                let current = params[counter];
//                let partner = containers[current];
//                 // let nextCont = containers[params[i + 1]];
//                 console.log({current, partner, counter, paramLength: params.length -1, paramsCounter: params[counter]});
                
//                 if(!containers.hasOwnProperty(current)){

//                     console.log({ keyStorerIndex: keyStorer[params[counter]] });
//                     console.log({ keyStorerVal: keyStorer["{"] });

//                     if( params[counter] == ')'){
//                         keyStorer["("] = keyStorer["("] - 1;
//                     }

//                     if( params[counter] == '}'){
//                         keyStorer["}"] = keyStorer["{"] - 1;
//                     }

//                     if( params[counter] == ']'){
//                         keyStorer["]"] = keyStorer["["] - 1;

//                     }

//                       console.log("key or not == Not Key");
//                       console.log("containers[params[counter - 1]] == " + containers[params[counter - 1]]);

                   
//                         if( (containers.hasOwnProperty(params[counter - 1])) ){
//                             if(current != containers[params[counter - 1]]){
//                                 console.log("final == " + false);
        
//                                return false;
//                             }
                            
//                         }

                        
//                         counter = counter + 1;
                     
//                 }else{

//                     if( params[counter] == '('){
//                         keyStorer["("] = keyStorer["("] + 1;
//                     }

//                     if( params[counter] == '{'){
//                         keyStorer["{"] = keyStorer["{"] + 1;
//                     }

//                     if( params[counter] == '['){
//                         keyStorer["["] = keyStorer["["] + 1;

//                     }


//                     // keyStorer[params[counter]] = keyStorer[params[counter]] + 1;

//                     console.log("key or not == Key");
//                     console.log("test Key == ")
//                     console.log("counter == "+ counter)
//                     // console.log("params[counter] == "+ params[counter])

                    
//                     console.log("params[counter + 1] == " + params[counter + 1]);
//                     console.log("containers[params[counter]] == " + containers[params[counter]])
//                     console.log((params[counter + 1]) == (containers[params[counter]]));

                   
//                     if( ((params[counter + 1]) != (containers[params[counter]]))  && (!containers.hasOwnProperty(params[counter + 1])) ){
                
//                         console.log("final == " + false);

//                         return false;
//                     }

//                     if( (containers.hasOwnProperty(params[counter - 1])) ){

//                     }


//                     console.log("Yesirrr");

//                     counter = counter + 1;
//                 }
                
                
//            }

//         //    for(let k in keyStorer){
//         //     console.log("k == "+ k);
//         //     console.log("keyStorer[k] == "+ keyStorer[k]);

//         //       if(keyStorer[k] > 0){
//         //         return false;
//         //       }
//         //    }

//         if( keyStorer["("] > 0 ){

//             console.log("false");
//             return false;
//         }

//         if( keyStorer["{"] > 0 ){
//             console.log("false");
//             return false;
//         }

//         if( keyStorer["["] > 0 ){
//             console.log("false");
//             return false;
//         }
//            console.log("final == " + true);
//            return true;  
          
// }




var isValid = function(s) {

    let params = s;
    let containers = {
        "(": ")",
        "{": "}",
        "[": "]",
    }

  

    let arr =  params.split("");
    console.log(arr);
    console.log(arr.length);

    
       if(arr.length < 2){
          return true;
       }

    let first = arr.shift();
    let firstPartner = containers[first];

    // let last = arr.pop();
    // let lastPartner =  containers[last];
    
    
   

        var tobe = null
        let firstFind = arr.map((ar, index) => {
            if(ar == firstPartner){
                // console.log(index);
                tobe = index
                return index;
            }
        });

        // console.log("tobe"+ tobe);

        if(tobe){
            arr.splice(tobe, 1);
            return isValid(arr.join(""));
        }else{
            return false
        }

       
}





console.log(isValid("()"));
console.log(isValid("()[]{}"));
console.log(isValid("(]"));



// 
console.log(isValid("{[]}"));


console.log(isValid("({{{{}}}))"));




