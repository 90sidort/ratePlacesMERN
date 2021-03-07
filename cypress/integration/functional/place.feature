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

    Scenario: User reads his place details
        Given User "two" is logged in
        When User clicks "my places navigation"
        And User selects place "TestPlace4"
        Then "TestPlace4" details are shown

    Scenario: User reads other user place list
        Given User "two" is logged in
        When User navigates to user "TestUser10" "places"
        Then User "ten" places are shown
        And Modify buttons are "not visible"
        When User clicks "view map button"
        Then Map modal is "visible"
        When User clicks "close map button"
        Then Map modal is "not visible"

    Scenario: User reads other user place details
        Given User "two" is logged in
        When User navigates to user "TestUser10" "places"
        And User selects place "TestPlace2"
        Then "TestPlace2" details are shown

    @seed
    Scenario: User cancels place deletion
        Given User "two" is logged in
        When User clicks "my places navigation"
        And User clicks delete "TestPlace4"
        Then Confirm modal is shown
        When User cancels deletion
        Then "TestUser2" places are shown

    Scenario: User deletes place
        Given User "two" is logged in
        When User clicks "my places navigation"
        And User clicks delete "TestPlace4"
        Then Confirm modal is shown
        When User confirms deletion
        Then "TestPlace4" is deleted

    @seed
    Scenario: User likes and unlikes place
        Given User "two" is logged in
        When User navigates to user "TestUser4" "places"
        Then User "four" places are shown
        When User likes place "TestPlace6"
        Then Place like count equals "1"
        When User unlikes place "TestPlace6"
        Then Place like count equals "0"

    Scenario: User comments and uncomments place
        Given User "two" is logged in
        When User navigates to user "TestUser4" "places"
        Then User "four" places are shown
        When User selects place "TestPlace6"
        Then "TestPlace6" details are shown
        When User types comment: "test_comment_1"
        And User adds comment
        Then Text "test_comment_1" was added
        When User deletes comment
        Then Comment is no longer shown