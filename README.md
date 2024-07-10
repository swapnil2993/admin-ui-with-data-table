# Data Table

## **Install and Run Locally**

```
$ git clone https://github.com/swapnil2993/admin-ui-with-data-table
$ cd admin-ui-with-data-table
$ npm install
$ npm start
```

## **Testing**

```
$ npm run test
```

## **Build and preview**

You may run npm run build command to build the app.

```
$ npm run build
```

By default, the build output will be placed at dist. You may deploy this dist folder to any of your preferred platforms.

Once you've built the app, you may test it locally by running npm run preview command.

```
$ npm run preview
```

The vite preview command will boot up a local static web server that serves the files from dist at http://localhost:4173.<br>
It's an easy way to check if the production build looks OK in your local environment.

## Requirements

- [x] Column titles must stand out from the entries.
- [x] There should be a search bar that can filter on any property.
- [x] You should be able to edit or delete rows in place. (There is no expectation of persistence. Edit and delete are expected to only happen in memory.)
- [x] You need to implement pagination: Each page contains 10 rows. Buttons at the bottom allow you to jump to any page including special buttons for first page, previous page, next page, and last page. Pagination must update based on search/filtering. If there are 25 records, for example, that match a search query, then pagination buttons should only go till page 3.
- [x] You should be able to select one or more rows. A selected row is highlighted with a grayish background color. Multiple selected rows can be deleted at once using the 'Delete Selected' button at the bottom left.
- [x] Checkbox on the top left is a shortcut to select or deselect all displayed rows. This should only apply to the ten rows displayed on the current page, and not all 50 rows.

## Assumptions

- Using a template like Template used: React + TypeScript + Vite should be ok.
- Refering to docs while development is ok.

### Additional packages used

- Jest, Testing Library, and related dependencies for unit testing.
- React-Lucide for icons

### Demo 
[Demo Line](https://swapnil2993.github.io/admin-ui-with-data-table/)


![Screenshot 2024-07-10 at 6 59 29 PM](https://github.com/swapnil2993/admin-ui-with-data-table/assets/6229452/33a659a5-33f8-4bc1-9d0e-108950de9bff)

