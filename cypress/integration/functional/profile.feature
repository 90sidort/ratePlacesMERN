Feature: User profile

    As a user I would like to have a way to check profile details, update data and archivize profile

    @seed
    Scenario: User navigates to followed/following users from profile details
        Given User "two" is logged in
        When User "two" navigates to profile
        Then User "two" profile is shown
        When User clicks "TestUser10" profile in "follows"
        Then User "ten" profile is shown
        When User "two" navigates to profile
        Then User "two" profile is shown
        When User clicks "TestUser4" profile in "follows"
        Then User "four" profile is shown

    Scenario: User navigates to his/her places from profile details
        Given User "two" is logged in
        When User "two" navigates to profile
        Then User "two" profile is shown
        When User clicks "see places button"
        Then User "two" places are shown

    Scenario: User changes profile data
        Given User "two" is logged in
        When User "two" navigates to profile
        Then User "two" profile is shown
        When User clicks "edit button"
        Then "Edit profile" page is displayed
        When User clears "update email"
        Then "Email" form error is shown
        And "Update user button" is "disabled"
        When User types "new email" in "update email"
        Then "Update user button" is "enabled"
        When User clears "update name"
        Then "Name" form error is shown
        And "Update user button" is "disabled"
        When User types "new name" in "update name"
        Then "Update user button" is "enabled"
        When User clears "update about"
        And User types "new about" in "update about"
        And User clicks "update user button"
        Then User "two updated" profile is shown

    @seed
    Scenario: User archives profile
        Given User "two" is logged in
        When User "two" navigates to profile
        Then User "two" profile is shown
        When User clicks "archive button"
        Then User is logged out
        And "Sign in" page is displayed