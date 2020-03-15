# **Hello! This is an app for testing purposes**

On the backend I've changed the Signin method to return user_id. Because, my requests were blocked by row level policy even though I included a correct token on my side.

Even Postman API config that I've imported from file wasn't working with correct token. Token is correct because I've monitored it on the backend side and have seen correct username. But didn't managed to fix that issues. Adding user_id to request solves the problem. I did so.
