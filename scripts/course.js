const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the study of computer science and software development.',
    technology: ['Python'],
    completed: true 
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the fundamental concepts of web design and development.',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Students expand their programming skills to write programs that solve real world problems.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces classes, objects, inheritance, polymorphism, and encapsulation.',
    technology: ['C#'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Students learn to create dynamic websites using JavaScript, the DOM, and modern standards.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Web Frontend Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Focuses on user experience, accessibility, compliance, performance optimization, and APIs.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

const courseContainer = document.querySelector('#course-cards');
const totalCreditsDisplay = document.querySelector('#total-credits');
const filterButtons = document.querySelectorAll('.filter-btn');

// DOM manipulation
function displayCourses(courseList){
  courseContainer.innerHTML = '';

  courseList.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('course-card');
    if (course.completed) {
      card.classList.add('completed');
    }

    card.innerHTML = `<strong>${course.subject} ${course.number}</strong>: ${course.title}`;
    courseContainer.appendChild(card);
  });

  // .reduce()
  const totalCredits = courseList.reduce((accumulator, currentCourse) => {
    return accumulator + currentCourse.credits;
  }, 0);

  totalCreditsDisplay.textContent = totalCredits;
}

// .filter()
function setupFilters(){
  filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');

      const filterType = event.target.id;

      if (filterType === 'all-courses') {
        displayCourses(courses);
      } else if (filterType === 'cse-courses') {
        const cseOnly = courses.filter(course => course.subject === 'CSE');
        displayCourses(cseOnly);
      } else if (filterType === 'wdd-courses') {
        const wddOnly = courses.filter(course => course.subject === 'WDD');
        displayCourses(wddOnly);
      }
    });
  });
}


displayCourses(courses);
setupFilters();