Data encryption:
we will use bcrypt package for data encription.
add bcrypt to your project
  -> yarn add bcrypt

Then require bcrypt to your page.
  -> const bcrypt=require("bcrypt")
(there is a vast documentation on bcrypt in Google)

For instance of bcrypt: there is a hash method in bcrypt. Here we have to give our plain password and a saltRounds number. And they will give you the hash password.
  -> bcrypt.hash(plainpass, saltRound)

This hash pass word never back to plain text.


JWT
jwt token generation er jonno first e jeson web token package add korte hobe project e
  -> yarn add jsonwebtoken

then import it to your page
  -> const jwt=require("jsonwebtoken")
  ->const token=jwt.sign({username:user[0].username,userId:user[0]._id},"Secret Key");

  amra secret key .env te save korbo. we know we can fetch from .env by process.env.file_name.  but evabe dile hobe na. 
  jekarone amra ar ekta middleware use korbo.
  -> yarn add dotenv

  documentation dotenv npm in google
