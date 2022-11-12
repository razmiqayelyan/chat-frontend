
const chats_list = { 
        width: '100%',
        height:"100%",
        bgcolor: 'background.paper',
}

const chats_search = { 
    marginTop:2, 
    marginBottom:2
}

const tabs_box = {
    display:"flex", 
    flexDirection:"column", 
    alignItems:"center", 
    justifyContent:"center", 
    marginBottom:1
}



// Single Chat List 
//    backgroundColor:selectedChat?._id === chat?._id?"rgba(211,211,211, 0.3)":"white"


const list_item_button_white= {
    backgroundColor: "white"
}
const list_item_button= {
    backgroundColor: "rgba(211,211,211, 0.3)"
}

const chat_notif = {
    marginBottom:3, 
    color:"#20ab3e" 
}


// Mobile Chat List Drawer


const main_drawer = {
    maxWidth: 500,
    width:"80vw",
    height:"100vh"
}
const auto_complate = {
    backgroundColor:"white", 
    borderRadius:"5px"
}

const li_avatar = {
    maxWidth:"25px", 
    maxHeight:"25px"
}

const li_main_box = {
    display:"flex",
    alignItems:"center", 
    width:"100%", 
    justifyContent:"space-between"
}

const li_second_box = {
    display:"flex", 
    gap:1
}

const drawer_main_box = {
    width:"100%",
    height:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"flex-start",
    gap:4,
    flexDirection:"column"
}

const lose_icon_box = {
    width:"100%",
    height:50,
    display:"flex",
    alignItems:"center",
    justifyContent:"flex-end"
}

const styles = {
    chats_search,
    chats_list,
    tabs_box,

    // Single Chat List 

    list_item_button_white,
    list_item_button,
    chat_notif,

    // Mobile Chat List Drawer
    main_drawer,
    auto_complate,
    li_avatar,
    li_main_box,
    li_second_box,
    drawer_main_box,
    lose_icon_box
}

export default styles