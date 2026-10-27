import { Link, NavLink } from "react-router-dom";

const navigation = [
    { to: "/", label: "Наша история" },
    { to: "/details", label: "Детали" },
    { to: "/location", label: "Локация" },
    { to: "/faq", label: "FAQ" },
    { to: "/rsvp", label: "RSVP" },
];

export function Header() {
    return (
        <header className="site-header">
            <Link
                className="site-logo"
                to="/"
                aria-label="Дина и Денис — главная"
            >
                Д / Д
            </Link>

            <nav className="site-navigation" aria-label="Основная навигация">
                {navigation.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === "/"}
                        className={({ isActive }) =>
                            `navigation-link${isActive ? " is-active" : ""}`
                        }
                    >
                        {label}
                    </NavLink>
                ))}
            </nav>

            <span className="header-date">08.08.2027</span>
        </header>
    );
}