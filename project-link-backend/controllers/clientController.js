
const Client = require('../models/client');
const project = require('../models/project');

//Create a New Client
exports.createClient = async (req, res) => {
  try {
    const { user, name, email, phone, company, notes } = req.body;

    const newClient = new Client({
      user: user || undefined, 
      name,
      email,
      phone,
      company,
      notes,
    });

    const saved = await newClient.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//get client's registration email
exports.getClients = async (req, res) => {
  const clients = await Client.find().populate('user', 'email');
  res.json(clients);
};

//find clients by id
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//update or edit client
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//delete client along the project associated with the client
exports.deleteClient = async (req, res) => {
    const clientId = req.params.id
  try {
    await project.deleteMany({client: clientId})
    await Client.findByIdAndDelete(clientId)
   
    if (!clientId) return res.status(404).json({ message: 'Client not found' });
    res.json({ message: 'Client deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


//create/update client profile
exports.createOrUpdateClientProfile = async (req, res) => {
  try {
    const userId = req.userInfo.id;

    let existing = await Client.findOne({ user: userId });

    if (existing) {
      const updated = await Client.findOneAndUpdate(
        { user: userId },
        req.body,
        { new: true }
      );
      return res.json(updated);
    }

    // attach user ID before creating new profile
    const created = await Client.create({ ...req.body, user: userId });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};


// Get the client profile of logged-in user
exports.getOwnClientProfile = async (req, res) => {
  try {
    const profile = await Client.findOne({ user: req.userInfo.id });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

