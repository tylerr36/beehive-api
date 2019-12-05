# Beehive API - Built with MongoDB, Mongoose, and Express

This interactive app allows users to view, create, and RSVP to events (referred to as 'listings' throughout the code). In addition, the user can view all events to which they've RSVPed, and view, modify or delete events they've created.

## Important Links
  - [Deployed front end client](https://ga-zero-to-hero.github.io/beehive-client/)
  - [Front end client repository](https://github.com/ga-zero-to-hero/beehive-client)
  - [Deployed back end API](https://vast-depths-99590.herokuapp.com/)
  - [GitHub Repo for project's back end](https://github.com/ga-zero-to-hero/beehive-api)

## Back-end Technologies Used
  - MongoDB
  - Mongoose
  - Express

## Events
| Verb | URI Pattern | Controller#Action |
|------|-------------|-------------------|
| GET  | /listings    | listings#index     |
| GET  | /listings/:id  | listings#show      |
| GET | /user-listings | listings#userlistings |
| POST  | /listings  | listings#create      |
| PATCH  | /listings/:id  | listings#update      |
| DELETE  | /listings/:id  | listings#destroy      |

## Development & Problem Solving Process
  - We created an ERD to represent the relationships between our users, event listings, and RSVPs.
  - The team was methodical about creating empty files/folder for all aniticipated needs, so that when the team split up to work on feature branches, it was clear to each member what every file/folder's purpose was. This also was a strong way to be sure that all team members had a visual representation of what files had and had not yet been completed.
  - We used pair programming to complete all routes and models. It proved beneficial to employ this strategy, as we completed this process within the first hours of the project, at a time when it was still worthwhile to build familiarity with the project's foundation before working by oneself.
  - Curl script testing was completed, allowing our team to continue on to the front-end.

  ![Entity Relationship Diagram](https://i.imgur.com/8kw64Kj.png)

## Unsolved Problems
- The process of building the back-end went very smoothly and was finished within the first day of the project.
