import React from "react";

// import tile1 from '../img/tile1.png';
// import tileback from '../img/tileback.png';

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.handleTileClick = this.handleTileClick.bind(this);
        this.tileValue = props.tileValue;
        this.image_url = '../img/tileback.png';
        this.image_alt = `Tile ${props.tileId}`;
        this.key = props.tileId;
        this.tileId = props.tileId;
        this.state = {faceup: false, matchFound: false};
    }

    handleTileClick() {
        this.setState({ faceup: true });
        this.image_url = `../img/tile${this.tileValue}.png`;
        this.image_alt = `Image ${this.tileValue}`;
    }
    
    render() {
        console.log("Tile render this.props.tileId",this.props.tileId);
    return (
        <div className="tile" onClick={this.handleTileClick}>
            <h2>A Tile</h2>
            <img src={this.image_url} alt={this.image_alt} />
        </div>
        );
    }
}

export default Tile;
