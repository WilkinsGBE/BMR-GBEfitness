// showing the definitions (open and close) for desktop only
let arrow = document.querySelector('#icon');
let definitions = document.querySelector('#Definitions');

arrow.onclick = function() {
    if (window.innerWidth > 768) {
        if (definitions.style.display === 'flex') {
            definitions.style.display = 'none';
        } else {
            definitions.style.display = 'flex';
        }
    }
};


document.addEventListener("DOMContentLoaded", function() {
  const result = document.querySelector('#chart_button');
  let chart = document.querySelector('#result');
  const male = document.querySelector('#male');
  const female = document.querySelector('#female');
  let heightcm = document.querySelector('#heightcm');
  const heightfeet = document.querySelector('#heightfeet');
  const inches = document.querySelector('#inches');
  let weightkg = document.querySelector('#weightkg');
  const weightlbs = document.querySelector('#weightlbs');
  const plan = document.querySelector('#plan');
  let giveplan = document.querySelector('#giveplan');
  let age = document.querySelector('#age');
  let question = document.querySelector('#Questions');

  function calculateBMR() {

  let bmrDisplay = document.querySelector('#bmr');
  let option = document.querySelector('#options');
  let protein = document.querySelector('.protein');
  let carbs = document.querySelector('.carbs');
  let fat = document.querySelector('.fat');
  let calorie = document.querySelector('.calorie');

  // conversion of the pounds and inches into kilograms and cm
  totalInches = (heightfeet.value * 12) + parseFloat(inches.value);
  weightkg.value = weightlbs.value * 0.45359237 || weightkg.value;
  heightcm.value = totalInches * 2.54 || heightcm.value;
  
  let bmr = (weightkg.value * 10) + (heightcm.value * 6.25) - (age.value * 5);

    // bmr math

    if (male.checked && option.value === 'sedentary') {
      bmr = (bmr + 5) * 1.2;
    } else if (male.checked && option.value === 'light') {
      bmr = (bmr + 5) * 1.375;
    } else if (male.checked && option.value === 'average') {
      bmr = (bmr + 5) * 1.55;
    } else if (male.checked && option.value === 'very') {
      bmr = (bmr + 5) * 1.725;
    } else if (male.checked && option.value === 'extreme') {
      bmr = (bmr + 5) * 1.9;

    // female turn now
    } else if (female.checked && option.value === 'sedentary') {
      bmr = (bmr - 161) * 1.2 + ' is your calorie intake needed per day';
    } else if (female.checked && option.value === 'light') {
      bmr = (bmr - 161) * 1.375;
    } else if (female.checked && option.value === 'average') {
      bmr = (bmr - 161) * 1.55;
    } else if (female.checked && option.value === 'very') {
      bmr = (bmr - 161) * 1.725;
    } else if (female.checked && option.value === 'extreme') {
      bmr = (bmr - 161) * 1.9;
    }

    // I will do the same thing for (#plan) but I will use the switch statement to make it shorter
    switch (plan.value) {
      case 'cut':
        bmr -= 500;
        protein.textContent = 1 * weightkg.value
        carbs.textContent = (bmr * 0.4) / 4
        fat.textContent = (bmr * 0.20) / 9
        break;
      case 'maintain':
        protein.textContent = 1.2 * weightkg.value
        carbs.textContent = (bmr * 0.5) / 4
        fat.textContent = (bmr * 0.25) / 9
        break;
      case 'lean':
        bmr = parseInt(bmr) * 1.08;
        protein.textContent = 1.7 * weightkg.value
        carbs.textContent = (bmr * 0.55) / 4
        fat.textContent = (bmr * 0.3) / 9
        break;
      case 'bulk':
        bmr = parseInt(bmr) * 1.16;
        protein.textContent = 1.5 * weightkg.value
        carbs.textContent = (bmr * 0.6) / 4
        fat.textContent = (bmr * 0.3) / 9
        break;
    }
    
    bmrDisplay.textContent = Math.round(parseFloat(bmr));
    calorie.textContent = Math.round(parseFloat(bmr)); 
    protein.textContent = Math.round(parseFloat(protein.textContent));
    carbs.textContent = Math.round(parseFloat(carbs.textContent)); 
    fat.textContent = Math.round(parseFloat(fat.textContent));
  }

  // code for a error message on the form
  result.onclick = function() {
    if (!male.checked && !female.checked) {
      alert("Please select your sex.");
      return false;
    } else if (!heightcm.value && !heightfeet.value) {
      alert("Please enter your height.");  
      return false;
    } else if (!weightkg.value && !weightlbs.value) {
      alert("Please enter your weight.");
      return false;  
    } else if (age.value < 1) {
      alert("Enter a valid age number.");
      return false;
    } else {
      // Show the chart
      chart.style.display = 'block';
      // Scroll to the position of the chart
      chart.scrollIntoView({
        behavior: 'smooth' // Smooth scrolling behavior
      });
    }
    
    let selectedOption = plan.value;
    if (selectedOption === 'cut') {
      giveplan.textContent = 'Here are the results of what you should eat every day for about 6 months if you want to Cut.';
    } else if (selectedOption === 'maintain') {
      giveplan.textContent = 'Here are the results of what you should eat every day for about 6 months if you want to maintain your current weight.';
    } else if (selectedOption === 'lean') {
      giveplan.textContent = 'Here are the results of what you should eat every day for about 6 months if you want to lean bulk.';
    } else if (selectedOption === 'bulk') {
      giveplan.textContent = 'Here are the results of what you should eat every day for about 6 months if you want to bulk.';
    } 
    return true;
  };

  question.addEventListener('change', function(event) {
    const target = event.target;

    if (target.matches('#male, #female, #heightcm, #weightkg, #heightfeet, #inches, #weightlbs, #age, #options, #plan, #giveplan')) {
      calculateBMR();
    }
  });
});


// switching the display based on the metric selected
document.addEventListener("DOMContentLoaded", function() { 
  const metric = document.querySelector('#metric');
  let centimeters = document.querySelector('label[for="heightcm"]');
  let kilo = document.querySelector('label[for="Weightkg"]');
  let feettall = document.querySelector('label[for="heightinch"]');
  let pounds = document.querySelector('label[for="Weightlbs"]');

// only displaying the choosed metric
  metric.addEventListener("change", function() {

    if (metric.value === 'Metric') {
      centimeters.style.display = 'inline-block';
      kilo.style.display = 'inline-block';
      feettall.style.display = 'none';
      pounds.style.display = 'none';
    } else if (metric.value === 'Imperial') {
      centimeters.style.display = 'none';
      kilo.style.display = 'none';
      feettall.style.display = 'inline-block';
      pounds.style.display = 'inline-block';
    }
  })
});

// Showing the different definitions types
// Selecting all tab links and tab contents
const tablinks = document.querySelectorAll('.tab-links');
const tabcontents = document.querySelectorAll('.tab-contents');

// Adding click event listener to each tab link
tablinks.forEach(function(link) {
    link.addEventListener('click', function() {
        // Remove 'active-tab' class from all tab contents
        tabcontents.forEach(function(content) {
            content.classList.remove('active-tab');
        });
        
        // Remove 'active-link' class from all tab links
        tablinks.forEach(function(tablink) {
            tablink.classList.remove('active-link');
        });

        // Add 'active-link' class to the clicked tab link
        this.classList.add('active-link');

        // Add 'active-tab' class to the corresponding tab content
        const tabId = this.getAttribute('id');
        const tabContent = document.getElementById(tabId);
        tabContent.querySelector('.tab-contents').classList.add('active-tab');
    });
});

