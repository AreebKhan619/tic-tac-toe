import React, { Component } from "react";
import "./TicTacToe.css";
class TicTacToe extends Component {
  state = {
    arr: [],
    xsTurn: true,
    isGameOver: false,
    isWon: false
  };

  componentDidMount() {
    this.clearBoxes();
  }

  handleClick = i => {
    let t = this.state.arr.slice();
    if (!t[i] && !this.state.isGameOver) {
      t[i] = this.state.xsTurn ? "X" : "O";
      this.setState({
        arr: t,
        xsTurn: !this.state.xsTurn
      });
      this.checkForVictory(t);
    }
  };

  check = (pos, arr, symbol, type) => {
    switch (type) {
      case "up":
        return arr[pos - 3] && arr[pos - 3] === symbol;
      case "down":
        return arr[pos + 3] && arr[pos + 3] === symbol;
      case "right":
        return arr[pos + 1] && arr[pos + 1] === symbol;
      case "left":
        return arr[pos - 1] && arr[pos - 1] === symbol;
      //in my terminology, right or left along with up or down will mean that it's a diagonal
      case "rightup":
        return arr[pos - 2] && arr[pos - 2] === symbol;
      case "rightdown":
        return arr[pos + 4] && arr[pos + 4] === symbol;
      case "leftdown":
        return arr[pos + 2] && arr[pos + 2] === symbol;
      case "leftup":
        return arr[pos - 4] && arr[pos - 4] === symbol;
      default:
        break;
    }
  };

  checkForVictory = (arr = this.state.arr) => {
    let xIndices = arr.map((e, i) => (e === "X" ? i : "")).filter(String);
    let oIndices = arr.map((e, i) => (e === "O" ? i : "")).filter(String);

    // console.log("x", xIndices);
    // console.log("o", oIndices);

    //remember, the indices are from 0 to 8, not from 1 to 9

    if (this.actualWinCheck(xIndices)) {
      console.log("x won");
      this.setState({
        isGameOver: true,
        isWon: true
      });
    }
    if (this.actualWinCheck(oIndices)) {
      this.setState({
        isGameOver: true,
        isWon: true
      });
    }

    if (xIndices.length + oIndices.length === 9) {
      console.log("game over");
    }
  };

  actualWinCheck = arrayOfIndices => {
    if (arrayOfIndices.includes(0)) {
      if (arrayOfIndices.includes(3) && arrayOfIndices.includes(6)) {
        return true;
      }
      if (arrayOfIndices.includes(1) && arrayOfIndices.includes(2)) {
        return true;
      }
      if (arrayOfIndices.includes(4) && arrayOfIndices.includes(8)) {
        return true;
      }
    }

    if (arrayOfIndices.includes(1)) {
      if (arrayOfIndices.includes(4) && arrayOfIndices.includes(7)) {
        return true;
      }
    }

    if (arrayOfIndices.includes(3)) {
      if (arrayOfIndices.includes(4) && arrayOfIndices.includes(5)) {
        return true;
      }
    }

    if (arrayOfIndices.includes(6)) {
      if (arrayOfIndices.includes(7) && arrayOfIndices.includes(8)) {
        return true;
      }
    }

    if (arrayOfIndices.includes(2)) {
      if (arrayOfIndices.includes(4) && arrayOfIndices.includes(6)) {
        return true;
      }
      if (arrayOfIndices.includes(5) && arrayOfIndices.includes(8)) {
        return true;
      }
    }

    return false;
  };

  clearBoxes = () => {
    this.setState({
      arr: Array(9).fill(null),
      xsTurn: true,
      isGameOver: false,
      isWon: false
    });
    console.clear();
  };

  render() {
    return (
      <>
        <div className="outer-box">
          {this.state.arr.map((el, i) => (
            <div
              key={i}
              className={
                `box ` + (this.state.isGameOver ? `filled` : el ? `filled` : ``)
              }
              onClick={() => this.handleClick(i)}
            >
              {el}
            </div>
          ))}
        </div>
        <div style={{textAlign: 'center'}}>
          <button onClick={this.clearBoxes}>Clear</button>
          {this.state.isGameOver && (
            <div>
              Game Over.{" "}
              {this.state.isWon && (
                <span>{!this.state.xsTurn ? "X" : "O"} wins!</span>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default TicTacToe;
