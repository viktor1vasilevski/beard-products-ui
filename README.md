# Beard Products Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

This is a front-end angular project for my back-end project, the clean-architecture-webapi https://github.com/viktor1vasilevski/clean-architecture-webapi.

Basicaly this was a excercise, and get more familiar working with Angular.
This project has two main parts. One is the admin part, where you can do CRUD operactions, and the other one is the user part where you can see the products as a normal user.

### Admin part
This is the logic for the CRUD operations. The data is represented in table, specifically ng2-smart-table, where all the filtering, sorting and paging are done for you.
CRUD operations are done with modals, not with separate pages, and this is because I thought it will be more challenging and more interesing from user perspective.

### User part
The user part is the part where you can navigate throug the page, load more products as you scroll down the page, load more description on each product, add to cart logic, also register and login part, view your cart items and so on.

## Things to improve
- ovde kje napisi deka nema logika za kupuvajne
  ### Admin part
- Much better UI/UX design for Add to cart page. The page is it self functional but it has not so good design. The buttons at the bottom can be much better placed, when   you click on (+) or (-) it's selected the number in between the two signs. The description in the cart page is unnecessary, and it was there just to show that I can     show the whole desciption, despite that it's cut of in the user page.
- When 


## External libraries used.
https://akveo.github.io/ng2-smart-table/#/
