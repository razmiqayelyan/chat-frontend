// Group Members
const group_member_popup = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: 600,
    display:"flex",
    alignItems:"center",
    justifyContent:"center", 
    flexDirection:"column",
};

const group_member_list = { 
    width: '70vw',
    maxWidth: 700,
    maxHeight:150,
    height:"60vh",
    bgcolor: 'background.paper' 
}

const list_subheader = { textAlign:"center" }


const list_subheader_box = {
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    marginBottom:3
}

const autocomplate_main_box = {
    display:"flex",
    flexDirection:"row",
    gap:1
}

const group_member_autocomplete = {
    backgroundColor:"white", 
    borderRadius:"5px"
}

const li_main_box = {
    display:"flex", 
    alignItems:"center", 
    width:"100%", 
    justifyContent:"space-between"
}

const li_avatar_box = { 
    display:"flex", 
    gap:1
}

const li_avatar = {
    maxWidth:"25px", 
    maxHeight:"25px"
}

const single_member_box = {
    overflow:"scroll", 
    width:"70vw", 
    maxWidth:700, 
    maxHeight:700 , 
    marginTop:5
}

const leave_button = { marginTop:5 }

const edit_group_name_input = { marginLeft:5 }

const autocomplate_style = { width: 600 }


// Single Member

const list_item = {
    width:"70vw", 
    maxWidth:700, 
    minWidth:270
}

const list_item_text = { textTransform:"capitalize" }

const member_name_div = { 
    display:"flex", 
    flexDirection:"row"
}

const admin_label = {
    fontSize:"9px",
    minWidth:"12px",
    textAlign:"start",
    marginLeft:"5px",
    border:"1px solid red",
    height:"16px",
    borderRadius:"5px",
    color:"red",
    backgroundColor:"white",
    padding:"3px",
    display:"flex",
    alignItems:"center"
}

const styles = {
    // Group Members
    group_member_popup,
    group_member_list,
    list_subheader,
    list_subheader_box,
    autocomplate_main_box,
    group_member_autocomplete,
    li_main_box,
    li_avatar_box,
    li_avatar,
    single_member_box,
    leave_button,
    edit_group_name_input,
    autocomplate_style,

    // Single Member
    list_item,
    list_item_text,
    member_name_div,
    admin_label
}

export default styles