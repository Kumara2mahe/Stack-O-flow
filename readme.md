# Stack O-flow

This website is a question forum and made to look & function like Stack Overflow.

## Technologies used:

- React js
- Node js
- Express js
- MongoDb
- Redux
- Json web token and more

## How to use?

Fork and clone the repo and follow the below steps:

- Install Node.js
- Open client and server directories in you code editor
- Install Dependencies using the command

```
npm install
```

- Start App using the command

```
npm start
```

## Screenshots

<div align="center">
    <img src="https://drive.google.com/uc?export=view&id=10uz-VDXqUIbsJ9XP5lSFQDJceH4xfd7W" alt="home page" width=640 height=365>
    <br><br>
    <img src="https://drive.google.com/uc?export=view&id=1lWyRsXvNbnWOreCuXxkWLU2pSE7qO_wJ" alt="question page" width=640 height=365>
    <br><br>
    <img src="https://drive.google.com/uc?export=view&id=130JgTp6j9iFTuEBMEFjwGY1SVpVYDS_v" alt="chatbot verification" width=310>
    &ensp;&ensp;
    <img src="https://drive.google.com/uc?export=view&id=1KQ35-G9KajcfVYMb8ptRSy6yx3XZlGGG" alt="chatbot answers" width=310>
</div>
<br>

## Features

- #### ChatBot
    - For answering authenticated users programming related questions and doubts.
    - To access it Two-factor Authentication(2FA) required
        - 1st factor: user need to be authenticated with their username and password.
        - 2nd factor: user need to authenticate with otp send to their registerd email.
    - The session with chatbot expires after 30 minutes of verified 2FA.

---
> Check Live Project at [here!](https://stack-o-flow.vercel.app)
