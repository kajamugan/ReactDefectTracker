import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import MaterialTable from 'material-table';


const cardWidth='80%'
const styles = makeStyles(theme=>({
    root:{
        flexGrow: 1,
        
    },
    card: {
        maxWidth: cardWidth,
        position:'absolute',
        height:'auto',
        backgroundColor:'#424242'
    },
    roots: {
        padding: theme.spacing(1, 2),
             },
      link: {
        display: 'flex',
        padding: theme.spacing(5),
        
      },
      icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
      },
      header:{
          padding:25,
          backgroundColor: '#ffffff',
      },
      button: {
        marginLeft: 20,
      },
      formControl: {
        margin: theme.spacing(1),
      },
}))
const Level = [
    'Low',
    'Medium',
    'High',
    
  ];
  var columns= [
    { title: 'Defect', field: 'defect' },
    { title: 'Defect Description', field: 'defectdesc' },
    { title: 'Severity', field: 'severity' },
    { title: 'Priority', field: 'priority' },
    { title: 'Project ID', field: 'project.id' },
  ]
const ITEM_HEIGHT = 20;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default class project extends Component {
    constructor(){
        super();
        this.state={
            defect:'',
            severity:'',
            priority:'',
            projectID:'',
            open:false,
            defectDescription:'',
            projectidsfromproject:[],
            data:[]

        }
    }
    componentDidMount(){
        const projectUrl= `http://127.0.0.1:8085/defect/api/v1/project`
        axios.get(projectUrl)
        .then(response=>{
            this.setState({
                projectidsfromproject:response.data
            })
            
        })
        const defectUrl=`http://127.0.0.1:8085/defect/api/v1/defect`
        axios.get(defectUrl)
        .then(response=>{
            this.setState({
                data:response.data
            })
        })
    }
     handleChange = event => {
        this.setState({[event.target.name]:event.target.value});
      }
      handleSubmit=event=>{
        event.preventDefault()
        const data={defect:this.state.defect,defectdesc:this.state.defectDescription,project:{id:this.state.projectID},priority:this.state.priority,severity:this.state.severity}
        const url =`http://127.0.0.1:8085/defect/api/v1/defect`
        axios.post(url,data)
        .then(response=>{
            if(response.status === 200){
                this.handleClick()
                this.componentDidMount()
                }
        })
      }
      handleClick = () => {
        this.setState({ open: true});
      };
       handleClose = () => {
       this.setState({ open: false });
      };
      projectUpdate=(id,data)=>{
        const url=`http://localhost:8085/defect/api/v1/defect/${id}`
        axios.put(url,data)
        .then(response=>{
                if(response.status===200){
                    this.handleClick()
                }
        })
    }
    projectDelete=(id)=>{
        const url=`http://localhost:8085/defect/api/v1/defect/${id}`
        axios.delete(url)
        .then(response=>{
            if(response.status===200){
                this.handleClick()
               }
        })
    }
    render() {
        const classes=styles
        const vertical= 'top'
        const horizontal= 'center'
        return (
            <div className={classes.root}>
                <Grid 
                    container 
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                            <Paper elevation={1} className={classes.roots}>
                            <Breadcrumbs aria-label="breadcrumb">
                    
                                <Typography color="textPrimary" >
                                <h1> Defect </h1>
                                </Typography>
                            </Breadcrumbs>
                            </Paper>
                            <Divider />
                            <form onSubmit={this.handleSubmit}>
                             <Grid
                              container
                              direction="row"
                              justify="center"
                              alignItems="center"
                              className="project-header"
                             >   
                            <Grid item xs={12}>
                                <Typography color="textPrimary" className={classes.header}>
                                    Create Defect
                                </Typography>
                            </Grid>
                            <Grid item xs={12} >
                            <TextField
                                id="standard-full-width"
                                label="Defect Name"
                                style={{ marginTop: '2%',width:'90%',marginLeft:'5%',textAlign:'center' }}
                                placeholder="Enter Defectname"
                                fullWidth
                                margin="normal"
                                name="defect"
                                onChange={this.handleChange}
                                value={this.state.defect}
                            />
                            </Grid>
                            <Grid item xs={12} >
                            <TextField
                                id="standard-full-width"
                                label="Defect Description"
                                style={{ marginTop: '2%',width:'90%',marginLeft:'5%',textAlign:'center' }}
                                placeholder="Enter Defect Description"
                                fullWidth
                                name="defectDescription"
                                onChange={this.handleChange}
                                value={this.state.defectDescription}
                                margin="normal"
                               
                            />
                            </Grid>
                                <Grid item xs={4} className="defect-select">
                                <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple">Priority</InputLabel>
                                <Select
                                name='priority'
                                value={this.state.priority}
                                onChange={this.handleChange}
                                input={<Input id="select-multiple" />}
                                MenuProps={MenuProps}
                               margin = "normal"
                                >
                                {Level.map((lavel,intex) => (
                                    <MenuItem key={intex} value={lavel} >
                                    {lavel}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl> 
                                </Grid>
                                <Grid item xs={4} className="defect-select">
                                <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple">Severity</InputLabel>
                                <Select
                                name='severity'
                                value={this.state.severity}
                                onChange={this.handleChange}
                                input={<Input id="select-multiple" />}
                                MenuProps={MenuProps}
                              margin = "normal"
                                >
                                {Level.map((lavel,intex) => (
                                    <MenuItem key={intex} value={lavel} >
                                    {lavel}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>     
                            </Grid>
                            <Grid item xs={4} className="defect-select">
                                <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple">Project ID</InputLabel>
                                <Select
                                name='projectID'
                                value={this.state.projectID}
                                onChange={this.handleChange}
                                input={<Input id="select-multiple" />}
                                MenuProps={MenuProps}
                               margin = "normal"
                                >
                                {this.state.projectidsfromproject.map((lavel,intex) => (
                                    <MenuItem key={intex} value={lavel.id} >
                                    {lavel.id}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl> 
                                </Grid>
                            <Grid item xs={12} >
                            <Button 
                            variant="contained" 
                            color = "secondary"
                            style={{marginBottom:'5%',marginTop:'4%',marginLeft:'14%',transform:'translate(-50%)',width:'25%'}} 
                            type="submit">
                                Save
                            </Button>
                            </Grid>
                            </Grid>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{vertical, horizontal}}
                    key={`${vertical},${horizontal}`}
                    open={this.state.open}
                    onClose={this.handleClose}
                    ContentProps={{
                    'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Success</span>}
                />
                   <Grid
                    container 
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                >
                <Grid item xs={12}>
                <MaterialTable
                    title="View Defects"
                    columns={columns}
                    data={this.state.data}
                    editable={{
                        onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                            resolve();
                            const data = [...this.state.data];
                            data.push(newData);
                            this.setState({ ...this.state, data });
                            }, 600);
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                            resolve();
                            const data = [...this.state.data];
                            data[data.indexOf(oldData)] = newData;
                            this.setState({ ...this.state.data, data });
                            this.projectUpdate(newData.id,newData)
                            }, 600);
                        }),
                        onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                            resolve();
                            const data = [...this.state.data];
                            data.splice(data.indexOf(oldData), 1);
                            this.setState({ ...this.state.data, data });
                            this.projectDelete(oldData.id)
                            }, 600);
                        }),
                    }}
                    />
                </Grid>
                </Grid>
            </div>
        )
    }
}
