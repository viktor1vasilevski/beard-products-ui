# Beard Products Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.
Just a small note that I was on a deadline with this project, and also I was new into Angular framework, so this is the code that I came up with.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

This is a front-end angular project for my back-end project, the clean-architecture-webapi https://github.com/viktor1vasilevski/clean-architecture-webapi.

Basicaly this was a excercise, and get more familiar working with Angular.
This project has two main parts. One is the admin part, where you can do CRUD operactions, and the other one is the user part where you can see the products as a normal user.

### Admin part
This is the logic for the CRUD operations. The data is represented in table, specifically ng2-smart-table, where all the filtering, sorting and paging are done for you.
CRUD operations are done with modals, not with separate pages, and this is because I thought it will be more challenging as a developer and more interesing from user perspective.

### User part
The user part is the part where you can navigate throug the page, load more products as you scroll down the page, load more description on each product, add to cart logic, also register and login part, view your cart items and so on.

## Things to improve
- There is no logic for buying products.
- Better UX/UI design.
  ### User part
- Much better UI/UX design for Add to cart page. The page in it self is functional but it has not so good design. The buttons at the bottom can be much better placed,   when you click on (+) or (-) it's selected the number in between the two signs. The description in the add to cart page is unnecessary, and it was there just to show   that I can show the whole desciption, despite that it's cut of in the user page.
- When you go from Soaps to Balms for example, there is a slight second delay. In other words, it takes time to take the soaps and show them. In between the time of     clicking and showing them, the "Show More" buttom and the footer will appear on the screen. I tried to handle this, but I was unsuccessful. The best solution for       this is to somehow wait for the products, and then load them. Include some spinner so something.

  ### Admin part
- The edit modal was troublesome. I couldn't use ngModel because the changes then will apply in the table at the same time, and then when I wanted to close the modal     the changes would stay. And when you refresh the page, normally, everything will be as it should be. Then the validation part came, and this part was tricky.
  As you can see in the code, it was not at all good solution and this will stay for me in the future to manage a better approach.
- Also the Edit and Delete button should have better design.


## External libraries used.
https://akveo.github.io/ng2-smart-table/#/
