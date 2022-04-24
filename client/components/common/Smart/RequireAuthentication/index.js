


// withAuth.js
import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { userInfo, signin } from "../../../../store/actions/authActions";
import { useDispatch } from 'react-redux';

export const withAuth = Component => props => {

    const dispatch = useDispatch();

        const isAuthenticated = async () => {
            const { data } = await axios.get("/api/users/currentuser");
            const id = data?.currentUser?.id
            if (id) {
                console.log("in", props)
                localStorage.setItem('token',id);
                if (props.isSignedin && !props.isLoggedin) {
                    dispatch(userInfo())
                } else if (props.isSignedin && props.isLoggedin) {
                    dispatch(signin())
                }
            } else {

            }
            return id;
        }
        useEffect(()=>{
            console.log("useEffect",props,dispatch)
            isAuthenticated()
        },[])

            const loginErrorMessage = (
                <div>
                    Please <a href="/login">login</a> in order to view this part of the application.
                </div>
            );

            return (
                <div>
                    { isAuthenticated ? <Component {...props} /> : loginErrorMessage }
                </div>
            );
}

//   const mapDispatchToProps = (dispatch) => ({
//     userInfo,
//     dispatch
//   })
  
export default connect()(withAuth);
