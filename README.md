# pact-hell

## How to recreate this repository:

### Pact Hell

#### Make a working directory
`mkdir hell`

#### Setup your tests using Mocha
`npm install --save-dev mocha`


`npm install --save-dev chai`


`npm install --save-dev axios`

Add 

```
"scripts": {
   "test": "mocha"
   } 
```
to your package.json (create it if it doesn't exist)

#### Copy tests from the pact-js Karma example 
Copy the tests from `https://github.com/pact-foundation/pact-js/tree/master/examples/mocha` and put them in `test`
and copy `index.js` and put it in `hell`

#### Modify the tests

Replace `('../../../dist/pact') with ('@pact-foundation/pact')` in both test files and then install @pact-foundation/pact


`npm install --save-dev @pact-foundation/pact`

#### run the tests

`npm install`


`npm run test`

It should generate a pact file and all the tests ought to pass
