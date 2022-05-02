import { getCookieParser } from "next/dist/server/api-utils";
import React from "react";
import Editor from "../../components/common/Smart/Editor/Editor";
import Sidebar from "../../components/common/Smart/Sidebar/Sidebar";
import { connect } from "react-redux";
import { saveEditor, updateEditor } from "../../store/actions/editorActions";
import {
  fetchactiveId,
  setactiveId,
  setAuthId,
} from "../../store/actions/sidebarActions";
import { createBlock, updateBlock, getBlock } from "../../store/helpers/editor";
import {
  getSidebarId,
  createsideBar,
  updateSideBar,
} from "../../store/actions/sidebarActions";
import { clone, FindActiveFolPushNew } from "../../helpers/utils/utils";
import { withAuth } from "../../components/common/Smart/RequireAuthentication";
import TextEditorNew from "../../components/common/Smart/EditorNew/Editornew";
import Head from "next/head";
// import { userInfo } from '../../store/actions/authActions';

// import Quill from 'quill';

// import dynamic from "next/dynamic";

// const DynamicComponentWithNoSSR = dynamic(() => import("../components/Stories"), {
//   ssr: false,
// });

// export default () => <DynamicComponentWithNoSSR />;
class GettingStarted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarId: "",
      dummySidebar: {
        id: "",
        name: "Untitled Doc",
        label: "Untitled Doc",
        type: "File",
        parent: "",
        delete: false,
      },
      sidebarList: [],
      isLoggedin: props.isLoggedin,
      isSignedin: props.isSignedin,
    };
  }

  saveSidebarId = (sidebarId) => {
    this.setState({ sidebarId });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.isSignedin !== this.props.isSignedin ||
      prevProps?.isLoggedin !== this.props?.isLoggedin
    ) {
      this.setState(
        {
          isSignedin: this.props.isSignedin,
          isLoggedin: this.props.isLoggedin,
        },
        () => {
          this.handleData();
        }
      );
    }
  }

  componentDidMount() {
    this.handleData();
  }

  handleData() {
    console.log(
      this.state.isLoggedin,
      this.state.isSignedin,
      this.props?.token
    );
    if (this.state.isLoggedin && this.state.isSignedin) {
      console.log("i");
      getBlock(this.props?.token).then((response) => {
        const newList = clone(this.props?.sidebarList);
        for (let node of response?.value) {
          newList.items.push(node);
        }
        this.props.updateSideBar(newList);
        this.props.setactiveId(response?.value?.[0]);
        getBlock(this.props?.sidebaractiveId?.id).then((response) => {
          // change it later to above console value
          this.props?.saveEditor(response?.value); // not required actually
        });
      });
    } else if (!this.state.isLoggedin && this.state.isSignedin) {
      console.log("2");
      const editorRequest = { value: [""], type: "editor-file" };
      typeof window !== "undefined" &&
        this.props.setAuthId(localStorage.getItem("token")); //doubt in syntax
      createBlock(editorRequest).then((response) => {
        if (response) {
          const { dummySidebar } = this.state;
          const id = response?.id;
          this.props?.saveEditor(editorRequest); // not required actually
          // this.saveSidebarId(response?.id)
          this.setState(
            (prevState) => ({
              dummySidebar: {
                ...dummySidebar,
                id: response?.id,
                parent: localStorage.getItem("token"),
              },
            }),
            () => {
              const sidebarReq = {
                value: this.state.dummySidebar,
                type: "sidebar",
              };
              createBlock(sidebarReq).then((response) => {
                if (response) {
                  this.props.createsideBar(response?.value[0]);
                  this.props.setactiveId(this.state.dummySidebar);
                }
              });
            }
          );
        }
      });
      // this.handleData()
    }
    // }
  }

  render() {
    const { sidebarId, sidebarList } = this.state;
    const { isLoggedin, isSignedin } = this.props;

    return (
      <div>
        <Head>
          <title>Memory Map</title>
          <script src="//cdn.quilljs.com/1.3.6/quill.js"></script>
          <meta name="description" content="Map your memory" />
        </Head>
        {<Sidebar sidebarId={sidebarId} createEditor={this.createEditor} />}
        {/* {<Editor saveSidebarId={this.saveSidebarId} />} */}
        {<TextEditorNew saveSidebarId={this.saveSidebarId} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state?.authentication?.token || "",
    isLoggedin: state?.authentication?.isLoggedin,
    isSignedin: state?.authentication?.isSignedin,
    sidebaractiveId: state?.sidebar?.activeId || "",
    sidebarList: state?.sidebar?.data || [],
    editorData: state?.editor?.data || [],
  };
};

const mapDispatchToProps = {
  saveEditor,
  fetchactiveId,
  updateEditor,
  createsideBar,
  setactiveId,
  getSidebarId,
  setAuthId,
  updateSideBar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(GettingStarted));
