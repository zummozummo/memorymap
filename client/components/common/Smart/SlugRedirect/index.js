import axios from "axios";
import { route } from "next/dist/server/router";
import router from "next/router";
import { useEffect } from "react";
import createInitialWorkspace from "../../../../store/helpers/initialWorkspace";
export default function SlugRedirect(props) {
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/block/${props.user.id}`);
        console.log(response);
        router.push(`/${response.data.value[0].id}`);
      } catch (err) {
        if ((err.response.status = 404)) {
          console.log("initial workspace");
          console.log(err);
          createInitialWorkspace(props.user.id).then((result) => {
            console.log(result);
            router.push(`/${result}`);
          });
        }
      }
    })();
    console.log(props.user);
  }, []);
  return <div>Slug Redirect</div>;
}

//get Sidebar
//get Editor

//set sidebar
//set Editor
