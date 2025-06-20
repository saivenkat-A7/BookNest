const Contact = require("./contact.model");

const createAContact = async (req, res) => {
  try {
    const newContact =  await Contact(req.body);
    const savedContact = await newContact.save();
    res.status(200).json(savedContact);
  } catch (error) {
    console.error("Error sending message", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};
const getContactByEmail = async (req, res) => {
  try {
    const {email} = req.params;
    const contact = await Contact.find({email}).sort({createdAt: -1});
    if(!contact) {
      return res.status(404).json({ message: "msg not send" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error fetching msg", error);
    res.status(500).json({ message: "Failed to send" });
  }
}

module.exports = {
  createAContact,
  getContactByEmail
};
