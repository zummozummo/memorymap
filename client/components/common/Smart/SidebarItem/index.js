import React from "react";
// import('react-beautiful-dnd').then(module =>
// 	{
// 	const {DragDropContext, Droppable, Draggable}= module;
// 	console.log(Droppable);
// 	})

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    let {
      label,
      type,
      items,
      depthStep = 10,
      depth = 0,
      id,
      activeId,
      subItem,
      SetActive,
      SetActiveCallAdd,
      SetDelete,
      index,
      provided,
      ...rest
    } = this.props;
    console.log(items);
    // console.log(id);
    // console.log(subItem);
    return (
      <div>
        
        {subItem && !subItem.delete && 
        // <Draggable key={id} draggableId={id} index={index}>
        // {(provided) => 
          (<div style={{ paddingLeft: depth * depthStep }}>
          <span 
            // ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
            onClick = {()=>{this.props.SetActive(subItem)}} style={{ color: id === activeId.id ? "red" : "black" }}>
          {id}
          {" "}
          {type === "Folder" && <React.Fragment>
          <span onClick = {()=>{SetActiveCallAdd(subItem,'editor-file')}}>file</span>
          <span onClick = {()=>{SetActiveCallAdd(subItem,'editor-folder')}}>folder</span></React.Fragment>}
          <span onClick = {()=>{SetDelete(subItem)}}>del</span>
          </span>
        </div>)}
    {/* </Draggable>} */}
        {!subItem?.delete && Array.isArray(items)
          ? items.map((subItem,index) => (
              <SidebarItem
                index={index}
                SetActive={SetActive} 
                SetActiveCallAdd={SetActiveCallAdd}
                SetDelete={SetDelete}
                key={subItem.id}
                id={subItem.id}
                depth={depth + 1}
                depthStep={depthStep}
                activeId={activeId}
                {...subItem}
                subItem={subItem}
              />
            ))
          : null}
      </div>
    );
  }
}

export default SidebarItem;
