const main_paper = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    width:"50vw",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    minHeight: "50vh",
    display:"flex",
    alignItems:"center",
    justifyContent:"center", 
    flexDirection:"column",
  };

const add_group_box = {
    display:"flex", 
    alignItems:"center", 
    justifyContent:"center", 
    flexDirection:"column", 
    gap:3
}

const add_group_autocomplate = { 
    maxWidth:"25vw", 
    marginTop:3 
}

const add_group_autocomplate_style = { minWidth: 300 }

const li_box = { 
    display:"flex", 
    gap:1 
}

const li_checkbox = { marginRight: 8 }

const li_avatar = {
    maxWidth:"25px", 
    maxHeight:"25px"
}


const styles = {
    main_paper,
    add_group_box,
    add_group_autocomplate,
    add_group_autocomplate_style,
    li_checkbox,
    li_box,
    li_avatar
}
export default styles