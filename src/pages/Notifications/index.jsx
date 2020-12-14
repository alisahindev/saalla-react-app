import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import PrimarySearchAppBar from "../../components/Header";
import PopularTags from "../../components/PopularTags";
import NotificationList from "./components/NotificationList";
import {
  getNotificationsRequest,
  markAsReadRequest,
} from "../../redux/notifications/actions";
import { Helmet } from "react-helmet";

function Notifications(props) {
  const { notifications, getNotifications } = props;

  useEffect(() => {
    getNotifications();
    if (notifications) {
      const values = [];
      notifications.map((x) => !x.isRead && values.push(x.id));
      values.length > 0 && props.markAsRead({ values });
    }
  }, [notifications && notifications.length]);

  return (
    <div>
      <Helmet title="Bildirimler" />
      <Container style={{ marginTop: "6rem" }}>
        <Row style={{ marginTop: "1rem" }}>
          <Col
            style={{ paddingBottom: "10px", marginTop: "20px" }}
            xs={12}
            md={8}
          >
            <NotificationList items={notifications || []} />
          </Col>
          <Col style={{ paddingBottom: "10px" }} xs={12} md={4}>
            <div
              style={{ position: "-webkit-sticky", position: "sticky", top: 0 }}
            >
              <PopularTags />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getNotifications: () => dispatch(getNotificationsRequest()),
  markAsRead: (payload) => dispatch(markAsReadRequest(payload)),
});

const mapStateToProps = (state) => ({
  notifications: state.notifications.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
