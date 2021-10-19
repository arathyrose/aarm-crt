import React from "react";
import { Stage, Layer, Line, Rect } from 'react-konva';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo, faRedo, faPen, faEraser, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { MenuRow, MenuButton } from "./styles";

const DrawingArea = ({ saveImage, setSaveImage }) => {
  const [lines, setLines] = React.useState([]);
  const [undoneLines, setUndoneLines] = React.useState([])
  const [tool, setTool] = React.useState("pen")
  const isDrawing = React.useRef(false);
  const [size, setSize] = React.useState(1)
  const stageRef = React.useRef(null);

  React.useEffect(() => {
    //loadImage();
    if (saveImage === true) {
      const uri = stageRef.current.toDataURL();
      console.log(uri);
      downloadURI(uri, 'crtTask.png');
      setSaveImage(false)
    }
  }, [saveImage]) // eslint-disable-line react-hooks/exhaustive-deps

  // function from https://stackoverflow.com/a/15832662/512042
  function downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y], tool: tool, strokeWidth: size }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    // To draw line
    let lastLine = lines[lines.length - 1];

    if (lastLine) {
      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      // replace last
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
      console.log(lines)
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const onUndo = () => {
    isDrawing.current = false
    let lastLine = lines[lines.length - 1]
    if (lastLine) {
      setUndoneLines([...undoneLines, lastLine])
      setLines(lines.slice(0, -1))
    }
  }
  const onRedo = () => {
    isDrawing.current = false
    let addedLine = undoneLines[undoneLines.length - 1]
    if (addedLine) {
      setLines([...lines, addedLine])
      setUndoneLines(lines.slice(0, -1))
    }
  }

  const height = window.innerHeight;
  const width = window.innerWidth;
  const puzzleCellDimension = (Math.min(height, width) / 3) * 0.8;

  return <div> <Stage
    width={(puzzleCellDimension + 4) * 3}
    height={(puzzleCellDimension + 4) * 3}
    onMouseDown={handleMouseDown}
    onTouchStart={handleMouseDown}
    onMousemove={handleMouseMove}
    onTouchMove={handleMouseMove}
    onMouseup={handleMouseUp}
    onTouchEnd={handleMouseUp}
    ref={stageRef}
    className="canvas-stage"
  >
    <Layer>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          stroke={"#000000"}
          strokeWidth={line.strokeWidth}
          tension={0.5}
          lineCap="round"
          globalCompositeOperation={
            line.tool === 'eraser' ? 'destination-out' : 'source-over'
          }
        />
      ))}
      {[0, 1, 2].map((i) => {
        return [0, 1, 2].map((j) => {
          return <Rect key={i.toString() + j.toString()}
            x={((puzzleCellDimension + 4) * i)}
            y={((puzzleCellDimension + 4) * j)}
            width={puzzleCellDimension}
            height={puzzleCellDimension}
            stroke="#000000"
            strokeWidth={.5}
          />
        })
      })}

    </Layer>

  </Stage>
    {/* Here come the bottom bar! */}

    <MenuRow>
      <MenuButton onClick={() => onUndo()}>   <FontAwesomeIcon icon={faUndo} />  </MenuButton>
      <MenuButton onClick={() => onRedo()}>   <FontAwesomeIcon icon={faRedo} />  </MenuButton>
      <MenuButton onClick={() => setTool("pen")}>   <FontAwesomeIcon icon={faPen} />  </MenuButton>
      <MenuButton onClick={() => setTool("eraser")}>   <FontAwesomeIcon icon={faEraser} />  </MenuButton>
      <MenuButton onClick={() => size < 20 ? setSize(size + 1) : ""}>   <FontAwesomeIcon icon={faPlus} />  </MenuButton>
      <MenuButton onClick={() => {

      }}> {size} </MenuButton>
      <MenuButton onClick={() => size > 1 ? setSize(size - 1) : ""}>   <FontAwesomeIcon icon={faMinus} />  </MenuButton>
    </MenuRow>
  </div>
}

export default DrawingArea