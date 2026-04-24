const questionElement = document.getElementById("questions");
const answerButtonsElement = document.querySelector(".answer-buttons");
const progressElement = document.getElementById("progress");


let currentQuestionIndex = 0;
let score = 0;
const questionBank= [
   {question:"What is the capital of India?", answer:["Delhi","Mumbai","Kolkata","Chennai"], correct:0},
   {question:"What is the largest planet in our solar system?", answer:["Earth","Mars","Jupiter","Saturn"], correct:2},
   {question:"Who wrote the play 'Romeo and Juliet'?", answer:["William Shakespeare","Charles Dickens","Jane Austen","Mark Twain"], correct:0},
   {question:"What is the chemical symbol for water?", answer:["H2O","CO2","NaCl","O2"], correct:0},
   {question:"Which country is known as the 'Land of the Rising Sun'?", answer:["China","Japan","South Korea","Thailand"], correct:1},
]

const showResults=()=>{
   answerButtonsElement.innerHTML="";
   progressElement.innerText="Quiz Completed!";
   questionElement.innerText=`Quiz finished. Your score is ${score} out of ${questionBank.length}`;
}
const renderQuiz=()=>{
   answerButtonsElement.innerHTML="";

      const currentQuestion = questionBank[currentQuestionIndex];
      questionElement.innerText=currentQuestion.question;
      progressElement.innerText=`Question ${currentQuestionIndex + 1} of ${questionBank.length}`;

      currentQuestion.answer.forEach((answer,index)=>{
         const button = document.createElement("button");
         button.innerText=answer;
         answerButtonsElement.appendChild(button);

         button.addEventListener("click",()=>{
            if(index === currentQuestion.correct){
               button.style.backgroundColor="green";
               button.style.color="white";
               score++;
            } else{
               button.style.backgroundColor="red";
               button.style.color="white";
            }
            answerButtonsElement.querySelectorAll("button").forEach(btn=>{
               btn.disabled=true;
            })
            setTimeout(()=>{
               currentQuestionIndex++;
             
               if(currentQuestionIndex < questionBank.length){
                  renderQuiz();
               } else{
                  showResults();
               }
            }, 1000);
         })
      })

    
}

renderQuiz();