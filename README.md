# quick-notes-app
A simple notes takeing application build using React, PHP, and GraphQL

# Getting started
In order for this application to work, you need the following installed on your computer.

- php 5.6
- mysql
- Composer

First you need to clone this repo
```
git clone <repo-url>
```
Then you need to install all the required dependencies using composer. If composer is installed globally in you're computer, then run

```
composer install
```

Then you need to install all the dependencies for the frontend react app

```
cd frontend
yarn install
```

After that, you need to create a database in you're SQL server and execute the query given in the ```database.sql```

Then go to ```containers/Capsule.php``` and then create ```.env``` file and update your database credentials

> **Tip:** See the ```.env.example``` file to get an idea on how to enter the database credentials

Now the app is successfully set up in your computer to start the server, run
```sh
bash serve.sh # For Linux and Mac

serve.bat # For Windows
```

And the start the frontend app by running
```
cd frontend

yarn start
```

Now, the app runs in ```http://localhost:3000/``` by default.