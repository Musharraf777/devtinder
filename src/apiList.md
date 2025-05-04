# DeveTinter Api's
  # authRouter
- Post /signup
- Post /login
- Post /logout

  # profileRouter
- GET /profile/view
- Patch /profile/edit  [update - gender, age, DOB]
- Patch /profile/forgot/password

  # connectionRequestRouter
- Post /request/send/interested/:userId
- Post /request/send/ignore/:userId
- Post /request/review/accepted/:requestId
- Post /request/review/rejected/:requestId

  # userRouter
- GET /user/connection [Kitne match  aaye mujhe (match)]
- GET /user/requests [Kitne request aaye friend ke liye]
- GET /user/feed - gets you the profiles of other users on platform



 Status : ignore, interested, accepted, rejected


 # note
 - Explore tinder Apis
 - Create a list app api you can think of in dev tinder
 - Group multiple routes under repective routers


