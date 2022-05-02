// import { apiWrapper } from "../../helpers/apiWrapper";


// export const saveSidebarId = async (data={}) => {

//     return 
//   }

export const getBlockData = () => {
    getBlock(props?.token).then((response) => {
        const newList = clone(props?.sidebarList)
        for (let node of response?.value) {
            newList.items.push(node)
        }
        props.updateSideBar(newList)
        props.setactiveId(response?.value?.[0])

        router.push(response?.value?.[0]?.id)
        getBlock(props?.sidebaractiveId?.id).then((response) => {  // change it later to above console value
            props?.saveEditor(response?.value)    // not required actually
        })
    })
}