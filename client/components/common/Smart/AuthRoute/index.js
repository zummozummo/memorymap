import React, { Component, Fragment } from 'react'

// import Router from "next/router";
// import { connect } from "react-redux";
// import { myAuthenticationAPI } from 'my-authentication-api';

const AuthRoute = ({ component: Component, user, clientConfig, pageTitle, ...rest }) => {
  console.log(Component);
  class AuthenticatedRoute extends React.Component {
    state = {
      loading: true,
    };

     componentDidMount() {
      // const isLoggedIn = await myAuthenticationAPI.isLoggedIn();
      console.log(this.props.user);

      if (this.props.user) {
        this.setState({ loading: false });
      } else {
        Router.push("/login");
      }
    }

    render() {
      const { loading } = this.state;
      console.log(this.props.user);

      if (loading) {
        return <div />;
      }

      // if (Component) {
        return <Component {...this.props} />;
      // }

    }
  }

  return AuthenticatedRoute;
};


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

export default AuthRoute;
