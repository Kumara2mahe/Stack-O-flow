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
    <br><br>
    <img src="https://drive.google.com/uc?export=view&id=1EaQoNExc0c_epQOQaukTsdq0J6Hyc43s" alt="pricing page" width=640 height=365>
</div>
<br>

## Features

- #### ChatBot
    - For answering authenticated users programming related questions and doubts.
    - To access it Two-factor Authentication(2FA) required
        - 1st factor: user need to be authenticated with their username and password.
        - 2nd factor: user need to authenticate with otp send to their registerd email.
    - The session with chatbot expires after 30 minutes of verified 2FA.

- #### Subscription
    - For users to choose or purchase their plans for posting more content.
    - There are one free plan and two paid plans integrated with stripe payment gateway
        - Free plan (₹0): user can post only 2 questions and 1 answer per day.
        - Standard plan (₹150): user can post 10 questions and 5 answers per day
        - Premium plan (₹1999): user can post unlimited questions or answers.
    - For plans with limits are daily renewed, even they are not used.
    - Users can upgrade or cancel their plan anytime with stripe checkout and from customer portal.

---
> Check Live Project at [here!](https://stack-o-flow.vercel.app)
