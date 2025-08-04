## Setup Instructions
1- Clone the repository
2- Install dependencies `npm i`
3- Create a .env file in the root directory and add
      For client Folder: 
 `VITE_API_BASE_URL=http://localhost:2000`

      For server Folder: 
` URL="mongodb+srv://admin:ypfuMo4ZLbH5qhUw@cluster0.jhm0uxe.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"`
 `PORT=2000`
 `JWT_SECRET=f6605afff77acf5070cc0d6f981e92c21650e2868f95c9d493fb916a183ee4e707b1ae7e018053bde74cf1039ddf7435bc3911d705b46973501d821e44611831`

 4- Run the development server using `npm run dev`


 ## API Overview

 1- For User Authentication & Roles

 METHOD |                 API                  |  DESCRIPTION

 POST:    http://localhost:2000/auth/login     |  Allows users to login where a token is 
                                               | then created that holds the user role and information

 POST:    http://localhost:2000/auth/logout    | logouts a user

 POST:    http://localhost:2000/auth/register  | Any user can register with a default role of "user". 
                                               | Only a single account is created for the admin (Find credentials below)

 GET:     http://localhost:2000/auth/verify-logged-token |   To check if a user is logged in and to 
                                                             get the user's info from the token


2- For Products

 METHOD |                 API                  |  DESCRIPTION

 POST:    http://localhost:2000/products/     |  To create a new product/book where only logged in admins are allowed

 DELETE:  http://localhost:2000/products      | To delete a product/book where only logged in admins are allowed

 GET:    http://localhost:2000/products       | To fetch all products where isDeleted=false and is visible to all users

 GET:     http://localhost:2000/products/search |  To search for products by product name or author and is visible to all users

 GET:    http://localhost:2000/products/:id    | To fetch a single product by it's id

 PUT:    http://localhost:2000/products/:id    | To edit the info of a specific product where only logged in admins are allowed

 PUT:    http://localhost:2000/products/soft-delete/:id   | To soft-delete a product where only logged in admins are allowed


 3- For Stats

  METHOD |                 API                  |  DESCRIPTION

 GET:           http://localhost:2000/stats     |  To fetch the total inventory quantity, products, and categories in the dahsboard
                                                    where only logged in admins are allowed


 3- For Categories

  METHOD |                 API                  |  DESCRIPTION

 GET:           http://localhost:2000/categories     |  To fetch all categories and is visible to all users

 DELETE:        http://localhost:2000/categories/:categoryId   |  To delete a category where only logged in admins are allowed

 POST:        http://localhost:2000/categories  |  To post a category where only logged in admins are allowed



## Demo Credentials

Admin --->  email: add@gmail.com
            password: layla@123

You can register and log in as a regular user ex:
User ----> email:user@gmail.com
           password:layla@123


## Any Assumptions or Tradeoffs

Due to personal reasons, I was only able to begin work on the project recently. Therefore, there is potential for future enhancements to improve the website's usability and security.