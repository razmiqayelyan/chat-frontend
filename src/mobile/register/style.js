
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

const login_link = {
   textDecoration:"none",
   fontSize:"calc(1vw + 1vh)"
}
const register_title = {
    fontSize:"calc(3vw + 3vh)",
    fontFamily: "cursive",
}

const register_papper = {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        gap:3,
        width:"100%",
        height:"100%",
}


const mobile_register_form = {
    display:"flex",
     width:"100%",
     height:"100%",
     flexDirection:"column",
     alignItems:"center",
     justifyContent:"center",
     gap:"20px"
}

const styles = {
    main_box,
    login_link,
    register_title,
    register_papper,
    mobile_register_form
}

export default styles