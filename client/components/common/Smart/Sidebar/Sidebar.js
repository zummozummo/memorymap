import React from "react";
import "../../../../assets/icons-search.svg";
import classes from "./Sidebar.module.css";
import { connect } from "react-redux";
import Router from "next/router";
import dynamic from 'next/dynamic'
import { createBlock, updateBlock } from "../../../../store/helpers/editor";
import {
	getSidebarId,
	createsideBar,
	setactiveId,
	updateSideBar,
} from "../../../../store/actions/sidebarActions";
import SidebarItem from "../SidebarItem";
import {
	createTree,
	clone,
	FindActiveFolPushNew,
	FindActiveFolDeleteCur
} from "../../../../helpers/utils/utils";
import { withAuth } from '../RequireAuthentication';
import { userInfo } from '../../../../store/actions/authActions';

// import('react-beautiful-dnd').then(module =>
// 	{
// 	const {DragDropContext, Droppable}= module;
// 	console.log(Droppable);
// 	console.log(DragDropContext);
// 	})

// const ReactDnD = dynamic(import('react-beautiful-dnd'), {
//   ssr: false,
//   // loading: () => <p>Loading ...</p>,
// })

// const Droppable = dynamic(import('Droppable'), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// })
class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dummySidebar: {
				id: "",
				name: "Untitled Doc",
				label: "Untitled Doc",
				type: "File",
				parent: "",
				delete: false
			},
			dummySidebarFolder: {
				id: "",
				name: "Untitled Fol",
				label: "Untitled Fol",
				type: "Folder",
				parent: "",
				items: [],
				delete: false
			},

			data: this.props.sidebarList,
			sidebaractiveId: this.props.sidebaractiveId,
			// textSearch: 'dummy text'
		};

		// console.log(this.props.sidebarList);
	}

	handleInputChange = () => {
		this.setState({
			...this.state,
			[event.target.name]: event.target.value,
		});
	};

	FindActiveParent = (activeId = this.props.sidebaractiveId) => {
		const arr = createTree(
			clone(this.props?.sidebarList),
			null,
			activeId?.id
		);
		const NextActiveParent =
			activeId.type === "File"
				? arr[arr.indexOf(activeId?.id) - 1]
				: activeId?.id;
		return NextActiveParent
	}

	FindDelParent = (activeId = this.props.sidebaractiveId) => {
		const arr = createTree(
			clone(this.props?.sidebarList),
			null,
			activeId?.id
		);
		const NextActiveParent = arr[arr.indexOf(activeId?.id) - 1]
		// activeId.type === "File"
		// 		? arr[arr.indexOf(activeId?.id) - 1]
		// 		: activeId?.id;
		return NextActiveParent
	}
	handleFile = (type = "editor-file") => {
		const { dummySidebar } = this.state;
		const editorRequest = { value: [""], type: type };
		createBlock(editorRequest).then((response) => {
			if (response) {
				const ActiveParent = this.FindActiveParent()
				console.log(ActiveParent);
				this.setState(
					(prevState) => ({
						dummySidebar: {
							...dummySidebar,
							id: response?.id,
							parent: ActiveParent,
						},
					}),
					() => {
						const newList = FindActiveFolPushNew(
							clone(this.props?.sidebarList),
							this.state.dummySidebar,
							ActiveParent
						);
						const sidebarReq = {
							type: "sidebar",
							value: newList.items,
						};
						console.log(newList);
						updateBlock(sidebarReq, this.props?.token).then((response) => {
							if (response) {
								// const res =
								// 	ActiveParent === localStorage.getItem("token")
								// 		? this.props.createsideBar(response?.value[0])
								// : 
								this.props?.updateSideBar(newList);
								this.props?.setactiveId(this.state.dummySidebar);
							}
						});
					}
				);
			}
		});
	};

	handleFolder = (type = "editor-folder") => {
		const { dummySidebarFolder } = this.state;
		const editorRequest = { value: [""], type: type };
		createBlock(editorRequest).then((response) => {
			if (response) {
				const ActiveParent = this.FindActiveParent()
				this.setState(
					(prevState) => ({
						dummySidebarFolder: {
							...dummySidebarFolder,
							id: response?.id,
							parent: ActiveParent,
						},
					}),
					() => {
						const newList = FindActiveFolPushNew(
							clone(this.props?.sidebarList),
							this.state.dummySidebarFolder,
							ActiveParent
						);
						// if folder append in currently selected items parent
						// if file append in parent tht can be file or folder
						const sidebarReq = {
							type: "sidebar",
							value: newList.items,
						};
						updateBlock(sidebarReq, this.props?.token).then((response) => {
							if (response) {
								// const res =
								// ActiveParent === localStorage.getItem("token")
								// ? this.props.createsideBar(response?.value[0])
								// : 
								this.props?.updateSideBar(newList);
								this.props?.setactiveId(this.state.dummySidebarFolder);
							}
						});
					}
				);
			}
		});
	};

	SetActiveCallAdd = (activeId, type) => {
		console.log(activeId);
		if (type === 'editor-file') {
			this.props?.setactiveId(activeId);
			this.handleFile(type);
		} else if (type === 'editor-folder') {
			this.props?.setactiveId(activeId);
			this.handleFolder(type);
		}
	}

	SetActive = (activeId) => {
		console.log(activeId);
		this.props?.setactiveId(activeId);
	}

	SetDelete = (removeThisBlock) => {
		// this.props?.setactiveId(activeId);
		const ActiveParent = this.FindDelParent(removeThisBlock)
		console.log(this.props?.sidebarList);
		console.log("ActiveParent", ActiveParent);
		console.log("removeThisBlock", removeThisBlock);

		const newList = FindActiveFolDeleteCur(
			clone(this.props?.sidebarList),
			removeThisBlock,
			ActiveParent
		)
		console.log(newList);
		this.props?.updateSideBar(newList);

	}

	renderSideBarList = () => {
		const { data } = this.state;
		const { sidebaractiveId, sidebarListItems } = this.props;
		// console.log(sidebaractiveId?.id + " ");
		return (
			// <DragDropContext>
			// 	<Droppable droppableId="characters">
			// 		{(provided) => (
			<SidebarItem
				// {...provided.droppableProps} ref={provided.innerRef} provided={provided}
				items={sidebarListItems} activeId={sidebaractiveId} SetActive={this.SetActive} SetActiveCallAdd={this.SetActiveCallAdd} SetDelete={this.SetDelete} />
			// 		)}
			// 	</Droppable>
			// </DragDropContext>
		);
	};

	renderSideBar = () => {
		return (
			<React.Fragment>
				<div
					onClick={() => {
						this.handleFile("editor-file");
					}}
				>
					add file
				</div>
				<div
					onClick={() => {
						this.handleFolder("editor-folder");
					}}
				>
					add folder
				</div>
				<div>{this.renderSideBarList()}</div>
			</React.Fragment>
		);
	};

	componentDidUpdate(prevProps) {
		// if (this.state.data !== this.props.sidebarList) {
		//     this.setState({ data: this.props.sidebarList })
		// }
		if (prevProps.sidebarId !== this.props.sidebarId) {
			// console.log("if");
			// this.handleSidebar()
		}
	}

	render() {
		const { data } = this.state;
		return <div className={classes.sidebar}>{this.renderSideBar()}</div>;
	}
}

const mapDispatchToProps = {
	createsideBar,
	setactiveId,
	getSidebarId,
	updateSideBar,
	userInfo
};

const mapStateToProps = (state) => {
	console.log(state, state?.sidebar, "store redcers object");
	return {
		sidebarList: state?.sidebar?.data || [],
		sidebarListItems: state?.sidebar?.data?.items || [],
		sidebaractiveId: state?.sidebar?.activeId || "",
		token: state?.authentication?.token || "",
	};
};

export default connect(mapStateToProps, mapDispatchToProps)((Sidebar));
