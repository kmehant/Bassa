import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

//Component imports
import Appbar from "../components/Appbar";
import CompletedFileList from "./CompletedFileList";
import QueuedFileList from "./QueuedFileList";

//MUI imports
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FAB from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import green from "@material-ui/core/colors/green";
import Button from "@material-ui/core/Button";

import "../index.css";

const styles = theme => ({
  grid: {
    flexGrow: 1,
    marginTop: 20
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    maxHeight: 500,
    overflow: "auto",
    overflowX: "none",
    color: theme.palette.text.secondary
  },
  heading: {
    padding: 20
  },
  paperAdd: {
    textAlign: "center",
    paddingBottom: 20
  },
  link: {
    width: 850,
    borderTop: 2
  },
  fab: {
    marginLeft: 30,
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600]
    }
  },
  card: {
    padding: 10
  }
});

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      completedList: [],
      queuedList: []
    };
  }

  componentWillMount() {
    let token = sessionStorage.getItem("token");
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/downloads/1`,
      headers: { token: `${token}` }
    })
      .then(res => {
        let completedList = res.data.filter(file => file.status === 3);
        let queuedList = res.data.filter(file => file.status === 0);
        this.setState({ completedList, queuedList });
      })
      .catch(err => console.log(err));
  }

  renderCompletedDownloads = () => {
    if (this.state.completedList.length !== 0) {
      return <CompletedFileList files={this.state.completedList} limit={20} />;
    } else {
      return <div>Loading...</div>;
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Appbar isloggedIn={true} />
        <Typography variant="h5" className={classes.heading}>
          Hi username!
        </Typography>
        <Paper className={classes.paperAdd}>
          <Typography variant="h5">ADD DOWNLOAD</Typography>
          <form>
            <Input
              type="text"
              className={classes.link}
              placeholder="Enter or paste the link below"
            />
            <FAB
              color="primary"
              size="small"
              className={classes.fab}
              aria-label="add-download"
            >
              <AddIcon />
            </FAB>
          </form>
        </Paper>
        <Grid container className={classes.grid} spacing={1}>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
              <Card className={classes.card}>
                <Typography variant="h5">
                  Completed Downloads&nbsp;
                  <Link to="/completed">
                    <Button size="small" variant="outlined" color="primary">
                      show all
                    </Button>
                  </Link>
                </Typography>
              </Card>
              {this.renderCompletedDownloads()}
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
              <Card className={classes.card}>
                <Typography variant="h5">
                  In Queue&nbsp;
                  <Link to="/queued">
                    <Button size="small" variant="outlined" color="primary">
                      show all
                    </Button>
                  </Link>
                </Typography>
              </Card>
              <QueuedFileList files={this.state.queuedList} limit={20} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
