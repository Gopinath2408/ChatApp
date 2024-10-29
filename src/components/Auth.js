import { auth, provider } from "../firebase.js";
import { signInWithPopup } from 'firebase/auth';
import Cookies from "universal-cookie";
import '../App.css';

const cookies = new Cookies();

export const Auth = (props) => {
    const {setisAuth} =props;
    const signInwithGoogle = async () => {
        try{
        const result = await signInWithPopup(auth, provider);
        cookies.set("auth-token", result.user.refreshToken);
        setisAuth(true);
            
        }
        catch(err)
        {
            console.log(err);
            
        }

    }
    return <div className="auth">
        <p>Sign In with Google</p>
        <button onClick={signInwithGoogle}>Sign with google</button>



    </div>
}