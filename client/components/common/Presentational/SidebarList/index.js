import SidebarItem from '../SidebarItem';

export function SidebarList() {

    const { list } = props;
    return (
        list.map(el=>{
          <SidebarItem/>
        })
    );
  }