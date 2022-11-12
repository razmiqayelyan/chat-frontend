
const main_box = {
    width:"100vw", 
    height:"100vh", 
    display:"flex",
    justifyContent:"center",
    alignItems:"center", 
    flexDirection:"column",
    gap:3,
    backgroundRepeat:"no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
}

const mobile_login_form = {
        display:"flex",
         width:"100%",
         height:"100%",
         flexDirection:"column",
         alignItems:"center",
         justifyContent:"center",
         gap:"20px"
}

const register_link = {
   textDecoration:"none",
   fontSize:"calc(1vw + 1vh)"
}
const login_title = {
    fontSize:"calc(3vw + 3vh)",
    fontFamily: "cursive",
}

const login_papper = {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        gap:3,
        width:"100%",
        height:"100%",
}

const styles = {
    main_box,
    register_link,
    login_title,
    login_papper,
    mobile_login_form
}
export default styles