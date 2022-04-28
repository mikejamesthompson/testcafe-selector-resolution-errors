# Implicit Selector resolution issue in TestCafé

This repo illustrates an issue with TestCafé throwing Selector resolution
errors when reusing a selector within a forEach loop with async callbacks.

## Running with Docker

To run the tests:
```
make
```

## Running locally without Docker

```
./run_tests.sh
```