# AARM-CRT PROJECT

## Technology used

React js+firebase

## Design followed

<https://www.figma.com/file/ielGmEScTN5h3uqz6Xw40z/APM-CRT?node-id=0%3A1>

## Backend structure

### Collection: users

Participant_ID

- browser_details
  - browser_name
  - screen_height
  - screen_width
  - navigator_appVersion
  - navigator_userAgent
- ip_details
  - city
  - continentCode
  - continentName
  - countryCode
  - countryName
  - ipAddress
  - stateProv
- demographic
  - age
  - gender
- general
  - start_time
  - end_time
  - duration
  - APM_type
  - APM_score
- feedback
  - customFeedback
- CRT
  - 1
    - imageURL
    - score
    - logs
    - startTime
    - endTime
    - duration
  - 2 ...
- APM
  - APM_type
  - puzzleLogs
    - 1
      - puzzleType
      - APM_ID
      - score
      - startTime
      - endTime
      - duration
      - imageURL
      - finalPuzzleAnswer
      - logs
        - currentTime
        - timeElapsed
        - logType
        - parameters
        - currentPuzzle?
        - currentOptions?
    - 2 ...
- position

### Position

The position gives the URL last visited by the user. The possible positions are as follows

- start
  - /
  - /details/
  - /consent/
  - /guidelines/
- demographic
  - /instructions
  - /task
- task
  - /instructions
  - /example1
  - /example2
  - /demo
  - /puzzle
    - /1
    - /2
    - /3 ... /12
  - /conclusion
- crt
  - /instructions
  - /example1
  - /demo
  - /task1
  - /task2
  - /conclusion
- feedback
  - /instructions
  - /task
