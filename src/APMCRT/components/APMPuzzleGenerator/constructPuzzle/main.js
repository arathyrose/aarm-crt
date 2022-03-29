import { CONFIG } from "./config"
import {
    makeCircle, makeLine, makeCurve2, makeElipticalPath, makeFinalSVG,
    makeInto1D, makePolygon, makeRectangle, drawSmallSquare_1, drawSmallSquare_2, sides, drawBorder, getSideElement
} from "./svg_maker"

// Global parameters related to APM puzzle
export const givenPuzzles = {
    COL: ["F11", "F21", "F31"],
    ROW: ["F11", "F12", "F13"],
}
export const sampleOptions = {
    COL: ['F23', 'F13', 'CE2', 'F33', 'F22', 'F32', 'F12', 'CE1'],
    ROW: ['F23', 'CE1', 'F31', 'CE2', 'F33', 'F22', 'F32', 'F21'],
}
export const APM_IDs = {
    "demo": [2, 7],// [2, 7],
    "VA": [4, 8, 13, 17, 21, 34],
    "VS": [3, 9, 12, 18, 22, 33],
    "1": [3, 8, 12, 17, 22, 34],
    "2": [4, 9, 13, 18, 21, 33],
    "final": [3, 9, 22, 4, 8, 13]
}

