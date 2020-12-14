import React, { useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ImageIcon from "@material-ui/icons/Image";
import LinkIcon from "@material-ui/icons/Link";
import { Editor } from "@tinymce/tinymce-react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import LinkInput from "../../../components/LinkPreview/linkInput";

function TabPanel(props) {
  const {
    children,
    submitValidation,
    onSubmit,
    value,
    index,
    community,
    ...other
  } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography> {children} </Typography>
          <div className="two_but">
            <Button
              style={{ marginRight: "0.5rem" }}
              variant="outlined"
              color="primary"
            >
              Vazgec
            </Button>
            <Button
              onClick={onSubmit}
              disabled={props && !submitValidation(community)}
              variant="contained"
              color="primary"
            >
              Paylas
            </Button>
          </div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabPanelList(props) {
  const classes = useStyles();
  const [tabValue, setValue] = useState(0);
  const [link, setLink] = useState(null);
  const [image, setImage] = useState(null);
  const [postContents, setContents] = useState({
    post: "",
    imageOrVideo: "",
    link: "",
  });

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleEditorChange = (content, type) => {
    const contents = { ...postContents };
    contents[type] = content;
    setContents(contents);
  };

  const handleImageUpload = (files) => {
    setImage(files[0]);
  };

  const contentValidation = (community) => {
    if (tabValue === 0 && postContents.post === "") return false;
    else if (tabValue === 1 && postContents.imageOrVideo === "") return false;
    else if (tabValue === 2 && postContents.link === "") return false;
    else if (!community) return false;
    else return true;
  };

  const handleSubmit = () => {
    const { onSubmit } = props;
    const values = {};
    switch (tabValue) {
      case 0:
        values.content = postContents.post;
        break;
      case 1:
        values.content = postContents.imageOrVideo;
        values.contentFile = image;
        if (image.type == "video/mp4" || image.type == "video/mp3") {
          values.contentType = 20;
        } else {
          values.contentType = 10;
        }
        break;
      case 2:
        values.content = postContents.link;
        values.linkUrl = link;
        values.contentType = 50;
        break;
      default:
        return;
    }
    onSubmit(values);
  };

  const getFileAddedMessage = (fileName) => {
    return `${fileName} başarıyla yüklendi`;
  };

  const getFileRemovedMessage = (fileName) => {
    return `${fileName} kaldırıldı`;
  };

  const { community } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Gonderi" icon={<PostAddIcon />} {...a11yProps(0)} />
          <Tab label="Resim & Video" icon={<ImageIcon />} {...a11yProps(1)} />
          <Tab label="Link" icon={<LinkIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel
        submitValidation={contentValidation}
        community={community}
        onSubmit={handleSubmit}
        value={tabValue}
        index={0}
      >
        <Editor
          init={{
            language: "tr_TR",
            language_url: "/langs/tr_TR.js",
            height: 300,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview hr anchor pagebreak",
              "searchreplace wordcount visualblocks visualchars code fullscreen",
              "insertdatetime nonbreaking save table contextmenu directionality",
              "emoticons template paste textpattern",
            ],
            toolbar1:
              "undo redo | styleselect | emoticons | bold italic | bullist numlist outdent indent | link image",
          }}
          onEditorChange={(value) => handleEditorChange(value, "post")}
          rows={4}
        />
      </TabPanel>
      <TabPanel
        community={community}
        submitValidation={contentValidation}
        onSubmit={handleSubmit}
        value={tabValue}
        index={1}
      >
        <Editor
          init={{
            language: "tr_TR",
            language_url: "/langs/tr_TR.js",
            height: 250,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview hr anchor pagebreak",
              "searchreplace wordcount visualblocks visualchars code fullscreen",
              "insertdatetime nonbreaking save table contextmenu directionality",
              "emoticons template paste textpattern",
            ],
            toolbar1:
              "undo redo | styleselect | emoticons | bold italic | bullist numlist outdent indent | link image",
          }}
          onEditorChange={(value) => handleEditorChange(value, "imageOrVideo")}
          rows={4}
        />
        <DropzoneArea
          filesLimit={1}
          acceptedFiles={["image/*,video/mp4,video/mp3,application/*"]}
          dropzoneText={"Dosyanızı sürükleyin bırakın"}
          onChange={(files) => handleImageUpload(files)}
          maxFileSize={15000000}
          showFileNames
          showFileNamesInPreview
          showPreviewsInDropzone
          getFileAddedMessage={getFileAddedMessage}
          getFileRemovedMessage={getFileRemovedMessage}
        />
      </TabPanel>
      <TabPanel
        community={community}
        submitValidation={contentValidation}
        onSubmit={handleSubmit}
        value={tabValue}
        index={2}
      >
        <Editor
          init={{
            language: "tr_TR",
            language_url: "/langs/tr_TR.js",
            height: 250,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview hr anchor pagebreak",
              "searchreplace wordcount visualblocks visualchars code fullscreen",
              "insertdatetime nonbreaking save table contextmenu directionality",
              "emoticons template paste textpattern",
            ],
            toolbar1: "styleselect | emoticons | bold italic",
          }}
          onEditorChange={(value) => handleEditorChange(value, "link")}
          rows={4}
        />
        <LinkInput onChange={handleLinkChange} />
      </TabPanel>
    </div>
  );
}
