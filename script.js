const video =
document.getElementById("video");

/* =========================
   CAMERA START
========================= */

async function startInterviewCamera(){

    try{

        const stream =

        await navigator.mediaDevices
        .getUserMedia({

            video:true,
            audio:true

        });

        video.srcObject = stream;

    }

    catch(error){

        console.log(error);

        alert(
        "Camera Access Denied"
        );

    }

}

/* =========================
   QUESTION BANK
========================= */

const questionBank = {

low:{

aptitude:[

"A train travels 60 km in 1 hour. What is its speed?",

"What is 25% of 200?",

"If 5 workers complete a task in 10 days, how many days will 10 workers take?",

"Find the next number in the series: 2, 4, 8, 16, ?",

"What is the average of 10, 20, 30, 40 and 50?"

],

hr:[

"Tell me about yourself.",

"What are your strengths?",

"Why do you want to join our company?",

"How do you handle pressure during work?",

"Where do you see yourself in the next 3 years?"

],

technical:[

"What is the difference between HTML and CSS?",

"Explain the purpose of JavaScript in web development.",

"What is Python and where is it commonly used?",

"What is Artificial Intelligence?",

"Explain a project you have worked on."

]

},

medium:{

aptitude:[

"A shopkeeper gives a 10% discount on a ₹1000 product. What is the selling price?",

"Find the square root of 625.",

"What is the probability of getting a head when tossing a coin?",

"If a car travels 240 km in 4 hours, find its average speed.",

"Solve: 15 × 12 − 30."

],

hr:[

"Describe a challenging situation and how you handled it.",

"What motivates you to perform better?",

"How do you prioritize multiple tasks?",

"Why should we hire you for this role?",

"Describe a time when you worked in a team."

],

technical:[

"What is Machine Learning and how does it work?",

"Explain supervised and unsupervised learning.",

"What is a database?",

"What is an API and why is it used?",

"Explain the concept of cloud computing."

]

},

high:{

aptitude:[

"A company increases employee salary by 15%. Calculate the new salary if the current salary is ₹40,000.",

"Solve a simple profit and loss problem.",

"Find the missing number in the series: 3, 6, 12, 24, ?",

"A train covers 300 km in 5 hours. Find its speed.",

"Calculate compound interest for a given principal amount."

],

hr:[

"Describe a situation where you demonstrated leadership.",

"How would you resolve conflicts within a team?",

"What is your biggest professional achievement?",

"How do you adapt to new technologies?",

"What value can you bring to our organization?"

],

technical:[

"Explain the working of a Neural Network.",

"What is Deep Learning and how is it different from Machine Learning?",

"What is Natural Language Processing?",

"Explain the role of TensorFlow in AI projects.",

"What are the challenges involved in training AI models?"

]

}

};

/* =========================
   VARIABLES
========================= */

let currentQuestions = [];

let index = 0;

let time = 90;

/* =========================
   LOAD QUESTIONS
========================= */

function loadQuestions(){

    const level =
    localStorage.getItem("level");

    const round =
    localStorage.getItem("round");

    currentQuestions =
    questionBank[level][round];

    console.log(currentQuestions);

    showQuestion();

}

/* =========================
   SHOW QUESTION
========================= */

function showQuestion(){

    if(index < currentQuestions.length){

        document.getElementById("question")
        .innerHTML =
        currentQuestions[index];

        speakQuestion(
        currentQuestions[index]
        );

        time = 90;

    }

    else{

        window.location.href =
        "result.html";

    }

}

/* =========================
   NEXT QUESTION
========================= */

function nextQuestion(){
    index++;
    if(index < currentQuestions.length){
        showQuestion();
    }
    else{
        getResult();
    }
}
/* =========================
   TIMER
========================= */

setInterval(function(){

    if(document.getElementById("timer")){

        let minutes =
        Math.floor(time / 60);

        let seconds =
        time % 60;

        document.getElementById("timer")
        .innerHTML =

        minutes + ":" +

        (seconds < 10
        ? "0" + seconds
        : seconds);

        if(time > 0){

            time--;

        }

        else{

            nextQuestion();

        }

    }

},1000);

/* =========================
   AI VOICE QUESTION
========================= */

function speakQuestion(text){

    window.speechSynthesis.cancel();

    const speech =

    new SpeechSynthesisUtterance();

    speech.text = text;

    speech.volume = 1;

    speech.rate = 1;

    speech.pitch = 1;

    speech.lang = "en-US";

    window.speechSynthesis
    .speak(speech);

}

/* =========================
   PAGE LOAD
========================= */

window.onload = function(){

    startInterviewCamera();

    loadQuestions();

};
async function getResult(){

    try{

        const response =

        await fetch(
        "http://127.0.0.1:5000/predict"
        );

        const data =
        await response.json();

        localStorage.setItem(
        "confidence",
        data.confidence
        );

        localStorage.setItem(
        "eye_contact",
        data.eye_contact
        );

        localStorage.setItem(
        "speech_clarity",
        data.speech_clarity
        );

        localStorage.setItem(
        "stress_level",
        data.stress_level
        );

        localStorage.setItem(
        "voice_confidence",
        data.voice_confidence
        );

        window.location.href =
        "result.html";

    }

    catch(error){

        console.log(error);

        alert(
        "Backend Not Running"
        );

    }

}

let eyeContact =
Math.floor(Math.random() * 21) + 70;

let speechClarity =
Math.floor(Math.random() * 21) + 70;

let voiceConfidence =
Math.floor(Math.random() * 21) + 70;

let confidence =
Math.floor(
(eyeContact +
speechClarity +
voiceConfidence) / 3
);