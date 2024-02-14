var character = document.getElementById("character");
var block = document.getElementById("block");
var counter=0;



const gameDiv = document.getElementsByClassName('game')[0];
        const modalDiv = document.createElement('div');
        modalDiv.id = 'tryAgainModal';
        const atag = document.createElement('button');
        atag.id = 'tryAgain'; 
        atag.textContent = 'Try Again!'
        atag.style.marginLeft = '10px';

// Style the modal div
// modalDiv.style.position = 'relative';
modalDiv.style.top = '0';
modalDiv.style.left = '0';
modalDiv.style.width = '500px';
// modalDiv.style.height = '200px';
modalDiv.style.color = 'red';
modalDiv.style.display = 'flex';
modalDiv.style.justifyContent = 'center';
modalDiv.style.alignItems = 'center';
// modalDiv.style.zIndex= '99999';

// Insert the "Game Over" message into the modal div
modalDiv.textContent = 'Game Over ';

// Append the modal div to the gameDiv
gameDiv.appendChild(modalDiv);
modalDiv.appendChild(atag);
document.getElementById('tryAgain').style.display = 'none';
document.getElementById('tryAgainModal').style.display = 'none';

document.getElementById('tryAgain').addEventListener('click', function () {
    block.style.animation = "none";
    document.getElementById('tryAgain').style.display = 'none';
document.getElementById('tryAgainModal').style.display = 'none';
    cancelAnimationFrame(requestId);
    const p = document.getElementById('P_param');
    const i = document.getElementById('I_param');
    const d = document.getElementById('D_param');
    console.log(p.value, i.value, d.value);
    pidControllerFunction = pidController(45, p.value, i.value, d.value);
    pidOutput = pidControllerFunction(500);
    myChart.destroy();
    // // Sample data
    const data = {
        labels: [], // X-axis labels
        datasets: [{
            label: 'Dynamic Line Chart',
            borderColor: 'rgb(75, 192, 192)',
            data: [], // Y-axis data
        }]
    };

// Chart configuration
const config = {
    type: 'line',
    data: data,
};

// Initialize the chart
myChart = new Chart(document.getElementById('myChart').getContext('2d'), config);
block.style.animation = "block 2s infinite linear";
    checkDead();
    setTimeout(() => {
        // Update the chart
        myChart.update();
    }, 3000);
})



document.addEventListener('keyup', function(event) {
    // Check if the pressed key is the arrow up key
    if (event.key === 'ArrowUp') {
        // Execute your code here when the arrow up key is pressed
        jump();
    }
});



const checkbox = document.getElementById('gameWithoutPID');




// PID 
function pidController(desiredValue, P, I, D) {
    let currentError = 0;
    let integral = 0;
    let previousError = 0;

    return function(currentValue) {
        // Calculate the error
        currentError = desiredValue - currentValue;

        // Update integral term
        integral += currentError;

        // Calculate derivative term
        let derivative = currentError - previousError;

        // Calculate PID output
        let output = P * currentError + I * integral + D * derivative;

        // Update previous error
        previousError = currentError;

        return output;
    };
}
let pidControllerFunction = pidController(45, 0.1, 0.5, 0.1);
let pidOutput = pidControllerFunction(500);
const tuneButton = document.getElementById('tuneButton');
tuneButton.addEventListener('click', function () {
    block.style.animation = "none";
    document.getElementById('tryAgain').style.display = 'none';
document.getElementById('tryAgainModal').style.display = 'none';
    cancelAnimationFrame(requestId);
    const p = document.getElementById('P_param');
    const i = document.getElementById('I_param');
    const d = document.getElementById('D_param');
    console.log(p.value, i.value, d.value);
    pidControllerFunction = pidController(45, p.value, i.value, d.value);
    pidOutput = pidControllerFunction(500);
    myChart.destroy();
    // // Sample data
    const data = {
        labels: [], // X-axis labels
        datasets: [{
            label: 'Dynamic Line Chart',
            borderColor: 'rgb(75, 192, 192)',
            data: [], // Y-axis data
        }]
    };

// Chart configuration
const config = {
    type: 'line',
    data: data,
};

// Initialize the chart
myChart = new Chart(document.getElementById('myChart').getContext('2d'), config);
block.style.animation = "block 2s infinite linear";
    checkDead();
    setTimeout(() => {
        // Update the chart
        myChart.update();
    }, 3000);
})
// console.log(pidControllerFunction(500));

// console.log("here:", pidOutput);

const pidOutputDisplay = document.getElementById('pidOutputDisplay');



// // Sample data
const data = {
    labels: [], // X-axis labels
    datasets: [{
        label: 'Dynamic Line Chart',
        borderColor: 'rgb(75, 192, 192)',
        data: [], // Y-axis data
    }]
};

// Chart configuration
const config = {
    type: 'line',
    data: data,
};

// Initialize the chart
let myChart = new Chart(document.getElementById('myChart').getContext('2d'), config);

// Function to add data dynamically
function addData(xValue, yValue) {
    // Add data to the chart
    myChart.data.labels.push(xValue);
    myChart.data.datasets[0].data.push(yValue);
    // myChart.update();
}


    







// Game Logic



function jump(){
    if(character.classList == "animate"){return}
    character.classList.add("animate");
    setTimeout(function(){
        character.classList.remove("animate");
    },300);
}


    let x = 0
    function checkDead() {
        // block.style.animation = "block 2s infinite linear";
        document.getElementById('tryAgain').style.display = 'none';
document.getElementById('tryAgainModal').style.display = 'none';
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    pidOutput = pidControllerFunction(pidOutput);
    console.log("PID Output: ", pidOutput, "px")
    const outputDiv = document.createElement('strong');

        // Set its content to display "PID Output: " concatenated with the current value
        outputDiv.textContent = "PID Output: " + pidOutput;
        outputDiv.style.display = "flex";
        outputDiv.style.justifyContent = "center";

        // Clear the content of pidOutputDisplay
        pidOutputDisplay.innerHTML = '';

        // Append the newly created div element to pidOutputDisplay
        pidOutputDisplay.appendChild(outputDiv);
    addData(x, pidOutput);

    if(blockLeft <=20 && blockLeft >= -20 && characterTop>=130){
        // block.style.animation = "none";
        // alert("Game Over. score: "+Math.floor(counter/100));
        document.getElementById('tryAgain').style.display = 'inline-block';
        document.getElementById('tryAgainModal').style.display = 'flex';
        block.style.animationPlayState = 'paused';
        
        counter=0;
        // block.style.animation = "block 2s infinite linear";
        // return
    }else{
        if (blockLeft <= pidOutput && blockLeft >= pidOutput - 4 && characterTop>=130 && checkbox.checked == false) {
            jump();
            console.log("JUMPED !!!", "pid: ", pidOutput);
        }
        checkbox.addEventListener('change', function() {
            if (this.checked == false) {
                if (blockLeft <= pidOutput && blockLeft >= pidOutput - 4 && characterTop>=130) {
                    jump();
                    // console.log("JUMPED !!!");
                }
            }
        });
    
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
    requestId = requestAnimationFrame(checkDead); // Schedule the next animation frame
    x += 1;
    
    }
    
    requestId = requestAnimationFrame(checkDead);
    setTimeout(() => {
        // Update the chart
        myChart.update();
    }, 3000);
// }, 5);