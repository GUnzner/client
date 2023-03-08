const createTicket = async (req, res) => {
  res.send("create ticket");
};

const deleteTicket = async (req, res) => {
  res.send("delete Ticket");
};

const getAllTickets = async (req, res) => {
  res.send("get All Tickets");
};

const updateTicket = async (req, res) => {
  res.send("update Ticket");
};

const showStats = async (req, res) => {
  res.send("show Stats");
};

export { createTicket, deleteTicket, getAllTickets, updateTicket, showStats };
