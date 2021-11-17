import { API_URL } from "../constants";

const getContent = (trafficMessageContent) => {
  const { type } = trafficMessageContent;
  // type === "image" && console.log(trafficMessageContent);
  switch (type) {
    case "text":
      return { type: trafficMessageContent.type, value: trafficMessageContent.value };
    case "list":
      return { type: trafficMessageContent.type, value: trafficMessageContent?.items };
    case "embed-code":
      return { type: trafficMessageContent.type, value: trafficMessageContent.embedCode };
    default:
      return { type: null, value: null };
  }
};

export default {
  getTrafficMessages: () =>
    fetch(API_URL).then((res) =>
      res.json().then((trafficMessagesRaw) =>
        trafficMessagesRaw.map((tm) => ({
          title: tm?.title,
          createdAt: tm?.createdAt,
          content: tm?.content?.components?.map((item) => getContent(item)),
        }))
      )
    ),
};
