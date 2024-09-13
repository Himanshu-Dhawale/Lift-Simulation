console.log("rendered");


let simulate = document.querySelector('.createLiftFloorButton');

let restart = document.querySelector('.goToFirstPage');



restart.addEventListener('click', hideSecondPage);


simulate.addEventListener('click', ()=> {

    
    let floorInputValue=document.querySelector('#floorNumber').value;
    let liftInputValue=document.querySelector('#liftNumber').value;

    
    if(floorInputValue=="" || liftInputValue==""){
        alert('please enter the value')
    }
    
    else if(floorInputValue < 0 || liftInputValue < 0){
        alert("Inputs can't be negative")
    }
    
    else if (window.innerWidth <= 500 && +liftInputValue > 4) {
        alert("This screen size can't have more than 4 lifts");
    }
    else if (window.innerWidth > 500 && window.innerWidth <= 768 && +liftInputValue > 5) {
        alert("This screen size can't have more than 5 lifts");
    }
    else if (window.innerWidth > 500 && window.innerWidth <= 1024 && +liftInputValue > 7) {
        alert("This screen size can't have more than 7 lifts");
    }
    else if (window.innerWidth > 500 && window.innerWidth <= 1440 && +liftInputValue > 11) {
        alert("This screen size can't have more than 11 lifts");
    }
    else if (window.innerWidth > 500 && window.innerWidth <= 2560 && +liftInputValue> 20) {
        alert("This screen size can't have more than 20 lifts");
    }


    else{
        document.querySelector('.firstPage').style.display = 'none';
        document.querySelector('.secondPage').style.display = 'block';
        
        makingFloors();
    }
});

function hideSecondPage() {
    document.querySelector('.secondPage').style.display = 'none';
    document.querySelector('.firstPage').style.display = 'flex';

    deletingFloors();

}


function makingFloors() {

    let floorInput = document.querySelector('#floorNumber').value;
    let liftInput = document.querySelector('#liftNumber').value;


    for (let i = floorInput; i > 0; i--) {
        
        let floordiv = document.createElement('div');
        floordiv.className = 'box';

        
        let buttonLift = document.createElement('div');
        buttonLift.className = 'buttonLift';

        
        let buttondiv1 = document.createElement('div');
        buttondiv1.className = 'button';

        let button1 = document.createElement("button");
        let text1 = document.createTextNode("Up");
        button1.className = "up";
        button1.setAttribute('id', `up${i}`);
        button1.appendChild(text1);


        let button2 = document.createElement("button");
        let text2 = document.createTextNode("Down");
        button2.className = "down";
        button2.setAttribute('id', `down${i}`);
        button2.appendChild(text2);
        if(i == 1){
            buttondiv1.appendChild(button2)
        }else if(i == floorInput){
            buttondiv1.appendChild(button1)
        }else{
            buttondiv1.appendChild(button1);
            buttondiv1.appendChild(button2);
        }


        buttonLift.appendChild(buttondiv1);

        floordiv.appendChild(buttonLift);


        let hrdiv = document.createElement('div');
        hrdiv.className = 'hrfloorName';

        let hr = document.createElement('hr');

        let spanFloorNo = document.createElement('span');
        spanFloorNo.innerText = `Floor ${i}`;

        hrdiv.appendChild(hr);

        hrdiv.appendChild(spanFloorNo);

        floordiv.appendChild(hrdiv);

        document.querySelector('.secondPage').appendChild(floordiv);
    }


    let mainLift = document.createElement('div');
    mainLift.className = 'mainLift';

    for (let j = 1; j <= liftInput; j++) {

        let liftdiv = document.createElement('div');
        liftdiv.className = 'lift';
        liftdiv.setAttribute('id', `lift${j}`);

        liftdiv.setAttribute('flag', `free`);

        let gates = document.createElement('div');
        gates.className = 'gates';
        gates.setAttribute('id', `gates`);

        let gate1 = document.createElement('div');
        gate1.className = 'gate1';
        
        gates.appendChild(gate1);

        let gate2 = document.createElement('div');
        gate2.className = 'gate2';
        
        gates.appendChild(gate2);

        liftdiv.appendChild(gates);

        mainLift.appendChild(liftdiv);
    }


    const mainbuttonlift = document.querySelectorAll('.buttonLift'); 

    const lastbox = mainbuttonlift[mainbuttonlift.length - 1];

    lastbox.appendChild(mainLift);

    let selectAllLift = document.querySelectorAll('.lift');
    
    let up = document.querySelectorAll('.up');

    let down = document.querySelectorAll('.down');

    let nUp = up.length;
    let prev = 0;

    let oldFloorValueArray=[];

    for(let i=0;i<selectAllLift.length;i++){
        oldFloorValueArray.push(1)
    }

    // up.forEach((e, i) => {
    //     e.addEventListener('click', () => {

    //         let floorValue = nUp - i;
    //         for (let i = 0; i < selectAllLift.length; i++) {
                
    //             if (selectAllLift[i].getAttribute('flag') === 'free') {
                    
    //                 selectAllLift[i].setAttribute('flag', 'busy');

    //                 moveLift(selectAllLift[i], floorValue,oldFloorValueArray[i]);
    //                 oldFloorValueArray[i]=floorValue;

    //                 break;
    //             }
    //         }
    //     })
    // })

    up.forEach((e, i) => {
        e.addEventListener('click', () => {
            let floorValue = nUp - i;
            for (let i = 0; i < selectAllLift.length; i++) {
                if (selectAllLift[i].getAttribute('flag') === 'free') {
                    selectAllLift[i].setAttribute('flag', 'busy');
                    moveLift(selectAllLift[i], floorValue, oldFloorValueArray[i]);
                    oldFloorValueArray[i] = floorValue;
                    break;
                }
            }
        })
    })
    

    down.forEach((e, i) => {
        e.addEventListener('click', () => {
            let floorValue = nUp - i;
            for (let i = 0; i < selectAllLift.length; i++) {
    
                if (selectAllLift[i].getAttribute('flag') === 'free') {
                    selectAllLift[i].setAttribute('flag', 'busy');
                    moveLift(selectAllLift[i], floorValue,oldFloorValueArray[i]);
                    oldFloorValueArray[i]=floorValue;
                    
                    break;
                }
            }
        })
    })
}




