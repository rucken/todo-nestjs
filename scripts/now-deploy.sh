#!/bin/bash
now rm todo-core-nestjs -y
now --public
now alias
now --local-config postgres-now.json --public
now --local-config postgres-now.json alias
read -p "Press any key to continue... " -n1 -s
