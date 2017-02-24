import React from 'react';
import styled from 'styled-components';



const ItemWrapper=styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  align-self:stretch;
  margin:0 .2rem;
  border-bottom:${(props)=>props.isActive?".04rem solid #f70":"0"};
  color:${(props)=>props.isActive?"#f70":"#333"}
`;

class Item extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {   
    const valuse=this.props.valuse;
    const isActive=this.props.isActive;
    const topicId=this.props.topicId;
    return (
      <ItemWrapper isActive={isActive} onClick={(e)=>this.props.onClick(this.props.topicId,this,e)}>
        {valuse}
      </ItemWrapper>
    );
  }
}

Item.propTypes = {
  value: React.PropTypes.string,
  isActive:React.PropTypes.bool,
  topicId:React.PropTypes.number,
  onClick:React.PropTypes.func,
};

export default Item;