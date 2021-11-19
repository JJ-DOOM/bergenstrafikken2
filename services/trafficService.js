import { API_URL, CHAT_TITLE_LENGTH_LIMIT } from "../constants";

const createTeaserTitle = (title) => {
  if ((title?.length ?? 1) > 10) {
    const newTitle = title.trim().slice(0, CHAT_TITLE_LENGTH_LIMIT - 1);
    return newTitle.length < CHAT_TITLE_LENGTH_LIMIT ? newTitle + ".." : newTitle;
  }
  return null;
};

const getContent = (trafficMessageContent) => {
  const { type } = trafficMessageContent;
  switch (type) {
    case "chat":
      return {
        type: trafficMessageContent.type,
        value: trafficMessageContent?.components,
      };
    case "embed-code":
      return { type: trafficMessageContent.type, value: trafficMessageContent.embedCode };
    case "list":
      return { type: trafficMessageContent.type, value: trafficMessageContent?.items };
    case "text":
      return { type: trafficMessageContent.type, value: trafficMessageContent.value };
    default:
      return { type: null, value: null };
  }
};

export default {
  getTrafficMessages: () =>
    fetch(API_URL).then((res) =>
      res.json().then((trafficMessagesRaw) =>
        trafficMessagesRaw.map((tm) => ({
          title: tm?.title || createTeaserTitle(tm?.teaser),
          createdAt: tm?.createdAt,
          content: tm?.content?.components?.map((item) => getContent(item)),
        }))
      )
    ),
};
