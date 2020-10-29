## Background and Overview

The philosopher Arthur Schopenhauer held that the “world” consists of lawfully repeating patterns of “representations” beneath which surges an unrepresentable, violent “will” which cannot be captured by law or representation. Against this metaphysical background, he accorded music a special status in comparison with the other arts. Whereas other forms of art sought to elevate by means of idealizing from representations to yet more general representations, music sought to express this will directly “in itself” without representing it.

Our app pays homage to this conflict between music and visual representation by allowing users to engage in creative free play by making their own visualizers for music they upload. We encourage the spirit of music as Schopenhauer saw it, but in the realm of the visual, and over the medium of technology.

## Functionality and MVP

### 1. Hosting on Heroku (10/13/2020)

### 2. New account creation, login, and guest/demo login (10/14/2020, 1 days/2 person)

- Users can sign up, sign in, log out

* Users can use a demo login to try the site

### 3. Modifying Visualizers

- Can extract freq and amp from sound file to create Waveforms
- Users will go through keys will
- Have adjustable controllers for the visualizer

### 4. Sound File (2days/ 2 person)

- Successfully upload a sound file
- User can see sound files uploaded
- User can play the sound file uploaded
- Playing songs with progress bar with continuous play

### 5. CRUD for Visualizers

- Have template visualizer/Wave forms
- User can select template visualizers
- User can save the interactive visualizers they created
- User can share

### 6. User Profile Page

- User can follow and like other users
- User can view user information
- User can edit user information

### 7. Production README

## Wireframe

### Landing page

![landing-page-demo](https://github.com/eric2523/Schopenhauer/blob/main/demo-images/landing-page-wireframe.jpg?raw=true)

### Signup/Login Modal

![sign-up-login-demo](https://github.com/eric2523/Schopenhauer/blob/main/demo-images/signup-login-wireframe.jpg?raw=true)

### Visualizer

![visualizer-demo](https://github.com/eric2523/Schopenhauer/blob/main/demo-images/visualizer-wireframe.jpg?raw=true)

## Technologies and Technical Challenges

### Backend

- Node
- Express
- MongoDB
- p5

### Frontend

- React
- React Native with Redux
- HTML
- CSS

## Group Members and Work Breakdown

Eric Xian - Front End (Visualizers Comments and like)
Hal Parker - Back End (User and Sound File)
Nathan Chau - Front End (User and Sound File)
Yuehan Huang - Back End/Lead (Visualizers Comments and like)

### Day 1

User Backend/Frontend Auth / demo user--Hal
User Frontend/Splash/Modal Auth ---Nathan
Visualizer page sketelton frontend. --- Eric
Visualizer backend. with wavefunction conversion to data and data analysis ---Yuehan

### Day 2

Song Uploads-- Hal, Nathan
Visualizer page + song playback -Eric
Visualizer backend. with wavefunction conversion to data and data analysis ---Yuehan, Eric
Push to heroku--Yuehan, Eric

### Day 3

Visualizer template CRUDs -Eric, Yuehan
Visualizer components/ display physics engine - Hal and Nathan

### Day 4

User profile page- Eric, Yuehan
User can follow other users -- Eric, Yuehan
User can like other user's visulizer --Eric, Yuehan
Visualizer components/ display physics engine - Hal and Nathan

### Day 5

CSS, touch up, test --- all

### Day 6 + Day 7

Bonus, generate set visulizer to song quiz -all
Bonus, floating comments-all
