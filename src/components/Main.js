import React from "react";
import Form from 'react-bootstrap/Form';

import TileBoard from './TileBoard.js';
import ScoreBoard from './ScoreBoard.js';

class Main extends React.Component {
// Main contains (1) the form to select difficulty (2) the game board (3) the scoreboard

    constructor(props) {
        super(props);
        this.state = {difficulty: 2};
    }

    handleSelect(event) {
        this.setState({difficulty: event.target.value});
        console.log(this.state.difficulty);
    }    

    render() {
        return(
            <main>
                <h2>Main</h2>
                <Form>
                <Form.Group>
                  <Form.Label>Choose difficulty level:</Form.Label>
                  <Form.Select onSubmit={this.handleSelect.bind(this)}>      
                    <option value="4">Easy</option>
                    <option value="5">Medium</option>
                    <option value="6">Hard</option>
                    </Form.Select>
                </Form.Group>
                <input type="submit" value="Submit" />
              </Form>
              <TileBoard difficulty={this.props.difficulty} />
              <ScoreBoard />
            </main>
        )
    }
  }
  
  export default Main;
