Feature: Signup/ signin

    As a user I want to be able to create an account and log in so I can use the app

    Scenario: User sings up with correct data
        Given User opens app
        When User clicks "navigation Sign in"
        Then "Sign in" page is displayed
        When User clicks "Sign up button"
        Then "Sign up" page is displayed
        When User types "correct username" in "username input"
        Then "Sign up button" is "disabled"
        When User types "correct email" in "email input"
        Then "Sign up button" is "disabled"
        And User types "correct password" in "password input"
        Then "Sign up button" is "enabled"
        When User clicks sign up to create account
        And User is logged
        And "All users" page is displayed
        And Created user profile is visible

    Scenario: User tries to sign up with incorrect data
        Given User opens app
        When User clicks "navigation Sign in"
        Then "Sign in" page is displayed
        When User clicks "Sign up button"
        Then "Sign up" page is displayed
        When User types "incorrect username" in "username input"
        Then "Sign up button" is "disabled"
        When User types "incorrect email" in "email input"
        Then "Name" form error is shown
        And "Sign up button" is "disabled"
        When User types "incorrect password" in "password input"
        Then "Email" form error is shown
        And User defocuses last field
        Then "Password" form error is shown
        And "Sign up button" is "disabled"

    Scenario: User logs in with valid data
        Given User opens app
        When User clicks "navigation Sign in"
        Then "Sign in" page is displayed
        And "Sign in button" is "disabled"
        When User types "valid email" in "email input"
        And User types "valid password" in "password input"
        Then "Sign in button" is "enabled"
        When User clicks "Sign in button"
        Then User is logged
        And "All users" page is displayed

    Scenario: User tries to log in with invalid data
        Given User opens app
        When User clicks "navigation Sign in"
        Then "Sign in" page is displayed
        And "Sign in button" is "disabled"
        When User types "invalid email" in "email input"
        And User types "invalid password" in "password input"
        Then "Sign in button" is "enabled"
        When User clicks "Sign in button"
        Then Error modal "user does not exist" is shown
        When User clicks "Okay button"
        Then "Sign in" page is displayed

    Scenario: User tries to log in with invalid password
        Given User opens app
        When User clicks "navigation Sign in"
        Then "Sign in" page is displayed
        And "Sign in button" is "disabled"
        When User types "valid email" in "email input"
        And User types "invalid password" in "password input"
        Then "Sign in button" is "enabled"
        When User clicks "Sign in button"
        Then Error modal "wrong password" is shown
        When User clicks "Okay button"
        Then "Sign in" page is displayed

    Scenario: User tries to log in with archived account
        Given User opens app
        When User clicks "navigation Sign in"
        Then "Sign in" page is displayed
        And "Sign in button" is "disabled"
        When User types "archived email" in "email input"
        And User types "valid password" in "password input"
        Then "Sign in button" is "enabled"
        When User clicks "Sign in button"
        Then Error modal "archived user" is shown
        When User clicks "Okay button"
        Then "Sign in" page is displayed