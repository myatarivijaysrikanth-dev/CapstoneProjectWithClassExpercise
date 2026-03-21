

Node.js Assignment – Introduction to Node.js & Basics

Student Name: Vijay Srikanth

Project Description:
This project demonstrates the basic concepts of Node.js including running a Node script, 
using global objects, working with timers, managing dependencies using npm, 
and creating a simple command-line interface (CLI) application.

Project Files:
1. hello-node.js
   - Displays the Node.js version
   - Shows the current file name and directory
   - Prints a welcome message every 3 seconds using setInterval
   - Stops the timer after 10 seconds using clearInterval

2. banner.js
   - Uses external npm packages (figlet and chalk)
   - Displays a stylized “Welcome to Node.js” banner in the terminal
   - Demonstrates how to use npm packages inside a Node.js application

3. greet.js
   - A simple CLI application
   - Accepts a user name from the command line using process.argv
   - Displays a greeting message along with the current date and time
   - Uses the moment package to format the date and time

Requirements:
- Node.js installed
- npm installed

Dependencies Used:
- chalk
- figlet
- moment

Installation Steps:
1. Open terminal in the project folder
2. Run the following command to install dependencies:

   npm install

How to Run the Applications:

Challenge 1:
Run the Node fundamentals script

   node hello-node.js

Challenge 2:
Run the banner application using npm

   npm start

Challenge 3:
Run the CLI greeting application

   node greet.js YourName

Example:

   node greet.js Vijay

Expected Output Example:

Hello, Vijay! Today is Mon Mar 10 2026, 5:30 PM

Author:
Vijay Srikanth