These cypress tests are divided into three main folders i.e. play,watch & signup 

## Setup

Install dependencies

```
npm install
```
## Debugging
```
npm run cy:open
```

## Stan UI tests
To run cypress tests on a page:

```
npm run cy:run:play
npm run cy:run:signup
npm run cy:run:watch
```

## Framework:
Cypress is a great tool and have used in the past with minimal issues.
Cypress also has great community support and one tools provides everything i.e reporting, dashboard, multi-browser support etc.

## Structure:
While structuring tests i tried to cover all high traffic areas i.e home page, login, watch history etc.
Also while writing player test hit a road block where cypress was blocking playing videos ( no support for DRM).
Manage to fix player issue with community support, and which consumed most of my time.
It was difficult to get good selectors for Watch page, and it good to have test id which will make tests less flaky 
If I have more time, I would love to extend the player tests coverage and use better selectors for watch page
# pet-store-api
# pet-store-api
# pet-store-api
