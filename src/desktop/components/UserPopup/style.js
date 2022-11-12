const user_popup_paper = {
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

const user_popup_box = {
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column",
    gap:3 ,
    minWidth:300,
    maxWidth:500,
    width:"30vw",
    maxHeight:"60vh"
}

const styles = {
    user_popup_paper,
    user_popup_box
}

export default styles