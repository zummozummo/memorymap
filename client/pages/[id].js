import { useRouter } from 'next/router'
import Editor from '../components/common/Smart/Editor/Editor';
import Sidebar from '../components/common/Smart/Sidebar/Sidebar';
import { withAuth } from '../components/common/Smart/RequireAuthentication';
import { connect } from "react-redux";
import axios from "axios";
import React from 'react';

const Post = (props) => {
    const router = useRouter()
    const { id } = router.query
    console.log("user", props.user);

    return (
        <div>{props?.user?.currentUser ?
            <React.Fragment>
                <Sidebar />
                <Editor />
            </React.Fragment> :
            router.push('/')
        }
        </div>
    )
}


export async function getServerSideProps({ req }) {
    let user = "";
    if (typeof window === "undefined") {
        const { data } = await axios.get(
            "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
            {
                headers: req.headers,
            }
        );
        user = data;
    }
    console.log(user);
    return {
        props: {
            user,
        },
    };
}

export default withAuth(Post);
