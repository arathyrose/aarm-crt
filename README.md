# AARM-CRT PROJECT

## Technology used

React js+firebase

## Design followed

<https://www.figma.com/file/ielGmEScTN5h3uqz6Xw40z/APM-CRT?node-id=0%3A1>

## To Host

```bash
npm run build
npm install firebase-tools -g
firebase login
firebase init
```

Here, select

- Hosting: Configure and deploy Firebase Hosting sites
- Use an existing project
- What do you want to use as your public directory? build
- Configure as a single-page app (rewrite all urls to /index.html)? Yes
- Set up automatic builds and deploys with GitHub? Yes (optional)
- File build/index.html already exists. Overwrite? No

```bash
npm run build
firebase deploy
```

## Tasks left

- [ ] Logging
  - [x] Page move logging
  - [x] User select option in Traditional task
  - [ ] User pickup option in AD task
  - [ ] User place option in stash in AD task
  - [ ] User place option in puzzle in AD task
  - [x] User check answer in example page
  - [x] User click next in task page
  - [x] User select clear in task page
  - [x] User select clear in example page
  - [x] User start puzzle in task page
  - [x] User start puzzle in example page
- [ ] AARM and DAARM puzzle support
  - [ ] Drag N Drop for mobile
- [x] CRT Image keep where?
  - [x] Firebase storage
- [ ] Feedback NASA TLX
- [ ] Timer Row for tasks

## Logging requirements

Logs: timestamp, uid, position, actionType, parameter

## Parameters for each action

- For all pages -- DONE
  - User going to the next page, pageChange
    - nextlocation
- For Traditional APM -- DONE
  - User selecting an option in the puzzle, optionSelect
    - optionId
- For other APM
  - User Picking up an option in the puzzle, optionPickup
    - optionId
    - visibleOptions
  - User Dropping an option in the puzzle, optionDrop
    - optionId
    - location
    - visibleOptions
    - puzzleStatus
  - User scrolling up and down in the option area, scroll
    - Direction
    - visibleOptions
    - puzzleStatus
- For CRT
  - User making a stoke in the CRT task, draw
    - Stoke in string format

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
