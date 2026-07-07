import { Person } from "react-bootstrap-icons";
export function NavigationBar() {
    return (
        <nav className="navigation-bar" >
            <ul>
                <li>
                    <Person size={30} color="white" />
                </li>
            </ul>
        </nav>
    );
}