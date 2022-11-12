const main_register_box = {
    width:"100vw", 
    height:"100vh", 
    display:"flex", 
    alignItems:"center", 
    justifyContent:"center", 
    flexGrow:1
}

const register_paper = {
    height:"70vh", 
    display:"flex", 
    alignItems:"center", 
    justifyContent:"center", 
    flexGrow:1, 
    flexDirection:"column", 
    maxWidth:"60vw", 
    gap:3
}

const register_form = {
    display:"flex",
    width:"100%",
    height:"100%",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    gap:"20px"
}

const register_input = { maxWidth:"30vw" }

const to_login_link = {
    fontSize:"10px", 
    textDecoration:"none", 
    color:"blue"
}

const create_account = {
    fontFamily: "cursive",
    fontSize:"3rem"
}

const styles = {
    main_register_box,
    register_paper,
    register_form,
    register_input,
    to_login_link,
    create_account
}


export default styles