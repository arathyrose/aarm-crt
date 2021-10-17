import { CONFIG } from "./config"

import ReactHtmlParser from 'react-html-parser';


export function makeFinalSVG(constituents, properties) {
    const finalSVG = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );
    /*  if (!("width" in properties)) {
         properties["width"] = CONFIG.DIMENSION
     }
     if (!("height" in properties)) {
         properties["height"] = CONFIG.DIMENSION
     } */
    properties["view-box"] = "0 0 200 200"
    for (let i in properties) {
        if (i === "patterns") {
            for (let j in properties[i])
                finalSVG.innerHTML += CONFIG.FILLPATTERNS[properties[i][j]]
        }
        else {
            finalSVG.setAttribute(i, properties[i])
        }
    }
    for (let constituent in constituents) {
        finalSVG.appendChild(makeConstituent(constituents[constituent]));
    }
    return ReactHtmlParser(finalSVG.outerHTML)
}

export function constructTransformText(transformProperty) {
    let transformText = ""
    if (transformProperty)
        for (let i in transformProperty) {
            if (i === "rotate")
                transformText += " rotate(" + transformProperty[i].toString() + " " + CONFIG.DIMENSION / 2 + " " + CONFIG.DIMENSION / 2 + ") "
            else if (i === "scale" && !("translate" in transformProperty))
                transformText += " scale(" + transformProperty[i].toString() + ") translate(" + getPosition(transformProperty[i]).toString() + "," + getPosition(transformProperty[i]).toString() + ") "
            else if (i === "scale")
                transformText += " scale(" + transformProperty[i].toString() + ")"
            else if (i === "translate")
                transformText += " translate(" + transformProperty[i][0].toString() + "," + transformProperty[i][1].toString() + ") "
        }
    return transformText
}

export function getPosition(scalingFactor) {
    return (CONFIG.DIMENSION) * (1 - scalingFactor)
}

export function makeConstituent(constituent) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g")
    let transformText = constructTransformText(constituent.transformProperty)
    g.setAttribute('transform', transformText);
    let pathProperty = constituent.pathProperty
    if (pathProperty) {
        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        for (let i in pathProperty) {
            if (pathProperty[i] === "fill")
                path.setAttribute("opacity", "1")
            path.setAttribute(i, pathProperty[i])
        }
        g.appendChild(path)
    }
    let constituents = constituent.constituents
    for (let c in constituents) {
        g.appendChild(makeConstituent(constituents[c]));
    }
    return g
}

// save in polygon maker file

export function makePolygon(points, closed = true) {
    // draw a polygon with the given points,
    // if closed is undefined, then the polygon is closed
    let finalString = " M " + points[0][0].toString() + "," + points[0][1].toString()
    for (let point = 1; point < points.length; point += 1) {
        //     console.log(point, points[point], points[point][0], points[point][1])
        finalString += " L " + points[point][0].toString() + "," + points[point][1].toString()
    }
    if (closed) return finalString + " Z "
    else return finalString
}

export function makeLine(startPoint, endPoint) {
    // points are tuples/length 2 arrays
    return makePolygon([startPoint, endPoint], false)
}

export function makeRectangle(leftCorner, rightCorner) {
    // left and right corners are tuples/length 2 arrays
    let a = leftCorner[0], b = leftCorner[1], c = rightCorner[0], d = rightCorner[1]
    //  console.log(leftCorner, rightCorner, a,b,c,d)
    return makePolygon([[a, b], [c, b], [c, d], [a, d]])
}

