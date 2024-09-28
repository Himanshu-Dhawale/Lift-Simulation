sessionStorage.clear();

let simulate = document.querySelector('.createLiftFloorButton');
let restart = document.querySelector('.goToFirstPage');
restart.addEventListener('click', hideSecondPage);

simulate.addEventListener('click', () => {
    let floorInputValue = document.querySelector('#floorNumber').value;
    let liftInputValue = document.querySelector('#liftNumber').value;

    // Input validation
    if (floorInputValue == "" || liftInputValue == "") {
        alert('Please enter the value');
    } else if (floorInputValue <= 0 || liftInputValue <= 0) {
        alert("Inputs can't be zero or negative");
    } else if (floorInputValue == 1 && liftInputValue > 1) {
        alert("Number of lifts cannot be greater than one if there is only one floor");
    } else {
        sessionStorage.setItem("floors", floorInputValue);
        sessionStorage.setItem("lifts", liftInputValue);
        document.querySelector('.firstPage').style.display = 'none';
        document.querySelector('.secondPage').style.display = 'block';
        makingFloors(); // Call the function to generate lifts and floors
    }
});

function hideSecondPage() {
    document.querySelector('.secondPage').style.display = 'none';
    document.querySelector('.firstPage').style.display = 'flex';
    deletingFloors();
}

function makingFloors() {
    let floorInput = parseInt(sessionStorage.getItem("floors"));
    let liftInput = parseInt(sessionStorage.getItem("lifts"));

    // Create the floors and their buttons
    for (let i = floorInput; i > 0; i--) {
        let floordiv = document.createElement('div');
        floordiv.className = 'box';

        let buttonLift = document.createElement('div');
        buttonLift.className = 'buttonLift';

        let buttondiv1 = document.createElement('div');
        buttondiv1.className = 'button';

        // Create Up and Down buttons based on the floor
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

        // Only up button for the first floor, down for the top floor, both for others
        if (i == 1) {
            buttondiv1.appendChild(button1);
        } else if (i == floorInput) {
            buttondiv1.appendChild(button2);
        } else {
            buttondiv1.appendChild(button1);
            buttondiv1.appendChild(button2);
        }

        buttonLift.appendChild(buttondiv1);
        floordiv.appendChild(buttonLift);

        // Adding the HR and floor number
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

    // Create the main lift container
    let mainLift = document.createElement('div');
    mainLift.className = 'mainLift';

    for (let j = 1; j <= liftInput; j++) {
        let liftdiv = document.createElement('div');
        liftdiv.className = 'lift not-moving';
        liftdiv.setAttribute('id', `lift${j}`);
        liftdiv.setAttribute('data-current-floor', 1);

        let gates = document.createElement('div');
        gates.className = 'gates';

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

    liftLogic(); // Call lift logic after generating the layout
}

function liftLogic() {
    let liftButtons = document.querySelectorAll(".up, .down");
    let lifts = document.querySelectorAll(".lift");
    let buttonQueue = [];

    liftButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            button.disabled = true; // Disable button upon click
            let floorNumber = parseInt(button.id.replace(/[^\d]/g, '')); // Extract floor number
            buttonQueue.push({ button, floorNumber });

            if (buttonQueue.length === 1) {
                getNearestLift(buttonQueue[0]);
            }
        });
    });

    function getNearestLift(request) {
        let { button, floorNumber } = request;
        let availableLifts = Array.from(lifts).filter(lift => lift.classList.contains("not-moving"));
        let minDistance = Infinity;
        let nearestLift = null;

        // Find the nearest lift
        availableLifts.forEach(lift => {
            let currentFloor = parseInt(lift.dataset.currentFloor);
            let distance = Math.abs(currentFloor - floorNumber);
            if (distance < minDistance) {
                minDistance = distance;
                nearestLift = lift;
            }
        });

        // Move lift if found
        if (nearestLift) {
            moveLift(nearestLift, floorNumber);
            buttonQueue.shift(); // Remove the first request
            setTimeout(() => {
                button.disabled = false;
                if (buttonQueue.length) {
                    getNearestLift(buttonQueue[0]);
                }
            }, minDistance * 2000 + 5500);
        }
    }

    function moveLift(lift, floorNumber) {
        let currentFloor = parseInt(lift.dataset.currentFloor);
        lift.classList.remove("not-moving");
        let translateY = -95 * (floorNumber - 1);
        lift.style.transform = `translateY(${translateY}px)`;
        lift.style.transition = `transform ${Math.abs(floorNumber - currentFloor) * 2}s ease`;

        setTimeout(() => {
            openCloseDoors(lift);
            lift.dataset.currentFloor = floorNumber;
        }, Math.abs(floorNumber - currentFloor) * 2000);
    }

    function openCloseDoors(lift) {
        let gates = lift.querySelector('.gates');
        let leftGate = gates.children[0];
        let rightGate = gates.children[1];

        leftGate.classList.add('door-left--animation');
        rightGate.classList.add('door-left--animation');

        setTimeout(() => {
            leftGate.classList.remove('door-left--animation');
            rightGate.classList.remove('door-left--animation');
            lift.classList.add("not-moving");
        }, 5500);
    }
}

function deletingFloors() {
    document.querySelectorAll('.box').forEach(box => box.remove());
}
