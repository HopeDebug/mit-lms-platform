const axios = require("axios");

const API_URL = "http://localhost:5000/api/courses";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjZjOGNkZTk1ZjUyNjZlZDFiYmMwMyIsInJvbGUiOiJlZHVjYXRvciIsImlhdCI6MTc1MTU3MDUzMSwiZXhwIjoxNzUxNjU2OTMxfQ.gv-0lXog7susvnGqFlGDyDjXBzuMDgsedRY2Acv3wXQ"; // Replace with your valid token

const courses = [
  {
    title: "HTML Basics for Beginners",
    description: "Learn the foundation of HTML, the language of the web.",
    educator: "6866c8cde95f5266ed1bbc03",
    youtubeLinks: ["https://youtu.be/UB1O30fR-EE"],
  },
  {
    title: "CSS Fundamentals",
    description: "Understand CSS selectors, properties, and styling techniques.",
    educator: "6866c8cde95f5266ed1bbc03",
    youtubeLinks: ["https://youtu.be/yfoY53QXEnI"],
  },
  {
    title: "Responsive Web Design",
    description: "Make your websites responsive and mobile-friendly.",
    educator: "6866c8cde95f5266ed1bbc03",
    youtubeLinks: ["https://youtu.be/srvUrASNj0s"],
  },
  {
    title: "Flexbox Mastery",
    description: "Master CSS Flexbox for flexible layout designs.",
    educator: "6866c8cde95f5266ed1bbc03",
    youtubeLinks: ["https://youtu.be/JJSoEo8JSnc"],
  },
  {
    title: "CSS Grid Layout",
    description: "Learn CSS Grid for powerful two-dimensional layouts.",
    educator: "6866c8cde95f5266ed1bbc03",
    youtubeLinks: ["https://youtu.be/jV8B24rSN5o"],
  },
  {
    title: "Advanced CSS Animations",
    description: "Add smooth animations and transitions to your pages.",
    educator: "6866c8cde95f5266ed1bbc03",
    youtubeLinks: ["https://youtu.be/9zBsdzdE4sM"],
  },
  {
    title: "HTML Forms and Validation",
    description: "Build HTML forms and validate user input effectively.",
    educator: "6866c8cde95f5266ed1bbc03",
    youtubeLinks: ["https://youtu.be/4bAErG-dO94"],
  },
  {
    title: "CSS Variables and Custom Properties",
    description: "Use CSS variables for cleaner and reusable styles.",
    educator: "6866c8cde95f5266ed1bbc03",
    youtubeLinks: ["https://youtu.be/7Z7wtdOg4XI"],
  },
  {
    title: "Typography in Web Design",
    description: "Improve readability and aesthetics with web typography.",
    educator: "6866c8cde95f5266ed1bbc03",
    youtubeLinks: ["https://youtu.be/h1WGztwEX5w"],
  },
  {
    title: "Building Layouts with Positioning",
    description: "Understand absolute, relative, fixed, and sticky positioning.",
    educator: "6866c8cde95f5266ed1bbc03",
    youtubeLinks: ["https://youtu.be/OEV8gMkCHXQ"],
  },
];

async function seedCourses() {
  for (const course of courses) {
    try {
      const res = await axios.post(API_URL, course, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      console.log(`Created course: ${res.data.title || course.title}`);
    } catch (error) {
      if (error.response) {
        console.error("Error status:", error.response.status);
        console.error("Error data:", error.response.data);
      } else if (error.request) {
        console.error("No response received. Request info:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  }
  console.log("Seeding complete!");
}

seedCourses();
