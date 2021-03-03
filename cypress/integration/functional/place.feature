Feature: Places

    As a user I want to be able to create, update, read and delete places so I can share my travels with others

    @seed
    Scenario: User creates new place
        Given User "two" is logged in
        When User clicks "add place navigation"
        Then Add place form is shown
        When User types "correct title" in "title input"
        And User selects "event" in type select
        And User types "correct about" in "about input"
        And User types "correct address" in "address input"
        Then "Add place button" is "enabled"
        When User types "description" in "description input"
        And User clicks "Add place button"
        Then User places list is shown
        And Place "Test place" is visible

    # Scenario: User tries to create new place with invalid data
    # Scenario: User tries to create new place with invalid address

    # Scenario: User edits place
    # Scenario: User tries to edit place with invalid data
    # Scenario: User tries to edit place with invalid address

    # Scenario: User reads his place list
    # Scenario: User reads his place details
    # Scenario: User reads other user place list
    # Scenario: User reads other user place details

    # Scenario: User deletes place

    # Scenario: User likes his own place
    # Scenario: User unlikes his own place
    # Scenario: User likes other user place
    # Scenario: User unlikes other user place

    # Scenario: User comments place
    # Scenario: User deletes comment from comment details