import React, { useState, useEffect } from 'react';
// import DataGrid from '@material-ui/data-grid';
import DelIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { writeData, readAllData } from '../../Database/utility';
import { Button, CardMedia, IconButton, makeStyles, Snackbar, TextField } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    root: {
		margin: 0,
		padding: theme.spacing(2),
    },
    closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    
    return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
			<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
				<CloseIcon />
			</IconButton>
			) : null}
		</MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
}))(MuiDialogContent);
  
const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
}))(MuiDialogActions);

function Notify(props) {
    const [openDialog, setOpenDialog] = useState(false);
    
    const handleClose = () => {
        setOpenDialog(!openDialog);
    };

    useEffect(() => {
        setOpenDialog(props.open);        
        return () => {
            // code
        }
    }, []);
    
    return (
        <>
          <Dialog aria-labelledby="customized-dialog-title" open={openDialog}>
                <DialogTitle id="customized-dialog-title" onClose={() => handleClose()}>
                    Notification
                </DialogTitle>

                <DialogContent dividers>
                    <Typography gutterBottom>
                        Votre mail a été envoyé avec succes.
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={() => handleClose()} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>  
        </>
    )
}

export default function Chop() {
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        {
            field: 'created_at',
            headerName: 'Date',
            width: 150,
        },
        {
            field: 'title',
            headerName: 'Designation',
            width: 250,
        },
        {
            field: 'qte',
            headerName: 'Quantity',
            width: 150,
        },
        {
            field: 'price',
            headerName: 'Prices',
            type: 'number',
            width: 150,
        },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 160,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const api = params.api;
                const fields = api.getAllColumns()
                .map((c) => c.field)
                .filter((c) => c.field);
                const rows = {};
                fields.forEach((field) => {
                    rows[field] = params.getValue(field);
                });
                return (
                    <div>
                        <Button style={{ color:"red" }} onClick={() => deleteChop(params.id)}> <DelIcon/> </Button>
                        <Button style={{ color:"blue" }} onClick={() => ediChop(params.id)}> <EditIcon/> </Button>
                    </div>
                );
            }
            // valueGetter: (params) => `${params.getValue(params.id, <CloseIcon/>) || ''} ${params.getValue(params.id, 'quantity') || ''}`,
        },
    ];
    
    // { id: 1, created_at: 2, quantity: 'Snow', designation: 'Jon', prices: 35}
    const rows = [];

    const loadData = () => {
        readAllData("cards").then((result) =>{
            setData(result)            
        });
    }
    
    const showData = () =>{
        for(let i = 0; i < data.length; i++){
            rows.push(data[i]);
        }
    };
    showData();

    const deleteChop = (id) => {
        alert(id);
        setOpen(true);
    };

    const ediChop = (id) => {
        alert(id);
    };

    const createData = (id, designation, quantity, price) => {
        return { id, designation, quantity, price };
    }

    useEffect(() => {
        loadData();
        
        return () => {
            // cleanup
        }
    }, [])

    
    return (
        <>
            <br/><br/>
            
            {/* <Notify open={open} /> */}

            <div style={{ height: 650, width: '70%', margin: 'auto' }}>
                {/* <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    disableSelectionOnClick
                /> */}
            </div>
        </>
    );
}