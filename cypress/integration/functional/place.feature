Feature: Places

    As a user I want to be able to create, update, read and delete places so I can share my travels with others

    @seed
    Scenario: User creates new place
        Given User "two" is logged in
        When User clicks "add place navigation"
        Then "Add" place form is shown
        When User types "correct title" in "title input"
        And User selects "event" in type select
        And User types "correct about" in "about input"
        And User types "correct address" in "address input"
        Then "Add place button" is "enabled"
        When User types "description" in "description input"
        And User clicks "Add place button"
        Then User places list is shown
        And Place "Test place" is visible "2"

    Scenario: User tries to create new place with invalid data
        Given User "two" is logged in
        When User clicks "add place navigation"
        Then "Add" place form is shown
        When User types "incorrect title" in "title input" - shortcut
        And User selects "event" in type select
        Then "Title" form error is shown
        When User types "incorrect about" in "about input" - shortcut
        And User types "incorrect address" in "address input" - shortcut
        Then "About" form error is shown
        When User types "description" in "description input" - shortcut
        Then "Address" form error is shown
        And "Add place button" is "disabled"

    Scenario: User tries to create new place with invalid address
        Given User "two" is logged in
        When User clicks "add place navigation"
        Then "Add" place form is shown
        When User types "correct title" in "title input"
        And User selects "event" in type select
        And User types "correct about" in "about input"
        And User types "invalid address" in "address input"
        Then "Add place button" is "enabled"
        When User types "description" in "description input"
        And User clicks "Add place button"
        Then Error modal "wrong address" is shown
        When User clicks "Okay button"
        Then "Add" place form is shown

    @seed
    Scenario: User tries to edit place with invalid data
        Given User "two" is logged in
        When User clicks "my places navigation"
        Then "TestUser2" places are shown
        When User clicks "edit place 4"
        Then "Edit" place form is shown
        When User clears "title input"
        And User types "incorrect title" in "title input" - shortcut
        And User selects "site" in type select
        Then "Title" form error is shown
        When User clears "about input"
        And User types "incorrect about" in "about input" - shortcut
        And User clears "address input"
        Then "About" form error is shown
        When User types "incorrect address" in "address input" - shortcut
        And User clears "description input"
        Then "Address" form error is shown
        And User types "description" in "description input"
        Then "Update place button" is "disabled"

    Scenario: User tries to edit place with invalid address
        Given User "two" is logged in
        When User clicks "my places navigation"
        Then "TestUser2" places are shown
        When User clicks "edit place 4"
        Then "Edit" place form is shown
        When User clears "address input"
        And User types "invalid address" in "address input"
        And User clicks "Update place button"
        Then Error modal "wrong address" is shown
        When User clicks "Okay button"
        Then "Edit" place form is shown

    Scenario: User edits place
        Given User "two" is logged in
        When User clicks "my places navigation"
        Then "TestUser2" places are shown
        When User clicks "edit place 4"
        Then "Edit" place form is shown
        When User clears "title input"
        And User types "correct title" in "title input"
        And User selects "site" in type select
        And User clears "about input"
        And User types "correct about" in "about input"
        And User clears "address input"
        And User types "correct address" in "address input"
        And User clears "description input"
        And User types "description" in "description input"
        And User clicks "Update place button"
        Then User places list is shown
        And Place "Test place" is visible "0"

    @seed
    Scenario: User reads his place list
        Given User "two" is logged in
        When User clicks "my places navigation"
        Then "TestUser2" places are shown
        And Modify buttons are "visible"
        When User clicks "view map button"
        Then Map modal is "visible"
        When User clicks "close map button"
        Then Map modal is "not visible"

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