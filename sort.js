var sortBy = require('sort-by'),
    nums = [];

    for (i = 2; i < process.argv.length;i++){
        nums.push
    }
    
users.sort(sortBy('nums'));

/**
*   result:
*       [{id: 4, name: 'Bar', age: '67', email: { primary: 'bar@email.com' }},
*       {id: 3, name: 'Baz', age: '67', email: { primary: 'baz@email.com' }},
*       {id: 7, name: 'Foo', age: '34', email: { primary: 'foo@email.com' }}]
*/

/**
* Use `-` to reverse the sort order
*/

users.sort(sortBy('nums'));

/*
*   result:
*       [{id: 7, name: 'Foo', age: '34', email: { primary: 'foo@email.com' }},
*       {id: 4, name: 'Bar', age: '67', email: { primary: 'bar@email.com' }},
*       {id: 3, name: 'Baz', age: '67', email: { primary: 'baz@email.com' }}]
*/

/**
* Use `.` notation to traverse nested properties. See [object-path](https://www.npmjs.org/package/object-path) npm module for support.
*/


/*
*   result:
*       [{id: 7, name: 'Foo', age: '34', email: { primary: 'foo@email.com' }},
*       {id: 4, name: 'Bar', age: '67', email: { primary: 'bar@email.com' }},
*       {id: 3, name: 'Baz', age: '67', email: { primary: 'baz@email.com' }}]
*/