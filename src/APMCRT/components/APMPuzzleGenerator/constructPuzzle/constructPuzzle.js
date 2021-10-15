function putPuzzle(puzzleID, showAllCombos = false) {
    console.log(puzzleID, APM_puzzle[puzzleID])
    document.getElementById("TEST").innerHTML += "<h2>" + puzzleID + " (APM " + APM_puzzle[puzzleID].apmId + " ) </h2>"
    document.getElementById("TEST").innerHTML += "<p> Showing " + APM_puzzle[puzzleID].rowCol + " </p>"
    let shapeMaker = APM_puzzle[puzzleID].makeShape
    let allShapes = APM_puzzle[puzzleID].puzzleCells
    let features = APM_puzzle[puzzleID].features
    document.getElementById("TEST").innerHTML += "<h3>  Puzzles </h3>"

    document.getElementById("TEST").innerHTML += "<div class='puzzleArea' id='TEST_PUZZLE_" + puzzleID.toString() + "'  style='background-color: #eeefff; margin: 0 auto; margin-bottom:20px; '> </div> "
    for (let i = 1; i <= 3; i++) for (let j = 1; j <= 3; j++) {
        let curShape = 'F' + i.toString() + j.toString()
        document.getElementById("TEST_PUZZLE_" + puzzleID.toString())
            .appendChild(shapeMaker(allShapes[curShape]))
    }

    document.getElementById("TEST").innerHTML += "<h3>  Options </h3>"
    document.getElementById("TEST").innerHTML += "<div class='optionArea' id='TEST_OPTION_" + puzzleID.toString() + "'  style='background-color: #efeffe; margin: 0 auto; margin-bottom:20px; '> </div> "
    for (let i = 1; i <= 8; i++) {
        let curShape = 'O' + i.toString()
        document.getElementById("TEST_OPTION_" + puzzleID.toString())
            .appendChild(shapeMaker(allShapes[curShape]))
    }

    if (showAllCombos) {
        document.getElementById("TEST").innerHTML += "<h3>  Random Shapes </h3>"
        document.getElementById("TEST").innerHTML += "<div class='allPossibleShapes' id='TEST_ALLPOSSIBLESHAPES_" + puzzleID.toString() + "'  style='background-color: #efeffe; margin: 0 auto; margin-bottom:20px; '> </div> "
        let numShapesTotal = 1
        for (let f in features) numShapesTotal *= features[f].example.length
        for (let i = 0; i < 8; i++) {
            curShape = {}
            for (let f in features) {
                // if (features[f].name=="numPaths")curShape[features[f].name] = 0; else 
                curShape[features[f].name] = features[f].example[Math.floor((Math.random() * features[f].example.length))];
            }
            //  document.getElementById("TEST_ALLPOSSIBLESHAPES_" + puzzleID.toString()).innerHTML += "<p style='color:black'>" + JSON.stringify(curShape).toString() + "</p>"
            document.getElementById("TEST_ALLPOSSIBLESHAPES_" + puzzleID.toString())
                .appendChild(shapeMaker(curShape))
        }
    }
}

function putallshapes() {
    let pp = Object.keys(APM_puzzle)
    // putPuzzle(2, true)
    for (let p in pp) {
        console.log(pp[p])
        putPuzzle(pp[p], true)
    }
}

function convertOptionIdToPuzzleCells(optionId, puzzleId) {
    let currentPuzzle = APM_puzzle[puzzleId]
    let optId = parseInt(optionId.substring(3))
    let optionOrder = currentPuzzle.optionOrder
    if (APM_type == "DETERMINATE")
        optionOrder = optionOrder.filter(item => item !== 'F33')
    return optionOrder[optId]
}