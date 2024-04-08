export const handleGET = async (req, res) => {
  res.json({ message: "Hello World!" });
};

export const handlePOST = async (req, res) => {
  const sender = req.body.sender;
  res.json({
    message: "Hello World!",
    from: sender,
  });
};
