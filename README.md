# Daily Expenses Sharing Application API

## Overview
The Daily Expenses Sharing Application API allows users to manage and share expenses with friends. Users can create, retrieve, update, and delete expenses. 

## Features
- Create and manage expenses
- Split expenses among users
- User validation for expenses
- Easy setup and configuration

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Prerequisites
- Node.js (version 14 or later)
- npm (Node Package Manager)
- MongoDB Atlas account for database

## Installation
1. **Clone the Repository**:
```
git clone https://github.com/DSCmatter/Daily-Expenses-Sharing-Application.git
```
2. Navigate to Project Directory: Change to the project directory.
  ```
  cd daily-expenses-sharing-api
  ```
3. Install Dependencies: Use npm to install all required packages as specified in package.json.
  ```
  npm install
  ```
4. Create a Configuration File: Create a configuration file named database.config.js in the config directory, and add your MongoDB connection string.
  ```
  module.exports = {
    url: "mongodb://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority"
};
  ```
5. Start the Server: Run the application with the following command:
  ```
  npm start
  ```

## Usage
You can use API testing tools like Postman or Insomnia to interact with the API. Refer to the API Endpoints section for available routes.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
  