export const traditionalPuzzleElements = {
    puzzle: ["F11", "F12", "F13", "F21", "F22", "F23", "F31", "F32", "F33"],
    options: ["O1", "O2", "O3", "O4", "O5", "O6", "O7", "O8"]
}
export const APM_puzzle = {
    1: {
        type: "NA",
        apmId: 1,
        rowCol: "ROW",
        givenPuzzles: {
            "A": { given: ['F11', 'F12', 'F13'], options: ['F22', 'F31', 'CE1', 'F32', 'CE2', 'F21', 'F23', 'F33'] },
            "D": { given: ['F11', 'F12', 'F13', 'F33'], options: ['F22', 'F31', 'CE1', 'F32', 'CE2', 'F21', 'F23'] },
            "T": { given: ['F11', 'F12', 'F13', 'F21', 'F22', 'F23', 'F31', 'F32'], options: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'] }
        },
        possibleAnswers: {
            "T": [5],
            "A": [[['', '', ''], [5, 0, 6], [1, 3, 7]]],
            "D": [[['', '', ''], [5, 0, 6], [1, 3, '']]]
        },
        commonErrors: [2, 1],
        correctOption: 5,
        features: [
            { name: "shape", example: ["circle", "diamond", "square", "hexagon", "empty"], default: "empty" },
            { name: "numline", example: [0, 1, 2, 3], "default": 0 },
            { name: "orientline", example: ["left", "right", "straight", "both"], default: "straight" },
        ],
        puzzleCells: {
            F11: { shape: "circle", numline: 1, orientline: "right" },
            F12: { shape: "diamond", numline: 1, orientline: "left" },
            F13: { shape: "square", numline: 1, orientline: "straight" },
            F21: { shape: "diamond", numline: 2, orientline: "straight" },
            F22: { shape: "square", numline: 2, orientline: "right" },
            F23: { shape: "circle", numline: 2, orientline: "left" },
            F31: { shape: "square", numline: 3, orientline: "left" },
            F32: { shape: "circle", numline: 3, orientline: "straight" },
            F33: { shape: "diamond", numline: 3, orientline: "right" },
            O1: { shape: "square", numline: 3, orientline: "straight" },
            O2: { shape: "diamond", numline: 2, orientline: "left" },
            O3: { shape: "circle", numline: 1, orientline: "right" },
            O4: { shape: "circle", numline: 3, orientline: "straight" },
            O5: { shape: "diamond", numline: 3, orientline: "right" },
            O6: { shape: "circle", numline: 2, orientline: "left" },
            O7: { shape: "square", numline: 3, orientline: "both" },
            O8: { shape: "diamond", numline: 1, orientline: "straight" },
        },
        makeShape: (curShape) => {
            const shapePaths = {
                circle: makeCircle(100, 100, 35),
                square: makeRectangle([135, 135], [65, 65]),
                diamond: makePolygon([[100, 65], [135, 100], [100, 135], [65, 100]]),
                hexagon: makePolygon([[100, 60], [70, 85], [70, 115], [100, 140], [130, 115], [130, 85]]),
                empty: "",
            }
            const line = [
                [makeLine([30, 100], [170, 100])],
                [makeLine([30, 90], [170, 90]), makeLine([30, 110], [170, 110])],
                [makeLine([30, 85], [170, 85]), makeLine([30, 100], [170, 100]), makeLine([30, 115], [170, 115])],
            ]
            const rotation = {
                "straight": 90,
                "left": 45,
                "right": -45
            }
            let shape = curShape.shape ? curShape.shape : "empty"
            let numline = curShape.numline ? curShape.numline : 0
            let orientline = curShape.orientline ? curShape.orientline : "straight"
            // to do: build the shape
            let constituents = [{
                pathProperty: {
                    "d": shapePaths[shape],
                    "stroke": CONFIG.BLACK,
                    "stroke-width": CONFIG.WIDTH.THICK,
                    "fill": CONFIG.NOFILL
                },
                transformProperty: {}
            },]
            for (let lpath in line[numline - 1]) {
                if (orientline === "both") {
                    constituents.push({
                        pathProperty: {
                            "d": line[numline - 1][lpath],
                            "stroke": CONFIG.BLACK,
                            "stroke-width": CONFIG.WIDTH.NARROW,
                            "fill": CONFIG.NOFILL,
                            "stroke-dasharray": CONFIG.DASHED.NORMAL
                        },
                        transformProperty: { rotate: rotation["left"] }
                    })
                    constituents.push({
                        pathProperty: {
                            "d": line[numline - 1][lpath],
                            "stroke": CONFIG.BLACK,
                            "stroke-width": CONFIG.WIDTH.NARROW,
                            "fill": CONFIG.NOFILL,
                            "stroke-dasharray": CONFIG.DASHED.NORMAL
                        },
                        transformProperty: { rotate: rotation["right"] }
                    })
                } else {
                    constituents.push({
                        pathProperty: {
                            "d": line[numline - 1][lpath],
                            "stroke": CONFIG.BLACK,
                            "stroke-width": CONFIG.WIDTH.NARROW,
                            "fill": CONFIG.NOFILL,
                            "stroke-dasharray": CONFIG.DASHED.NORMAL
                        },
                        transformProperty: { rotate: rotation[orientline] }
                    })
                }
            }
            let finalSVG = makeFinalSVG(constituents, {})
            return finalSVG;
        },
    },
    2: {
        type: "NA",
        apmId: 2,
        rowCol: "ROW",
        givenPuzzles: {
            "A": { given: ['F11', 'F12', 'F13'], options: ['F31', 'F23', 'F33', 'CE1', 'F21', 'CE2', 'F22', 'F32'] },
            "D": { given: ['F11', 'F12', 'F13', 'F33'], options: ['F31', 'F23', 'CE1', 'F21', 'CE2', 'F22', 'F32'] },
            "T": { given: ['F11', 'F12', 'F13', 'F21', 'F22', 'F23', 'F31', 'F32'], options: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'] }
        },
        commonErrors: [2, 7], correctOption: 1,
        possibleAnswers: {
            "T": [1],
            "A": [[['', '', ''], [4, 6, 1], [0, 7, 2]], [['', '', ''], [4, 6, 1], [0, 3, 2]]],
            "D": [[['', '', ''], [3, 5, 1], [0, 6, '']], [['', '', ''], [3, 5, 1], [0, 2, '']]],
        },
        features: [
            { name: "numPaths", example: [0, 1, 2, 3], default: 0 },
            { name: "orientline", example: [[], [0], [1], [2], [0, 1], [0, 2], [1, 2], [0, 1, 2],], default: [] },
            { name: "earlyBreak", example: [true, false], default: false }
        ],
        puzzleCells: {
            F11: { numPaths: 1, orientline: [2] },
            F12: { numPaths: 1, orientline: [1] },
            F13: { numPaths: 1, orientline: [0] },
            F21: { numPaths: 2, orientline: [2] },
            F22: { numPaths: 2, orientline: [1] },
            F23: { numPaths: 2, orientline: [0] },
            F31: { numPaths: 3, orientline: [2] },
            F32: { numPaths: 3, orientline: [1] },
            F33: { numPaths: 3, orientline: [0] },
            O1: { numPaths: 3, orientline: [0] },
            O2: { numPaths: 3, orientline: [1] },
            O3: { numPaths: 2, orientline: [0] },
            O4: { numPaths: 2, orientline: [1] },
            O5: { numPaths: 3, orientline: [2] },
            O6: { numPaths: 3, orientline: [0, 1, 2] },
            O7: { numPaths: 3, orientline: [] },
            O8: { numPaths: 3, orientline: [1], earlyBreak: true },
        },

        makeShape: (curShape) => {
            const shapePaths = {
                arm: [makePolygon([[100, 101], [100, 45]], false)],
                armBroken: [makePolygon([[100, 101], [100, 85]], false), makePolygon([[100, 101], [100, 65]], false), makePolygon([[100, 101], [100, 45]], false)],
                bar: [makePolygon([[80, 85], [120, 85]], false), makePolygon([[70, 65], [130, 65]], false), makePolygon([[60, 45], [140, 45]], false)]
            }
            const rotation = {
                1: 0,
                2: 240,
                3: 120,
            }
            let numPaths = curShape.numPaths ? curShape.numPaths : 0
            let orientline = curShape.orientline ? curShape.orientline : []
            let earlyBreak = curShape.earlyBreak ? curShape.earlyBreak : false
            let constituents = []
            constituents.push({
                pathProperty: { "d": "" },
                transformProperty: {}
            })
            for (let i = 0; i < numPaths; i++) {
                constituents.push({
                    pathProperty: {
                        "d": earlyBreak && orientline.length !== 0 ? shapePaths.armBroken[Math.max(...orientline)] : shapePaths.arm,
                        "stroke": CONFIG.BLACK,
                        "stroke-width": CONFIG.WIDTH.NORMAL,
                        "fill": CONFIG.NOFILL
                    },
                    transformProperty: { rotate: rotation[i + 1] }
                })
                for (let j in orientline) {
                    constituents.push({
                        pathProperty: {
                            "d": shapePaths.bar[orientline[j]],
                            "stroke": CONFIG.BLACK,
                            "stroke-width": CONFIG.WIDTH.NORMAL,
                            "fill": CONFIG.NOFILL
                        },
                        transformProperty: { rotate: rotation[i + 1] }
                    })
                }
            }
            let finalSVG = makeFinalSVG(constituents, {})
            return finalSVG;
        },
    },
    3: {
        type: "VS",
        apmId: 3,
        rowCol: "COL",
        givenPuzzles: {
            "A": { given: ['F11', 'F21', 'F31'], options: ['CE2', 'F32', 'F13', 'CE1', 'F23', 'F12', 'F22', 'F33'] },
            "D": { given: ['F11', 'F21', 'F31', 'F33'], options: ['CE2', 'F32', 'F13', 'CE1', 'F23', 'F12', 'F22'] },
            "T": { given: ['F11', 'F12', 'F13', 'F21', 'F22', 'F23', 'F31', 'F32'], options: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'] }
        },
        commonErrors: [6, 4],
        correctOption: 7,
        features: [
            { name: "type", example: ["single", "double"], default: "single" },
            { name: "shapeLeft", example: ["diamond", "circle", "hexagon", "square", "none"], default: "none" },
            { name: "shapeRight", example: ["diamond", "circle", "hexagon", "square", "none"], default: "none" },
            { name: "weightLeft", example: ["thick", "normal", "narrow"], default: "normal" },
            { name: "weightRight", example: ["thick", "normal", "narrow"], default: "normal" },
            { name: "positionLeft", example: [0, 25, 50], default: 0 },
            { name: "positionRight", example: [0, 25, 50], default: 0 },
            { name: "shapeLeft2", example: ["diamond", "circle", "hexagon", "square", "none"], default: "none" },
            { name: "shapeRight2", example: ["diamond", "circle", "hexagon", "square", "none"], default: "none" },
            { name: "weightLeft2", example: ["thick", "normal", "narrow"], default: "normal" },
            { name: "weightRight2", example: ["thick", "normal", "narrow"], default: "normal" },
            { name: "positionLeft2", example: [0, 25, 50], default: 0 },
            { name: "positionRight2", example: [0, 25, 50], default: 0 },
        ],
        puzzleCells: {
            F11: { shapeLeft: "diamond", shapeRight: "diamond", weightRight: "thick", positionLeft: 0, positionRight: 0 },
            F12: { shapeLeft: "diamond", shapeRight: "diamond", weightRight: "thick", positionLeft: 25, positionRight: 25 },
            F13: { shapeLeft: "diamond", shapeRight: "diamond", weightRight: "thick", positionLeft: 50, positionRight: 50 },
            F21: { shapeLeft: "circle", shapeRight: "circle", weightRight: "thick", positionLeft: 0, positionRight: 0 },
            F22: { shapeLeft: "circle", shapeRight: "circle", weightRight: "thick", positionLeft: 25, positionRight: 25 },
            F23: { shapeLeft: "circle", shapeRight: "circle", weightRight: "thick", positionLeft: 50, positionRight: 50 },
            F31: { shapeLeft: "hexagon", shapeRight: "hexagon", weightRight: "thick", positionLeft: 0, positionRight: 0 },
            F32: { shapeLeft: "hexagon", shapeRight: "hexagon", weightRight: "thick", positionLeft: 25, positionRight: 25 },
            F33: { shapeLeft: "hexagon", shapeRight: "hexagon", weightRight: "thick", positionLeft: 50, positionRight: 50 },
            O1: { shapeLeft: "diamond", shapeRight: "circle", weightRight: "thick", positionLeft: 50, positionRight: 50 },
            O2: { shapeLeft: "circle", shapeRight: "circle", weightRight: "thick", positionLeft: 50, positionRight: 50 },
            O3: { shapeRight: "hexagon", weightRight: "thick", positionRight: 50 },
            O4: { shapeLeft: "circle", shapeRight: "diamond", weightRight: "thick", positionLeft: 25, positionRight: 25 },
            O5: { shapeLeft: "diamond", shapeRight: "diamond", weightLeft: "thick", weightRight: "thick", positionLeft: 50, positionRight: 50 },
            O6: {
                type: "double", shapeLeft: "circle", shapeRight: "circle", weightLeft: "normal", weightRight: "thick", positionLeft: 50, positionRight: 50,
                shapeLeft2: "hexagon", shapeRight2: "hexagon", weightLeft2: "normal", weightRight2: "thick", positionLeft2: 50, positionRight2: 50,
            },
            O7: { shapeLeft: "hexagon", shapeRight: "hexagon", weightRight: "thick", positionLeft: 50, positionRight: 50 },
            O8: { shapeLeft: "hexagon", shapeRight: "hexagon", weightRight: "thick", positionLeft: 25, positionRight: 25 },
        },
        makeShape: (curShape) => {
            let type = curShape.type ? curShape.type : "single"
            let shapeLeft = curShape.shapeLeft ? curShape.shapeLeft : "none"
            let shapeRight = curShape.shapeRight ? curShape.shapeRight : "none"
            let weightLeft = curShape.weightLeft ? curShape.weightLeft : "normal"
            let weightRight = curShape.weightRight ? curShape.weightRight : "normal"
            let positionLeft = curShape.positionLeft ? curShape.positionLeft : 0
            let positionRight = curShape.positionRight ? curShape.positionRight : 0
            let shapeLeft2 = curShape.shapeLeft2 ? curShape.shapeLeft2 : "none"
            let shapeRight2 = curShape.shapeRight2 ? curShape.shapeRight2 : "none"
            let weightLeft2 = curShape.weightLeft2 ? curShape.weightLeft2 : "normal"
            let weightRight2 = curShape.weightRight2 ? curShape.weightRight2 : "normal"
            let positionLeft2 = curShape.positionLeft2 ? curShape.positionLeft2 : 0
            let positionRight2 = curShape.positionRight2 ? curShape.positionRight2 : 0

            const halfShapePaths = {
                diamond: makePolygon([[28, 40], [90, 100], [28, 160]], false),
                square: makePolygon([[30, 160], [90, 160], [90, 40], [30, 40]], false),
                circle: makeElipticalPath(30, 40, 30, 160, 60, 60, 270, 0, 1),
                hexagon: makePolygon([[35, 160], [85, 120], [85, 80], [35, 40]], false),
                none: "M 0 0"
            }
            const closeness = {
                diamond: { 0: 0, 25: 25, 50: 70 },
                square: { 0: 0, 25: 25, 50: 70 },
                circle: { 0: 0, 25: 25, 50: 70 },
                hexagon: { 0: 0, 25: 25, 50: 65 },
                none: { 0: 0, 25: 0, 50: 0 }
            }
            const thickness = {
                narrow: CONFIG.WIDTH.NARROW,
                normal: CONFIG.WIDTH.NORMAL,
                thick: CONFIG.WIDTH.THICK,
            }
            function constructHalfShape(side, shape, weight, position) {
                return {
                    pathProperty: {
                        "d": halfShapePaths[shape],
                        "stroke": CONFIG.BLACK,
                        "stroke-width": thickness[weight],
                        "fill": CONFIG.NOFILL
                    },
                    transformProperty: { rotate: (side === "left") ? 0 : 180, translate: [closeness[shape][position], 0] }
                }
            }
            let constituents = []
            if (type === "double") {
                let doubleDistance = 30
                constituents.push(
                    {
                        constituents: [
                            constructHalfShape("left", shapeLeft, weightLeft, positionLeft),
                            constructHalfShape("right", shapeRight, weightRight, positionRight),
                        ],
                        transformProperty: { translate: [-doubleDistance, 0], }
                    },
                    {
                        constituents: [
                            constructHalfShape("left", shapeLeft2, weightLeft2, positionLeft2),
                            constructHalfShape("right", shapeRight2, weightRight2, positionRight2),],
                        transformProperty: { translate: [doubleDistance, 0], }
                    }
                )
            }
            else {
                constituents.push(
                    constructHalfShape("left", shapeLeft, weightLeft, positionLeft),
                    constructHalfShape("right", shapeRight, weightRight, positionRight),
                )
            }
            let finalSVG = makeFinalSVG(constituents, {})
            return finalSVG;
        }
    },
    4: {
        type: "VA",
        apmId: 4,
        rowCol: "COL",
        givenPuzzles: {
            "A": { given: ['F11', 'F21', 'F31'], options: ['CE1', 'CE2', 'F13', 'F22', 'F23', 'F12', 'F32', 'F33'] },
            "D": { given: ['F11', 'F21', 'F31', 'F33'], options: ['CE1', 'CE2', 'F13', 'F22', 'F23', 'F12', 'F32'] },
            "T": { given: ['F11', 'F12', 'F13', 'F21', 'F22', 'F23', 'F31', 'F32'], options: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'] }
        },
        commonErrors: [2, 8],
        correctOption: 4,
        features: [
            {
                name: "matrix",
                example: [["none", "none", "none", "none", "none", "none", "none", "none"], ["none", "none", "none", "none", "none", "none", "none", "filled"]],
                default: ["none", "none", "none", "none", "none", "none", "none", "none"]
                // any position can have "none" or "filled"
            },
            {
                name: "special",
                example: [true, false],
                default: false
                // if special is set to true, then option 6 would be shown
            }
        ],
        puzzleCells: {
            F11: { matrix: ["none", "filled", "none", "filled", "filled", "filled", "none", "filled", "none"] },
            F12: { matrix: ["none", "filled", "none", "none", "filled", "filled", "none", "filled", "none"] },
            F13: { matrix: ["none", "filled", "none", "none", "filled", "none", "none", "filled", "none"] },
            F21: { matrix: ["none", "none", "none", "filled", "filled", "filled", "none", "filled", "none"] },
            F22: { matrix: ["none", "none", "none", "none", "filled", "filled", "none", "filled", "none"] },
            F23: { matrix: ["none", "none", "none", "none", "filled", "none", "none", "filled", "none"] },
            F31: { matrix: ["none", "none", "none", "filled", "filled", "filled", "none", "none", "none"] },
            F32: { matrix: ["none", "none", "none", "none", "filled", "filled", "none", "none", "none"] },
            F33: { matrix: ["none", "none", "none", "none", "filled", "none", "none", "none", "none"] },
            O1: { matrix: ["none", "none", "none", "filled", "filled", "filled", "none", "none", "none",] },
            O2: { matrix: ["none", "filled", "none", "none", "filled", "filled", "none", "none", "none"] },
            O3: { matrix: ["none", "filled", "none", "none", "filled", "none", "none", "filled", "none"] },
            O4: { matrix: ["none", "none", "none", "none", "filled", "none", "none", "none"] },
            O5: { matrix: ["none", "none", "none", "none", "filled", "none", "none", "filled", "none"] },
            O6: { special: true },
            O7: { matrix: ["none", "none", "none", "none", "none", "none", "none", "none", "filled"] },
            O8: { matrix: ["none", "filled", "none", "filled", "filled", "none", "none", "none", "none"] },
        },
        makeShape: (curShape) => {
            let matrix = curShape.matrix ? curShape.matrix : ["none", "none", "none", "none", "none", "none", "none", "none", "none"]
            let special = curShape.special ? curShape.special : false
            const containerShape = makeRectangle([40, 40], [160, 160])
            let constituents = []
            if (special) {
                constituents.push({
                    pathProperty: {
                        "d": makeRectangle([60, 60], [140, 140]),
                        "stroke": CONFIG.BLACK,
                        "stroke-width": CONFIG.WIDTH.NONE,
                        "fill": CONFIG.BLACK
                    },
                    transformProperty: {}
                })
            }
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (matrix[makeInto1D(i, j)] === "filled")
                        constituents.push({
                            pathProperty: {
                                "d": drawSmallSquare_1(i, j),
                                "stroke": CONFIG.BLACK,
                                "stroke-width": CONFIG.WIDTH.NONE,
                                "fill": CONFIG.BLACK
                            },
                            transformProperty: {}
                        })
                }
            }
            constituents.push({ // container
                pathProperty: {
                    "d": containerShape,
                    "stroke": CONFIG.BLACK,
                    "stroke-width": CONFIG.WIDTH.NORMAL,
                    "fill": CONFIG.NOFILL
                },
                transformProperty: {}
            })
            let finalSVG = makeFinalSVG(constituents, {})
            return finalSVG;
        }
    },
    5: {
        type: "NA",
        apmId: 5,
        rowCol: "COL", // either seems fine
        givenPuzzles: {
            "A": { given: ['F11', 'F21', 'F31'], options: ['F13', 'F23', 'F12', 'CE1', 'F32', 'F22', 'F33', 'CE2',] },
            "D": { given: ['F11', 'F21', 'F31', 'F33'], options: ['F13', 'F23', 'F12', 'CE1', 'F32', 'F22', 'CE2'] },
            "T": { given: ['F11', 'F12', 'F13', 'F21', 'F22', 'F23', 'F31', 'F32'], options: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'] }
        },
        commonErrors: [7, 1],
        correctOption: 3,
        features: [
            {
                name: "matrix", example:
                    [["none", "none", "none", "none", "none", "none", "none", "none"],
                    ["none", "none", "none", "none", "none", "none", "none", "white"]],
                default: ["none", "none", "none", "none", "none", "none", "none", "none"]
                // any position can have "none": nothing, "white": white, "filled": black
            }
        ],
        puzzleCells: {
            F11: { matrix: ["filled", "filled", "filled", "filled", "filled", "filled", "filled", "filled", "filled"] },
            F12: { matrix: ["filled", "filled", "white", "filled", "filled", "white", "filled", "filled", "white"] },
            F13: { matrix: ["filled", "white", "white", "filled", "white", "white", "filled", "white", "white"] },
            F21: { matrix: ["none", "none", "filled", "filled", "filled", "filled", "filled", "filled", "filled"] },
            F22: { matrix: ["none", "none", "white", "filled", "filled", "white", "filled", "filled", "white"] },
            F23: { matrix: ["none", "none", "white", "filled", "white", "white", "filled", "white", "white"] },
            F31: { matrix: ["none", "none", "filled", "none", "none", "filled", "filled", "filled", "filled"] },
            F32: { matrix: ["none", "none", "white", "none", "none", "white", "filled", "filled", "white"] },
            F33: { matrix: ["none", "none", "white", "none", "none", "white", "filled", "white", "white"] },
            O1: { matrix: ["none", "none", "white", "none", "none", "white", "filled", "filled", "white"] },
            O2: { matrix: ["none", "white", "white", "none", "white", "white", "filled", "white", "white"] },
            O3: { matrix: ["none", "none", "white", "none", "none", "white", "filled", "white", "white"] },
            O4: { matrix: ["none", "none", "filled", "none", "none", "filled", "filled", "filled", "filled"] },
            O5: { matrix: ["none", "none", "none", "none", "none", "none", "filled", "white", "white"] },
            O6: { matrix: ["white", "white", "white", "white", "white", "white", "white", "white", "white"] },
            O7: { matrix: ["none", "none", "white", "none", "white", "white", "filled", "white", "white"] },
            O8: { matrix: ["none", "filled", "white", "none", "filled", "white", "none", "filled", "white"] },
        },
        makeShape: (curShape) => {
            let matrix = curShape.matrix ? curShape.matrix : ["none", "none", "none", "none", "none", "none", "none", "none", "none"]
            let constituents = []
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (matrix[makeInto1D(i, j)] === "white")
                        constituents.push({
                            pathProperty: {
                                "d": drawSmallSquare_1(i, j),
                                "stroke": CONFIG.BLACK,
                                "stroke-width": CONFIG.WIDTH.NONE,
                                "fill": CONFIG.FILLCOLORS.WHITE
                            },
                            transformProperty: {}
                        })
                    else if (matrix[makeInto1D(i, j)] === "filled")
                        constituents.push({
                            pathProperty: {
                                "d": drawSmallSquare_1(i, j),
                                "stroke": CONFIG.BLACK,
                                "stroke-width": CONFIG.WIDTH.NONE,
                                "fill": CONFIG.FILLCOLORS.BLACK
                            },
                            transformProperty: {}
                        })
                }
            }
            // find path around the empty spaces
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (matrix[makeInto1D(i, j)] !== "none") {
                        // need border if it surrounds non-bordering square
                        for (let side in sides) {
                            let sideElNo = getSideElement(makeInto1D(i, j), side)
                            if (sideElNo === -1 || matrix[sideElNo] === "none")
                                constituents.push({
                                    pathProperty: {
                                        "d": drawBorder(i, j, side),
                                        "stroke": CONFIG.BLACK,
                                        "stroke-width": CONFIG.WIDTH.NORMAL,
                                        "fill": CONFIG.NOFILL
                                    },
                                    transformProperty: {}
                                })
                        }
                    }
                }
            }
            let finalSVG = makeFinalSVG(constituents, {})
            return finalSVG;
        },
    },
    6: {
        type: "NA",
        apmId: 6,
        rowCol: "COL",
        givenPuzzles: {
            "A": { given: ['F11', 'F21', 'F31'], options: ['F23', 'F22', 'F12', 'CE2', 'F13', 'CE1', 'F32', 'F33'] },
            "D": { given: ['F11', 'F21', 'F31', 'F33'], options: ['F23', 'F22', 'F12', 'CE2', 'F13', 'CE1', 'F32'] },
            "T": { given: ['F11', 'F12', 'F13', 'F21', 'F22', 'F23', 'F31', 'F32'], options: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'] }
        },
        commonErrors: [7, 2],
        correctOption: 1,
        features: [
            {
                name: "matrix", example:
                    [["none", "none", "none", "none", "none", "none", "none", "none"],
                    ["none", "none", "none", "none", "none", "none", "none", "filled"]],// any position can have "none" or "filled"
                default: ["none", "none", "none", "none", "none", "none", "none", "none"]
            }
        ],
        puzzleCells: {
            F11: { matrix: ["filled", "none", "none", "filled", "none", "none", "filled", "none", "none"] },
            F12: { matrix: ["filled", "filled", "none", "filled", "none", "none", "filled", "none", "none"] },
            F13: { matrix: ["filled", "filled", "filled", "filled", "none", "none", "filled", "none", "none"] },
            F21: { matrix: ["filled", "none", "none", "filled", "none", "none", "none", "none", "none"] },
            F22: { matrix: ["filled", "filled", "none", "filled", "none", "none", "none", "none", "none"] },
            F23: { matrix: ["filled", "filled", "filled", "filled", "none", "none", "none", "none", "none"] },
            F31: { matrix: ["filled", "none", "none", "none", "none", "none", "none", "none", "none"] },
            F32: { matrix: ["filled", "filled", "none", "none", "none", "none", "none", "none", "none"] },
            F33: { matrix: ["filled", "filled", "filled", "none", "none", "none", "none", "none", "none"] },
            O1: { matrix: ["filled", "filled", "filled", "none", "none", "none", "none", "none", "none"] },
            O2: { matrix: ["filled", "filled", "filled", "filled", "none", "none", "none", "none", "none"] },
            O3: { matrix: ["none", "none", "none", "none", "none", "filled", "filled", "filled", "filled"] },
            O4: { matrix: ["none", "none", "none", "none", "none", "filled", "none", "filled", "filled"] },
            O5: { matrix: ["none", "filled", "none", "none", "filled", "none", "none", "none", "none"] },
            O6: { matrix: ["none", "filled", "none", "none", "filled", "none", "none", "filled", "none"] },
            O7: { matrix: ["none", "none", "none", "none", "filled", "filled", "none", "filled", "none"] },
            O8: { matrix: ["none", "none", "none", "none", "filled", "none", "none", "none", "none"] },
        },
        makeShape: (curShape) => {
            let matrix = curShape.matrix ? curShape.matrix : ["none", "none", "none", "none", "none", "none", "none", "none", "none"]
            let constituents = []
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (matrix[makeInto1D(i, j)] === "filled")
                        constituents.push({
                            pathProperty: {
                                "d": drawSmallSquare_2(i, j),
                                "stroke": CONFIG.BLACK,
                                "stroke-width": CONFIG.WIDTH.NONE,
                                "fill": CONFIG.BLACK
                            },
                            transformProperty: {}
                        })
                }
            }
            let finalSVG = makeFinalSVG(constituents, {})
            return finalSVG;
        },
    },
    7: {
        type: "NA",
        apmId: 7,
        rowCol: "COL",
        givenPuzzles: {
            "A": { given: ['F11', 'F21', 'F31'], options: ['F13', 'F33', 'CE2', 'F12', 'CE1', 'F23', 'F22', 'F32'] },
            "D": { given: ['F11', 'F21', 'F31', 'F33'], options: ['F13', 'CE2', 'F12', 'CE1', 'F23', 'F22', 'F32'] },
            "T": { given: ['F11', 'F12', 'F13', 'F21', 'F22', 'F23', 'F31', 'F32'], options: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'] }
        },
        commonErrors: [2, 4],
        correctOption: 6,
        possibleAnswers: {
            "T": [1],
            "A": [[['', 3, 0], ['', 6, 5], ['', 7, 1]], [['', 3, 0], ['', 6, 5], ['', 2, 1]]],
            "D": [[['', 2, 0], ['', 5, 4], ['', 6, '']], [['', 2, 0], ['', 5, 4], ['', 1, '']]],
        },
        features: [
            { name: "lines", example: [[], [0], [90], [0, 90], [0, 45, 90, 135]], default: [] },
            { name: "curves", example: [[], [0], [90], [0, 90], [0, 45, 90, 135]], default: [] },
            { name: "linePart", example: [-1, 0, 1], default: 0 },
            { name: "curvePart", example: [-1, 0, 1], default: 0 },
            // 0 implies both top and bottom, -1 means bottom, 1 means top
            { name: "special", example: ["none", "opt2", "opt8"] }
        ],
        puzzleCells: {
            F11: { curves: [0] },
            F12: { curves: [90] },
            F13: { curves: [0, 90] },
            F21: { lines: [0] },
            F22: { lines: [90] },
            F23: { lines: [0, 90] },
            F31: { lines: [0], curves: [0] },
            F32: { lines: [90], curves: [90] },
            F33: { lines: [0, 90], curves: [0, 90] },
            O1: { curves: [0, 90] },
            O2: { special: "opt2" },
            O3: { lines: [0, 90] },
            O4: { lines: [90], curves: [90] },
            O5: { lines: [0], curves: [0], linePart: -1, curvePart: 1 },
            O6: { lines: [0, 90], curves: [0, 90] },
            O7: { lines: [0, 45, 90, 135] },
            O8: { curves: [0, 45, 90, 135] },
        },
        makeShape: (curShape) => {
            const finalShape = {
                line: { items: curShape.lines ? curShape.lines : [], part: curShape.linePart ? curShape.linePart : 0 },
                curve: { items: curShape.curves ? curShape.curves : [], part: curShape.curvePart ? curShape.curvePart : 0 }
            }
            const shapePaths = {
                line: makeLine([100, 50], [100, 100]) + makeCircle(100, 50, 6),
                curve: makeElipticalPath(50, 50, 150, 50, 50, 50, 0, 1, 0, 0),
                thinCurve: makeElipticalPath(150, 50, 50, 50, 58, 100, 0, 0, 1, 0)
            }
            let constituents = []
            if (curShape.special === "opt2") {
                constituents.push({
                    pathProperty: {
                        "d": makeLine([100, 50], [100, 150]) + makeCircle(100, 50, 6) + makeCircle(100, 150, 6)
                            + makeLine([30, 100], [170, 100]) + makeCircle(30, 100, 6) + makeCircle(170, 100, 6),
                        "stroke": CONFIG.BLACK,
                        "stroke-width": CONFIG.WIDTH.NORMAL,
                        "fill": CONFIG.BLACK
                    },
                    transformProperty: {}
                })
                constituents.push({
                    pathProperty: {
                        "d": makeElipticalPath(50, 50, 150, 50, 50, 50, 0, 1, 0, 0) +
                            makeElipticalPath(50, 150, 150, 150, 50, 50, 0, 1, 1, 0) +
                            makeElipticalPath(15, 50, 15, 150, 50, 50, 0, 1, 1, 0) +
                            makeElipticalPath(185, 50, 185, 150, 50, 50, 0, 1, 0, 0)
                        ,
                        "stroke": CONFIG.BLACK,
                        "stroke-width": CONFIG.WIDTH.NORMAL,
                        "fill": CONFIG.NOFILL
                    },
                    transformProperty: {}
                })
            }
            else
                for (let type in finalShape) {
                    let items = finalShape[type].items
                    let typeOfPart = finalShape[type].part
                    if (type === "curve" && items.length === 4)
                        type = "thinCurve";
                    for (let i in items) {
                        if (typeOfPart === 0 || typeOfPart === 1)
                            constituents.push({
                                pathProperty: {
                                    "d": shapePaths[type],
                                    "stroke": CONFIG.BLACK,
                                    "stroke-width": CONFIG.WIDTH.NORMAL,
                                    "fill": type === 'line' ? CONFIG.BLACK : CONFIG.NOFILL
                                },
                                transformProperty: {
                                    rotate: items[i],
                                }
                            })
                        if (typeOfPart === 0 || typeOfPart === -1)
                            constituents.push({
                                pathProperty: {
                                    "d": shapePaths[type],
                                    "stroke": CONFIG.BLACK,
                                    "stroke-width": CONFIG.WIDTH.NORMAL,
                                    "fill": type === 'line' ? CONFIG.BLACK : CONFIG.NOFILL
                                },
                                transformProperty: {
                                    rotate: 180 + items[i],
                                }
                            })
                    }
                }

            let finalSVG = makeFinalSVG(constituents, {})
            return finalSVG;
        },
    },
    8: {
        type: "VA",
        apmId: 8,
        rowCol: "COL",
        givenPuzzles: {
            "A": { given: ['F11', 'F21', 'F31'], options: ['F12', 'F33', 'F32', 'CE1', 'F13', 'F23', 'F22', 'CE2'] },
            "D": { given: ['F11', 'F21', 'F31', 'F33'], options: ['F12', 'F32', 'CE1', 'F13', 'F23', 'F22', 'CE2'] },
            "T": { given: ['F11', 'F12', 'F13', 'F21', 'F22', 'F23', 'F31', 'F32'], options: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'] }
        },
        commonErrors: [4, 5],
        correctOption: 1,
        features: [
            // STRIPE: top points to which direction?
            { name: "bgVert", example: ["stripeLeft", "stripeRight", "none", "filled"], default: "none" },
            { name: "bgHori", example: ["stripeLeft", "stripeRight", "none", "filled"], default: "none" },
            { name: "bg", example: ["none", "filled"], default: "none" }
        ],
        puzzleCells: {
            F11: { bgVert: "filled", bgHori: "none" },
            F12: { bgVert: "stripeRight", bgHori: "stripeLeft" },
            F13: { bgVert: "none", bgHori: "filled" },
            F21: { bgVert: "none", bgHori: "stripeLeft" },
            F22: { bgVert: "filled", bgHori: "filled" },
            F23: { bgVert: "stripeRight", bgHori: "none" },
            F31: { bgVert: "stripeRight", bgHori: "filled" },
            F32: { bgVert: "none", bgHori: "none" },
            F33: { bgVert: "filled", bgHori: "stripeLeft" },
            O1: { bgVert: "filled", bgHori: "stripeLeft" },
            O2: { bgVert: "stripeRight", bgHori: "filled" },
            O3: { bgVert: "none", bgHori: "stripeLeft" },
            O4: { bgVert: "filled", bgHori: "filled" },
            O5: { bgVert: "stripeRight", bgHori: "none", bg: "filled" },
            O6: { bgVert: "none", bgHori: "none" },
            O7: { bgVert: "stripeRight", bgHori: "none" },
            O8: { bgVert: "none", bgHori: "filled" },
        },
        makeShape: (curShape) => {
            //      console.log(curShape)
            let bgVert = curShape.bgVert ? curShape.bgVert : "none"
            let bgHori = curShape.bgHori ? curShape.bgHori : "none"
            let bg = curShape.bg ? curShape.bg : "none"
            // need to put these outside once the time comes
            const barPaths = {
                hori: makeRectangle([40, 80], [160, 120]),
                vert: makeRectangle([80, 40], [120, 160])
            }
            const patterns = {
                "stripeLeft": "STRIPE_LEFT",
                "stripeRight": "STRIPE_RIGHT",
            }
            const plain = {
                filled: CONFIG.FILLCOLORS.BLACK,
                none: CONFIG.FILLCOLORS.NONE
            }
            const fullBg = "M 30 30 L 170 30 L 170 170 L 30 170 Z"
            let constituents = [
                {//overall
                    pathProperty: {
                        "d": fullBg,
                        "stroke": CONFIG.FILLCOLORS.NONE,
                        "stroke-width": CONFIG.WIDTH.NONE,
                        "fill": bg in patterns ? "url(#" + patterns[bg] + ")" : plain[bg]
                    },
                    transformProperty: {}
                },
                { // horizontal
                    pathProperty: {
                        "d": barPaths.hori,
                        "stroke": CONFIG.BLACK,
                        "stroke-width": CONFIG.WIDTH.NORMAL,
                        "fill": CONFIG.FILLCOLORS.WHITE
                    },
                    transformProperty: {}
                },
                { // horizontal
                    pathProperty: {
                        "d": barPaths.hori,
                        "stroke": CONFIG.BLACK,
                        "stroke-width": CONFIG.WIDTH.NORMAL,
                        "fill": bgHori in patterns ? "url(#" + patterns[bgHori] + ")" : plain[bgHori]
                    },
                    transformProperty: {}
                },
                { // vertical
                    pathProperty: {
                        "d": barPaths.vert,
                        "stroke": CONFIG.BLACK,
                        "stroke-width": CONFIG.WIDTH.NORMAL,
                        "fill": CONFIG.FILLCOLORS.WHITE
                    },
                    transformProperty: {}
                },

                { // vertical
                    pathProperty: {
                        "d": barPaths.vert,
                        "stroke": CONFIG.BLACK,
                        "stroke-width": CONFIG.WIDTH.NORMAL,
                        "fill": bgVert in patterns ? "url(#" + patterns[bgVert] + ")" : plain[bgVert]
                    },
                    transformProperty: {}
                }
            ]
            let used_patterns = []
            if (bgVert in patterns) used_patterns.push(patterns[bgVert])
            if (bgHori in patterns) used_patterns.push(patterns[bgHori])
            let properties = {
                patterns: used_patterns,
            }
            let finalSVG = makeFinalSVG(constituents, properties)
            return finalSVG;
        },
    },
    9: {
        type: "VS",
        apmId: 9,
        rowCol: "COL",
        givenPuzzles: {
            "A": { given: ['F11', 'F21', 'F31'], options: ['CE2', 'F33', 'F23', 'CE1', 'F12', 'F13', 'F22', 'F32'] },
            "D": { given: ['F11', 'F21', 'F31', 'F33'], options: ['CE2', 'F23', 'CE1', 'F12', 'F13', 'F22', 'F32'] },
            "T": { given: ['F11', 'F12', 'F13', 'F21', 'F22', 'F23', 'F31', 'F32'], options: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'] }
        },
        commonErrors: [3, 4],
        correctOption: 8,
        features: [
            { name: "top", example: [0, 1], default: 0 },
            { name: "left", example: [0, 1], default: 0 },
            { name: "bottom", example: [0, 1], default: 0 },
            { name: "right", example: [0, 1], default: 0 },
            { name: "diamond", example: [0, 1], default: 0 },
        ],
        puzzleCells: {
            F11: { left: 1 },
            F12: { top: 1 },
            F13: { top: 1, left: 1 },
            F21: { bottom: 1 },
            F22: { right: 1 },
            F23: { bottom: 1, right: 1 },
            F31: { left: 1, bottom: 1 },
            F32: { top: 1, right: 1 },
            F33: { top: 1, left: 1, bottom: 1, right: 1 },
            O1: { bottom: 1 },
            O2: { diamond: 1 },
            O3: { top: 1, bottom: 1 },
            O4: { left: 1, bottom: 1 },
            O5: { right: 1, bottom: 1 },
            O6: {},
            O7: { left: 1, top: 1 },
            O8: { top: 1, left: 1, bottom: 1, right: 1 },
        },

        makeShape: (curShape) => {
            const shapes = {
                left: makePolygon([[40, 40], [40, 160], [100, 100]]),
                right: makePolygon([[160, 40], [160, 160], [100, 100]]),
                top: makePolygon([[40, 40], [160, 40], [100, 100]]),
                bottom: makePolygon([[40, 160], [160, 160], [100, 100]]),
                diamond: makePolygon([[100, 40], [40, 100], [100, 160], [160, 100]]),
            }
            const containerShape = "M 40,40 L 160,40 L 160,160 L 40,160 Z"
            let constituents = []
            for (let i in shapes) {
                if (curShape[i] === 1) {
                    constituents.push({
                        pathProperty: {
                            "d": shapes[i],
                            "stroke": CONFIG.BLACK,
                            "stroke-width": CONFIG.WIDTH.NONE,
                            "fill": CONFIG.BLACK
                        },
                        transformProperty: {}
                    })
                }
            }
            constituents.push({
                pathProperty: {
                    "d": containerShape,
                    "stroke": CONFIG.BLACK,
                    "stroke-width": CONFIG.WIDTH.NORMAL,
                    "fill": CONFIG.NOFILL
                },
                transformProperty: {}
            })
            let finalSVG = makeFinalSVG(constituents, {})
            return finalSVG;
        },
    },
    12: {
        type: "VS",
        apmId: 12,
        rowCol: "ROW",
        givenPuzzles: {
            "A": { given: ['F11', 'F12', 'F13'], options: ['F22', 'F33', 'CE1', 'F32', 'CE2', 'F31', 'F23', 'F21'] },
            "D": { given: ['F11', 'F12', 'F13', 'F33'], options: ['F22', 'CE1', 'F32', 'CE2', 'F31', 'F23', 'F21'] },
            "T": { given: ['F11', 'F12', 'F13', 'F21', 'F22', 'F23', 'F31', 'F32'], options: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'] }
        },
        commonErrors: [5, 7],
        correctOption: 6,
        features: [
            { name: "outerCircle", example: [0, 1], default: 0 },
            { name: "innerDot", example: [0, 1], default: 0 },
            { name: "upTriangle", example: [0, 1], default: 0 },
            { name: "downTriangle", example: [0, 1], default: 0 },
        ],
        puzzleCells: {
            F11: { outerCircle: 1, innerDot: 1, upTriangle: 1, downTriangle: 1 },
            F12: { outerCircle: 1, downTriangle: 1 },
            F13: { innerDot: 1, upTriangle: 1 },
            F21: { upTriangle: 1, downTriangle: 1 },
            F22: { downTriangle: 1 },
            F23: { upTriangle: 1 },
            F31: { outerCircle: 1, innerDot: 1 },
            F32: { outerCircle: 1 },
            F33: { innerDot: 1 },
            O1: { upTriangle: 1 },
            O2: { innerDot: 1, downTriangle: 1 },
            O3: { outerCircle: 1 },
            O4: { upTriangle: 1, downTriangle: 1, innerDot: 1 },
            O5: { outerCircle: 1, innerDot: 1, upTriangle: 1 },
            O6: { innerDot: 1 },
            O7: { outerCircle: 1, upTriangle: 1 },
            O8: { outerCircle: 1, innerDot: 1 }
        },
        makeShape: (curShape) => {
            const shapePaths = {
                outerCircle: makeCircle(100, 100, 75),
                innerDot: makeCircle(100, 100, 10),
                upTriangle: makePolygon([[100, 26], [37, 140], [163, 140]]),
                downTriangle: makePolygon([[100, 174], [37, 60], [163, 60]])
            }
            let constituents = []
            for (let shape in shapePaths) {
                if (curShape[shape]) {
                    constituents.push({
                        pathProperty: {
                            "d": shapePaths[shape],
                            "stroke": CONFIG.BLACK,
                            "stroke-width": CONFIG.WIDTH.NORMAL,
                            "fill": shape === "innerDot" ? CONFIG.FILLCOLORS.BLACK : CONFIG.NOFILL
                        },
                        transformProperty: {}
                    })
                }
            }
            let finalSVG = makeFinalSVG(constituents, {})
            return finalSVG;
        }
    },
    13: {
        type: "VA",
        apmId: 13,
        rowCol: "ROW",
        givenPuzzles: {
            "A": { given: ['F11', 'F12', 'F13'], options: ['F32', 'F22', 'F33', 'CE1', 'F31', 'CE2', 'F21', 'F23'] },
            "D": { given: ['F11', 'F12', 'F13', 'F33'], options: ['F32', 'F22', 'CE1', 'F31', 'CE2', 'F21', 'F23'] },
            "T": { given: ['F11', 'F12', 'F13', 'F21', 'F22', 'F23', 'F31', 'F32'], options: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'] }
        },
        commonErrors: [7, 6],
        correctOption: 2,
        features: [
            { name: "shape", example: ["none", "circle", "diamond", "square"], default: "none" },
            { name: "numline", example: [0, 1, 2, 3], default: 0 },
            { name: "orientline", example: ["left", "right", "straight"], default: "straight" },
        ],
        puzzleCells: {
            F11: { shape: "diamond", numline: 1, orientline: "straight" },
            F12: { shape: "square", numline: 1, orientline: "right" },
            F13: { shape: "circle", numline: 1, orientline: "left" },
            F21: { shape: "square", numline: 2, orientline: "straight" },
            F22: { shape: "circle", numline: 2, orientline: "right" },
            F23: { shape: "diamond", numline: 2, orientline: "left" },
            F31: { shape: "circle", numline: 3, orientline: "straight" },
            F32: { shape: "diamond", numline: 3, orientline: "right" },
            F33: { shape: "square", numline: 3, orientline: "left" },
            O1: { shape: "diamond", numline: 2, orientline: "left" },
            O2: { shape: "square", numline: 3, orientline: "left" },
            O3: { shape: "circle", numline: 3, orientline: "left" },
            O4: { shape: "circle", numline: 2, orientline: "straight" },
            O5: { shape: "square", numline: 3, orientline: "straight" },
            O6: { shape: "square", numline: 3, orientline: "right" },
            O7: { shape: "square", numline: 2, orientline: "left" },
            O8: { shape: "diamond", numline: 3, orientline: "right" },
        },
        makeShape: (curShape) => {
            // paths: shape, lines, rotation, number
            const paths = {
                none: {
                    shapePath: "",
                    lines: {
                        straight: { 1: "", 2: "", 3: "" },
                        left: { 1: "", 2: "", 3: "" },
                        right: { 1: "", 2: "", 3: "" },
                    }
                },
                circle: {
                    shapePath: makeCircle(100, 100, 50),
                    lines: {
                        straight: { // 8
                            1: makeLine([100, 50], [100, 150]),
                            2: makeLine([90, 51], [90, 149]) + makeLine([110, 51], [110, 149]),
                            3: makeLine([80, 54], [80, 146]) + makeLine([100, 50], [100, 150]) + makeLine([120, 54], [120, 146])
                        },
                        left: { // 5 TODO: convert to makeline
                            1: "M 65,65 L 135,135",
                            2: "M 60,70 L 130,140 M 70,60 L 140,130",
                            3: "M 56,76 L 124,144 M 65,65 L 135,135 M 76,56 L 144,124"
                        },
                        "right": {
                            1: "M 65,135 L 135,65",
                            2: "M 60,130 L 130,60 M 70,140 L 140,70",
                            3: "M 76,144 L 144,76 M 65,135 L 135,65 M 56,124 L 124,56",
                        },
                    }
                },
                square: {
                    shapePath: "M 135,135 L 65,135 L 65,65 L 135,65 Z",
                    lines: {
                        "straight": {
                            1: "M 100,65 L 100,135", // 8
                            2: "M 92,65 L 92,135 M 108,65 L 108,135",
                            3: "M 84,65 L 84,135 M 100,65 L 100,135 M 116,65 L 116,135"
                        },
                        "left": { // 5
                            1: "M 65,65 L 135,135",
                            2: "M 65,80 L 120,135 M 80,65 L 135,120",
                            3: "M 65,85 L 115,135 M 65,65 L 135,135 M 85,65 L 135,115"
                        },
                        "right": {
                            1: "M 65,135 L 135,65",
                            2: "M 65,120 L 120,65 M 80,135 L 135,80",
                            3: "M 65,115 L 115,65 M 65,135 L 135,65 M 85,135 L 135,85"
                        },
                    }
                },
                diamond: {
                    shapePath: "M 100,50 L 150,100 L 100,150 L 50,100 Z",
                    lines: {
                        straight: {
                            1: "M 100,50 L 100,150", // 8
                            2: "M 92,58 L 92,142 M 108,58 L 108,142",
                            3: "M 84,66 L 84,134 M 100,50 L 100,150 M 116,66 L 116,134"
                        },
                        left: { // 5
                            1: "M 75,75 L 125,125",
                            2: "M 70,80 L 120,130 M 80,70 L 130,120",
                            3: "M 65,85 L 115,135 M 75,75 L 125,125 M 85,65 L 135,115"
                        },
                        right: {
                            1: "M 75,125 L 125,75",
                            2: "M 70,120 L 120,70 M 80,130 L 130,80",
                            3: "M 65,115 L 115,65 M 75,125 L 125,75 M 85,135 L 135,85"
                        },
                    }
                },
            }
            let shape = curShape.shape ? curShape.shape : "none"
            let numline = curShape.numline ? curShape.numline : 0
            let orientline = curShape.orientline ? curShape.orientline : "straight"
            let shapeToDraw = paths[shape]
            // to do: build the shape
            let constituents = [{
                pathProperty: {
                    "d": shapeToDraw.shapePath,
                    "stroke": CONFIG.BLACK,
                    "stroke-width": CONFIG.WIDTH.NORMAL,
                    "fill": CONFIG.NOFILL
                },
                transformProperty: {}
            }]
            let linesPath = shapeToDraw.lines[orientline][numline]
            constituents.push({
                pathProperty: {
                    "d": linesPath,
                    "stroke": CONFIG.BLACK,
                    "stroke-width": CONFIG.WIDTH.NORMAL,
                    "fill": CONFIG.NOFILL,
                },
                transformProperty: {}
            })
            let finalSVG = makeFinalSVG(constituents, {})
            return finalSVG;
        },
    },
    17: {
        type: "VA",
        apmId: 17,
        rowCol: "ROW",
        givenPuzzles: {
            "A": { given: ['F11', 'F12', 'F13'], options: ['F33', 'F32', 'F21', 'CE1', 'F23', 'F31', 'CE2', 'F22'] },
            "D": { given: ['F11', 'F12', 'F13', 'F33'], options: ['F32', 'F21', 'CE1', 'F23', 'F31', 'CE2', 'F22'] },
            "T": { given: ['F11', 'F12', 'F13', 'F21', 'F22', 'F23', 'F31', 'F32'], options: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'] }
        },
        optionOrder: ['F33', 'F32', 'F21', 'CE1', 'F23', 'F31', 'CE2', 'F22'],
        commonErrors: [3, 4],
        correctOption: 6,
        features: [
            { name: "type", example: ["straight", "curved"], default: "straight" },
            { name: "line", example: ["dotted", "solid"], default: "solid" },
            { name: "numSides", example: [1, 2, 3], default: 1 },
            { name: "special", example: ["none", "opt1", "opt2", "opt7"], default: "none" }
        ],
        puzzleCells: {
            F11: { type: "straight", line: "solid", numSides: 1 },
            F12: { type: "straight", line: "dotted", numSides: 1 },
            F13: { type: "curved", line: "solid", numSides: 1 },
            F21: { type: "straight", line: "dotted", numSides: 2 },
            F22: { type: "curved", line: "solid", numSides: 2 },
            F23: { type: "straight", line: "solid", numSides: 2 },
            F31: { type: "curved", line: "solid", numSides: 3 },
            F32: { type: "straight", line: "solid", numSides: 3 },
            F33: { type: "straight", line: "dotted", numSides: 3 },
            O1: { special: "opt1" },
            O2: { special: "opt2" },
            O3: { type: "curved", line: "dotted", numSides: 3 },
            O4: { type: "curved", line: "dotted", numSides: 2 },
            O5: { type: "straight", line: "solid", numSides: 2 },
            O6: { type: "straight", line: "dotted", numSides: 3 },
            O7: { special: "opt7" },
            O8: { type: "straight", line: "solid", numSides: 3 },
        },

        makeShape: (curShape) => {
            const type = curShape.type ? curShape.type : "straight"
            const line = curShape.line ? curShape.line : "solid"
            const numSides = curShape.numSides ? curShape.numSides : 0
            const special = curShape.special ? curShape.special : "none"

            const paths = {
                curved:
                    "M 100 30 L 100 30 A 80 80, 0, 0 1, 60 90" +
                    "M 60 90 L 60 90 A 80 80, 0,0 0, 40 135",
                straight: "M 100 30 L 40 135"
            }
            let constituents = []
            if (special === "opt1") {
                const opt1 = {
                    straight: { path: makeLine([50, 50], [150, 50]), line: "dotted" },
                    curve: { path: makeElipticalPath(50, 50, 100, 100, 80, 80, 0, 0, 1), line: "solid" }
                }
                for (let i = 0; i < 4; i++) {
                    for (let j in opt1)
                        constituents.push({
                            pathProperty: {
                                "d": opt1[j].path,
                                "stroke": CONFIG.BLACK,
                                "stroke-width": opt1[j].line === "dotted" ? CONFIG.WIDTH.NARROW : CONFIG.WIDTH.NORMAL,
                                "fill": CONFIG.NOFILL,
                                "stroke-dasharray": opt1[j].line === "dotted" ? CONFIG.DASHED.DOTTED : ""
                            },
                            transformProperty: { rotate: 90 * i }
                        })
                }
            }
            else if (special === "opt2") {
                const opt2 = {
                    straight: { path: makeLine([50, 50], [150, 150]), line: "solid" },
                    curve: { path: makeCurve2(140, 50, 100, 100, 60, 150, 80, 80, 0, 0, 1), line: "dotted" }
                }
                for (let j in opt2)
                    constituents.push({
                        pathProperty: {
                            "d": opt2[j].path,
                            "stroke": CONFIG.BLACK,
                            "stroke-width": opt2[j].line === "dotted" ? CONFIG.WIDTH.NARROW : CONFIG.WIDTH.NORMAL,
                            "fill": CONFIG.NOFILL,
                            "stroke-dasharray": opt2[j].line === "dotted" ? CONFIG.DASHED.DOTTED : ""
                        },
                        transformProperty: {}
                    })
            }
            else if (special === "opt7") {
                for (let i = 0; i < 3; i++) {
                    constituents.push({
                        pathProperty: {
                            "d": paths["curved"],
                            "stroke": CONFIG.BLACK,
                            "stroke-width": CONFIG.WIDTH.NORMAL,
                            "fill": CONFIG.NOFILL
                        },
                        transformProperty: { rotate: 120 * i }
                    })
                    constituents.push({
                        pathProperty: {
                            "d": paths["straight"],
                            "stroke": CONFIG.BLACK,
                            "stroke-width": CONFIG.WIDTH.NARROW,
                            "fill": CONFIG.NOFILL,
                            "stroke-dasharray": CONFIG.DASHED.DOTTED
                        },
                        transformProperty: { translate: [0, -25], rotate: 120 * i + 180, }
                    })
                }
            }
            else {
                for (let i = 0; i < numSides; i++) {
                    constituents.push({
                        pathProperty: {
                            "d": paths[type],
                            "stroke": CONFIG.BLACK,
                            "stroke-width": line === "dotted" ? CONFIG.WIDTH.NARROW : CONFIG.WIDTH.NORMAL,
                            "fill": CONFIG.NOFILL,
                            "stroke-dasharray": line === "dotted" ? CONFIG.DASHED.DOTTED : ""
                        },
                        transformProperty: { rotate: 120 * i }
                    })
                }
            }
            let finalSVG = makeFinalSVG(constituents, {})
            return finalSVG;
        },
    },
    18: {
        type: "VS",
        apmId: 18,
        rowCol: "COL",
        givenPuzzles: {
            "A": { given: ['F11', 'F21', 'F31'], options: ['F33', 'F22', 'F12', 'CE1', 'CE2', 'F23', 'F13', 'F32'] },
            "D": { given: ['F11', 'F21', 'F31', 'F33'], options: ['F22', 'F12', 'CE1', 'CE2', 'F23', 'F13', 'F32'] },
            "T": { given: ['F11', 'F12', 'F13', 'F21', 'F22', 'F23', 'F31', 'F32'], options: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'] }
        },
        correctOption: 7,
        commonErrors: [5, 1],
        features: [
            { name: "shape", example: ["square", "rectangle", "crosshair", "line"], default: "line" },
            { name: "tilt", example: ["straight", "left", "right"], default: "straight" },
            { name: "horizontalCurve", example: ["none", "in", "out"], default: "none" },
            { name: "verticalCurve", example: ["none", "in", "out"], default: "none" },
            { name: "grid", example: [true, false], default: false }
        ],
        puzzleCells: {
            F11: { shape: "square" },
            F12: { shape: "line", horizontalCurve: "in", verticalCurve: "in" },
            F13: { shape: "square", horizontalCurve: "in", verticalCurve: "in" },
            F21: { shape: "crosshair" },
            F22: { shape: "line", tilt: "left" },
            F23: { shape: "crosshair", tilt: "left" },
            F31: { shape: "rectangle" },
            F32: { shape: "line", tilt: "left", horizontalCurve: "in", verticalCurve: "in" },
            F33: { shape: "rectangle", tilt: "left", horizontalCurve: "in", verticalCurve: "in" },
            O1: { shape: "rectangle", horizontalCurve: "in", verticalCurve: "in" },
            O2: { shape: "square", horizontalCurve: "in", verticalCurve: "in", tilt: "left" },
            O3: { shape: "rectangle", tilt: "left" },
            O4: { shape: "square", horizontalCurve: "in", verticalCurve: "in", grid: true },
            O5: { shape: "rectangle", horizontalCurve: "in" },
            O6: { shape: "rectangle", horizontalCurve: "out", verticalCurve: "out" },
            O7: { shape: "rectangle", tilt: "left", horizontalCurve: "in", verticalCurve: "in" },
            O8: { shape: "rectangle", horizontalCurve: "out", verticalCurve: "out", grid: true, tilt: "left" },
        },
        makeShape: (curShape) => {
            const gridPath = {
                rectangle: makeLine([17, 100], [183, 100]) + makeLine([100, 55], [100, 145]),
                square: makeLine([40, 40], [160, 160]) + makeLine([160, 40], [40, 160])
            }
            const shapePathsCurve = {
                line: {
                    horizontal: {
                        none: makeLine([40, 100], [160, 100]),
                        in: makeElipticalPath(40, 100, 160, 100, 100, 100, 0, 0, 0),
                        out: makeElipticalPath(40, 100, 160, 100, 100, 100, 0, 0, 1),
                    },
                    vertical: {
                        none: makeLine([40, 100], [160, 100]),
                        in: makeElipticalPath(40, 100, 160, 100, 100, 100, 0, 0, 0),
                        out: makeElipticalPath(40, 100, 160, 100, 100, 100, 0, 0, 1),
                    }
                },
                crosshair: {
                    horizontal: {
                        none: makeLine([40, 100], [160, 100]),
                        in: makeElipticalPath(40, 100, 160, 100, 100, 100, 0, 0, 0),
                        out: makeElipticalPath(40, 100, 160, 100, 100, 100, 0, 0, 1),
                    },
                    vertical: {
                        none: makeLine([100, 70], [100, 130]),
                        in: makeElipticalPath(100, 70, 100, 130, 100, 100, 0, 0, 0),
                        out: makeElipticalPath(100, 70, 100, 130, 100, 100, 0, 0, 1),
                    },
                },
                rectangle: { // 40,65 --> 160,125
                    horizontal: {
                        none: "M 38 65 L 162 65   M 38 125 L 162 125",
                        in: makeElipticalPath(40, 65, 160, 65, 100, 100, 0, 0, 0) + makeElipticalPath(40, 125, 160, 125, 100, 100, 0, 0, 1),
                        out: makeElipticalPath(50, 65, 150, 65, 120, 100, 0, 0, 1) + makeElipticalPath(50, 135, 150, 135, 120, 100, 0, 0, 0)
                    },
                    vertical: {
                        none: "M 40 65 L 40 125    M 160 65 L 160 125",
                        in: makeElipticalPath(40, 65, 40, 125, 50, 50, 0, 0, 1) + makeElipticalPath(160, 65, 160, 125, 50, 50, 0, 0, 0),
                        out: makeElipticalPath(50, 65, 50, 135, 120, 50, 0, 0, 0) + makeElipticalPath(150, 65, 150, 135, 120, 50, 0, 0, 1),
                    },
                },
                square: { // 40 160 ; 
                    horizontal: {
                        none: "M 40 40 L 160 40    M 40 160 L 160 160",
                        in: makeElipticalPath(40, 40, 160, 40, 100, 100, 0, 0, 0) + makeElipticalPath(40, 160, 160, 160, 100, 100, 0, 0, 1),
                        out: makeElipticalPath(40, 40, 160, 40, 100, 100, 0, 0, 1) + makeElipticalPath(40, 160, 160, 160, 100, 100, 0, 0, 0)
                    },
                    vertical: {
                        none: "M 40 40 L 40 160     M 160 160 L 160 40",
                        in: makeElipticalPath(40, 40, 40, 160, 100, 100, 0, 0, 1) + makeElipticalPath(160, 160, 160, 40, 100, 100, 0, 0, 1),
                        out: makeElipticalPath(40, 40, 40, 160, 100, 100, 0, 0, 0) + makeElipticalPath(160, 160, 160, 40, 100, 100, 0, 0, 0),
                    },
                },
            }
            let shape = curShape.shape ? curShape.shape : "line"
            let tilt = curShape.tilt ? curShape.tilt : "straight"
            let horizontalCurve = curShape.horizontalCurve ? curShape.horizontalCurve : "none"
            let verticalCurve = curShape.verticalCurve ? curShape.verticalCurve : "none"
            let grid = curShape.grid ? curShape.grid : false

            let tiltLevel = {
                "straight": 0,
                "left": 45,
                "right": -45,
            }
            let constituents = [{
                pathProperty: {
                    "d": shapePathsCurve[shape].horizontal[horizontalCurve],
                    "stroke": CONFIG.BLACK,
                    "stroke-width": CONFIG.WIDTH.NORMAL,
                    "fill": CONFIG.NOFILL
                },
                transformProperty: { rotate: tiltLevel[tilt] }
            }, {
                pathProperty: {
                    "d": shapePathsCurve[shape].vertical[verticalCurve],
                    "stroke": CONFIG.BLACK,
                    "stroke-width": CONFIG.WIDTH.NORMAL,
                    "fill": CONFIG.NOFILL
                },
                transformProperty: { rotate: tiltLevel[tilt] }
            }]
            if (grid) {
                constituents.push({
                    pathProperty: {
                        "d": gridPath[shape],
                        "stroke": CONFIG.BLACK,
                        "stroke-width": CONFIG.WIDTH.NORMAL,
                        "fill": CONFIG.NOFILL
                    },
                    transformProperty: { rotate: tiltLevel[tilt] }
                })
            }
            let finalSVG = makeFinalSVG(constituents, {})
            return finalSVG;
        },
    },
    21: {
        type: "VA",
        apmId: 21,
        rowCol: "COL",
        givenPuzzles: {
            "A": { given: ['F11', 'F21', 'F31'], options: ['CE1', 'F33', 'F12', 'F23', 'CE2', 'F13', 'F32', 'F22'] },
            "D": { given: ['F11', 'F21', 'F31', 'F33'], options: ['CE1', 'F12', 'F23', 'CE2', 'F13', 'F32', 'F22'] },
            "T": { given: ['F11', 'F12', 'F13', 'F21', 'F22', 'F23', 'F31', 'F32'], options: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'] }
        },
        correctOption: 8,
        commonErrors: [1, 4],
        features: [
            {
                name: "shape",
                example: ["rectangle", "triangle", "sharedVertexTriangle", "none", "rectangleWithTriangle", "rectangleMinusTriangle", "trapezium"],
                default: "none"
            },
            {
                name: "fill", example: [
                    ["dotted", "dotted", "dotted"],
                    ["dotted", "lined", "dotted"],
                    ["lined", "lined", "lined"],
                    ["filled", "lined", "filled"],
                ],
                default: ["none"]
            },
            { name: "rotation", example: [0, 45, 90], default: 0 },
        ],
        puzzleCells: {
            F11: { shape: "rectangle", fill: ["dotted", "dotted", "dotted"] },
            F12: { shape: "triangle", fill: ["lined", "dotted", "lined"] },
            F13: { shape: "sharedVertexTriangle", fill: ["filled", "dotted", "filled"] },
            F21: { shape: "rectangle", fill: ["dotted", "lined", "dotted"], rotation: 45 },
            F22: { shape: "triangle", fill: ["lined", "lined", "lined"], rotation: 45 },
            F23: { shape: "sharedVertexTriangle", fill: ["filled", "lined", "filled"], rotation: 45 },
            F31: { shape: "rectangle", fill: ["dotted", "filled", "dotted"], rotation: 90 },
            F32: { shape: "triangle", fill: ["lined", "filled", "lined"], rotation: 90 },
            F33: { shape: "sharedVertexTriangle", fill: ["filled", "filled", "filled"], rotation: 90 },
            O1: { shape: "sharedVertexTriangle", fill: ["lined", "filled", "lined"] },
            O2: { shape: "triangle", fill: ["dotted", "filled", "lined"] },
            O3: { shape: "triangle", fill: ["filled"], rotation: 90 },
            O4: { shape: "sharedVertexTriangle", fill: ["filled", "lined"], rotation: 90 },
            O5: { shape: "rectangleWithTriangle", fill: ["dotted", "lined", "dotted", "lined"] },
            O6: { shape: "rectangleMinusTriangle", fill: ["filled", "filled"] },
            O7: { shape: "trapezium", fill: ["dotted", "filled", "lined"], rotation: 90 },
            O8: { shape: "sharedVertexTriangle", fill: ["filled", "filled", "filled"], rotation: 90 },
        },

        makeShape: (curShape) => {
            const shapesPartitioned = {
                rectangle: {
                    1: ["M 30 40 L 170 40 L 170 160 L 30 160 L 30 40"],
                    2: ["M 30 40 L 170 40 L 170 100 L 30 100 L 30 40",
                        "M 30 100 L 170 100 L 170 160 L 30 160 L 30 100"],
                    3: ["M 30 40 L 170 40 L 170 80 L 30 80 L 30 40",
                        "M 30 80 L 170 80 L 170 120 L 30 120 L 30 80",
                        "M 30 120 L 170 120 L 170 160 L 30 160 L 30 120"]
                },
                triangle: {
                    1: ["M 30 40 L 170 100 L 30 160 L 30 40"],
                    2: ["M 30 40 L 170 100 L 30 100 L 30 40",
                        "M 30 100 L 170 100 L 30 160 L 30 100"],
                    3: ["M 30 40 L 170 100 L 30 80 L 30 40",
                        "M 30 80 L 170 100 L 30 120 L 30 80",
                        "M 30 120 L 170 100 L 30 160 L 30 120"]
                },
                sharedVertexTriangle: {
                    1: ["M 30 40 L 100 100 L 30 160 L 30 40 M 170 40 L 100 100 L 170 160 L 170 40"],
                    2: ["M 30 40 L 100 100 L 30 100 L 30 40 M 170 100 L 100 100 L 170 160 L 170 100",
                        "M 30 160 L 100 100 L 30 100 L 30 160 M 170 100 L 100 100 L 170 40 L 170 100"],
                    3: ["M 30 40 L 100 100 L 30 80 L 30 40 M 170 120 L 100 100 L 170 160 L 170 120",
                        "M 30 80 L 100 100 L 30 120 L 30 80 M 170 80 L 100 100 L 170 120 L 170 80",
                        "M 30 120 L 100 100 L 30 160 L 30 120 M 170 40 L 100 100 L 170 80 L 170 40"],
                },
                none: { 1: [""], 2: ["", ""], 3: ["", "", ""] },
                rectangleWithTriangle: {
                    1: [""], 2: ["", ""], 3: ["", "", ""],
                    4: [makePolygon([[100, 100], [30, 30], [170, 30]]),
                    makePolygon([[100, 100], [170, 30], [170, 170]]),
                    makePolygon([[100, 100], [170, 170], [30, 170]]),
                    makePolygon([[100, 100], [30, 170], [30, 30]]),]
                },
                rectangleMinusTriangle: {
                    1: [""], 3: ["", "", ""],
                    2: [makePolygon([[30, 170], [100, 30], [30, 30]]), makePolygon([[170, 170], [100, 30], [170, 30]])]
                },
                trapezium: {
                    1: [""], 2: ["", ""],
                    3: [makePolygon([[170, 170], [170, 100], [30, 135]]),
                    makePolygon([[30, 65], [170, 100], [30, 135]]),
                    makePolygon([[170, 30], [170, 100], [30, 65]]),]
                }
            }
            const patterns = {
                lined: "STRIPE_VERTICAL",
                dotted: "DOTTED",
            }
            const plain = {
                filled: CONFIG.FILLCOLORS.BLACK, // CONFIG.FILLCOLORS.BLACK,
                none: CONFIG.FILLCOLORS.WHITE
            }
            // deciding number of partitions to make
            let fill = curShape.fill ? curShape.fill : ["none"]
            let shape = curShape.shape ? curShape.shape : "none"
            let rotation = curShape.rotation ? curShape.rotation : 0
            let numPartitions = curShape.fill.length
            let constituents = []
            for (let i = 0; i < numPartitions; i++) {
                constituents.push({
                    pathProperty: {
                        "d": shapesPartitioned[shape][numPartitions][i],
                        "stroke": CONFIG.BLACK,
                        "stroke-width": CONFIG.WIDTH.NORMAL,
                        "fill": fill[i] in patterns ? "url(#" + patterns[fill[i]] + ")" : plain[fill[i]]
                    },
                    transformProperty: { rotate: rotation }
                })
            }
            let used_fills = []
            let used_patterns = []
            for (let f in fill) {
                if (!used_fills.includes(fill[f])) {
                    used_fills.push(fill[f])
                    used_patterns.push(patterns[fill[f]])
                }
            }
            let properties = {
                patterns: used_patterns,
            }
            let finalSVG = makeFinalSVG(constituents, properties)
            return finalSVG;
        },
    },
    22: {
        type: "VS",
        apmId: 22,
        rowCol: "ROW",
        givenPuzzles: {
            "A": { given: ['F11', 'F12', 'F13'], options: ['F22', 'F33', 'F31', 'F21', 'CE2', 'F32', 'F23', 'CE1'] },
            "D": { given: ['F11', 'F12', 'F13', 'F33'], options: ['F22', 'F31', 'F21', 'CE2', 'F32', 'F23', 'CE1'] },
            "T": { given: ['F11', 'F12', 'F13', 'F21', 'F22', 'F23', 'F31', 'F32'], options: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'] }
        },
        commonErrors: [8, 2],
        correctOption: 7,
        features: [// 0 if not to draw, 1 if to draw
            { name: "outerSquare", example: [0, 1], default: 0 },
            { name: "borderDots", example: [0, 1], default: 0 },
            { name: "crossHair", example: [0, 1], default: 0 },
            { name: "innerCircle", example: [0, 1], default: 0 },
        ],
        puzzleCells: {
            F11: { outerSquare: 1, borderDots: 1, crossHair: 0 },
            F12: { borderDots: 1, crossHair: 1 },
            F13: { outerSquare: 1, crossHair: 1 },
            F21: { borderDots: 1, crossHair: 1 },
            F22: { borderDots: 1, innerCircle: 1 },
            F23: { crossHair: 1, innerCircle: 1 },
            F31: { outerSquare: 1, crossHair: 1 },
            F32: { crossHair: 1, innerCircle: 1 },
            F33: { outerSquare: 1, innerCircle: 1 },
            O1: { outerSquare: 1, crossHair: 1, borderDots: 1 },
            O2: { innerCircle: 1 },
            O3: { outerSquare: 1 },
            O4: { crossHair: 1 },
            O5: { outerSquare: 1, borderDots: 1, innerCircle: 1 },
            O6: { borderDots: 1 },
            O7: { outerSquare: 1, innerCircle: 1 },
            O8: { outerSquare: 1, borderDots: 1, crossHair: 1, innerCircle: 1 },
        },

        makeShape: (curShape) => {
            const shapePaths = {
                outerSquare: makeRectangle([170, 170], [30, 30]),
                borderDots:
                    makeCircle(155, 45, 7.5) +
                    makeCircle(155, 155, 7.5) +
                    makeCircle(45, 45, 7.5) +
                    makeCircle(45, 155, 7.5)
                ,
                innerCircle: makeCircle(100, 100, 30),
                crossHair: makeLine([30, 100], [170, 100]) + makeLine([100, 30], [100, 170])
            }
            let constituents = []
            for (let shape in shapePaths) {
                if (curShape[shape]) {
                    constituents.push({
                        pathProperty: {
                            "d": shapePaths[shape],
                            "stroke": CONFIG.BLACK,
                            "stroke-width": CONFIG.WIDTH.NORMAL,
                            "fill": shape === "borderDots" ? CONFIG.FILLCOLORS.BLACK : CONFIG.NOFILL
                        },
                        transformProperty: {}
                    })
                }
            }
            let finalSVG = makeFinalSVG(constituents, {})
            return finalSVG;
        },
    },
    33: {
        type: "VS",
        apmId: 33,
        rowCol: "ROW",
        givenPuzzles: {
            "A": { given: ['F11', 'F12', 'F13'], options: ['CE1', 'F21', 'F32', 'F23', 'F33', 'F22', 'CE2', 'F31'] },
            "D": { given: ['F11', 'F12', 'F13', 'F33'], options: ['CE1', 'F21', 'F32', 'F23', 'F22', 'CE2', 'F31'] },
            "T": { given: ['F11', 'F12', 'F13', 'F21', 'F22', 'F23', 'F31', 'F32'], options: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'] }
        },
        commonErrors: [7, 4],
        correctOption: 5,
        features: [
            // any position can have "none": nothing, "white": white, "filled": black
            // numbering goes from top 1 2 3 to bottom
            { name: "left", example: [["none", "none", "none"], ["filled", "white", "none"]], default: ["none", "none", "none"] },
            { name: "right", example: [["none", "none", "none"], ["filled", "white", "none"]], default: ["none", "none", "none"] }
        ],
        puzzleCells: {
            F11: { left: ["none", "white", "none"], right: ["filled", "none", "filled"] },
            F12: { left: ["white", "none", "white"], right: ["none", "filled", "none"] },
            F13: { left: ["white", "white", "white"], right: ["filled", "filled", "filled"] },
            F21: { left: ["filled", "filled", "filled"], right: ["none", "white", "white"] },
            F22: { left: ["none", "white", "none"], right: ["none", "none", "filled"] },
            F23: { left: ["filled", "filled", "none"], right: ["none", "none", "white"] },
            F31: { left: ["none", "filled", "none"], right: ["none", "none", "white"] },
            F32: { left: ["white", "white", "white"], right: ["none", "filled", "filled"] },
            F33: { left: ["white", "white", "none"], right: ["none", "none", "filled"] },
            O1: { left: ["filled", "filled", "none"], right: ["white", "white", "none"] },
            O2: { left: ["white", "white", "none"], right: ["filled", "filled", "filled"] },
            O3: { left: ["none", "none", "white"], right: ["filled", "filled", "none"] },
            O4: { left: ["white", "white", "white"], right: ["filled", "filled", "none"] },
            O5: { left: ["white", "white", "none"], right: ["none", "none", "filled"] },
            O6: { left: ["none", "filled", "none"], right: ["none", "white", "none"] },
            O7: { left: ["white", "none", "white"], right: ["none", "filled", "none"] },
            O8: { left: ["white", "none", "white"], right: ["filled", "filled", "filled"] },
        },
        makeShape: (curShape) => {
            const midLine = makeLine([100, 30], [100, 170])
            let constituents = [{
                pathProperty: {
                    "d": midLine,
                    "stroke": CONFIG.BLACK,
                    "stroke-width": CONFIG.WIDTH.NORMAL,
                },
                transformProperty: {}
            }]
            let smallCirclePath = makeCircle(100, 100, 10)
            const translateLocation = {
                left: -30,
                right: 30
            }
            let verticalDistance = 50
            let posSides = ["left", "right"]
            for (let s in posSides) {
                let side = posSides[s]
                for (let i in curShape[side])
                    if (curShape[side][i] !== "none") {
                        let fillColor = curShape[side][i] === "filled" ? CONFIG.FILLCOLORS.BLACK : CONFIG.FILLCOLORS.NONE
                        constituents.push({
                            pathProperty: {
                                "d": smallCirclePath,
                                "stroke": CONFIG.BLACK,
                                "stroke-width": CONFIG.WIDTH.NORMAL,
                                "fill": fillColor
                            },
                            transformProperty: { translate: [translateLocation[side], (i - 1) * verticalDistance] }
                        })
                    }
            }
            let finalSVG = makeFinalSVG(constituents, {})
            return finalSVG;
        },
    },
    34: {
        type: "VA",
        apmId: 34,
        rowCol: "ROW",
        givenPuzzles: {
            "A": { given: ['F11', 'F12', 'F13'], options: ['F23', 'F31', 'CE2', 'F32', 'F33', 'F22', 'CE1', 'F21'] },
            "D": { given: ['F11', 'F12', 'F13', 'F33'], options: ['F23', 'F31', 'CE2', 'F32', 'F22', 'CE1', 'F21'] },
            "T": { given: ['F11', 'F12', 'F13', 'F21', 'F22', 'F23', 'F31', 'F32'], options: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'] }
        },
        correctOption: 1,
        commonErrors: [3, 2],
        features: [
            { name: "shape", example: ["E", "C", "Z", "U", "N"], default: "E" },
            { name: "curvature", example: ["straight", "curved1", "curved2"], default: "straight" },
            { name: "numDots", example: [0, 1, 2, 3], default: 0 },
            { name: "rotation", example: [0, 45, 90], default: 0 }
        ],
        puzzleCells: {
            F11: { shape: "E", curvature: "straight", numDots: 2 },
            F12: { shape: "C", curvature: "straight", numDots: 1 },
            F13: { shape: "Z", curvature: "straight", numDots: 3 },
            F21: { shape: "C", curvature: "curved1", numDots: 3 },
            F22: { shape: "Z", curvature: "curved1", numDots: 2 },
            F23: { shape: "E", curvature: "curved1", numDots: 1 },
            F31: { shape: "Z", curvature: "curved2", numDots: 1 },
            F32: { shape: "E", curvature: "curved2", numDots: 3 },
            F33: { shape: "C", curvature: "curved2", numDots: 2 },
            O1: { shape: "C", curvature: "curved2", numDots: 2 },
            O2: { shape: "Clong", curvature: "curved2", numDots: 2, rotation: 270 },
            O3: { shape: "Ethin", curvature: "curved2", numDots: 2, rotation: 135 },
            O4: { shape: "C", curvature: "curved2", numDots: 2, rotation: 90 },
            O5: { shape: "Z", curvature: "curved2", numDots: 2, rotation: 90 },
            O6: { shape: "N", curvature: "straight", numDots: 2, rotation: 0 },
            O7: { shape: "N", curvature: "curved1", numDots: 1, rotation: 0 },
            O8: { shape: "Cshort", curvature: "curved2", numDots: 3, rotation: 270 },

        },
        makeShape: (curShape) => {
            const shapePaths = {
                straight: {
                    // radius of dots: 6, but needed space 10
                    E: {
                        mainShape: "M 30 100 L 170 100 M 30 120 L 170 120  M 30 80 L 170 80 ",
                        dots: [
                            makeCircle(100, 90, 6),
                            makeCircle(100, 110, 6),
                            makeCircle(100, 130, 6),
                            makeCircle(100, 70, 6),
                        ]
                    },
                    C: {
                        mainShape: "M 170 90 L 30 90 L 30 110 L 170 110",
                        dots: [
                            makeCircle(42, 100, 6),
                            makeCircle(42, 120, 6),
                            makeCircle(42, 80, 6),
                            makeCircle(100, 100, 6),
                        ]
                    },
                    Z: {
                        mainShape: "M 100 50 L 150 50 L 50 150 L 100 150",
                        dots: [
                            makeCircle(120, 62.5, 6),
                            makeCircle(80, 137.5, 6),
                            makeCircle(60, 162.5, 6),
                            makeCircle(140, 37.5, 6),
                        ]
                    },
                    U: {
                        mainShape: "M 40 40 L 40 140 L 160 140 L 160 40",
                        dots: [
                            makeCircle(100, 120, 6),
                            makeCircle(20, 120, 6),
                            makeCircle(180, 120, 6),
                            makeCircle(100, 160, 6),
                        ]
                    },
                    N: {
                        mainShape: "M 40 120 L 40 80  L 160 80  L 160 120",
                        dots: [
                            makeCircle(55, 95, 6),
                            makeCircle(147.5, 65, 6),
                            makeCircle(55, 65, 6),
                            makeCircle(147.5, 95, 6),
                        ]
                    }
                },
                curved1: { // max length of curve: 80, radius 50 50
                    // small arc length: 40, radius 25 25
                    E: {
                        mainShape:
                            makeElipticalPath(80, 70, 120, 70, 25, 25, 0, 0, 1) +
                            makeElipticalPath(60, 110, 140, 110, 50, 50, 0, 0, 1) +
                            makeElipticalPath(80, 130, 120, 130, 25, 25, 0, 0, 1),
                        dots: [
                            makeCircle(100, 106, 6),
                            makeCircle(100, 136, 6),
                            makeCircle(100, 76, 6),
                            makeCircle(150, 145, 6),
                        ]
                    },
                    C: {
                        mainShape:
                            makeElipticalPath(90, 50, 170, 50, 50, 50, 0, 0, 0) +
                            makeElipticalPath(92, 50, 92, 150, 60, 60, 0, 0, 0) +
                            makeElipticalPath(90, 150, 170, 150, 50, 50, 0, 0, 1),
                        dots: [
                            makeCircle(130, 100, 6),
                            makeCircle(130, 150, 6),
                            makeCircle(130, 50, 6),
                            makeCircle(40, 100, 6),
                        ]
                    },
                    Z: {
                        mainShape:
                            makeElipticalPath(40, 80, 120, 80, 50, 50, 0, 0, 1) +
                            makeElipticalPath(119, 79, 81, 151, 50, 50, 0, 0, 0) +
                            makeElipticalPath(80, 150, 160, 150, 50, 50, 0, 0, 1),
                        dots: [
                            makeCircle(65, 100, 6),
                            makeCircle(100, 110, 6),
                            makeCircle(120, 150, 6),
                            makeCircle(80, 40, 6),
                        ]
                    },
                    U: {
                        mainShape:
                            makeElipticalPath(60, 60, 60, 140, 75, 75, 0, 0, 1) +
                            makeElipticalPath(59, 139, 141, 139, 75, 75, 0, 0, 0) +
                            makeElipticalPath(140, 60, 140, 140, 75, 75, 0, 0, 0),
                        dots: [
                            makeCircle(100, 135, 6),
                            makeCircle(100, 165, 6),
                            makeCircle(50, 100, 6),
                            makeCircle(150, 100, 6),
                        ]
                    },
                    N: {
                        mainShape:
                            makeElipticalPath(60, 100, 60, 150, 25, 25, 0, 0, 0) +
                            makeElipticalPath(59, 99, 141, 99, 50, 50, 0, 0, 0) +
                            makeElipticalPath(140, 100, 140, 150, 25, 25, 0, 0, 1),
                        dots: [
                            makeCircle(100, 135, 6),
                            makeCircle(100, 100, 6),
                            makeCircle(50, 120, 6),
                            makeCircle(150, 120, 6),
                        ]
                    }
                },
                curved2: {
                    // max length of curve: 80, radius 25 25
                    // small arc length: 40, radius 25 25
                    // break at center
                    E: {
                        mainShape:
                            makeCurve2(60, 70, 100, 70, 140, 70, 40, 40, 0, 0, 1) +
                            makeCurve2(70, 100, 100, 100, 130, 100, 35, 35, 0, 0, 1) +
                            makeCurve2(60, 130, 100, 130, 140, 130, 40, 40, 0, 0, 1),
                        dots: [
                            makeCircle(110, 88, 6),
                            makeCircle(110, 120, 6),
                            makeCircle(110, 150, 6),
                            makeCircle(110, 60, 6),
                        ]
                    },
                    Ethin: {
                        mainShape:
                            makeCurve2(60, 80, 100, 80, 140, 80, 40, 40, 0, 0, 0) +
                            makeCurve2(70, 100, 100, 100, 130, 100, 35, 35, 0, 0, 0) +
                            makeCurve2(60, 120, 100, 120, 140, 120, 40, 40, 0, 0, 0),
                        dots: [
                            makeCircle(120, 135, 6),
                            makeCircle(82, 65, 6),
                            makeCircle(110, 150, 6),
                            makeCircle(110, 60, 6),
                        ]
                    },
                    C: {
                        mainShape:
                            makeCurve2(90, 50, 130, 50, 170, 50, 40, 40, 0, 0, 1) +
                            makeCurve2(91, 50, 100, 100, 91, 150, 40, 40, 0, 0, 1) +
                            makeCurve2(90, 150, 130, 150, 170, 150, 40, 40, 0, 0, 1),
                        dots: [
                            makeCircle(90, 80, 6),
                            makeCircle(105, 125, 6),
                            makeCircle(150, 40, 6),
                            makeCircle(150, 140, 6),
                        ]
                    },
                    Clong: {
                        mainShape:
                            makeCurve2(50, 50, 110, 50, 170, 50, 40, 40, 0, 0, 1) +
                            makeCurve2(51, 50, 55, 100, 51, 150, 40, 40, 0, 0, 1) +
                            makeCurve2(50, 150, 110, 150, 170, 150, 40, 40, 0, 0, 1),
                        dots: [
                            makeCircle(40, 100, 6),
                            makeCircle(70, 100, 6),
                            makeCircle(150, 40, 6),
                            makeCircle(150, 140, 6),
                        ]
                    },
                    Cshort: {
                        mainShape:
                            makeCurve2(80, 50, 110, 60, 140, 50, 40, 40, 0, 0, 1) +
                            makeCurve2(81, 50, 75, 100, 81, 150, 40, 40, 0, 0, 1) +
                            makeCurve2(80, 150, 110, 155, 140, 150, 40, 40, 0, 0, 1),
                        dots: [
                            makeCircle(100, 105, 6),
                            makeCircle(100, 30, 6),
                            makeCircle(100, 170, 6),
                            /*   makeCircle(70, 100, 6),
                              makeCircle(150, 40, 6),
                              makeCircle(150, 140, 6), */
                        ]
                    },
                    Z: {
                        mainShape:
                            makeCurve2(60, 60, 100, 60, 140, 60, 40, 40, 0, 0, 1) +
                            makeCurve2(140, 60, 100, 100, 60, 140, 50, 50, 0, 0, 1) +
                            makeCurve2(60, 140, 100, 140, 140, 140, 50, 50, 0, 0, 1),
                        dots: [
                            makeCircle(100, 125, 6),
                            makeCircle(100, 80, 6),
                            makeCircle(80, 150, 6),
                            makeCircle(120, 50, 6),
                        ]
                    },
                    U: {
                        mainShape:
                            makeCurve2(60, 60, 60, 100, 60, 140, 75, 75, 0, 0, 1) +
                            makeCurve2(59, 139, 100, 140, 141, 139, 75, 75, 0, 0, 0) +
                            makeCurve2(140, 60, 140, 100, 140, 140, 75, 75, 0, 0, 0),
                        dots: [
                            makeCircle(100, 125, 6),
                            makeCircle(45, 100, 6),
                            makeCircle(155, 100, 6),
                            makeCircle(100, 155, 6),
                        ]
                    },
                    N: {
                        mainShape:
                            makeCurve2(60, 100, 60, 125, 60, 150, 25, 25, 0, 0, 1) +
                            makeCurve2(59, 99, 100, 99, 141, 99, 50, 50, 0, 0, 1) +
                            makeCurve2(140, 100, 140, 125, 140, 150, 25, 25, 0, 0, 1),
                        dots: [
                            makeCircle(80, 110, 6),
                            makeCircle(120, 90, 6),
                            makeCircle(50, 110, 6),
                            makeCircle(150, 135, 6),
                        ]
                    },
                }
            }
            let shape = curShape.shape ? curShape.shape : "E"
            let curvature = curShape.curvature ? curShape.curvature : "straight"
            let numDots = curShape.numDots ? curShape.numDots : 1
            let rotation = curShape.rotation ? curShape.rotation : 0
            let constituents = [{
                pathProperty: {
                    "d": shapePaths[curvature][shape].mainShape,
                    "stroke": CONFIG.BLACK,
                    "stroke-width": CONFIG.WIDTH.NORMAL,
                    "fill": CONFIG.NOFILL
                },
                transformProperty: { rotate: rotation }
            },]
            for (let i = 0; i < numDots; i++) {
                constituents.push({
                    pathProperty: {
                        "d": shapePaths[curvature][shape].dots[i],
                        "stroke": CONFIG.BLACK,
                        "stroke-width": CONFIG.WIDTH.NORMAL,
                        "fill": CONFIG.FILLCOLORS.BLACK
                    },
                    transformProperty: { rotate: rotation }
                })
            }
            let finalSVG = makeFinalSVG(constituents, {})
            return finalSVG;
        },

    },
};
