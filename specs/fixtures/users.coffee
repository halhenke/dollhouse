faker = require "faker"

uniqueGuy = 
  name:
    first: "Don"
    last: "Johnson"
  email: "donjohnson@gmail.com"
  # location: "54e38ffc8d3aeee25bfcc648"
  password: "donisbon"
  isAdmin: no

adminGuy = 
  name:
    first: "Emperor"
    last: "Nero"
  email: "nero@gmail.com"
  # location: "54e38ffc8d3aeee25bfcc648"
  password: "largeandincharge"
  isAdmin: yes


module.exports =
  adminGuy: adminGuy
  uniqueGuy: uniqueGuy
  userList: [
    uniqueGuy
    adminGuy
    {
      # slug: "annabelle"
      name:
        first: faker.name.firstName()
        last: faker.name.lastName()
      email: faker.internet.email
      # location: "54e38ffc8d3aeee25bfcc648"
      password: faker.internet.passwoord
      isAdmin: no
    }
    {
      # slug: "annabelle"
      name:
        first: faker.name.firstName()
        last: faker.name.lastName()
      email: faker.internet.email
      # location: "54e38ffc8d3aeee25bfcc648"
      password: faker.internet.passwoord
      isAdmin: no
    }
    {
      # slug: "annabelle"
      name:
        first: faker.name.firstName()
        last: faker.name.lastName()
      email: faker.internet.email
      # location: "54e38ffc8d3aeee25bfcc648"
      password: faker.internet.passwoord
      isAdmin: no
    }
  ]

