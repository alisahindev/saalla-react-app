import React, { useState, useEffect } from "react";
import axios from "axios";
import cheerio from "cheerio";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
  rootLink: {
    width: "100%",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12) !important",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  title: {
    fontSize: "1rem !important",
  },
  description: {
    marginRight: "0px !important",
    marginLeft: "0px !important",
  },
});

const CORS_PROXY = "https://tranquil-crag-40722.herokuapp.com/";

const getPreviewData = (tags) => {
  const result = tags.reduce((previewData, item) => {
    switch (item.tag) {
      case "og:title":
        previewData.title = item.value;
        break;
      case "og:url":
        previewData.link = item.value;
        break;
      case "og:description":
        previewData.description = item.value;
        break;
      case "og:site_name":
        previewData.site = item.value;
        break;
      case "og:image":
        previewData.image = item.value;
        break;
      default:
        break;
    }
    return previewData;
  }, {});

  return Promise.resolve(result);
};

const parseHTML = (html) => {
  const $ = cheerio.load(html);

  const meta = [];
  $("head meta").map((i, item) => {
    if (!item.attribs) return null;

    const property = item.attribs.property || null;
    const content = item.attribs.content || null;

    if (!property || !content) return null;

    meta.push({ tag: property, value: content });
    return null;
  });

  return Promise.resolve(meta);
};

const fetchUrl = (url) => {
  return axios(CORS_PROXY + url).then((response) => response.data);
};

const getUrl = (text) => {
  if (!text) return null;

  const a = document.createElement("a");
  a.href = text;

  const { protocol, host, pathname, search, hash } = a;

  const url = `${protocol}//${host}${pathname}${search}${hash}`;

  const isSameHost = host === window.location.host;

  if (isSameHost) return null;

  return url;
};

export default function LinkInput(props) {
  const [previewData, setPreviewData] = useState(null);
  const classes = useStyles();

  const onBlur = (e) => {
    const url = e.target.value;
    fetchUrl(url).then(parseHTML).then(getPreviewData).then(setPreviewData);
  };

  return (
    <div>
      <TextField
        style={{ marginBottom: "2rem", width: "100%" }}
        id="standard-basic"
        label="Bağlantı adresi"
        onBlur={onBlur}
        onChange={props.onChange}
      />
      {previewData && (
        <Card className={classes.rootLink}>
          <a href={previewData && previewData.link} target="_blank">
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={previewData.image}
                title={previewData.title}
              />
              <CardContent>
                <Typography
                  className={classes.title}
                  gutterBottom
                  variant="h5"
                  component="h2"
                >
                  {previewData && previewData.site}
                </Typography>
                <Typography
                  className={classes.title}
                  gutterBottom
                  variant="h5"
                  component="h2"
                >
                  {previewData && previewData.title}
                </Typography>
                <Typography
                  className={classes.description}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {previewData.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </a>
        </Card>
      )}
    </div>
  );
}
