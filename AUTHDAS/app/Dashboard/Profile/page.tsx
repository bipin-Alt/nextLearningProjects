import Profile from "@/components/Dashboard/Profile/profile";
import { verifySession } from "@/lib/DataAccessLayer";

export default  async function ProfilePage() {
const sessionData = await verifySession(); 
    return (
        <div>
            <Profile 
             userName={sessionData.name}
             userEmail={sessionData.email}
            />
        </div>
    );
}