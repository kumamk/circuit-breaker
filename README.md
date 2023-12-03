## Description

The Circuit Breaker, a popular software design pattern to deal with the problem of fault tolerance.
It monitors for failures, and when the failures reach a certain threshold, it trips and none of the successive calls will be forwarded to the upstream resource.

The api failure is mimic using random number generator but can be tested using real end point of external service.

## Pre Requirements

* Nodejs and npm installed in the system
* Any supported IDE. (VSCode)

## Running the app

```bash
# development
$ npm run start

# Should see localhost:3000 end point up
```

## Test

```bash
# run the server in 1st terminal
$ npm run start

# run the test in 2nd terminal
$ npm run test

# sample logs
{ data: 'Success', Successes: 0, Failures: 0, State: 'GREEN' }
{ ok: true }
{ data: 'Failure', Successes: 0, Failures: 1, State: 'GREEN' }
Request failed with status code 400
{ data: 'Failure', Successes: 0, Failures: 2, State: 'GREEN' }
Request failed with status code 400
{ data: 'Success', Successes: 0, Failures: 0, State: 'GREEN' }
```