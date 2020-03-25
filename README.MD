# **Hello! This is an app for testing purposes**

It's written on TypeScript, with use of Apollo GraphQL. The main feature here is offline work. You can shutdown server and continue to use the app. Even close it and remove from memory. Eevery request will be saved and then delivered only when server will come back online.

On the backend I've changed the Signin method to return user_id. Because, my requests were blocked by row level policy even though I included a correct token on my side.

Even Postman API config that I've imported from file wasn't working with correct token. Token is correct because I've monitored it on the backend side and have seen correct username. But didn't managed to fix that issues. Adding user_id to request solves the problem. I did so.


