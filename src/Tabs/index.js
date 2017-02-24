/**
*
* GroupList
*
*/

import React from 'react';
import styled from 'styled-components';
import Item from './Item.js';
//   // overflow-x: scroll;
const Wrapper = styled.div`
  height:.9rem;
  overflow:hidden;
  font-size:.3rem;
  display:flex;
 
`;
const Content = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  transform: ${(props) => { return "translate(" + props.translateLeft + "px,0px)" }};
  transition: transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s; 
`;


class Tabs extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    moveX: 0,
  };
  startX=0;
  maxGroupWidth=-10000;
  handleTouchStart = (e) => {
      this.startX=e.nativeEvent.touches[0].clientX;
  };
  handleTouchMove = (e) => {
    let diat = e.nativeEvent.touches[0].clientX - this.startX;
    this.setState({
      moveX: e.nativeEvent.touches[0].clientX - this.startX
    });
  };
  componentWillReceiveProps(){
     this.setState({
        moveX: 0
      })
  }  
  componentDidMount(){
    const contentDom=document.querySelector("#reactScrollTabContent")
    let clientWidth = contentDom.parentNode.offsetWidth;
    this.maxGroupWidth=clientWidth-contentDom.offsetWidth;
  }
  render() {
    let items=this.props.items;
    let handleClick=this.props.handleClick;
    handleClick = handleClick;
    items = items;
    let transLeft = this.props.translateLeft + this.state.moveX;
    const minTranslateLeft = this.maxGroupWidth;

    //boundary control
    transLeft = transLeft > 0?0:(transLeft < minTranslateLeft ? minTranslateLeft : transLeft);
    return (
      <Wrapper >
        <Content translateLeft={transLeft} 
        id="reactScrollTabContent" 
        onTouchMove={this.handleTouchMove}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        >
        { items.map((item,index)=><Item {...item} key={index} index={index} onClick={handleClick}/>) }   
        </Content>     
      </Wrapper>
    );
  }
}
Tabs.propTypes = {
  items: React.PropTypes.array,
  handleClick: React.PropTypes.func,
  translateLeft:React.PropTypes.number,
};

export default Tabs;
