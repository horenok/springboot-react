import UserBackingInfo from "./userBackingInfo";
import {useSelector} from "react-redux";

function Home() {
    const allState = useSelector(state => state);

    return (
        <>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <pre>{JSON.stringify(allState, null, 2)}</pre>;
                <UserBackingInfo/>
            </div>
        </>
    )
}

export default Home;