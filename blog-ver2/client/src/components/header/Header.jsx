import "./header.css"

export default function Header() {
    return (
        <div className="header">
             <div className="headerTitles">
                <span className="headerTitleSm">Nguyễn Việt Đức</span>
                <span className="headerTitleLg">Blog</span>
            </div>
            <img className="headerImg" src="https://images.pexels.com/photos/1098520/pexels-photo-1098520.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
        </div>
    )
}
