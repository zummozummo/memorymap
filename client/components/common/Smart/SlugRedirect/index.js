import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { connect } from "react-redux";
import { saveEditor, updateEditor } from "../../../../store/actions/editorActions";
import { fetchactiveId, setactiveId, setAuthId } from "../../../../store/actions/sidebarActions";
import { createBlock, getBlock } from '../../../../store/helpers/editor';
import { getSidebarId, createsideBar, updateSideBar } from "../../../../store/actions/sidebarActions";
import { Router } from 'react-router-dom';
import getBlockData from "../../../../store/helpers/sidebar";



const SlugRedirect = (props) => {

    const router = useRouter();

    const [curRef, setCurRef] = useState(false);
    const [isLoggedin, setIsLoggedin] = useState(props.isLoggedin);
    const [isSignedin, setIsSignedin] = useState(props.isSignedin);
    const [dummySidebar, setDummySidebar] = useState({ id: '', name: 'Untitled Doc', label: 'Untitled Doc', type: 'File', parent: '', delete: false });



    const handleData = () => {
        console.log(props.token)
        if (props?.token == '') {
            router.push('/')
            return;
        }
        if (isLoggedin && isSignedin) {
            console.log("i")
            getBlockData()

        } else if (!isLoggedin && isSignedin) {
            console.log("2")
            const editorRequest = { "value": [""], "type": 'editor-file' }
            typeof window !== 'undefined' && props.setAuthId(localStorage.getItem('token'))        //doubt in syntax
            createBlock(editorRequest).then((response) => {
                if (response) {
                    const id = response?.id

                    props?.saveEditor(editorRequest)    // not required actually
                    // saveSidebarId(response?.id)
                    const dummySidebarUpdate = {
                        ...dummySidebar,
                        id: response?.id,
                        parent: localStorage.getItem('token')
                    }
                    setCurRef(true)
                    setDummySidebar(dummySidebarUpdate)

                    console.log(dummySidebar, dummySidebarUpdate)


                }
            })
        }
    }

    // const getBlockData = () => {
    //     getBlock(props?.token).then((response) => {
    //         const newList = clone(props?.sidebarList)
    //         for (let node of response?.value) {
    //             newList.items.push(node)
    //         }
    //         props.updateSideBar(newList)
    //         props.setactiveId(response?.value?.[0])

    //         router.push(response?.value?.[0]?.id)
    //         getBlock(props?.sidebaractiveId?.id).then((response) => {  // change it later to above console value
    //             props?.saveEditor(response?.value)    // not required actually
    //         })
    //     })
    // }

    const createSidebar = () => {
        const sidebarReq = { value: dummySidebar, type: 'sidebar' }
        createBlock(sidebarReq).then((response) => {
            if (response) {
                props.createsideBar(response?.value[0])
                props.setactiveId(dummySidebar)
                router.push(dummySidebar?.id)
            }
        })
    }

    useEffect(() => {
        console.log(props)
        if (curRef) {
            createSidebar()
        }
        // router.push(`/12345`);
    }, [dummySidebar])

    // console.log("router", { router })
    useEffect(() => {
        console.log(props)
        handleData()
        // router.push(`/12345`);
    }, [])

    return (
        <div>SlugRedirect</div>
    )
}

const mapStateToProps = (state) => {

    console.log("state", state)
    return {
        token: state?.authentication?.token || '',
        isLoggedin: state?.authentication?.isLoggedin,
        isSignedin: state?.authentication?.isSignedin,
        sidebaractiveId: state?.sidebar?.activeId || '',
        sidebarList: state?.sidebar?.data || [],
        editorData: state?.editor?.data || []
    };
}

const mapDispatchToProps = {
    saveEditor,
    fetchactiveId,
    updateEditor,
    createsideBar,
    setactiveId,
    getSidebarId,
    setAuthId,
    updateSideBar,
}


export default connect(mapStateToProps, mapDispatchToProps)(SlugRedirect);
