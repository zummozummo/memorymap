


// withAuth.js
import React from "react";
import axios from "axios";
import { SIGNIN_AUTH } from "../../../../store/actionTypes";
import { connect } from "react-redux";
import { userInfo } from "../../../../store/actions/authActions";

export function withAuth(Component) {
    return class AuthenticatedComponent extends React.Component {
        async isAuthenticated() {

            const { data } = await axios.get("/api/users/currentuser");
            console.log(data?.currentUser);
            const id = data?.currentUser?.id
            if (id) {
                console.log("in", this.props)
                localStorage.setItem('token',id);
                console.log(this.props.userInfo())
                this.props.userInfo()
            }
            return id;
        }
        componentDidMount() {
            this.isAuthenticated()
        }

        /**
         * Render
         */
        render() {
            const loginErrorMessage = (
                <div>
                    Please <a href="/login">login</a> in order to view this part of the application.
                </div>
            );

            return (
                <div>
                    { this.isAuthenticated ? <Component {...this.props} /> : loginErrorMessage }
                </div>
            );
        }
    };
}

// export default withAuth;

const mapDispatchToProps = () => ({
    // console.log("dkdkajskdjaskjdsl", store)
    userInfo
     
})

// const mapDispatchToProps = (dispatch) => {
//     // return {
//         // userInfo: userInfo(dispatch)  };
//   };
  
  export default connect(null, mapDispatchToProps)(withAuth);


// import { Component, useEffect } from "react";
// // Take in a component as argument WrappedComponent



// const RequireAuthentication = (WrappedComponent) => {
// // And return another component
//   class HOC extends React.Component {

//       return <WrappedComponent />;
//     }
//   }
//   return HOC;
// };
// // const RequireAuthentication = (props) => {
    
// //     async function fetchData() {
// //         const { data } = await axios.get(
// //             "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
// //             {
// //               headers: req.headers,
// //             }
// //           );
// //           user = data;
// //         console.log(user);
// //       }
    
// //       useEffect(() => {
// //         fetchData();
// //       }); 

// //     console.log("props", props);
// //     return (
// //         <Component/>
// //     )
// // }

// export default RequireAuthentication