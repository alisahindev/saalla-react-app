import React, { useEffect } from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import './ConversationList.css';
import { getConversationsRequest, getConversationDetailRequest } from '../../redux/conversation/actions';
import { connect } from 'react-redux';
import { markAsReadRequest } from '../../redux/messages/actions';

function ConversationList(props) {
  const { conversations, getConversations, auth, getConversationDetail, selectedConversation } = props;

  useEffect(() => {
    getConversations();
  }, [])

  const onSelect = (id) => {
    getConversationDetail({ id })
  }

  return (
    <div className="conversation-list">
      <Toolbar
        title="Sohbetler"
        leftItems={[
          <ToolbarButton key="cog" icon="ion-ios-cog" />
        ]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
        ]}
      />
      <ConversationSearch />
      {conversations && conversations.length > 0 &&
        conversations.map((conversation, index) =>
          <ConversationListItem
            key={conversation.id}
            id={conversation.id}
            data={conversation}
            user={auth.user}
            selectedId={selectedConversation && selectedConversation.id}
            onSelect={onSelect}
          />
        )
      }
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getConversations: () => dispatch(getConversationsRequest({})),
  getConversationDetail: payload => dispatch(getConversationDetailRequest(payload)),
  markAsRead: payload => dispatch(markAsReadRequest(payload))
});

const mapStateToProps = (state) => ({
  conversations: state.conversations.data,
  auth: state.auth.data,
  selectedConversation: state.selectedConversation.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationList);