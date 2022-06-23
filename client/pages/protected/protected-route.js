
// lib/session.js
async function getAuthSession(ctx) {
    return ctx.req.session.get("user");
  }
  
  // pages/protected/protected-route.js
  const ProtectedSSRoute = ({ authenticated, user }) => {
    if (!authenticated) {
      return (
        <div>
          <span>You are not authenticated :(</span>
        </div>
      );
    }
    return (
      <div>
        <span>You are authenticated as: {user} :)</span>
      </div>
    );
  };
  
  export function getServerSideProps(ctx) {
    const authSession = getAuthSession(ctx);
    console.log(authSession)
    if (!authSession) {
      return {
        props: {
          authenticated: false,
        },
      };
    }
  
    return {
      props: {
        authenticated: true,
        user: authSession.user,
      },
    };
  }
  
  export default ProtectedSSRoute;