function Nav() {
    return (
        <ul className="nav">
            <li className="nav-link" ><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-link" ><Link className="nav-link" to="/about/">About</Link></li>
            <li className="nav-link" ><Link className="nav-link" to="/products/">Products</Link></li>
        </ul>
    )
}