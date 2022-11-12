const main_box = {
    width:"100vw", 
    height:"100vh", 
    display:"flex", 
    alignItems:"center", 
    justifyContent:"center", 
    flexGrow:1
}

const login_paper = {
    height:"70vh", 
    display:"flex", 
    alignItems:"center", 
    justifyContent:"center", 
    flexGrow:1, 
    flexDirection:"column", 
    maxWidth:"60vw", 
    gap:3
}

const login_form = {
    display:"flex", 
    width:"100%", 
    height:"100%", 
    flexDirection:"column", 
    alignItems:"center", 
    justifyContent:"center", 
    gap:"20px" 
}

const to_register_link = {
    fontSize:"10px", 
    textDecoration:"none", 
    color:"blue"
}

const login_font = {
    fontFamily: "cursive",
    fontSize:"3rem"
}

const styles = {
    main_box,
    login_paper,
    login_form,
    to_register_link,
    login_font
}
export default styles