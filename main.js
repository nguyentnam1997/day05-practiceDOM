const questions = [
  {
    title: "1 + 2 = ?",
    choices: ["7", "4", "3", "6"],
    answer: "3",
  },
  {
    title: "4 + 5 = ?",
    choices: ["30", "4", "9", "6"],
    answer: "9",
  },
  {
    title: "15 + 20 = ?",
    choices: ["25", "35", "21", "13"],
    answer: "35",
  },
  {
    title: "16 + 6 = ?",
    choices: ["22", "5", "12", "10"],
    answer: "22",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let yourAnswers = [];

const questionTitleEl = document.querySelector("#question p"); //hiển thị tiêu đề câu hỏi
const choicesEl = document.querySelector(".choices"); //hiển thị danh sách các lựa chọn
const btnNext = document.getElementById("btn-next"); //nút next
const btnFinish = document.getElementById("btn-finish"); //nút finish
const questionNumber = document.querySelector(".question-number");

//Render ra câu hỏi
const renderQuestion = () => {
  const currentQuestion = questions[currentQuestionIndex];

  //hiển thị tiêu đề câu hỏi
  questionTitleEl.innerHTML = `Câu ${currentQuestionIndex + 1}: ${
    currentQuestion.title
  }`;

  //hiển thị danh sách các lựa chọn
  let choicesHtml = "";
  currentQuestion.choices.forEach((choice, index) => {
    choicesHtml += `
        <div class="choice-item">
          <input type="radio" name="choice" id="choice-${index}" value="${choice}" />
          <label for="choice-${index}">${choice}</label>
        </div>
        `;
  });
  choicesEl.innerHTML = choicesHtml;

  //Cập nhật progress bar
  const progressBar = document.querySelector(".progress-bar");
  const progressValue = (currentQuestionIndex + 1) / questions.length;
  progressBar.style.width = `${progressValue * 100}%`;
  progressBar.innerHTML = `${progressValue * 100}%`;

  renderQuestionNumber();
};

//Render ra số lượng câu hỏi
const renderQuestionNumber = () => {
  const questionNumber = document.querySelector(".question-number");
  console.log(questionNumber);
  let questionNumberHTML = "";
  questions.forEach((question, index) => {
    questionNumberHTML += `
        <div class="rounded border py-2 px-3 me-2 ${index === currentQuestionIndex ? 'border-primary' : ''}"
        onclick = 'renderQuestionWithClickNumber(${index})'>${index + 1}</div>
        `;
  });
  questionNumber.innerHTML = questionNumberHTML;    
};
renderQuestion();

//Disable những số thứ tự mà chưa được chọn
const choiceQuestion = document.querySelectorAll('.question-number');



//Render câu hỏi tương ứng với số thứ tự của câu
const renderQuestionWithClickNumber = (questionNumber) => {
  currentQuestionIndex = questionNumber;
  renderQuestion();
};

btnNext.addEventListener("click", function () {
  //Kiểm tra xem đã chọn đáp án chưa?
  //Nếu chọn rồi -> Next
  //Nếu chưa chọn -> Alert ng dùng chọn
  const checkedChoice = document.querySelector("input[type=radio]:checked");
  if (!checkedChoice) {
    alert("Bạn chưa chọn đáp án!");
    return;
  }

  //Lưu lại đáp án người dùng vào mảng yourAnswers
  yourAnswers.push(checkedChoice.value);

  currentQuestionIndex++; //chuyển sang index của câu tiếp
  renderQuestion(); //render lại câu tiếp lên giao diện

  //ẩn nút next khi đến câu hỏi cuối cùng
  if (currentQuestionIndex === questions.length - 1) {
    btnNext.classList.add("hide");
    btnFinish.classList.remove("hide");
  }
});

//Ấn nút Kết thúc
btnFinish.addEventListener("click", function () {
  const checkedChoice = document.querySelector("input[type=radio]:checked");
  if (!checkedChoice) {
    alert("Bạn chưa chọn đáp án!");
    return;
  }

  //Lưu lại đáp án người dùng vào mảng yourAnswers
  yourAnswers.push(checkedChoice.value);
  //Tính điểm
  questions.forEach((question, index) => {
    if (question.answer == yourAnswers[index]) {
      score++;
    }
  });
  //Thông báo
  alert(`Bạn đã trả lời đúng ${score} / ${questions.length} câu hỏi!`);
});
