import React from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    width: '640px',
    margin: 'auto'
  },
  title: {
    
  },
  logo: {
    marginLeft: '15px',
    fontSize: '0.9em'
  }
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  titleStyle() {
    let titleStyle = {
      fontSize: '2em',
      fontWeight: '900',
      padding: '10px 0'
    };

    if (this.state && this.state.hovered) {
      titleStyle.color = 'white';
    }

    return titleStyle;
  }

  onMouseOver() {
    this.setState({ hovered:true });
  }

  onMouseOut() {
    this.setState({ hovered:false });
  }

  render() {
    return (
      <header>
        <div style={styles.header}>
          <Link to="/" style={this.titleStyle()} onMouseOut={this.onMouseOut} onMouseOver={this.onMouseOver}>COOKBOOK<FontAwesome style={styles.logo} name="cutlery"/></Link>
        </div>
      </header>
    );
  }
}

module.exports = Header;
