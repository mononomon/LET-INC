console.log("Script loaded");
const form = document.getElementById("survey-option1");
console.log("Form element:", form);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Submit listener fired!");
});
const select = document.getElementById("service");
const survey1 = document.getElementById("survey-option1");
const survey2 = document.getElementById("survey-option2");
const body = document.body;
select.addEventListener("change", () => {
  // Hide both surveys first
  survey1.classList.add("hidden");
  survey2.classList.add("hidden");
  
  // Remove ALL theme classes first (clean slate)
  body.classList.remove("default-theme", "tree-service-theme", "garage-door-theme");

  // Show the selected one and add appropriate theme
  if (select.value === "option1") {
    survey1.classList.remove("hidden");
    body.classList.add("tree-service-theme");
  } else if (select.value === "option2") {
    survey2.classList.remove("hidden");
    body.classList.add("garage-door-theme");
  } else {
    // No selection - add default theme
    body.classList.add("default-theme");
  }
});

document
  .getElementById("survey-option1")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (const [key, value] of formData.entries()) {
      if (data[key]) {
        // Convert to array if multiple values exist
        data[key] = [].concat(data[key], value);
      } else {
        data[key] = value;
      }
    }

    const response = await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    alert("Form submitted!");
    window.location.reload();
  });
document
  .getElementById("survey-option2")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    alert("Form submitted!");
    window.location.reload();
  });

const serviceTypeRadios = document.querySelectorAll(
  'input[name="service-type"]',
);
const otherContainer = document.getElementById("other-service-container");

serviceTypeRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "Other" && radio.checked) {
      otherContainer.classList.remove("hidden");
    } else {
      otherContainer.classList.add("hidden");
    }
  });
});

//flatpickr
flatpickr("#date-range", {
  mode: "range", // allows selecting a start and end date
  minDate: "today", // prevent past dates
  dateFormat: "F j, Y", // e.g., January 14, 2026
});
flatpickr(".time", {
  enableTime: true,
  noCalendar: true, // disables the calendar popup
  dateFormat: "h:i K", // shows just the time
  time_24hr: false, // set true for 24-hour format if you like
});

const phoneInput = document.getElementById("phone1");

phoneInput.addEventListener("input", () => {
  let digits = phoneInput.value.replace(/\D/g, "").slice(0, 10);

  let formatted = digits;

  if (digits.length > 6) {
    formatted =
      digits.slice(0, 3) + "-" + digits.slice(3, 6) + "-" + digits.slice(6);
  } else if (digits.length > 3) {
    formatted = digits.slice(0, 3) + "-" + digits.slice(3);
  }

  phoneInput.value = formatted;
});

// Intersection Observer for scroll animations.
// creating object (like dictionaries in python) that sets 
// the parameters of what the computer defines as 'the user is observing
// x element'
const observerOptions = {
  //root: default (viewport, but could be set to anything)
  threshold: 0.1,  // trigger when 10% of element is visible
  rootMargin: '0px 0px -50px 0px'  // trigger slightly before element enters view
            // top right bottom left
};

//function call that returns an object. We are using the Intersection Observer API
//'IntersectionObserver' creates new observer object
const observer = new IntersectionObserver(
  //callback function
  (entries) => {
  //entries = array of all elements currently being 'observed'
  //forEach = loops through each entry
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Select all elements with animation classes and observe them
const animatedElements = document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up');
animatedElements.forEach(el => observer.observe(el));