// function moveLift(liftno, floorNo,oldFloorValue) {

//     liftno.style.transform = `translateY(${-95 * (floorNo - 1)}px)`;

//     let prev= `${2 * Math.abs(floorNo - oldFloorValue)}s`
//     liftno.style.transitionDuration = prev;


//     setTimeout(() => {

//         gateopenclose(liftno);
//         setTimeout(() =>{
//             liftno.setAttribute('flag', 'free')
//         },5500);
//         console.log(liftno.getAttribute('flag'))
//     }, 2 * Math.abs(floorNo - oldFloorValue) * 1000)

// } 

function moveLift(liftno, floorNo, oldFloorValue) {
    // Adjust the translation calculation
    let translation = -95 * (floorNo - 1);
    liftno.style.transform = `translateY(${translation}px)`;

    let travelTime = `${2 * Math.abs(floorNo - oldFloorValue)}s`;
    liftno.style.transitionDuration = travelTime;

    setTimeout(() => {
        gateopenclose(liftno);
        setTimeout(() => {
            liftno.setAttribute('flag', 'free');
        }, 5500);
    }, 2 * Math.abs(floorNo - oldFloorValue) * 1000);
}



function gateopenclose(liftno) {
    let gates=liftno.firstChild; 
    let gate1 = document.querySelector('.gate1');
    let gate2 = document.querySelector('.gate2');
    let leftGate = gates.children[0]; // .gate1
    let rightGate = gates.children[1]; // .gate2


    setTimeout(() => {
//     <div class="gates" id="gates">
//         <div class="gate1"></div> gates.children[0]
//         <div class="gate2"></div>gates.children[1]
//     </div>
        // gates.children[0].style.width = '3px';
        // gates.children[1].style.width = '3px';
        leftGate.classList.add('left-door--animation');
        rightGate.classList.add('right-door--animation');
    }, 1000);

    setTimeout(() => {
        leftGate.classList.remove('left-door--animation');
        rightGate.classList.remove('right-door--animation');
    }, 5500)
}

function deletingFloors() {
    let floorInput = document.querySelector('#floorNumber').value;

    for (let i = floorInput; i > 0; i--) {
        let floordiv = document.querySelector('.box');
        floordiv.remove();
    }
}
