#!/bin/bash

npm run start &
npm run test-chrome

exit $?
