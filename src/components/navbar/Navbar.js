export default function Navbar(){
    return(
        <nav className="navbar navbar-dark navbar_color sticky-top">
            <div className={"container-fluid"}>
                <a className="navbar-brand mx-4" href="#">AboutMe</a>
                <form className="form-inline my-2 my-lg-0 list_container">
                    <input className="form-control mr-sm-2 search_bar" size={50}  type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-light my-2 my-sm-0 mx-2" type="submit">Search</button>
                </form>
                <span>
                <a className="navbar-brand" href="#">Log Out</a>
            </span>
            </div>
        </nav>
    );
}