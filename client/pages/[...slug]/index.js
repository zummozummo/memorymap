import { useRouter } from 'next/router';

const WorkspaceView  = (props) => {
    const {} = props;
    const router = useRouter();
console.log("router", {router})
    return (
        <div>
            <h1>WorkspaceView</h1>
        </div>
    )
}

export default WorkspaceView;