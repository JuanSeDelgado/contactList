import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactList from '../views/ContactList.jsx';
import AddContact from "../views/AddContact.jsx";
import NotFound  from '../views/NotFound.jsx';


export const Layout = ({children}) => {
    return(
        <>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<ContactList/>}/>
                <Route path="/addContact" element={<AddContact/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            </BrowserRouter>
        </>
    )
}
export default Layout;