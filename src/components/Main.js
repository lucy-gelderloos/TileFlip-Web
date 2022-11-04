import React from "react";
import Form from 'react-bootstrap/Form';

import TileBoard from './TileBoard.js';
import ScoreBoard from './ScoreBoard.js';

class Main extends React.Component {
// Main contains (1) the form to select difficulty (2) the game board (3) the scoreboard

    constructor(props) {
        super(props);
        this.state = {difficulty: 4};
        this.tilesArray = this.createTilesArray(this.state.difficulty);
    }

    handleSelect(event) {
        this.createTilesArray(event.target.value);
        this.setState({difficulty: event.target.value});
        // console.log(this.state.difficulty);
    }
    
    createTilesArray(difficulty) {
        let tilesArray = [], k = 0;
        for(let i = 1; i <= Math.pow(difficulty,2) / 2; i++) {
            tilesArray[k] = i;
            k++;
            tilesArray[k] = i;
            k++;
        }
        // https://bost.ocks.org/mike/shuffle/
        let len = tilesArray.length, j, t;
        while(len) {
            j = Math.floor(Math.random() * len--);
            t = tilesArray[len];
            tilesArray[len] = tilesArray[j];
            tilesArray[j] = t;
        }
        
        for(let i = 0; i < tilesArray.length; i++) {
            let holdingVal = tilesArray[i];
            tilesArray[i] = {_id: i, value: holdingVal};
        }
        console.log("Main createTilesArray tilesArray",tilesArray);
        this.tilesArray = tilesArray;
        console.log("Main createTilesArray this.tilesArray",this.tilesArray);
        return this.tilesArray;
    }

    render() {
        console.log("Main render tilesArray",this.tilesArray)
        return(
            <main>
                <h2>Main</h2>
                <Form>
                <Form.Group>
                  <Form.Label>Choose difficulty level:</Form.Label>
                  <Form.Select onChange={this.handleSelect.bind(this)}>      
                    <option value="2">Very Easy</option>
                    <option value="4">Easy</option>
                    {/* <option value="5">Medium</option> */}
                    <option value="6">Hard</option>
                    </Form.Select>
                </Form.Group>
                <input type="submit" value="Submit" />
              </Form>
              <TileBoard difficulty={this.state.difficulty} tilesArray={this.tilesArray} />
              <ScoreBoard />
            </main>
        )
    }
  }
  
  export default Main;
