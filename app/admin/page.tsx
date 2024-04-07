import dynamic from "next/dynamic";
import {isAdmin} from "@/lib/queries";
import {redirect} from "next/navigation";

const App = dynamic(() => import("./app"), {ssr: false});

const AdminPage = async () => {
  const admin = await isAdmin();
  if (!admin) {
    redirect("/");
  }

  return (
    <App/>
  );
}

export default AdminPage;
