import UserBackingInfo from "./userBackingInfo";
import {useSelector} from "react-redux";

function Home() {
    const allState = useSelector(state => state);

    return (
        <>
            <UserBackingInfo/>
            <pre>{JSON.stringify(allState, null, 2)}</pre>;
        </>
    )
}

export default Home;