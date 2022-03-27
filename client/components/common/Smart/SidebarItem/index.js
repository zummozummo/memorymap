import React from "react";

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
      ...rest
    } = this.props;
    console.log(activeId);
    console.log(id);
    return (
      <div>
        <div style={{ paddingLeft: depth * depthStep }}>
          <span style={{ color: id === activeId ? "red" : "black" }}>
            {label}
          </span>{" "}
          {type === "Folder" ? <button>add</button> : null}
        </div>
        {Array.isArray(items)
          ? items.map((subItem) => (
              <SidebarItem
                key={subItem.name}
                id={subItem.id}
                depth={depth + 1}
                depthStep={depthStep}
                activeId={activeId}
                {...subItem}
              />
            ))
          : null}
      </div>
    );
  }
}

export default SidebarItem;
