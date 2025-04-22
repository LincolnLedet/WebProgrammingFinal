This is our 4300 Web Programming final project. 
===

Contributors:
Joshua Konfrst,
Lincoln Ledet,
Sean Mcgrath,
Kevin Zburlea

Project Goal
Your team will design and build a full-stack web application using React, Next.js, Nodejs, MongoDB, and implement authentication and authorization. The final product should not only demonstrate your ability to implement these technical requirements but also solve a problem or provide a unique service to UGA students.

Project Requirements
1. Technology Stack
Frontend: React with Next.js (TypeScript) initialized with create-next-app
client-side routing using App Router state management with React hooks (e.g. useState, useEffect, useContext).
Backend: Node.js using Next.js API routes
DataBase: MongoDB for data persistence
2. Functionality
Splash page:  The homepage must include graphics, or background image,  and a brief description of what the application does.  Make a splash :) ( 3 pts.)
Authentication: ( 15 pts )
Users can create an account with credentials (username/email + password) 
Passwords must be hashed before storing
Invalid credentials entered, message received and authenticated session not established
Authentication uses session tokens stored in local storage or cookies.
Authorization: ( 15 pts )
Non-authenticated users can view items
Authenticated users will be able to add, edit and delete items
Middleware must be used to protect certain routes (only logged-in users can access them.)
Fetch data from one or more web APIs ( 10 pts )
Error Handling: ( 7 pts )
Handle form validation errors (e.g., incorrect login credentials.) 
Redirect invalid client routes to a local "Page Not Found" page. 
Asynchronous requests must be handled (promise or async/await interface) ( 7 pts )
3. User Interface
Responsive Design: Displays appropriately on mobile, tablet, laptop and desktop. ( 5 pts )
Component card design (3 pts )
Navbar: ( 5 pts )
Appears at the top of every page.
Shows logo and login/signup options if the user is not logged in.
Shows "Welcome, [username]" and logout if the user is logged in.
4. Organization and Tracking:
Figma: Used for designing the user interface (UI mockups).
Miro Board: Used for tracking project progress with "To Do," "In Progress," and "Completed" columns.
GitHub: Source code repository, use branches for features, and write clear commit messages. 


5. Team Roles
Each group should assign the following roles:
Team Lead: Submits the final project and ensures deadlines are met.
Communication Lead: Notifies members of meetings, goals, and deadlines.
Miro Captain: Maintains task tracking in Miro.
GitHub Captain: Maintains the GitHub repository.
Deliverables
GitHub Repository (link on group google sheet, public visibility):  ( 5 pts )
Shared repo for the project with branches for features.
Clear commit messages.
README.md: Project description
Miro Board - collaboration tool to track progress (link on group google sheet) ( 5 pts )
todo
in progress
complete
Must also include names of group member that is responsible for each task on the miro board
Documentation - Final Report (pdf): ( 15 pts )
Cover Page: Group members, role distribution, class section, app purpose.
Accomplishments & Challenges: What you built, challenges faced, and how you solved them.
UI Mockup from Figma.
External Resources used (e.g., API documentation, libraries).
Route Diagram:
Client-side routes.
HTTP methods (GET, POST, DELETE, etc.).
Indicate restricted routes.
Server endpoints.
client-side route
HTTP methods
Restricted?
endpoint
/show-items
GET
no
GET /api/items


Presentation:
A 10-minute live demo of your application to the class.
Showcase the unique value of your application and the technical challenges encountered.
Codebase:
Clean, readable, and well-commented code.
zipped and submitted on eLC
Video demonstration: ( 5 pts )
video demonstrating all functionality implemented in the project
must follow the ordered list provided
Final Submission Components
Video Demo: A walkthrough of all required and extra features. (Hosting the video on Loom, YouTube or similar cloud service and providing a link to the video is preferred. To submit the link, please paste the link in a file named video_link and upload the file.)
Final Report: PDF of everything outlined in the documentation section.
Source Code: Zipped project files.
Evaluation Criteria
Functional Requirements
Authentication & Authorization
TypeScript & Code Quality
File based client side routing with App Router
Fetch data from web API
Asynchronous requests are awaited (promise or async/await interface) 
UI: splash page, navbar, cards
Authenticated users must be able to add, edit and delete items
Unique Value to UGA students, Creativity
Responsiveness & Intuitive User Interface
Documentation - final report
Peer review of team members

Guidelines
Teamwork: Collaborate effectively. Assign roles but ensure team members understand all parts of the application.
Deadlines (roughly):
Week 2: Submit your project idea 
Week 3: Submit UI Design mockup including splash page, authenticated and unauthenticated views, and database schema.
Week 4: Peer Review
Week 4: Progress report, including roles, progress
Week 5: Submit  functioning UI demonstrating  client side routes and database models 
Week 6: Final submission (4/22) and presentation (4/24 & 4/28).

This assignment will challenge your ability to work in teams, apply core web development concepts, and think creatively. 