const burgerMenu = document.querySelector(".burger");
const nav = document.querySelector(".navigation");
const cancel = document.querySelector(".cancel");
const courses = document.querySelector(".courses");
const question = document.querySelectorAll(".question-div");
const arrow = document.querySelectorAll(".arrow");
const answer = document.querySelectorAll(".result");

// fetching courses
async function loadCourses() {
  try {
    const response = await fetch("./data/courses.json");
    const data = await response.json();
    courses.innerHTML = data.map(CourseDiv).join("");
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
}

loadCourses();

burgerMenu.addEventListener("click", () => {
  nav.style.display = "inline";
  cancel.style.display = "inline";
});

cancel.addEventListener("click", () => {
  nav.style.display = "none";
  cancel.style.display = "none";
});

//slider
document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots");

  slides.forEach((slide, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute("data-index", index);
    dotsContainer.appendChild(dot);
    dot.addEventListener("click", function () {
      showSlide(index);
    });
  });

  const dots = document.querySelectorAll(".dot");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  prev.addEventListener("click", function () {
    showSlide(slideIndex - 1);
  });

  next.addEventListener("click", function () {
    showSlide(slideIndex + 1);
  });

  function showSlide(index) {
    if (index >= slides.length) {
      slideIndex = 0;
    } else if (index < 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex = index;
    }

    slides.forEach((slide, idx) => {
      slide.classList.remove("active-slide");
    });

    slides[slideIndex].classList.add("active-slide");

    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === slideIndex);
    });
  }

  setInterval(function () {
    showSlide(slideIndex + 1);
  }, 5000);

  showSlide(slideIndex);
});

// course div
function CourseDiv(course) {
  return `<div class="course">
            <img
              src="${course.image}"
              class="course-img"
            />
            <h3 class="title">${course.title}</h3>
            <p class="date">${course.date}</p>
            <div class="details-div">
              <img src="./assets/arrow.svg" />
              <a href="#" class="course-details">კურსის დეტალები</a>
            </div>
          </div>`;
}

for (let i = 0; i < question.length; i++) {
  question[i].addEventListener("click", () => {
    if (answer[i].classList.contains("result")) {
      answer[i].classList = "show";
      arrow[i].style.transform = "rotate(180deg)";
      arrow[i].style.transition = "0.1s";
    } else {
      answer[i].classList = "result";
      arrow[i].style.transform = "rotate(0deg)";
      arrow[i].style.transition = "0.1s";
    }
    for (let k = 0; k < question.length; k++) {
      if (answer[k].classList.contains("show") && answer[k] !== answer[i]) {
        answer[k].classList = "result";
        arrow[k].style.transform = "rotate(180deg)";
      }
    }
  });
}
