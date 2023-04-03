export const getComments = async () => {
  return [
    {
      id: "1",
      body: "First comment",
      userId: "640a0da41366e48b02ae3b29",
      ticketId: "6414928932e886f966e2da6e",
      parentId: null,
      createdAt: "2022-08-16T23:00:33.010+02:00",
    },

    {
      id: "3",
      body: "First comment first child",
      userId: "640a0da41366e48b02ae3b29",
      ticketId: "6414928932e886f966e2da6e",
      parentId: "1",
      createdAt: "2022-08-16T23:00:33.010+02:00",
    },
  ];
};

export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",
    username: "John",
    createdAt: new Date().toISOString(),
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
