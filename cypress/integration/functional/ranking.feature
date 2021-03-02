Feature: Rankings

    As a user I'd like to have places and users ranked by popularity so I can easily get best content

    @seed
    Scenario: User navigates to users ranking
        Given User "two" is logged in
        When User navigates to users ranking
        Then "User ranking" page is displayed
        And Users popularity is shown correctly

    Scenario: User navigates to places ranking
        Given User "two" is logged in
        When User navigates to places ranking
        Then "Place ranking" page is displayed
        And Places popularity is shown correctly

    Scenario: User unlikes place and navigates to places ranking
        Given User "two" is logged in
        When User navigates to user "TestUser2" "places"
        Then "TestUser2" places are shown
        When User unlikes place "TestPlace4"
        Then Place like count equals "1"
        When User navigates to places ranking
        Then "Place ranking" page is displayed
        And Places popularity is changed

    Scenario: User unfollows user and navigates to users ranking
        Given User "two" is logged in
        When User navigates to user "TestUser3" "places"
        Then User "three" places are shown
        When User unfollows 
        Then Followers count equals "1"
        When User navigates to users ranking
        Then "User ranking" page is displayed
        And Users popularity is changed