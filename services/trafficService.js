import { API_URL } from "../constants";

export default {
  getTrafficMessages: () =>
    fetch(API_URL).then((res) =>
      res.json().then((trafficMessagesRaw) =>
        trafficMessagesRaw.map((tm) => ({
          title: tm?.title,
          createdAt: tm?.createdAt,
          content: tm?.content?.components?.map((tmc) => (tmc?.type === "text" ? tmc?.value : null)),
        }))
      )
    ),
};
