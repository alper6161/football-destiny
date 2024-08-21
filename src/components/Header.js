const Header = ({children}) => {
    return (
        <div style={{height: '4rem', display: 'flex', justifyContent: "space-between", fontSize: '36px', borderBottom: '1px solid #7a8893'}}>
            <div>
                Logo
                centered
            </div>
            <div>
                Header
            </div>
            <div>
                Next
            </div>
        </div>
    )
}

export default Header