// save in circle maker file
export function makeCircle(cx, cy, r) {
    // Draw a circle with center (cx,cy) and radius r
    return " M " + (cx - r).toString() + " " + cy.toString()
        + " a " + r.toString() + " " + r.toString() + " 0 1,0 " + (2 * r).toString() + ",0 "
        + " a " + r.toString() + " " + r.toString() + " 0 1,0 " + (-2 * r).toString() + ",0 "
}
export function makeElipticalPath(sx, sy, ex, ey, rx, ry, rot, arcFlag, oppo) {
    /* 
    Draw an eliptical path
    (sx, sy): starting position 
    (ex, ey): ending position
    (rx, mer): major and minor radius
      rot: rotation (in deg)
    arcFlag: 0 or 1
    oppo: change the curve from concave to convex: 0 or 1
    */
    return " M " + sx.toString() + " " + sy.toString() +
        " L " + sx.toString() + " " + sy.toString() +
        " A " + rx.toString() + " " + ry.toString() + ", " +
        rot.toString() + ", " +
        arcFlag.toString() + " " + oppo.toString() + ", " +
        ex.toString() + " " + ey.toString()
}
export function makeCurve2(sx, sy, bx, by, ex, ey, rx, ry, rot, arcFlag, oppo) {
    /* 
   Function to draw a double curved eliptical path
   (sx, sy): starting position 
   (bx, by): break position
   (ex, ey): ending position
   (rx, mer): major and minor radius
     rot: rotation (in deg)
   arcFlag: 0 or 1
   oppo: starting curve orientation concave to convex: 0 or 1
   */
    let oppo2 = (oppo === 0) ? 1 : 0
    return makeElipticalPath(sx, sy, bx, by, rx, ry, rot, arcFlag, oppo) +
        makeElipticalPath(bx, by, ex, ey, rx, ry, rot, arcFlag, oppo2)
}

// save in drawing small squares
export const sides = {
    "U": [-1, 0],
    "D": [1, 0],
    "L": [0, -1],
    "R": [0, 1],
}
export const borderLineSide = {
    "L": [0, 0, 1, 0],
    "R": [0, 1, 1, 1],
    "U": [0, 1, 0, 0],
    "D": [1, 1, 1, 0],
}
export function checkIfValid(i, j) {
    if (i >= 3 || j >= 3 || i < 0 || j < 0) {
        return 0
    } else {
        return 1
    }
}
export function makeInto1D(i, j) {
    return i * 3 + j
}
export function makeInto2D(k) {
    return [Math.floor(k / 3), k % 3]
}

export function drawSmallSquare_1(i, j) {
    // fills the 3x3 box fully
    let startingPosY = (40 * (1 + i)).toString()
    let startingPosX = (40 * (1 + j)).toString()
    let endingPosY = (40 * (2 + i)).toString()
    let endingPosX = (40 * (2 + j)).toString()
    return "M " + startingPosX + "," + startingPosY + " L " +
        endingPosX + "," + startingPosY + " L " + endingPosX + "," + endingPosY + " L " +
        startingPosX + "," + endingPosY
}
export function drawSmallSquare_2(i, j) {
    // fills the 3x3 box partially with space on the right side
    let startingPosY = (40 * (1 + i)).toString()
    let startingPosX = (40 * (1 + j)).toString()
    let endingPosY = (40 * (1 + i) + 30).toString()
    let endingPosX = (40 * (1 + j) + 30).toString()
    return "M " + startingPosX + "," + startingPosY + " L " +
        endingPosX + "," + startingPosY + " L " + endingPosX + "," + endingPosY + " L " +
        startingPosX + "," + endingPosY
}

export function getSideElement(k, side) {
    let oldPos = makeInto2D(k)
    let newPos = [oldPos[0] + sides[side][0], oldPos[1] + sides[side][1]]
    if (!checkIfValid(newPos[0], newPos[1])) return -1
    else return makeInto1D(newPos[0], newPos[1])
}

export function drawBorder(i, j, side) {
    let positionsBord = [
        i + borderLineSide[side][0],
        j + borderLineSide[side][1],
        i + borderLineSide[side][2],
        j + borderLineSide[side][3]]
    let startingPosY = (40 * (1 + positionsBord[0])).toString()
    let startingPosX = (40 * (1 + positionsBord[1])).toString()
    let endingPosY = (40 * (1 + positionsBord[2])).toString()
    let endingPosX = (40 * (1 + positionsBord[3])).toString()
    return "M " + startingPosX + "," + startingPosY + " L " + endingPosX + "," + endingPosY
}