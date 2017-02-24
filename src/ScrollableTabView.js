
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import Tabs from 'material-ui/Tabs/Tabs';
// import Tab from 'material-ui/Tabs/Tab';
import Tabs from './Tabs';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SwipeableViews from 'react-swipeable-views';

const styles = {
  topSlide: {
    color: 'red',
  },
  root: {
    // width:'1rem',
    // padding: '0 3.1rem',
    // position:'relative',
    // left:'-10%'
  },
  slideContainer: {
    padding: '0 0',
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#f70',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
};

class DemoTabs extends React.Component {
  state = {
    index: 0,
    activeItem: 12,
    translateLeft:0,
  };

  groups = [
    { "valuse": "dota2", "topicId": 12 },
    { "valuse": "lol", "topicId": 13 },
    { "valuse": "dota3", "topicId": 14 },
    { "valuse": "dota4", "topicId": 15 },
    { "valuse": "dota5", "topicId": 16 },
    { "valuse": "dota3", "topicId": 17 },
    { "valuse": "dota4", "topicId": 18 },
    { "valuse": "dota5", "topicId": 19 },
    { "valuse": "dota3", "topicId": 20 },
    { "valuse": "dota4", "topicId": 21 },
    { "valuse": "dota5", "topicId": 22 },
  ];


  handleChangeIndex = (index) => {
    let activeItem = this.groups[index].topicId;
    let element=document.querySelector("#reactScrollTabContent");
    let translateLeft=this.calcTranslateLeft(element.children[index]);    
    this.setState({
      index,
      activeItem,
      translateLeft,
    });
  };

  calcTranslateLeft = ele => {
    let ta = ele;
    let clientWidth = document.querySelector("#reactScrollTabContent").parentNode.offsetWidth;   
    let translateLeft = (clientWidth - ta.offsetWidth) / 2 - ta.offsetLeft;
    return translateLeft;
  }
  clickHandle = (tId, item, e) => {   
    let ta=e.target;   
     this.setState({
      activeItem: tId,
      index: item.props.index,
      translateLeft:this.calcTranslateLeft(ta),
    });
  };

  render() {
    const {
      index,
    } = this.state;

    let groupList = this.groups.map((item) => Object.assign(item, { isActive: this.state.activeItem === item.topicId }));
    const swiperItems = () => {
      let ret = [];
      groupList.map((item, index) => ret.push(<div style={styles.slide} key={index}>{item.valuse}</div>));
      return ret;
    }
    return (
      <div style={{ fontSize: '.2rem' }}>
        <Tabs items={groupList} handleClick={this.clickHandle} translateLeft={this.state.translateLeft} />
        <SwipeableViews index={index} style={styles.root} slideStyle={styles.slideContainer} onChangeIndex={this.handleChangeIndex}>
          {swiperItems()}
        </SwipeableViews>
      </div>
    );
  }
}

export class SwiperTest extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <DemoTabs />
      </div>
    );
  }
}

SwiperTest.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(SwiperTest);
