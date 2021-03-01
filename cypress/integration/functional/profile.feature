Feature: User profile

    As a user I would like to have a way to check profile details, update data and archivize profile

    @seed
    Scenario: User navigates to followed/following users from profile details
        Given User "two" is logged in
        When User navigates to profile
        Then User "two" profile is shown
        When User clicks "TestUser10" profile in "follows"
        Then User "ten" profile is shown
        When User navigates to profile
        Then User "two" profile is shown
        When User clicks "TestUser4" profile in "followed"
        Then User "four" profile is shown

    Scenario: User navigates to his/her places from profile details
        Given User "two" is logged in
        When User navigates to profile
        Then User "two" profile is shown
        When User clicks "see places button"
        Then User "two" places are shown

    Scenario: User archives profile
        Given User "two" is logged in
        When User navigates to profile
        Then User "two" profile is shown
        When User clicks "archive button"
        Then User is logged out
        And "Sign in" page is displayed

    @seed
    Scenario: User tries to change profile data with invalid inputs
        Given User "two" is logged in
        When User navigates to profile
        Then User "two" profile is shown
        When User clicks "edit button"
        Then "Edit profile" page is displayed
        And "Update user button" is "enabled"
        When User clears "email input"
        Then "Update user button" is "disabled"
        When User types "incorrect email" in "email input" 
        And User clears "username input"
        Then "Email" form error is shown
        When User types "incorrect username" in "username input"
        And User clears "about input"
        Then "Update user button" is "disabled"
        And "Name" form error is shown

    Scenario: User changes profile data
        Given User "two" is logged in
        When User navigates to profile
        Then User "two" profile is shown
        When User clicks "edit button"
        Then "Edit profile" page is displayed
        And "Update user button" is "enabled"
        When User clears "email input"
        And User types "changed email" in "email input"
        Then "Update user button" is "enabled"
        When User clears "username input"
        And User types "changed name" in "username input"
        Then "Update user button" is "enabled"
        When User clears "about input"
        And User types "changed about" in "about input"
        Then "Update user button" is "enabled"
        When User clicks "Update user button"
        Then Changed profile is displayed