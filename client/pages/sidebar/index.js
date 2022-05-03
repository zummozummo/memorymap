import React from 'react';

class Sidebar extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        const SidebarData = [
            { title: 'file' },
            { title: 'folder' }
        ]
        return (
            <React.Fragment>
                <div className="Sidebar">
                    <ul className="SidebarList">
                        {SidebarData.map((val, key) => {
                            return (
                                <li
                                    key={key}
                                    className="row"
                                // id={router.pathname == val.link ? "active" : ""}
                                // onClick={()=> {
                                // router.pathname = val.link
                                // }}
                                >
                                    {/* <div id="icon">{val.icon}</div>  */}
                                    <div id="title">{val.title}</div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}


export default Sidebar